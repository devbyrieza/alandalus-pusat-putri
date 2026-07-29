-- Migration: create otp_verifications table
-- Date: 2026-01-31
-- Run in Supabase SQL Editor or via psql

-- Tabel OTP untuk registrasi pendaftar (Send OTP → Verify OTP → Complete)
CREATE TABLE IF NOT EXISTS otp_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone VARCHAR(20) NOT NULL,
  otp_hash VARCHAR(64) NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  attempts INT DEFAULT 0,
  otp_channel VARCHAR(20) DEFAULT 'sms',
  verified_at TIMESTAMPTZ,
  registration_data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index untuk lookup cepat
CREATE INDEX IF NOT EXISTS idx_otp_phone ON otp_verifications (phone);
CREATE INDEX IF NOT EXISTS idx_otp_expires ON otp_verifications (expires_at);
CREATE INDEX IF NOT EXISTS idx_otp_created ON otp_verifications (created_at DESC);

-- Comment
COMMENT ON TABLE otp_verifications IS 'OTP verification untuk registrasi pendaftar PPDB Al-Imam';
