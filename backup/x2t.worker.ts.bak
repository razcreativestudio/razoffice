/**
 * Web Worker: Engine Konversi Dokumen X2T WebAssembly
 * Lokasi: utils/editor/x2t.worker.ts
 * Diperbarui: 03 November 2026 (10:20 WIB)
 * Penulis: RAZ Enterprise Core Team
 * Deskripsi: Worker thread untuk eksekusi kompilasi & konversi dokumen (.docx, .xlsx, .pptx)
 * menggunakan WebAssembly x2t. Dioptimalkan dengan fetch & Blob URL execution sehingga
 * 100% kebal terhadap kompresi Brotli/Gzip dari web server (mencegah syntax error token).
 */

/// <reference lib="webworker" />

import { AvsFileType, X2tConvertParams, X2tConvertResult } from "./types";

/* eslint-disable no-restricted-globals */

// Resolusi base URL yang aman dari konteks Blob URL Web Worker (Next.js / Turbopack)
function resolveBaseUrl(customBaseUrl?: string): string {
  if (customBaseUrl && typeof customBaseUrl === "string" && customBaseUrl.startsWith("http")) {
    return customBaseUrl.endsWith("/") ? customBaseUrl : customBaseUrl + "/";
  }

  // Jika Turbopack menyuntikkan lokasi worker asal
  const turboLoc = (self as any).TURBOPACK_WORKER_LOCATION;
  if (typeof turboLoc === "string" && turboLoc.startsWith("http")) {
    return turboLoc.replace(/\/+$/, "") + "/x2t-1/";
  }

  // Ekstrak protokol + host dari location.href (menangani blob:https://domain.com/uuid)
  const href = self.location?.href || "";
  const match = href.match(/https?:\/\/[^\/]+/i);
  if (match) {
    return match[0] + "/x2t-1/";
  }

  // Fallback origin jika bukan blob atau null
  const origin = self.location?.origin;
  if (origin && origin !== "null" && !origin.startsWith("blob:")) {
    return origin.replace(/\/+$/, "") + "/x2t-1/";
  }

  return "/x2t-1/";
}

let x2t: any = null;
let initPromise: Promise<void> | null = null;

/**
 * Inisialisasi engine x2t WASM di konteks Web Worker
 */
async function initX2t(customBaseUrl?: string): Promise<void> {
  if (x2t) return;

  const baseUrl = resolveBaseUrl(customBaseUrl);
  const scriptUrl = baseUrl + "x2t.js";
  const wasmUrl = baseUrl + "x2t.wasm";

  console.log("[x2t.worker] Initializing with scriptUrl:", scriptUrl);

  // Siapkan objek Module dan hook locateFile sebelum load skrip WASM
  (self as any).Module = (self as any).Module || {};
  (self as any).Module.locateFile = function (path: string, prefix: string) {
    if (path.endsWith(".wasm") || path === "x2t.wasm") {
      return wasmUrl;
    }
    return prefix + path;
  };

  // Konfigurasi path script root untuk emscripten
  Object.assign(self, {
    __filename: baseUrl,
  });

  // Eksekusi skrip engine x2t di Worker:
  // Ambil teks skrip via fetch() agar didekompresi secara otomatis oleh HTTP stack browser (Brotli/Gzip)
  // lalu eksekusi melalui in-memory Blob URL sehingga kebal 100% dari token biner terkompresi
  try {
    const res = await fetch(scriptUrl);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} saat memuat x2t.js dari ${scriptUrl}`);
    }
    const scriptText = await res.text();
    const blob = new Blob([scriptText], { type: "application/javascript" });
    const blobUrl = URL.createObjectURL(blob);
    try {
      importScripts(blobUrl);
    } catch (importErr) {
      console.warn("[x2t.worker] importScripts blob failed, fallback to global eval:", importErr);
      (0, eval)(scriptText);
    } finally {
      URL.revokeObjectURL(blobUrl);
    }
  } catch (fetchErr) {
    console.warn("[x2t.worker] fetch x2t.js failed, fallback to direct importScripts:", fetchErr);
    importScripts(scriptUrl);
  }

  x2t = (self as any).Module;

  // Tunggu kesiapan runtime WASM
  await new Promise<void>((resolve) => {
    if (x2t.calledRun) {
      resolve();
    } else {
      const prevOnInit = x2t.onRuntimeInitialized;
      x2t.onRuntimeInitialized = () => {
        if (prevOnInit) prevOnInit();
        resolve();
      };
    }
  });

  // Buat folder kerja virtual memori
  try {
    x2t.FS.mkdir("/working");
    x2t.FS.mkdir("/working/media");
    x2t.FS.mkdir("/working/fonts");
    x2t.FS.mkdir("/working/themes");
  } catch (err) {
    // Abaikan jika direktori sudah ada
  }

  console.log("[x2t.worker] Initialized successfully");
}

/**
 * Memastikan x2t siap sebelum eksekusi konversi dokumen
 */
async function ensureInit(customBaseUrl?: string): Promise<void> {
  if (!initPromise) {
    initPromise = initX2t(customBaseUrl);
  }
  return initPromise;
}

// Inisialisasi otomatis saat worker dibuat
ensureInit().catch((err) => {
  console.error("[x2t.worker] Auto-init failed:", err);
});

/**
 * Bersihkan file temporary setelah selesai konversi
 */
function cleanupFiles(files: string[]): void {
  for (const file of files) {
    try {
      x2t.FS.unlink(file);
    } catch (err) {
      console.error(err);
    }
  }
  cleanMedia();
}

function cleanMedia() {
  try {
    const mediaFiles = x2t.FS.readdir("/working/media/");
    for (const file of mediaFiles) {
      if (file !== "." && file !== "..") {
        x2t.FS.unlink("/working/media/" + file);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

/**
 * Baca file media yang dihasilkan dari direktori virtual
 */
function readMedia(): { [key: string]: Uint8Array<ArrayBuffer> } {
  const media: { [key: string]: Uint8Array<ArrayBuffer> } = {};
  try {
    const files = x2t.FS.readdir("/working/media/");
    for (const file of files) {
      if (file !== "." && file !== "..") {
        const fileData = x2t.FS.readFile("/working/media/" + file, {
          encoding: "binary",
        });
        media[file] = fileData;
      }
    }
  } catch (e) {
    console.error(e);
  }
  return media;
}

const xmlPath = "/working/params.xml";

function writeInputs({
  fileFrom,
  fileTo,
  formatFrom,
  formatTo,
  data,
  media,
}: X2tConvertParams) {
  const params = {
    m_sFileFrom: fileFrom,
    m_sThemeDir: "/working/themes",
    m_sFileTo: fileTo,
    m_nFormatFrom: formatFrom,
    m_nFormatTo: formatTo,
    m_bIsPDFA: formatTo === AvsFileType.AVS_FILE_CROSSPLATFORM_PDFA,
    m_bIsNoBase64: false,
    m_sFontDir: "/working/fonts/",
  };

  const content = Object.entries(params)
    .filter(([k, v]) => v)
    .reduce((a, [k, v]) => a + `<${k}>${v}</${k}>\n`, "");

  const xml = `<?xml version="1.0" encoding="utf-8"?>
<TaskQueueDataConvert
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:xsd="http://www.w3.org/2001/XMLSchema"
>
${content}
</TaskQueueDataConvert>`;

  x2t.FS.writeFile(xmlPath, xml);
  if (data) {
    x2t.FS.writeFile(fileFrom, new Uint8Array(data));
  }

  if (media) {
    cleanMedia();
    for (const [key, value] of Object.entries(media)) {
      try {
        x2t.FS.writeFile("/working/" + key, value);
      } catch (err) {
        console.error(key, err);
      }
    }
  }
}

/**
 * Konversi dokumen antar format dokumen Office
 */
async function convert({
  data,
  fileFrom,
  fileTo,
  formatFrom,
  formatTo,
  media,
  fonts,
  themes,
}: X2tConvertParams): Promise<X2tConvertResult> {
  const fromPath = "/working/" + fileFrom;
  const toPath = "/working/" + fileTo;
  const files = [fromPath, toPath, xmlPath];

  writeInputs({
    fileFrom: fromPath,
    fileTo: toPath,
    formatFrom,
    formatTo,
    data,
    media,
  });

  if (
    fileFrom.endsWith(".doc") ||
    formatFrom == AvsFileType.AVS_FILE_DOCUMENT_DOC
  ) {
    const viaPath = fromPath + ".docx";
    writeInputs({
      fileFrom: fromPath,
      fileTo: viaPath,
      data: null as never,
    });
    x2t.ccall("main1", ["number"], ["string"], [xmlPath]);
    writeInputs({
      fileFrom: viaPath,
      fileTo: toPath,
      data: null as never,
    });
    files.push(viaPath);
  }

  try {
    const pathInfo = x2t.FS.analyzePath(toPath);
    if (pathInfo.exists) {
      x2t.FS.unlink(toPath);
    }
  } catch (err) {}

  try {
    x2t.ccall("main1", ["number"], ["string"], [xmlPath]);
  } catch (e) {
    console.error("ccall", e);
  }

  // Baca hasil output file
  let output: Uint8Array<ArrayBuffer> | null = null;
  try {
    output = x2t.FS.readFile(toPath);
  } catch (e) {
    console.error(e);
  }

  // Baca aset media pendukung
  const outputMedia = readMedia();

  // Bersihkan file sementara
  setTimeout(() => {
    cleanupFiles(files);
  });

  return { output, media: outputMedia };
}

// Tipe pesan komunikasi antar thread
interface WorkerMessage {
  id?: number;
  type: "init" | "convert";
  payload?: any;
}

/**
 * Handler pesan masuk dari main thread
 */
self.onmessage = async (event: MessageEvent<WorkerMessage>) => {
  const { id, type, payload } = event.data;

  try {
    switch (type) {
      case "init": {
        await ensureInit(payload?.baseUrl);
        self.postMessage({ id, type: "init:done" });
        break;
      }

      case "convert": {
        // Pastikan x2t telah siap dengan baseUrl jika disediakan
        await ensureInit(payload?.baseUrl);
        const result = await convert(payload);

        // Gunakan Transferable objects untuk performa memori instan
        const transferables: Transferable[] = [];
        if (result.output) {
          transferables.push(result.output.buffer);
        }
        Object.values(result.media).forEach((m) =>
          transferables.push(m.buffer),
        );

        self.postMessage(
          { id, type: "convert:done", payload: result },
          { transfer: transferables },
        );
        break;
      }

      default:
        self.postMessage({
          id,
          type: "error",
          error: `Unknown message type: ${type}`,
        });
    }
  } catch (error) {
    self.postMessage({
      id,
      type: "error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Beritahu main thread bahwa worker telah siap
self.postMessage({ type: "ready" });
