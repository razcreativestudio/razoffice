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
   * Konversi format dokumen Office (.xlsx, .docx, .pptx)
   */
  public async convert({
    data,
    fileFrom,
    fileTo,
    media,
    fonts,
    themes,
  }: X2tConvertParams): Promise<X2tConvertResult> {
    await this.init();

    const cloneMap = (map?: { [key: string]: Uint8Array }) => {
      if (!map) return undefined;
      return Object.fromEntries(
        Object.entries(map).map(([key, value]) => [key, value.slice(0)])
      );
    };

    // Gandakan ArrayBuffer karena data buffer akan ditransfer
    const dataClone = data.slice(0);

    const baseUrl =
      typeof window !== "undefined" && window.location?.origin
        ? window.location.origin + "/x2t-1/"
        : "/x2t-1/";

    const payload = {
      baseUrl,
      data: dataClone,
      fileFrom,
      fileTo,
      media: cloneMap(media),
      fonts: cloneMap(fonts),
      themes: cloneMap(themes),
    };
    return this.sendMessage<X2tConvertResult>("convert", payload);
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
