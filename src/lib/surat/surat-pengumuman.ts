/**
 * Surat Pengumuman Kelulusan PSB — generator PDF (server-side), Al-Andalus Putri.
 * Format nomor: <SEQ3>/PSB/<ROMAWI-BULAN>/<TA-COMPACT> (SEQ urut angka 3 digit).
 *
 * Teknik template: background JPEG halaman resmi (zona variabel dikosongkan,
 * commit sebagai public/images/template-surat-pengumuman-1..3.jpg) + overlay
 * teks jsPDF. Koordinat zona dalam pt (halaman 595.2 x 841.92), y diukur
 * pdf.js dari BAWAH halaman (baseline) — dikonversi ke jsPDF (dari ATAS).
 */
import { jsPDF } from "jspdf";
import { SURAT_PENGUMUMAN_CONFIG as CFG } from "@/config/surat-pengumuman";
import { prisma } from "@/lib/prisma";

const BULAN_ROMAWI = [
  "I", "II", "III", "IV", "V", "VI",
  "VII", "VIII", "IX", "X", "XI", "XII",
] as const;

// ============ PENOMORAN ============

export function buildNomorSurat(seq: number, tanggal: Date): string {
  const bulan = BULAN_ROMAWI[tanggal.getMonth()];
  const seqStr = String(seq).padStart(3, "0");
  return `${seqStr}/${CFG.nomorSuffix}/${bulan}/${CFG.taCompact}`;
}

/** SEQ dari nomor surat lengkap, atau null jika format beda. */
export function parseNomorSurat(nomor: string): { seq: number } | null {
  const m = nomor.match(/^(\d{3})\/PSB\/([IVX]+)\/(\d{4})$/);
  if (!m) return null;
  return { seq: parseInt(m[1], 10) };
}

/** Ambil semua SEQ yang sudah terpakai: dari pengumuman + baseline manual di app_settings. */
export async function getSeqTerpakai(): Promise<number[]> {
  const rows = await prisma.pengumuman.findMany({
    where: { nomor_surat: { not: null } },
    select: { nomor_surat: true },
  });
  const seqs: number[] = [];
  for (const r of rows) {
    const parsed = parseNomorSurat(r.nomor_surat!);
    if (parsed) seqs.push(parsed.seq);
  }
  // Surat yang terbit MANUAL sebelum fitur ini dicatat sebagai baseline
  // di app_settings: key "surat_nomor_terakhir" (nomor lengkap terakhir).
  const setting = await prisma.appSetting.findUnique({
    where: { key: "surat_nomor_terakhir" },
  });
  if (setting) {
    const parsed = parseNomorSurat(setting.value);
    if (parsed) seqs.push(parsed.seq);
  }
  return seqs;
}

/** Nomor surat berikutnya (SEQ > max terpakai, anti lompat). Tidak mengunci — finalisasi memverifikasi ulang + unique constraint. */
export async function getNextNomorSurat(
  tanggal: Date
): Promise<{ seq: number; nomor: string }> {
  const terpakai = await getSeqTerpakai();
  let seq = terpakai.length ? Math.max(...terpakai) + 1 : 1;
  const max = 999;
  while (seq <= max) {
    const nomor = buildNomorSurat(seq, tanggal);
    const ada = await prisma.pengumuman.findUnique({ where: { nomor_surat: nomor } });
    if (!ada) return { seq, nomor };
    seq++;
  }
  throw new Error("Nomor surat untuk tahun ajaran ini sudah habis (melebihi 999).");
}

// ============ GENERATOR PDF ============

export interface AspekPenilaian {
  nilai: string; // A / B / C / D
  keterangan: string;
}

export interface SuratPengumumanData {
  nomorSurat: string;
  tanggalTerbit: Date; // UTC
  namaLengkap: string;
  nomorPendaftaran: string;
  hariTanggalTes: string; // mis. "Sabtu, 10 Oktober 2026"
  aspek: AspekPenilaian[]; // 5 baris tabel
  ringkasan: string; // kalimat ringkasan italic di bawah tabel
}

const imageCache: Record<string, string | null> = {};

async function loadImage(path: string): Promise<string | null> {
  if (!path) return null;
  if (imageCache[path] !== undefined) return imageCache[path];
  try {
    const fs = await import("fs/promises");
    const pathMod = await import("path");
    const filePath = pathMod.join(process.cwd(), "public", path);
    const data = await fs.readFile(filePath);
    const ext = pathMod.extname(path).slice(1).toLowerCase() || "png";
    const mime = ext === "jpg" || ext === "jpeg" ? "jpeg" : "png";
    imageCache[path] = `data:image/${mime};base64,${data.toString("base64")}`;
  } catch {
    imageCache[path] = null;
  }
  return imageCache[path];
}

function tanggalIndo(d: Date): string {
  // Gunakan WIB (UTC+7) sebagai tanggal terbit resmi
  const wib = new Date(d.getTime() + 7 * 3600 * 1000);
  const bulan = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
  ];
  return `${wib.getUTCDate()} ${bulan[wib.getUTCMonth()]} ${wib.getUTCFullYear()}`;
}

/**
 * Posisi zona variabel pada template resmi (pt, page 595.2 x 841.92).
 * y diukur pdf.js dari BAWAH halaman (baseline) — dikonversi ke jsPDF (dari ATAS).
 * Diukur dari PDF resmi Syafirna Laiqa (prototipe disetujui 3 Nov 2026).
 */
const TEMPLATE_PAGE = { w: 595.2, h: 841.92 };
const Y = (yBottom: number) => TEMPLATE_PAGE.h - yBottom;
const ZONA = {
  tanggal: { x: 420.17, y: Y(689.71), fs: 11 },
  nomor: { x: 134.45, y: Y(675.07), fs: 11 },
  nama: { x: 56.66, y: Y(594.17), fs: 11 },
  nomorTes: { x: 210.55, y: Y(579.77), fs: 11 },
  hariTes: { x: 235.06, y: Y(494.78), fs: 11 },
  // Tabel nilai (hal 1)
  nilaiX: 237,
  nilaiBaseY: [442.2, 390.84, 345.46, 329.14, 311.62],
  ketX: 274.9,
  ketBaseY: [449.64, 420.12, 345.7, 328.18, 311.86], // baseline baris pertama tiap row
  ketLineHeight: 14.4,
  ketWrapWidth: 263,
  ketMaxLines: [1, 4, 1, 1, 5],
  // Ringkasan italic di bawah tabel
  ringkasan: { x: 62.42, y: Y(282.31), fs: 11, wrapWidth: 470, lineHeight: 14.64 },
};

async function generateSuratDariTemplate(
  data: SuratPengumumanData
): Promise<{ buffer: Buffer; filename: string }> {
  const doc = new jsPDF({
    unit: "pt",
    format: [TEMPLATE_PAGE.w, TEMPLATE_PAGE.h],
  });

  const tampil = async (page: number) => {
    if (page > 1) doc.addPage([TEMPLATE_PAGE.w, TEMPLATE_PAGE.h]);
    const img = await loadImage(`/images/template-surat-pengumuman-${page}.jpg`);
    if (img) doc.addImage(img, "JPEG", 0, 0, TEMPLATE_PAGE.w, TEMPLATE_PAGE.h);
  };

  const tulis = (text: string, zona: { x: number; y: number; fs: number }, bold = false) => {
    doc.setFont("times", bold ? "bold" : "normal");
    doc.setFontSize(zona.fs);
    doc.text(text, zona.x, zona.y);
  };

  // ===== HALAMAN 1 =====
  await tampil(1);

  tulis(`${CFG.kota}, ${tanggalIndo(data.tanggalTerbit)}`, ZONA.tanggal);
  tulis(`: ${data.nomorSurat}`, ZONA.nomor);
  tulis(data.namaLengkap, ZONA.nama);
  tulis(data.nomorPendaftaran, ZONA.nomorTes);
  tulis(data.hariTanggalTes, ZONA.hariTes);

  const aspek = data.aspek;
  doc.setFont("times", "normal");
  doc.setFontSize(11);
  for (let i = 0; i < 5; i++) {
    doc.text(aspek[i]?.nilai ?? "", ZONA.nilaiX, Y(ZONA.nilaiBaseY[i]));
    const lines = doc
      .splitTextToSize(aspek[i]?.keterangan ?? "", ZONA.ketWrapWidth)
      .slice(0, ZONA.ketMaxLines[i]);
    lines.forEach((line: string, j: number) => {
      doc.text(line, ZONA.ketX, Y(ZONA.ketBaseY[i] - j * ZONA.ketLineHeight));
    });
  }

  if (data.ringkasan.trim()) {
    doc.setFont("times", "italic");
    doc.setFontSize(ZONA.ringkasan.fs);
    const lines = doc
      .splitTextToSize(data.ringkasan.trim(), ZONA.ringkasan.wrapWidth)
      .slice(0, 4);
    lines.forEach((line: string, j: number) => {
      doc.text(line, ZONA.ringkasan.x, Y(ZONA.ringkasan.y - j * ZONA.ringkasan.lineHeight));
    });
  }

  // ===== HALAMAN 2-3 (lampiran tata cara daftar ulang & infografis — statis) =====
  await tampil(2);
  await tampil(3);

  const filename = `Surat Kelulusan PSB 2027-2028 ${data.namaLengkap}.pdf`;
  return { buffer: Buffer.from(doc.output("arraybuffer")), filename };
}

export async function generateSuratPengumumanHasil(
  data: SuratPengumumanData
): Promise<{ buffer: Buffer; filename: string }> {
  return generateSuratDariTemplate(data);
}
