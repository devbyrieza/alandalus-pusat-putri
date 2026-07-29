INSERT INTO tahun_ajaran (id, tahun_mulai, tahun_selesai, nama, is_active, tanggal_buka_pendaftaran, tanggal_tutup_pendaftaran, biaya_pendaftaran, created_at, updated_at)
VALUES (
  uuid_generate_v4(),
  2025,
  2026,
  '2025/2026',
  true,
  '2025-01-01',
  '2026-06-30',
  200000.00,
  NOW(),
  NOW()
);
