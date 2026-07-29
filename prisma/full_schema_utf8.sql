-- CreateTable
CREATE TABLE "profiles" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "role" TEXT NOT NULL DEFAULT 'pendaftar',
    "full_name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "password_hash" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tahun_ajaran" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "tahun_mulai" INTEGER NOT NULL,
    "tahun_selesai" INTEGER NOT NULL,
    "nama" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "tanggal_buka_pendaftaran" DATE NOT NULL,
    "tanggal_tutup_pendaftaran" DATE NOT NULL,
    "biaya_pendaftaran" DECIMAL NOT NULL DEFAULT 200000.00,
    "link_tes_tertulis" TEXT,
    "deskripsi_tes_tertulis" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tahun_ajaran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pendaftar" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" UUID,
    "tahun_ajaran_id" UUID NOT NULL,
    "nomor_pendaftaran" TEXT NOT NULL,
    "nik" TEXT NOT NULL,
    "nama_lengkap" TEXT NOT NULL,
    "jenis_kelamin" TEXT NOT NULL,
    "jenjang" TEXT NOT NULL,
    "tempat_lahir" TEXT,
    "tanggal_lahir" DATE,
    "alamat" TEXT,
    "rt" TEXT,
    "rw" TEXT,
    "kelurahan" TEXT,
    "kecamatan" TEXT,
    "kabupaten" TEXT,
    "provinsi" TEXT,
    "kode_pos" TEXT,
    "no_hp" TEXT,
    "email" TEXT,
    "asal_sekolah" TEXT,
    "npsn" TEXT,
    "alamat_sekolah" TEXT,
    "tahun_lulus" INTEGER,
    "nisn" TEXT,
    "golongan_darah" TEXT,
    "anak_ke" INTEGER,
    "jumlah_saudara" INTEGER,
    "hobi" TEXT,
    "cita_cita" TEXT,
    "sumber_informasi" TEXT,
    "jumlah_hafalan" TEXT,
    "status_pendaftaran" TEXT NOT NULL DEFAULT 'draft',
    "data_lengkap" JSONB,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "verifikasi_channel" VARCHAR(20) DEFAULT 'whatsapp_manual',
    "kode_verifikasi" VARCHAR(6),
    "waktu_kirim_kode" TIMESTAMPTZ(6),
    "waktu_verifikasi_kode" TIMESTAMPTZ(6),
    "verifikasi_status" VARCHAR(20) DEFAULT 'pending',
    "notifikasi_whatsapp_id" VARCHAR(100),
    "notifikasi_sms_id" VARCHAR(100),

    CONSTRAINT "pendaftar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orang_tua" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "pendaftar_id" UUID NOT NULL,
    "nama_ayah" TEXT,
    "nik_ayah" TEXT,
    "tempat_lahir_ayah" TEXT,
    "tanggal_lahir_ayah" DATE,
    "pendidikan_ayah" TEXT,
    "pekerjaan_ayah" TEXT,
    "penghasilan_ayah" TEXT,
    "no_hp_ayah" TEXT,
    "status_ayah" TEXT,
    "status_pernikahan_ayah" TEXT,
    "alamat_ayah" TEXT,
    "email_ayah" TEXT,
    "nama_ibu" TEXT,
    "nik_ibu" TEXT,
    "tempat_lahir_ibu" TEXT,
    "tanggal_lahir_ibu" DATE,
    "pendidikan_ibu" TEXT,
    "pekerjaan_ibu" TEXT,
    "penghasilan_ibu" TEXT,
    "no_hp_ibu" TEXT,
    "status_ibu" TEXT,
    "status_pernikahan_ibu" TEXT,
    "alamat_ibu" TEXT,
    "email_ibu" TEXT,
    "nama_wali" TEXT,
    "nik_wali" TEXT,
    "tempat_lahir_wali" TEXT,
    "tanggal_lahir_wali" DATE,
    "pendidikan_wali" TEXT,
    "pekerjaan_wali" TEXT,
    "penghasilan_wali" TEXT,
    "no_hp_wali" TEXT,
    "alamat_wali" TEXT,
    "rt_wali" TEXT,
    "rw_wali" TEXT,
    "kelurahan_wali" TEXT,
    "kecamatan_wali" TEXT,
    "kabupaten_wali" TEXT,
    "provinsi_wali" TEXT,
    "kode_pos_wali" TEXT,
    "hubungan_wali" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orang_tua_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dokumen" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "pendaftar_id" UUID NOT NULL,
    "jenis_dokumen" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "file_path" TEXT NOT NULL,
    "file_size" INTEGER,
    "file_type" TEXT,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "verified_by" UUID,
    "verified_at" TIMESTAMPTZ(6),
    "catatan" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dokumen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pembayaran" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "pendaftar_id" UUID NOT NULL,
    "tahun_ajaran_id" UUID NOT NULL,
    "metode_pembayaran" TEXT NOT NULL,
    "jumlah" DECIMAL NOT NULL,
    "midtrans_order_id" TEXT,
    "midtrans_transaction_id" TEXT,
    "midtrans_transaction_status" TEXT,
    "midtrans_payment_type" TEXT,
    "midtrans_response_json" JSONB,
    "bukti_transfer_path" TEXT,
    "bukti_transfer_filename" TEXT,
    "status_pembayaran" TEXT NOT NULL DEFAULT 'pending',
    "verified_by" UUID,
    "verified_at" TIMESTAMPTZ(6),
    "catatan_verifikasi" TEXT,
    "expired_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pembayaran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jadwal_ujian" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "tahun_ajaran_id" UUID NOT NULL,
    "pendaftar_id" UUID NOT NULL,
    "exam_session_id" UUID,
    "tanggal_ujian" DATE NOT NULL,
    "metode_ujian" TEXT NOT NULL DEFAULT 'offline',
    "google_meet_link" TEXT,
    "google_meet_password" TEXT,
    "waktu_mulai_santri" TIME(6) NOT NULL,
    "waktu_selesai_santri" TIME(6) NOT NULL,
    "tempat_santri" TEXT NOT NULL,
    "ruangan_santri" TEXT,
    "penguji_santri_id" UUID,
    "status_santri" TEXT DEFAULT 'scheduled',
    "penguji_quran_id" UUID,
    "status_quran" TEXT DEFAULT 'scheduled',
    "status_online_test" TEXT DEFAULT 'pending',
    "online_test_link" TEXT,
    "waktu_mulai_ortu" TIME(6) NOT NULL,
    "waktu_selesai_ortu" TIME(6) NOT NULL,
    "tempat_ortu" TEXT NOT NULL,
    "ruangan_ortu" TEXT,
    "penguji_ortu_id" UUID,
    "status_ortu" TEXT DEFAULT 'scheduled',
    "catatan" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "jadwal_ujian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exam_sessions" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "title" TEXT,
    "start_time" TIMESTAMPTZ(6) NOT NULL,
    "end_time" TIMESTAMPTZ(6) NOT NULL,
    "quota" INTEGER NOT NULL DEFAULT 10,
    "booked_count" INTEGER NOT NULL DEFAULT 0,
    "location" TEXT,
    "notes" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_by" UUID,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "exam_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nilai_ujian" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "jadwal_ujian_id" UUID,
    "pendaftar_id" UUID NOT NULL,
    "nilai_tes_tertulis" JSONB,
    "nilai_tes_tertulis_total" DECIMAL,
    "catatan_tes_tertulis" TEXT,
    "nilai_wawancara_santri" DECIMAL,
    "nilai_santri_total" DECIMAL,
    "catatan_santri" TEXT,
    "input_by_santri" UUID,
    "input_at_santri" TIMESTAMPTZ(6),
    "nilai_tes_quran" DECIMAL,
    "catatan_quran" TEXT,
    "input_by_quran" UUID,
    "input_at_quran" TIMESTAMPTZ(6),
    "nilai_wawancara_ortu" DECIMAL,
    "catatan_ortu" TEXT,
    "input_by_ortu" UUID,
    "input_at_ortu" TIMESTAMPTZ(6),
    "nilai_total" DECIMAL,
    "catatan_umum" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nilai_ujian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pengumuman" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "pendaftar_id" UUID NOT NULL,
    "tahun_ajaran_id" UUID NOT NULL,
    "status_kelulusan" TEXT NOT NULL,
    "ranking" INTEGER,
    "catatan" TEXT,
    "surat_pengumuman_path" TEXT,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "published_at" TIMESTAMPTZ(6),
    "published_by" UUID,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pengumuman_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "data_rapor" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "pendaftar_id" UUID NOT NULL,
    "semester" INTEGER NOT NULL,
    "pai" DECIMAL(5,2),
    "pkn" DECIMAL(5,2),
    "bahasa_indonesia" DECIMAL(5,2),
    "bahasa_arab" DECIMAL(5,2),
    "bahasa_inggris" DECIMAL(5,2),
    "matematika" DECIMAL(5,2),
    "ipa" DECIMAL(5,2),
    "ips" DECIMAL(5,2),
    "seni_budaya" DECIMAL(5,2),
    "pjok" DECIMAL(5,2),
    "prakarya" DECIMAL(5,2),
    "rata_rata" DECIMAL(5,2),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "data_rapor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "data_prestasi" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "pendaftar_id" UUID NOT NULL,
    "jenis_prestasi" TEXT NOT NULL,
    "tingkat" TEXT NOT NULL,
    "nama_prestasi" TEXT NOT NULL,
    "penyelenggara" TEXT,
    "tahun" INTEGER NOT NULL,
    "juara" TEXT,
    "file_sertifikat_path" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "data_prestasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "data_kesehatan" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "pendaftar_id" UUID NOT NULL,
    "tinggi_badan" INTEGER,
    "berat_badan" DECIMAL(5,2),
    "riwayat_penyakit" TEXT,
    "penyakit_kronis" TEXT,
    "alergi" TEXT,
    "disabilitas" TEXT,
    "hbsag_result" TEXT,
    "hbsag_test_date" DATE,
    "status_imunisasi" TEXT,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "verified_by" UUID,
    "verified_at" TIMESTAMPTZ(6),
    "catatan_petugas" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "data_kesehatan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "data_asrama" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "pendaftar_id" UUID NOT NULL,
    "pilihan_asrama" BOOLEAN NOT NULL DEFAULT true,
    "bersedia_cabang" BOOLEAN NOT NULL DEFAULT false,
    "pilihan_cabang" TEXT,
    "preferensi_teman_sekamar" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "data_asrama_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservasi_psb" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "pendaftar_id" UUID NOT NULL,
    "tahun_ajaran_id" UUID NOT NULL,
    "tanggal_kedatangan" DATE NOT NULL,
    "jumlah_penginap" INTEGER NOT NULL DEFAULT 0,
    "data_penginap" JSONB,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "catatan" TEXT,
    "approved_by" UUID,
    "approved_at" TIMESTAMPTZ(6),
    "catatan_approval" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reservasi_psb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "data_perubahan_request" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "pendaftar_id" UUID NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "reason" TEXT,
    "admin_note" TEXT,
    "requested_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approved_at" TIMESTAMPTZ(6),
    "submitted_at" TIMESTAMPTZ(6),
    "completed_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "data_perubahan_request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "otp_verifications" (
    "id" UUID NOT NULL,
    "phone" TEXT NOT NULL,
    "otp_hash" TEXT NOT NULL,
    "expires_at" TIMESTAMPTZ(6) NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "verified_at" TIMESTAMPTZ(6),
    "otp_channel" TEXT,
    "registration_data" JSONB,
    "status" TEXT DEFAULT 'pending',
    "sent_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "otp_verifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pending_sms" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "phone" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "nama" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pending_sms_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pendaftar_nomor_pendaftaran_key" ON "pendaftar"("nomor_pendaftaran");

-- CreateIndex
CREATE UNIQUE INDEX "orang_tua_pendaftar_id_key" ON "orang_tua"("pendaftar_id");

-- CreateIndex
CREATE UNIQUE INDEX "pengumuman_pendaftar_id_key" ON "pengumuman"("pendaftar_id");

-- CreateIndex
CREATE UNIQUE INDEX "data_rapor_pendaftar_id_semester_key" ON "data_rapor"("pendaftar_id", "semester");

-- CreateIndex
CREATE UNIQUE INDEX "data_kesehatan_pendaftar_id_key" ON "data_kesehatan"("pendaftar_id");

-- CreateIndex
CREATE UNIQUE INDEX "data_asrama_pendaftar_id_key" ON "data_asrama"("pendaftar_id");

-- CreateIndex
CREATE INDEX "data_perubahan_request_pendaftar_id_idx" ON "data_perubahan_request"("pendaftar_id");

-- AddForeignKey
ALTER TABLE "pendaftar" ADD CONSTRAINT "pendaftar_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pendaftar" ADD CONSTRAINT "pendaftar_tahun_ajaran_id_fkey" FOREIGN KEY ("tahun_ajaran_id") REFERENCES "tahun_ajaran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orang_tua" ADD CONSTRAINT "orang_tua_pendaftar_id_fkey" FOREIGN KEY ("pendaftar_id") REFERENCES "pendaftar"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dokumen" ADD CONSTRAINT "dokumen_pendaftar_id_fkey" FOREIGN KEY ("pendaftar_id") REFERENCES "pendaftar"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dokumen" ADD CONSTRAINT "dokumen_verified_by_fkey" FOREIGN KEY ("verified_by") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pembayaran" ADD CONSTRAINT "pembayaran_pendaftar_id_fkey" FOREIGN KEY ("pendaftar_id") REFERENCES "pendaftar"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pembayaran" ADD CONSTRAINT "pembayaran_tahun_ajaran_id_fkey" FOREIGN KEY ("tahun_ajaran_id") REFERENCES "tahun_ajaran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pembayaran" ADD CONSTRAINT "pembayaran_verified_by_fkey" FOREIGN KEY ("verified_by") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jadwal_ujian" ADD CONSTRAINT "jadwal_ujian_tahun_ajaran_id_fkey" FOREIGN KEY ("tahun_ajaran_id") REFERENCES "tahun_ajaran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jadwal_ujian" ADD CONSTRAINT "jadwal_ujian_pendaftar_id_fkey" FOREIGN KEY ("pendaftar_id") REFERENCES "pendaftar"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jadwal_ujian" ADD CONSTRAINT "jadwal_ujian_penguji_santri_id_fkey" FOREIGN KEY ("penguji_santri_id") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jadwal_ujian" ADD CONSTRAINT "jadwal_ujian_penguji_ortu_id_fkey" FOREIGN KEY ("penguji_ortu_id") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jadwal_ujian" ADD CONSTRAINT "jadwal_ujian_penguji_quran_id_fkey" FOREIGN KEY ("penguji_quran_id") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jadwal_ujian" ADD CONSTRAINT "jadwal_ujian_exam_session_id_fkey" FOREIGN KEY ("exam_session_id") REFERENCES "exam_sessions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_sessions" ADD CONSTRAINT "exam_sessions_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nilai_ujian" ADD CONSTRAINT "nilai_ujian_jadwal_ujian_id_fkey" FOREIGN KEY ("jadwal_ujian_id") REFERENCES "jadwal_ujian"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nilai_ujian" ADD CONSTRAINT "nilai_ujian_pendaftar_id_fkey" FOREIGN KEY ("pendaftar_id") REFERENCES "pendaftar"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nilai_ujian" ADD CONSTRAINT "nilai_ujian_input_by_santri_fkey" FOREIGN KEY ("input_by_santri") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nilai_ujian" ADD CONSTRAINT "nilai_ujian_input_by_ortu_fkey" FOREIGN KEY ("input_by_ortu") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nilai_ujian" ADD CONSTRAINT "nilai_ujian_input_by_quran_fkey" FOREIGN KEY ("input_by_quran") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pengumuman" ADD CONSTRAINT "pengumuman_pendaftar_id_fkey" FOREIGN KEY ("pendaftar_id") REFERENCES "pendaftar"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pengumuman" ADD CONSTRAINT "pengumuman_tahun_ajaran_id_fkey" FOREIGN KEY ("tahun_ajaran_id") REFERENCES "tahun_ajaran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pengumuman" ADD CONSTRAINT "pengumuman_published_by_fkey" FOREIGN KEY ("published_by") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "data_rapor" ADD CONSTRAINT "data_rapor_pendaftar_id_fkey" FOREIGN KEY ("pendaftar_id") REFERENCES "pendaftar"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "data_prestasi" ADD CONSTRAINT "data_prestasi_pendaftar_id_fkey" FOREIGN KEY ("pendaftar_id") REFERENCES "pendaftar"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "data_kesehatan" ADD CONSTRAINT "data_kesehatan_pendaftar_id_fkey" FOREIGN KEY ("pendaftar_id") REFERENCES "pendaftar"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "data_kesehatan" ADD CONSTRAINT "data_kesehatan_verified_by_fkey" FOREIGN KEY ("verified_by") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "data_asrama" ADD CONSTRAINT "data_asrama_pendaftar_id_fkey" FOREIGN KEY ("pendaftar_id") REFERENCES "pendaftar"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservasi_psb" ADD CONSTRAINT "reservasi_psb_pendaftar_id_fkey" FOREIGN KEY ("pendaftar_id") REFERENCES "pendaftar"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservasi_psb" ADD CONSTRAINT "reservasi_psb_tahun_ajaran_id_fkey" FOREIGN KEY ("tahun_ajaran_id") REFERENCES "tahun_ajaran"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservasi_psb" ADD CONSTRAINT "reservasi_psb_approved_by_fkey" FOREIGN KEY ("approved_by") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "data_perubahan_request" ADD CONSTRAINT "data_perubahan_request_pendaftar_id_fkey" FOREIGN KEY ("pendaftar_id") REFERENCES "pendaftar"("id") ON DELETE CASCADE ON UPDATE CASCADE;

