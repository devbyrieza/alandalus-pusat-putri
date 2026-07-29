-- Migration: add indexes to speed up location filters
-- Date: 2026-01-31

-- NOTE: CREATE INDEX CONCURRENTLY cannot run inside a transaction.
-- Run these statements in Supabase SQL editor or via psql with autocommit.

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_pendaftar_provinsi ON pendaftar (provinsi);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_pendaftar_kabupaten ON pendaftar (kabupaten);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_pendaftar_kecamatan ON pendaftar (kecamatan);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_pendaftar_kelurahan ON pendaftar (kelurahan);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_pendaftar_tahun_ajaran ON pendaftar (tahun_ajaran_id);

-- Composite indexes for common filter combinations (optional)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_pendaftar_prov_kab ON pendaftar (provinsi, kabupaten);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_pendaftar_kab_kec ON pendaftar (kabupaten, kecamatan);
