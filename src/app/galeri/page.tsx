"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Images,
  ArrowRight,
  X,
  Building,
  Home,
  Beaker,
  Utensils,
  Sparkles,
  Maximize2,
  CalendarCheck,
  Landmark
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { BRANDING } from "@/config/branding";

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  category: "gedung" | "masjid" | "asrama" | "lab" | "kegiatan" | "restorasi";
  categoryLabel: string;
  description: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  // 1. Gedung & Kompleks (Drone & Gerbang)
  { id: "1", src: "/images/DJI_0038.JPG", title: "Kompleks Kampus Putri dari Udara", category: "gedung", categoryLabel: "Gedung & Kompleks", description: "Dokumentasi udara panorama kampus Al-Andalus Putri." },
  { id: "2", src: "/images/DJI_0039.JPG", title: "Area Kampus Putri (Aerial Shot)", category: "gedung", categoryLabel: "Gedung & Kompleks", description: "Tata ruang dan lingkungan asri kompleks putri." },
  { id: "3", src: "/images/DJI_0046.JPG", title: "Kompleks Bangunan Putri", category: "gedung", categoryLabel: "Gedung & Kompleks", description: "Gedung-gedung terpadu di kawasan santriwati." },
  { id: "4", src: "/images/DJI_0529.JPG", title: "Pemandangan Udara Kampus", category: "gedung", categoryLabel: "Gedung & Kompleks", description: "Lingkungan hijau dan asri di sekitar area putri." },
  { id: "5", src: "/images/DJI_0543.JPG", title: "Zona Belajar & Asrama", category: "gedung", categoryLabel: "Gedung & Kompleks", description: "Kawasan terpadu kegiatan harian santriwati." },
  { id: "6", src: "/images/DJI_0544.JPG", title: "Panorama Kompleks Pesantren", category: "gedung", categoryLabel: "Gedung & Kompleks", description: "Fasilitas kampus terpadu dari ketinggian." },
  { id: "7", src: "/images/DJI_0590.JPG", title: "Halaman & Area Terbuka", category: "gedung", categoryLabel: "Gedung & Kompleks", description: "Halaman terbuka untuk berbagai agenda santriwati." },
  { id: "8", src: "/images/DJI_0600.JPG", title: "Kawasan Al-Andalus Putri", category: "gedung", categoryLabel: "Gedung & Kompleks", description: "Dokumentasi visual lingkungan pesantren." },
  { id: "9", src: "/images/Gerbang_01.JPG", title: "Gerbang Utama Kampus Putri", category: "gedung", categoryLabel: "Gedung & Kompleks", description: "Akses gerbang masuk utama kawasan santriwati." },
  { id: "10", src: "/images/Gerbang_02.JPG", title: "Area Gerbang Masuk", category: "gedung", categoryLabel: "Gedung & Kompleks", description: "Pintu gerbang dengan arsitektur khas Andalus." },
  { id: "11", src: "/images/Gerbang_03.JPG", title: "Akses Keamanan Gerbang", category: "gedung", categoryLabel: "Gedung & Kompleks", description: "Pos keamanan dan gerbang terpadu 24 jam." },
  { id: "12", src: "/images/Gerbang_04.JPG", title: "Gerbang & Lingkungan Depan", category: "gedung", categoryLabel: "Gedung & Kompleks", description: "Suasana pintu masuk area pesantren putri." },
  { id: "13", src: "/images/Gedung_01.jpg", title: "Gedung Fasilitas Putri", category: "gedung", categoryLabel: "Gedung & Kompleks", description: "Bangunan representatif penunjang aktivitas santriwati." },
  { id: "14", src: "/images/Gedung_04.jpg", title: "Gedung Penunjang Kampus", category: "gedung", categoryLabel: "Gedung & Kompleks", description: "Fasilitas gedung di area pesantren putri." },
  { id: "15", src: "/images/Gedung_06.JPG", title: "Area Gedung Kampus", category: "gedung", categoryLabel: "Gedung & Kompleks", description: "Lingkungan bersih dan tertata rapi di area putri." },
  { id: "16", src: "/images/Gedung_07.JPG", title: "Bangunan Fasilitas Santriwati", category: "gedung", categoryLabel: "Gedung & Kompleks", description: "Infrastruktur gedung pesantren putri." },

  // 2. Masjid Area Putri
  { id: "20", src: "/images/Masjid Bawah_01.jpg", title: "Masjid Area Putri (Tampak Depan)", category: "masjid", categoryLabel: "Masjid Area Putri", description: "Pusat ibadah dan kajian harian santriwati." },
  { id: "21", src: "/images/Masjid Bawah_02.jpg", title: "Masjid Area Putri (Sisi Halaman)", category: "masjid", categoryLabel: "Masjid Area Putri", description: "Lingkungan sekitar masjid khusus santriwati." },
  { id: "22", src: "/images/Masjid Bawah_03.jpg", title: "Bangunan Masjid Area Putri", category: "masjid", categoryLabel: "Masjid Area Putri", description: "Fasilitas peribadatan dan tarbiyah santriwati." },
  { id: "23", src: "/images/Masjid Bawah_04.jpg", title: "Halaman Masjid Area Putri", category: "masjid", categoryLabel: "Masjid Area Putri", description: "Akses dan pelataran masjid di kawasan putri." },
  { id: "24", src: "/images/Masjid Bawah_05.jpg", title: "Masjid & Area Sekitar", category: "masjid", categoryLabel: "Masjid Area Putri", description: "Tempat ibadah yang tenang dan representatif." },

  // 3. Asrama & Lapangan Panahan
  { id: "30", src: "/images/Gedung_05.JPG", title: "Gedung Asrama & Area Lapangan Panahan", category: "asrama", categoryLabel: "Asrama & Panahan", description: "Gedung asrama dengan area sasaran panahan santriwati." },
  { id: "31", src: "/images/Gedung_02.jpg", title: "Kompleks Gedung Asrama Putri", category: "asrama", categoryLabel: "Asrama & Panahan", description: "Hunian asrama santriwati yang nyaman dan kondusif." },
  { id: "32", src: "/images/Gedung_03.jpg", title: "Lingkungan Asrama Santriwati", category: "asrama", categoryLabel: "Asrama & Panahan", description: "Area lingkungan asrama putri yang asri dan aman." },

  // 4. Laboratorium IPA (Hanya yang benar-benar foto Lab)
  { id: "40", src: "/images/Lab IPA_01.JPG", title: "Laboratorium IPA (Ruang Praktikum)", category: "lab", categoryLabel: "Laboratorium IPA", description: "Meja praktikum dan peralatan sains untuk praktikum santriwati." },
  { id: "41", src: "/images/Lab IPA_02.JPG", title: "Laboratorium IPA (Alat Peraga & Riset)", category: "lab", categoryLabel: "Laboratorium IPA", description: "Fasilitas alat peraga biologi, kimia, dan fisika modern." },
  { id: "42", src: "/images/Lab IPA_03.JPG", title: "Laboratorium IPA (Sudut Laboratorium)", category: "lab", categoryLabel: "Laboratorium IPA", description: "Sarana pembelajaran sains dan eksperimen akademik." },

  // 5. Kegiatan Santriwati (Thobur Shobah & Upacara)
  { id: "50", src: "/images/Thobur Shobah_01.JPG", title: "Thobur Shobah (Apel Pagi Santriwati)", category: "kegiatan", categoryLabel: "Kegiatan Santriwati", description: "Kegiatan rutin apel pagi pembinaan kedisiplinan dan adab." },
  { id: "51", src: "/images/Thobur Shobah_02.JPG", title: "Thobur Shobah (Pengarahan Pagi)", category: "kegiatan", categoryLabel: "Kegiatan Santriwati", description: "Pengarahan dan nasehat harian bersama asatidzah." },
  { id: "52", src: "/images/Thobur Shobah_03.JPG", title: "Barisan Santriwati Thobur Shobah", category: "kegiatan", categoryLabel: "Kegiatan Santriwati", description: "Kerapian dan keteraturan barisan santriwati setiap pagi." },
  { id: "53", src: "/images/Thobur Shobah_04.JPG", title: "Dokumentasi Apel Pagi", category: "kegiatan", categoryLabel: "Kegiatan Santriwati", description: "Kesiapan santriwati mengawali aktivitas belajar harian." },
  { id: "54", src: "/images/Thobur Shobah_05.JPG", title: "Thobur Shobah di Halaman", category: "kegiatan", categoryLabel: "Kegiatan Santriwati", description: "Pembiasaan kedisiplinan dan pembentukan karakter santriwati." },
  { id: "55", src: "/images/Thobur Shobah_06.JPG", title: "Suasana Apel Pagi Santriwati", category: "kegiatan", categoryLabel: "Kegiatan Santriwati", description: "Kebersamaan dan ukhuwah santriwati di pagi hari." },
  { id: "56", src: "/images/Thobur Shobah_07.JPG", title: "Thobur Shobah Santriwati", category: "kegiatan", categoryLabel: "Kegiatan Santriwati", description: "Kegiatan harian penanaman tata tertib dan motivasi." },
  { id: "57", src: "/images/Thobur Shobah_08.JPG", title: "Aktivitas Pagi Santriwati", category: "kegiatan", categoryLabel: "Kegiatan Santriwati", description: "Momen pengarahan pagi santriwati Al-Andalus." },
  { id: "58", src: "/images/Thobur Shobah_09.JPG", title: "Thobur Shobah Bersama Asatidzah", category: "kegiatan", categoryLabel: "Kegiatan Santriwati", description: "Pendampingan ustadzah dalam apel pagi santriwati." },
  { id: "59", src: "/images/Upacara 17 Agustus_01.JPG", title: "Upacara Santriwati (Persiapan Barisan)", category: "kegiatan", categoryLabel: "Kegiatan Santriwati", description: "Persiapan barisan santriwati pada upacara bendera." },
  { id: "60", src: "/images/Upacara 17 Agustus_02.JPG", title: "Upacara Santriwati (Khidmat & Tertib)", category: "kegiatan", categoryLabel: "Kegiatan Santriwati", description: "Pelaksanaan upacara peringatan hari kemerdekaan." },
  { id: "61", src: "/images/Upacara 17 Agustus_03.JPG", title: "Suasana Upacara Santriwati", category: "kegiatan", categoryLabel: "Kegiatan Santriwati", description: "Santriwati berbaris rapi mengikuti jalannya upacara." },
  { id: "62", src: "/images/Upacara 17 Agustus_04.JPG", title: "Upacara Santriwati (Foto Udara)", category: "kegiatan", categoryLabel: "Kegiatan Santriwati", description: "Formasi barisan santriwati dari ketinggian udara." },
  { id: "63", src: "/images/Upacara 17 Agustus_05.JPG", title: "Dokumentasi Upacara Bendera", category: "kegiatan", categoryLabel: "Kegiatan Santriwati", description: "Penanaman jiwa nasionalisme dan disiplin santriwati." },
  { id: "64", src: "/images/Upacara 17 Agustus_06.JPG", title: "Barisan Upacara Santriwati", category: "kegiatan", categoryLabel: "Kegiatan Santriwati", description: "Kekhidmatan jalannya prosesi upacara di lapangan putri." },
  { id: "65", src: "/images/Upacara 17 Agustus_07.JPG", title: "Upacara Santriwati di Halaman Kampus", category: "kegiatan", categoryLabel: "Kegiatan Santriwati", description: "Kegiatan upacara bendera santriwati Al-Andalus Putri." },
  { id: "66", src: "/images/Upacara 17 Agustus_08.JPG", title: "Formasi Rapi Upacara Santriwati", category: "kegiatan", categoryLabel: "Kegiatan Santriwati", description: "Keteraturan santriwati saat mengikuti jalannya upacara." },

  // 6. Restorasi & Ruang Makan (Math'am)
  { id: "70", src: "/images/Matham_01.jpg", title: "Ruang Makan Santriwati (Math'am)", category: "restorasi", categoryLabel: "Ruang Makan (Math'am)", description: "Ruang makan bersih dan higienis khusus santriwati." },
  { id: "71", src: "/images/Matham_02.jpg", title: "Fasilitas Restorasi Math'am", category: "restorasi", categoryLabel: "Ruang Makan (Math'am)", description: "Area penyajian makan dengan standar kebersihan terjaga." },
  { id: "72", src: "/images/restorasi.jpg", title: "Area Restorasi Santriwati", category: "restorasi", categoryLabel: "Ruang Makan (Math'am)", description: "Layanan makan bergizi seimbang untuk santriwati harian." },
];

const CATEGORIES = [
  { key: "semua", label: "Semua Foto", icon: Images },
  { key: "gedung", label: "Gedung & Kompleks", icon: Building },
  { key: "masjid", label: "Masjid Area Putri", icon: Landmark },
  { key: "asrama", label: "Asrama & Panahan", icon: Home },
  { key: "lab", label: "Laboratorium IPA", icon: Beaker },
  { key: "kegiatan", label: "Kegiatan Santriwati", icon: CalendarCheck },
  { key: "restorasi", label: "Ruang Makan (Math'am)", icon: Utensils },
];

export default function GaleriPage() {
  const [activeCategory, setActiveCategory] = useState<string>("semua");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredItems =
    activeCategory === "semua"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 py-16">
      {/* HEADER SECTION */}
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-400 text-sm font-semibold tracking-wide"
          >
            <Sparkles className="w-4 h-4" />
            <span>DOKUMENTASI FOTO AL-ANDALUS PUTRI</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-2xl sm:text-3xl lg:text-5xl font-extrabold tracking-tight text-white"
          >
            Galeri Pesantren & Fasilitas <br />
            <span className="bg-gradient-to-r from-primary-400 to-pink-300 bg-clip-text text-transparent">
              {BRANDING.schoolName}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-lg"
          >
            Dokumentasi resmi sarana gedung, masjid, laboratorium, asrama, dan kegiatan harian santriwati.
          </motion.p>
        </div>

        {/* CATEGORY FILTER TABS */}
        <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 mb-12">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 border cursor-pointer ${
                  isActive
                    ? "bg-primary-500 text-white border-primary-400 shadow-lg shadow-primary-500/25 scale-105"
                    : "bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-800"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* GALLERY GRID */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedImage(item)}
                className="group relative cursor-pointer rounded-xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-primary-500/50 shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 border border-slate-800 text-xs font-semibold text-primary-400">
                    {item.categoryLabel}
                  </div>

                  <div className="absolute top-3 right-3 p-2 rounded-full bg-slate-950/80 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-5 space-y-1">
                  <h3 className="font-bold text-lg text-white group-hover:text-primary-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA BOTTOM SECTION */}
        <div className="mt-20 p-8 rounded-xl bg-gradient-to-r from-primary-950/60 via-slate-900 to-pink-950/60 border border-primary-500/30 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Ingin Kunjungan Langsung ke Pesantren Putri?
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Daftar PPDB Online sekarang atau hubungi tim administrasi kami untuk mengonfirmasi jadwal kunjungan santriwati.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/ppdb"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-500 hover:bg-primary-400 text-white font-bold shadow-lg shadow-primary-500/25 transition-all"
            >
              <span>Daftar PPDB Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/program"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold border border-slate-700 transition-all"
            >
              <span>Lihat Program Pendidikan</span>
            </Link>
          </div>
        </div>
      </Container>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 p-3 rounded-full bg-slate-950/80 hover:bg-primary-500 text-white hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/10] w-full bg-slate-950">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-contain"
                  priority
                />
              </div>

              <div className="p-6 bg-slate-900 border-t border-slate-800 space-y-2">
                <div className="inline-block px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-400 text-xs font-semibold">
                  {selectedImage.categoryLabel}
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {selectedImage.title}
                </h3>
                <p className="text-slate-300">
                  {selectedImage.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
