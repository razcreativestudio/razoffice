/**
 * Modul: X2T Converter Web Worker Bridge
 * Lokasi: utils/editor/x2t.ts
 * Diperbarui: 03 November 2026 (09:25 WIB)
 * Penulis: RAZ Enterprise Core Team
 * Deskripsi: Antarmuka utama proxy thread untuk delegasi konversi dokumen ke Web Worker
 * Mengirimkan pesan konversi biner tanpa memblokir antarmuka UI utama browser.
 */

import { X2tConvertParams, X2tConvertResult } from "./types";

interface PendingMessage {
  resolve: (value: any) => void;
  reject: (error: Error) => void;
}

interface WorkerResponse {
  id: number;
  type: string;
  payload?: any;
  error?: string;
}

export class X2tConverter {
  private worker: Worker | null = null;
  private initPromise: Promise<void> | null = null;
  private messageId = 0;
  private pendingMessages = new Map<number, PendingMessage>();
  private mainThreadPromise: Promise<any> | null = null;
  private mainThreadModule: any = null;

  constructor() {
    // Inisialisasi otomatis jika lingkungan mendukung Web Worker
    if (globalThis.Worker) {
      this.init();
    }
  }

  /**
   * Dapatkan ID pesan sekuensial yang unik
   */
  private getNextId(): number {
    return ++this.messageId;
  }

  /**
   * Kirim pesan ke worker dan tunggu respons balik (Promise based)
   */
  private sendMessage<T>(type: string, payload?: any): Promise<T> {
    return new Promise((resolve, reject) => {
      if (!this.worker) {
        reject(new Error("Worker not initialized"));
        return;
      }

      const id = this.getNextId();
      this.pendingMessages.set(id, { resolve, reject });

      // Gunakan Transferable ArrayBuffer jika ada agar transfer memori instan
      if (type === "convert" && payload?.data instanceof ArrayBuffer) {
        this.worker.postMessage({ id, type, payload }, [payload.data]);
      } else {
        this.worker.postMessage({ id, type, payload });
      }
    });
  }

  /**
   * Tangani pesan balasan dari Web Worker
   */
  private handleWorkerMessage = (event: MessageEvent<WorkerResponse>) => {
    const { id, type, payload, error } = event.data;

    // Lewati pesan handshake ready atau inisialisasi awal
    if (type === "ready" || type === "init:done") {
      console.log("[X2tConverter] Worker status:", type);
      return;
    }

    const pending = this.pendingMessages.get(id);
    if (!pending) return;

    this.pendingMessages.delete(id);

    if (type === "error") {
      pending.reject(new Error(error || "Unknown worker error"));
    } else {
      pending.resolve(payload);
    }
  };

  /**
   * Tangani error runtime pada Web Worker
   */
  private handleWorkerError = (error: ErrorEvent) => {
    console.error("[X2tConverter] Worker error:", error);

    // Batalkan seluruh antrean pesan dengan pesan error
    for (const [id, pending] of this.pendingMessages) {
      pending.reject(new Error(`Worker error: ${error.message}`));
      this.pendingMessages.delete(id);
    }
  };

  /**
   * Inisialisasi Web Worker thread
   */
  public init(): Promise<void> {
    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = new Promise<void>((resolve, reject) => {
      try {
        // Buat worker melalui bundler Next.js
        this.worker = new Worker(new URL("./x2t.worker.ts", import.meta.url));

        // Pasang event listener
        this.worker.onmessage = this.handleWorkerMessage;
        this.worker.onerror = this.handleWorkerError;

        // Kirimkan base URL absolut agar worker mengetahui path x2t.js dan x2t.wasm
        const baseUrl =
          typeof window !== "undefined" && window.location?.origin
            ? window.location.origin + "/x2t-1/"
            : "/x2t-1/";

        this.worker.postMessage({
          type: "init",
          payload: { baseUrl },
        });

        console.log("[X2tConverter] Worker created with baseUrl:", baseUrl);
        resolve();
      } catch (err) {
        this.initPromise = null;
        reject(err);
      }
    });

    return this.initPromise;
  }

  /**
   * Inisialisasi engine x2t langsung di main thread (DOM) sebagai fallback jika Web Worker gagal
   */
  private async initMainThread(): Promise<any> {
    if (this.mainThreadModule) return this.mainThreadModule;
    if (this.mainThreadPromise) return this.mainThreadPromise;

    this.mainThreadPromise = new Promise(async (resolve, reject) => {
      try {
        if (typeof window === "undefined" || typeof document === "undefined") {
          throw new Error("Main thread initialization is only available in browser context");
        }

        const baseUrl = window.location?.origin
          ? window.location.origin + "/x2t-1/"
          : "/x2t-1/";
        const scriptUrl = baseUrl + "x2t.js";
        const wasmUrl = baseUrl + "x2t.wasm";

        // Setup global Module hooks
        (window as any).Module = (window as any).Module || {};
        (window as any).Module.locateFile = function (path: string, prefix: string) {
          if (path.endsWith(".wasm") || path === "x2t.wasm") {
            return wasmUrl;
          }
          return prefix + path;
        };

        // Inject script tag ke DOM jika belum ada
        let script = document.querySelector<HTMLScriptElement>(`script[src="${scriptUrl}"]`);
        if (!script) {
          script = document.createElement("script");
          script.src = scriptUrl;
          await new Promise<void>((res, rej) => {
            script!.onload = () => res();
            script!.onerror = () => rej(new Error("Failed to load x2t.js script tag in DOM"));
            document.head.appendChild(script!);
          });
        }

        const mod = (window as any).Module;
        if (!mod) {
          throw new Error("window.Module is undefined after loading x2t.js");
        }

        // Tunggu runtime WASM siap
        await new Promise<void>((res) => {
          if (mod.calledRun) {
            res();
          } else {
            const prevInit = mod.onRuntimeInitialized;
            mod.onRuntimeInitialized = () => {
              if (prevInit) prevInit();
              res();
            };
          }
        });

        // Setup direktori virtual FS
        try {
          mod.FS.mkdir("/working");
          mod.FS.mkdir("/working/media");
          mod.FS.mkdir("/working/fonts");
          mod.FS.mkdir("/working/themes");
        } catch (e) {}

        this.mainThreadModule = mod;
        console.log("[X2tConverter] Main-thread x2t engine initialized successfully");
        resolve(mod);
      } catch (err) {
        this.mainThreadPromise = null;
        reject(err);
      }
    });

    return this.mainThreadPromise;
  }

  /**
   * Eksekusi konversi di main thread jika worker gagal
   */
  private async convertOnMainThread(params: X2tConvertParams): Promise<X2tConvertResult> {
    const mod = await this.initMainThread();
    const fromPath = "/working/" + params.fileFrom;
    const toPath = "/working/" + params.fileTo;
    const xmlPath = "/working/params.xml";

    const paramsXml = `<?xml version="1.0" encoding="utf-8"?>
<TaskQueueDataConvert
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:xsd="http://www.w3.org/2001/XMLSchema"
>
    <m_sFileFrom>${fromPath}</m_sFileFrom>
    <m_sThemeDir>/working/themes</m_sThemeDir>
    <m_sFileTo>${toPath}</m_sFileTo>
    <m_bIsNoBase64>false</m_bIsNoBase64>
    <m_sFontDir>/working/fonts/</m_sFontDir>
</TaskQueueDataConvert>`;

    mod.FS.writeFile(xmlPath, paramsXml);
    mod.FS.writeFile(fromPath, new Uint8Array(params.data));

    if (params.media) {
      for (const [key, value] of Object.entries(params.media)) {
        try {
          mod.FS.writeFile("/working/" + key, value);
        } catch (e) {}
      }
    }

    try {
      const pathInfo = mod.FS.analyzePath(toPath);
      if (pathInfo.exists) {
        mod.FS.unlink(toPath);
      }
    } catch (e) {}

    try {
      mod.ccall("main1", ["number"], ["string"], [xmlPath]);
    } catch (e) {
      console.error("[X2tConverter] Main-thread ccall error:", e);
    }

    let output: Uint8Array<ArrayBuffer> | null = null;
    try {
      output = mod.FS.readFile(toPath);
    } catch (e) {
      console.error("[X2tConverter] Main-thread readFile error:", e);
    }

    const outputMedia: { [key: string]: Uint8Array<ArrayBuffer> } = {};
    try {
      const files = mod.FS.readdir("/working/media/");
      for (const file of files) {
        if (file !== "." && file !== "..") {
          outputMedia[file] = mod.FS.readFile("/working/media/" + file, {
            encoding: "binary",
          });
        }
      }
    } catch (e) {}

    // Cleanup file sementara
    try {
      mod.FS.unlink(fromPath);
      mod.FS.unlink(toPath);
      mod.FS.unlink(xmlPath);
    } catch (e) {}

    return { output, media: outputMedia };
  }

  /**
   * Konversi format dokumen Office (.xlsx, .docx, .pptx)
   * Menggunakan Web Worker thread dengan auto-fallback ke Main Thread jika worker gagal
   */
  public async convert(params: X2tConvertParams): Promise<X2tConvertResult> {
    try {
      await this.init();

      const cloneMap = (map?: { [key: string]: Uint8Array }) => {
        if (!map) return undefined;
        return Object.fromEntries(
          Object.entries(map).map(([key, value]) => [key, value.slice(0)])
        );
      };

      // Gandakan ArrayBuffer karena data buffer akan ditransfer
      const dataClone = params.data.slice(0);

      const baseUrl =
        typeof window !== "undefined" && window.location?.origin
          ? window.location.origin + "/x2t-1/"
          : "/x2t-1/";

      const payload = {
        baseUrl,
        data: dataClone,
        fileFrom: params.fileFrom,
        fileTo: params.fileTo,
        media: cloneMap(params.media),
        fonts: cloneMap(params.fonts),
        themes: cloneMap(params.themes),
      };
      return await this.sendMessage<X2tConvertResult>("convert", payload);
    } catch (workerErr) {
      console.warn(
        "[X2tConverter] Web worker conversion failed or rejected, engaging main-thread fallback:",
        workerErr
      );
      return await this.convertOnMainThread(params);
    }
  }

  /**
   * Hentikan worker dan lepaskan alokasi memori
   */
  public terminate(): void {
    if (this.worker) {
      for (const [id, pending] of this.pendingMessages) {
        pending.reject(new Error("Worker terminated"));
        this.pendingMessages.delete(id);
      }

      this.worker.terminate();
      this.worker = null;
      this.initPromise = null;
      console.log("[X2tConverter] Worker terminated");
    }
  }

  /**
   * Status apakah worker sudah aktif
   */
  public get isInitialized(): boolean {
    return this.worker !== null && this.initPromise !== null;
  }
}

// Ekspor instance singleton converter default
export const converter = new X2tConverter();
