-- Insert Adib unified account
INSERT INTO profiles (id, full_name, email, password_hash, role, secondary_roles, phone, created_at, updated_at)
SELECT
    gen_random_uuid(),
    'Muhammad Adib Achsan',
    'adib@alimam.com',
    '$2b$10$HmEL2mNYSIFeM5bUOf4vJuNpg2b6mls9o4V1AKOuCXpFQ4gyNvtPG',
    'admin_berkas',
    ARRAY['pewawancara_cawalsan'],
    '-',
    NOW(),
    NOW()
WHERE NOT EXISTS (SELECT 1 FROM profiles WHERE email = 'adib@alimam.com');

UPDATE profiles SET
    password_hash = '$2b$10$HmEL2mNYSIFeM5bUOf4vJuNpg2b6mls9o4V1AKOuCXpFQ4gyNvtPG',
    secondary_roles = ARRAY['pewawancara_cawalsan'],
    updated_at = NOW()
WHERE email = 'adib@alimam.com';

-- Insert Bachtiar unified account
INSERT INTO profiles (id, full_name, email, password_hash, role, secondary_roles, phone, created_at, updated_at)
SELECT
    gen_random_uuid(),
    'Maulidin Bachtiar',
    'bachtiar@alimam.com',
    '$2b$10$rIq1qp0KPTk48keENjGiK.OQdHbU..JUfBOV05O/pQlOZryOxs6/G',
    'admin_keuangan',
    ARRAY['pewawancara_cawalsan'],
    '-',
    NOW(),
    NOW()
WHERE NOT EXISTS (SELECT 1 FROM profiles WHERE email = 'bachtiar@alimam.com');

UPDATE profiles SET
    password_hash = '$2b$10$rIq1qp0KPTk48keENjGiK.OQdHbU..JUfBOV05O/pQlOZryOxs6/G',
    secondary_roles = ARRAY['pewawancara_cawalsan'],
    updated_at = NOW()
WHERE email = 'bachtiar@alimam.com';

-- Verify
SELECT id, full_name, email, role, secondary_roles FROM profiles WHERE email IN ('adib@alimam.com', 'bachtiar@alimam.com');
