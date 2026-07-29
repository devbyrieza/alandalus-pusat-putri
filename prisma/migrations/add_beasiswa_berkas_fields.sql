-- Add KTP Ibu and Surat Permohonan fields to pengajuan_beasiswa
ALTER TABLE pengajuan_beasiswa 
  ADD COLUMN IF NOT EXISTS file_ktp_ibu_path TEXT,
  ADD COLUMN IF NOT EXISTS file_permohonan_path TEXT;
