-- Check enum type name in database
SELECT typname FROM pg_type WHERE typtype = 'e';
