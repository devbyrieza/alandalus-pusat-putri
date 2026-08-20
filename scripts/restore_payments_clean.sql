BEGIN;
INSERT INTO pembayaran (
  pendaftar_id,
  tahun_ajaran_id,
  metode_pembayaran,
  jenis_pembayaran,
  tipe_cicilan,
  jumlah,
  bukti_transfer_path,
  bukti_transfer_filename,
  status_pembayaran,
  created_at,
  updated_at
) VALUES (
  '439d5b81-2c53-42ac-872c-f6983088b999',
  '33acea8f-5049-4a0a-a064-ede3db6d133f',
  'manual',
  'PENDAFTARAN'::"JenisPembayaran",
  'LUNAS'::"TipeCicilan",
  200000,
  'bukti-pembayaran/439d5b81-2c53-42ac-872c-f6983088b999/bukti-pendaftaran-1771917391862.jpg',
  'bukti-pendaftaran-1771917391862.jpg',
  'pending',
  NOW(),
  NOW()
);

INSERT INTO pembayaran (
  pendaftar_id,
  tahun_ajaran_id,
  metode_pembayaran,
  jenis_pembayaran,
  tipe_cicilan,
  jumlah,
  bukti_transfer_path,
  bukti_transfer_filename,
  status_pembayaran,
  created_at,
  updated_at
) VALUES (
  'c92cffea-590c-40ba-9263-c793ba207d57',
  '33acea8f-5049-4a0a-a064-ede3db6d133f',
  'manual',
  'PENDAFTARAN'::"JenisPembayaran",
  'LUNAS'::"TipeCicilan",
  200000,
  'bukti-pembayaran/c92cffea-590c-40ba-9263-c793ba207d57/bukti-transfer-1771554043817.jpg',
  'bukti-transfer-1771554043817.jpg',
  'pending',
  NOW(),
  NOW()
);
COMMIT;
