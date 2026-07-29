-- Drop the existing constraint if it exists (name might vary, but standard is profiles_role_check)
-- If it's an enum, this won't work, but based on schema string type, it's likely a check.

DO $$
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM pg_constraint 
        WHERE conname = 'profiles_role_check'
    ) THEN
        ALTER TABLE "profiles" DROP CONSTRAINT "profiles_role_check";
    END IF;
END $$;

-- Re-add constraint with all valid roles
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_role_check" 
CHECK (role IN ('pendaftar', 'admin', 'penguji', 'admin_super', 'admin_berkas', 'admin_keuangan'));
