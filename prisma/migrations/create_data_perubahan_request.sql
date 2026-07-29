-- Migration: Create data_perubahan_request table
-- Run this on production database if not exists

CREATE TABLE IF NOT EXISTS "data_perubahan_request" (
  "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
  "pendaftar_id" UUID NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'pending',
  "reason" TEXT,
  "admin_note" TEXT,
  "requested_at" TIMESTAMPTZ(6) NOT NULL DEFAULT NOW(),
  "approved_at" TIMESTAMPTZ(6),
  "submitted_at" TIMESTAMPTZ(6),
  "completed_at" TIMESTAMPTZ(6),
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT NOW(),
  CONSTRAINT "data_perubahan_request_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "data_perubahan_request_pendaftar_id_fkey" FOREIGN KEY ("pendaftar_id") REFERENCES "pendaftar"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "data_perubahan_request_pendaftar_id_idx" ON "data_perubahan_request"("pendaftar_id");
