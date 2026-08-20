-- =============================================
-- SCRIPT: CEK NIK PENDAFTAR DI PRODUCTION
-- =============================================
-- Cara pakai:
-- 1. SSH ke VPS: ssh root@72.61.141.50
-- 2. Jalankan: psql -U postgres -d ppdb_alimam -f cek-nik-pendaftar.sql
-- =============================================

\echo ''
\echo '============================================='
\echo '🔍 CEK NIK PENDAFTAR DI PRODUCTION'
\echo '============================================='
\echo ''

-- Tampilkan header
\echo '📋 Data 3 Pendaftar yang Dicari:'
\echo ''

-- Query utama
SELECT 
    nama_lengkap as "Nama Lengkap",
    nomor_pendaftaran as "No. Pendaftaran",
    nik as "NIK (16 digit)",
    jenis_kelamin as "L/P",
    jenjang as "Jenjang",
    no_hp as "No. HP",
    email as "Email",
    status_pendaftaran as "Status",
    to_char(created_at, 'DD Mon YYYY') as "Tgl Daftar"
FROM pendaftar
WHERE 
    nama_lengkap ILIKE '%Azzam%' 
    OR nama_lengkap ILIKE '%Raylan%'
    OR nama_lengkap ILIKE '%Sukari%'
ORDER BY nama_lengkap;

\echo ''
\echo '============================================='
\echo '📊 Status Login (Profile Linked):'
\echo '============================================='
\echo ''

SELECT 
    nama_lengkap as "Nama",
    nomor_pendaftaran as "No. Reg",
    nik as "NIK",
    CASE 
        WHEN user_id IS NOT NULL THEN '✅ Bisa Login'
        ELSE '❌ Tidak Bisa Login (No Profile)'
    END as "Status Login"
FROM pendaftar
WHERE 
    nama_lengkap ILIKE '%Azzam%' 
    OR nama_lengkap ILIKE '%Raylan%'
    OR nama_lengkap ILIKE '%Sukari%'
ORDER BY nama_lengkap;

\echo ''
\echo '============================================='
\echo '💡 COPY NIK INI UNTUK UPDATE SCRIPT:'
\echo '============================================='
\echo ''

-- Generate UPDATE statements
SELECT 
    'UPDATE pendaftar SET nik = ''' || nik || ''' WHERE nomor_pendaftaran = ''' || nomor_pendaftaran || ''';' as "Copy untuk Update"
FROM pendaftar
WHERE 
    nama_lengkap ILIKE '%Azzam%' 
    OR nama_lengkap ILIKE '%Raylan%'
    OR nama_lengkap ILIKE '%Sukari%'
ORDER BY nama_lengkap;

\echo ''
\echo '============================================='
\echo '✅ SELESAI'
\echo '============================================='
\echo ''
