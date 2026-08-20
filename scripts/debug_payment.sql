BEGIN;
INSERT INTO pembayaran (
  pendaftar_id,
  tahun_ajaran_id,
  metode_pembayaran,
  jumlah,
  status_pembayaran
) VALUES (
  '439d5b81-2c53-42ac-872c-f6983088b999',
  '33acea8f-5049-4a0a-a064-ede33db6d133f',
  'manual',
  200000,
  'pending'
);
COMMIT;
