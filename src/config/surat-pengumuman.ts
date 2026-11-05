/**
 * Konfigurasi Surat Pengumuman Kelulusan PSB — Al-Andalus Putri
 * Format mengacu surat resmi: <SEQ>/PSB/<ROMAWI>/<TA-COMPACT>
 * Contoh: 001/PSB/X/2728 (SEQ urut angka 3 digit, TA compact 2728 = 2027/2028)
 * CATATAN: PDF asli panitia tertulis "IX/2787" — diduga typo panitia; sistem
 * memakai 2728. Ubah di sini bila panitia mengonfirmasi format lain.
 * Ubah teks di sini (bukan di generator) bila kebijakan panitia berubah.
 */
export const SURAT_PENGUMUMAN_CONFIG = {
  nomorSuffix: "PSB", // <SEQ>/PSB/<ROMAWI>/<TA>
  taCompact: "2728",
  kota: "Bogor",
  jenjangDefault: "SMP IT Putri",
  kelasDiterimaDefault: "VII",
  ketuaPanitia: "Muhammad Falah, B.Sh.",
  kodeAkademik: "5680",
  namaBank: "Pesantren Al-Andalus Putri",
  // Aset tanda tangan (null = sudah ada di background template, tidak digambar ulang)
  signatureImage: null as string | null,
  stampImage: null as string | null,
};
