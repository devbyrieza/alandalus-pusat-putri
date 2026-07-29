-- Add email column to profiles table
ALTER TABLE "profiles" ADD COLUMN IF NOT EXISTS "email" VARCHAR(255);

-- Optional: Create index for email searches
CREATE INDEX IF NOT EXISTS "profiles_email_idx" ON "profiles" ("email");
