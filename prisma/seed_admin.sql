INSERT INTO profiles (id, role, full_name, email, phone, password_hash, created_at, updated_at)
VALUES (
  uuid_generate_v4(),
  'head_of_it',
  'Head of IT',
  'headit@pesantren-alimam.com',
  '085111524441',
  '$2b$10$QKGWl5Gl0k4SKBugHpnJx..z4AkpP3N1YrFhtURhZfvtdvJAA/UOa',
  NOW(),
  NOW()
);