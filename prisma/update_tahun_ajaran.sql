UPDATE tahun_ajaran
SET nama = '2026/2027',
    tahun_mulai = 2026,
    tahun_selesai = 2027,
    is_active = true,
    tanggal_buka_pendaftaran = '2026-02-16',
    tanggal_tutup_pendaftaran = '2026-06-30',
    updated_at = NOW()
WHERE is_active = true;
