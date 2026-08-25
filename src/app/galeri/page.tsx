"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
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

// Koleksi Foto Terbaik Terpilih (Curated Best Distinct Angles)
const GALLERY_ITEMS: GalleryItem[] = [
  // 1. Gedung & Kompleks Pesantren
  {
    id: "1",
    src: "/images/DJI_0046.JPG",
    title: "Panorama Kompleks Kampus Putri (Foto Drone)",
    category: "gedung",
    categoryLabel: "Gedung & Kompleks",
    description: "Pemandangan lanskap udara kawasan terpadu dan lingkungan hijau asri Al-Andalus Putri."
  },
  {
    id: "2",
    src: "/images/Gerbang_01.JPG",
    title: "Gerbang Utama Kampus Putri",
    category: "gedung",
    categoryLabel: "Gedung & Kompleks",
    description: "Akses gerbang masuk utama dengan arsitektur gerbang megah khas Al-Andalus."
  },
  {
    id: "3",
    src: "/images/DJI_0038.JPG",
    title: "Kawasan Kompleks & Halaman Dalam (Aerial View)",
    category: "gedung",
    categoryLabel: "Gedung & Kompleks",
    description: "Tata ruang gedung pembelajaran dan halaman aktivitas santriwati dari ketinggian."
  },
  {
    id: "4",
    src: "/images/Gedung_01.jpg",
    title: "Gedung Pembelajaran Kampus Putri",
    category: "gedung",
    categoryLabel: "Gedung & Kompleks",
    description: "Infrastruktur gedung representatif penunjang aktivitas belajar santriwati."
  },

  // 2. Masjid Area Putri
  {
    id: "5",
    src: "/images/Masjid Bawah_01.jpg",
    title: "Masjid Area Putri (Tampak Depan)",
    category: "masjid",
    categoryLabel: "Masjid Area Putri",
    description: "Pusat peribadatan, halaqah tahfidz, dan kajian syar'i harian santriwati."
  },
  {
    id: "6",
    src: "/images/Masjid Bawah_04.jpg",
    title: "Pelataran & Halaman Masjid Putri",
    category: "masjid",
    categoryLabel: "Masjid Area Putri",
    description: "Akses dan pelataran masjid yang asri, tenang, dan tertata rapi."
  },

  // 3. Asrama & Fasilitas Panahan
  {
    id: "7",
    src: "/images/Gedung_05.JPG",
    title: "Gedung Asrama & Lapangan Panahan",
    category: "asrama",
    categoryLabel: "Asrama & Panahan",
    description: "Gedung asrama santriwati berpadu dengan area latihan panahan (archery)."
  },
  {
    id: "8",
    src: "/images/Gedung_02.jpg",
    title: "Kompleks Hunian Asrama Santriwati",
    category: "asrama",
    categoryLabel: "Asrama & Panahan",
    description: "Lingkungan hunian asrama yang aman, bersih, dan nyaman untuk istirahat santriwati."
  },

  // 4. Laboratorium IPA
  {
    id: "9",
    src: "/images/Lab IPA_01.JPG",
    title: "Laboratorium IPA (Ruang Praktikum Sains)",
    category: "lab",
    categoryLabel: "Laboratorium IPA",
    description: "Meja praktikum modern pendukung pembelajaran eksperimen sains santriwati."
  },
  {
    id: "10",
    src: "/images/Lab IPA_02.JPG",
    title: "Alat Peraga & Fasilitas Riset Laboratorium",
    category: "lab",
    categoryLabel: "Laboratorium IPA",
    description: "Kelengkapan alat peraga biologi, fisika, dan kimia berstandar pendidikan modern."
  },

  // 5. Kegiatan Santriwati (Upacara & Apel Pagi)
  {
    id: "11",
    src: "/images/Upacara 17 Agustus_04.JPG",
    title: "Upacara Santriwati (Formasi Barisan Udara)",
    category: "kegiatan",
    categoryLabel: "Kegiatan Santriwati",
    description: "Dokumentasi formasi barisan rapi santriwati saat upacara bendera dari foto udara."
  },
  {
    id: "12",
    src: "/images/Upacara 17 Agustus_02.JPG",
    title: "Kekhidmatan Prosesi Upacara Santriwati",
    category: "kegiatan",
    categoryLabel: "Kegiatan Santriwati",
    description: "Momen penanaman kedisiplinan, rasa cinta tanah air, dan keteraturan barisan."
  },
  {
    id: "13",
    src: "/images/Thobur Shobah_01.JPG",
    title: "Thobur Shobah (Apel Pagi & Pembinaan Adab)",
    category: "kegiatan",
    categoryLabel: "Kegiatan Santriwati",
    description: "Agenda rutin apel pagi santriwati di halaman kampus untuk pengarahan harian."
  },
  {
    id: "14",
    src: "/images/Thobur Shobah_08.JPG",
    title: "Pengarahan Pagi Santriwati Bersama Asatidzah",
    category: "kegiatan",
    categoryLabel: "Kegiatan Santriwati",
    description: "Pendampingan langsung para ustadzah dalam membentuk adab dan motivasi belajar."
  },

  // 6. Ruang Makan (Math'am)
  {
    id: "15",
    src: "/images/Matham_01.jpg",
    title: "Ruang Makan Santriwati (Math'am)",
    category: "restorasi",
    categoryLabel: "Ruang Makan (Math'am)",
    description: "Ruang makan berkapasitas besar dengan tata meja teratur dan higienis."
  },
  {
    id: "16",
    src: "/images/Matham_02.jpg",
    title: "Fasilitas Restorasi & Kebersihan Math'am",
    category: "restorasi",
    categoryLabel: "Ruang Makan (Math'am)",
    description: "Standar penyajian hidangan makan bergizi seimbang untuk santriwati setiap hari."
  }
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
            <span>DOKUMENTASI FOTO TERPILIH AL-ANDALUS PUTRI</span>
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
            Koleksi dokumentasi visual terbaik kawasan kampus, sarana masjid, laboratorium sains, asrama, dan kegiatan santriwati.
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
