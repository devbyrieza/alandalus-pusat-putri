-- =============================================
-- RESTORE 3 PENDAFTAR - MANUAL SQL SCRIPT
-- =============================================
-- Gunakan script ini jika ingin restore manual via SQL
-- Database: ppdb_alimam (Production VPS)
-- =============================================

-- 1. Cek data pendaftar yang ada
SELECT 
    id,
    nama_lengkap,
    nomor_pendaftaran,
    nik,
    user_id,
    status_pendaftaran
FROM pendaftar
WHERE nama_lengkap ILIKE '%Sukari%'
   OR nama_lengkap ILIKE '%Azzam%'
   OR nama_lengkap ILIKE '%Raylan%';

-- 2. Update NIK untuk ketiga pendaftar
-- ⚠️ UPDATE NIK DENGAN DATA ASLI!

-- Ahmad Sukari Tes
UPDATE pendaftar 
SET 
    nik = '3201000000000001', -- ⚠️ GANTI DENGAN NIK ASLI!
    no_hp = '081234567890',
    email = 'ahmad.sukari@example.com'
WHERE nama_lengkap = 'Ahmad Sukari Tes';

-- muhammad Azzam Al hafiz
UPDATE pendaftar 
SET 
    nik = '3201000000000002', -- ⚠️ GANTI DENGAN NIK ASLI!
    no_hp = '081234567891',
    email = 'azzam@example.com'
WHERE nama_lengkap ILIKE '%Azzam%';

-- Raylan Akbar
UPDATE pendaftar 
SET 
    nik = '3201000000000003', -- ⚠️ GANTI DENGAN NIK ASLI!
    no_hp = '081234567892',
    email = 'raylan@example.com'
WHERE nama_lengkap ILIKE '%Raylan%';

-- 3. Pastikan ada Profile yang terhubung
-- Cek profile yang terhubung
SELECT 
    p.id,
    p.full_name,
    p.email,
    p.phone,
    p.role,
    pd.nomor_pendaftaran
FROM profiles p
LEFT JOIN pendaftar pd ON pd.user_id = p.id
WHERE pd.nama_lengkap ILIKE '%Sukari%'
   OR pd.nama_lengkap ILIKE '%Azzam%'
   OR pd.nama_lengkap ILIKE '%Raylan%';

-- 4. Jika tidak ada profile, buat profile baru
-- ⚠️ Password hash dari NIK (bcrypt, salt 10)
-- Contoh: NIK 3201000000000001 -> hash bcrypt

-- Insert profile untuk Ahmad Sukari (jika belum ada)
INSERT INTO profiles (id, full_name, email, phone, role, password_hash)
VALUES 
    (gen_random_uuid(), 'Ahmad Sukari Tes', 'ahmad.sukari@example.com', '081234567890', 'pendaftar', '$2b$10$PLACEHOLDER_HASH'),
    (gen_random_uuid(), 'muhammad Azzam Al hafiz', 'azzam@example.com', '081234567891', 'pendaftar', '$2b$10$PLACEHOLDER_HASH'),
    (gen_random_uuid(), 'Raylan Akbar', 'raylan@example.com', '081234567892', 'pendaftar', '$2b$10$PLACEHOLDER_HASH');

-- 5. Link profile ke pendaftar
UPDATE pendaftar pd
SET user_id = p.id
FROM profiles p
WHERE pd.nama_lengkap = p.full_name
  AND pd.user_id IS NULL;

-- 6. Verifikasi hasil update
SELECT 
    pd.nama_lengkap,
    pd.nomor_pendaftaran,
    pd.nik,
    pd.no_hp,
    pd.email,
    p.email as profile_email,
    CASE 
        WHEN pd.user_id IS NOT NULL THEN '✓ Bisa Login'
        ELSE '✗ Tidak Bisa Login'
    END as status_login
FROM pendaftar pd
LEFT JOIN profiles p ON pd.user_id = p.id
WHERE pd.nama_lengkap ILIKE '%Sukari%'
   OR pd.nama_lengkap ILIKE '%Azzam%'
   OR pd.nama_lengkap ILIKE '%Raylan%'
ORDER BY pd.nama_lengkap;

-- =============================================
-- CATATAN:
-- =============================================
-- 1. Ganti NIK placeholder dengan NIK asli sebelum execute
-- 2. Password hash harus di-generate dengan bcrypt (salt 10)
-- 3. Setelah update, test login dengan:
--    - Username: Nomor Pendaftaran (contoh: A250076)
--    - Password: NIK (16 digit)
-- =============================================
