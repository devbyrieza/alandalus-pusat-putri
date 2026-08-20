SELECT email, full_name, role FROM profiles 
WHERE role IN ('admin_super', 'admin_berkas', 'admin_keuangan', 'penguji') 
ORDER BY role;
