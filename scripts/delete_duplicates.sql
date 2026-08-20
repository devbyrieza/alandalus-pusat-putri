DELETE FROM profiles a USING profiles b
WHERE a.id > b.id
AND a.email = b.email;
