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
  Trophy,
  Home,
  Landmark,
  Beaker,
  Utensils,
  CalendarCheck,
  Sparkles,
  Maximize2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { BRANDING } from "@/config/branding";

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  category: "gedung" | "masjid" | "asrama" | "lapangan" | "lab" | "kegiatan" | "restorasi";
  categoryLabel: string;
  description: string;
  angles?: string[];
}

// Koleksi Foto Terbaik Terpilih (Multi-angle disatukan ke dalam 1 card)
const GALLERY_ITEMS: GalleryItem[] = [
  // 1. Gedung & Kompleks Pesantren
  {
    id: "1",
    src: "/images/DJI_0046.JPG",
    title: "Panorama Kawasan Pesantren Putri (Foto Drone)",
    category: "gedung",
    categoryLabel: "Gedung & Fasilitas",
    description: "Pemandangan lanskap udara kawasan terpadu dan lingkungan hijau asri Al-Andalus Putri di Jonggol Bogor."
  },
  {
    id: "2",
    src: "/images/Gerbang_01.JPG",
    title: "Gerbang Utama Pesantren Putri",
    category: "gedung",
    categoryLabel: "Gedung & Fasilitas",
    description: "Akses gerbang masuk utama dengan arsitektur gerbang megah khas Pesantren Al-Andalus."
  },

  // 2. Lapangan Olahraga
  {
    id: "3",
    src: "/images/DJI_0039.JPG",
    title: "Lapangan Olahraga Pesantren Putri",
    category: "lapangan",
    categoryLabel: "Lapangan Olahraga",
    description: "Sarana lapangan serbaguna untuk olahraga, upacara, dan kegiatan kebugaran santriwati."
  },

  // 3. Asrama & Fasilitas Panahan
  {
    id: "4",
    src: "/images/Gedung_01.jpg",
    title: "Gedung Asrama Putri & Lapangan Panahan",
    category: "asrama",
    categoryLabel: "Asrama & Panahan",
    description: "Kompleks gedung asrama santriwati berpadu dengan area latihan olahraga sunnah memanah (archery)."
  },

  // 4. Masjid Area Putri (2 Sudut Foto Disatukan)
  {
    id: "5",
    src: "/images/Masjid Bawah_04.jpg",
    title: "Masjid Area Putri",
    category: "masjid",
    categoryLabel: "Masjid Pesantren",
    description: "Pusat peribadatan, halaqah tahfidz Al-Qur'an, dan kajian syar'i harian santriwati dengan arsitektur megah dan estetika islami yang anggun.",
    angles: [
      "/images/Masjid Bawah_04.jpg",
      "/images/Masjid Bawah_01.jpg"
    ]
  },

  // 5. Laboratorium IPA
  {
    id: "6",
    src: "/images/Lab IPA_03.JPG",
    title: "Laboratorium IPA (Ruang Praktikum Sains)",
    category: "lab",
    categoryLabel: "Laboratorium IPA",
    description: "Fasilitas praktikum modern pendukung pembelajaran eksperimen sains dan riset santriwati."
  },

  // 6. Ruang Makan (Math'am - 2 Sudut Foto Disatukan)
  {
    id: "7",
    src: "/images/Matham_01.jpg",
    title: "Ruang Makan Santriwati (Math'am)",
    category: "restorasi",
    categoryLabel: "Ruang Makan (Math'am)",
    description: "Ruang makan representatif berkapasitas besar dengan tata meja teratur, bersih, dan standar penyajian hidangan higienis bergizi seimbang.",
    angles: [
      "/images/Matham_01.jpg",
      "/images/Matham_02.jpg"
    ]
  },

  // 7. Kegiatan Santriwati (2 Sudut Foto Disatukan)
  {
    id: "8",
    src: "/images/Thobur Shobah_07.JPG",
    title: "Kegiatan & Pembinaan Santriwati",
    category: "kegiatan",
    categoryLabel: "Kegiatan Santriwati",
    description: "Dokumentasi kegiatan rutin apel pagi pembinaan adab (Thobur Shobah) dan formasi khidmat upacara bendera santriwati di area lapangan terbuka.",
    angles: [
      "/images/Thobur Shobah_07.JPG",
      "/images/Upacara 17 Agustus_08.JPG"
    ]
  }
];

const CATEGORIES = [
  { key: "semua", label: "Semua Foto", icon: Images },
  { key: "gedung", label: "Gedung & Fasilitas", icon: Building },
  { key: "masjid", label: "Masjid Pesantren", icon: Landmark },
  { key: "asrama", label: "Asrama & Panahan", icon: Home },
  { key: "lapangan", label: "Lapangan Olahraga", icon: Trophy },
  { key: "lab", label: "Laboratorium IPA", icon: Beaker },
  { key: "restorasi", label: "Ruang Makan (Math'am)", icon: Utensils },
  { key: "kegiatan", label: "Kegiatan Santriwati", icon: CalendarCheck },
];

export default function GaleriPage() {
  const [activeCategory, setActiveCategory] = useState<string>("semua");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [activeAngleIndex, setActiveAngleIndex] = useState<number>(0);

  const filteredItems =
    activeCategory === "semua"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const handleOpenLightbox = (item: GalleryItem) => {
    setSelectedImage(item);
    setActiveAngleIndex(0);
  };

  const currentDisplaySrc =
    selectedImage && selectedImage.angles && selectedImage.angles.length > 0
      ? selectedImage.angles[activeAngleIndex]
      : selectedImage?.src || "";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-16 md:py-24">
      {/* HEADER SECTION */}
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-black tracking-widest uppercase shadow-xs"
          >
            <Sparkles className="w-4 h-4" />
            <span>DOKUMENTASI RESMI AL-ANDALUS PUTRI</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight text-slate-950"
          >
            Galeri Pesantren & Fasilitas <br />
            <span className="bg-gradient-to-r from-rose-700 via-pink-600 to-rose-800 bg-clip-text text-transparent">
              {BRANDING.schoolName}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Koleksi dokumentasi visual resmi kawasan pesantren, masjid, asrama, sarana olahraga, laboratorium sains, dan aktivitas santriwati.
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
                className={"flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 border cursor-pointer " + (
                  isActive
                    ? "bg-rose-700 text-white border-rose-700 shadow-lg shadow-rose-700/25 scale-105"
                    : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100 shadow-xs"
                )}
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
                onClick={() => handleOpenLightbox(item)}
                className="group relative cursor-pointer rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-slate-200/90 hover:border-rose-400 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 text-xs font-bold text-slate-800 shadow-xs">
                    <span>{item.categoryLabel}</span>
                    {item.angles && item.angles.length > 1 && (
                      <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded-full border border-rose-200">
                        {item.angles.length} Sudut Foto
                      </span>
                    )}
                  </div>

                  <div className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-1.5 bg-white">
                  <h3 className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-rose-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* LIGHTBOX MODAL WITH MULTI-ANGLE SELECTOR */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 sm:p-6"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full bg-slate-900 border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl"
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-slate-800/80 text-white hover:bg-slate-700 transition-colors cursor-pointer border border-white/10"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-black">
                  <Image
                    src={currentDisplaySrc}
                    alt={selectedImage.title}
                    fill
                    className="object-contain"
                  />
                  
                  {/* Prev/Next arrows if multiple angles */}
                  {selectedImage.angles && selectedImage.angles.length > 1 && (
                    <>
                      <button
                        onClick={() => setActiveAngleIndex((prev) => (prev > 0 ? prev - 1 : selectedImage.angles!.length - 1))}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white transition-all cursor-pointer border border-white/10"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setActiveAngleIndex((prev) => (prev < selectedImage.angles!.length - 1 ? prev + 1 : 0))}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white transition-all cursor-pointer border border-white/10"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnails row if multiple angles */}
                {selectedImage.angles && selectedImage.angles.length > 1 && (
                  <div className="flex items-center gap-2 p-3 bg-slate-950/80 border-t border-slate-800 overflow-x-auto justify-center">
                    {selectedImage.angles.map((angleSrc, aIdx) => (
                      <button
                        key={aIdx}
                        onClick={() => setActiveAngleIndex(aIdx)}
                        className={"relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer " + (
                          activeAngleIndex === aIdx
                            ? "border-rose-500 scale-105"
                            : "border-transparent opacity-60 hover:opacity-100"
                        )}
                      >
                        <Image src={angleSrc} alt="" fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}

                <div className="p-6 sm:p-8 bg-slate-900 border-t border-slate-800 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-rose-600/30 text-rose-400 border border-rose-500/30">
                      {selectedImage.categoryLabel}
                    </span>
                    {selectedImage.angles && selectedImage.angles.length > 1 && (
                      <span className="text-xs text-slate-400">
                        Foto {activeAngleIndex + 1} dari {selectedImage.angles.length}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                    {selectedImage.title}
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    {selectedImage.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA BOTTOM SECTION */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl sm:rounded-[2.5rem] bg-gradient-to-br from-rose-900 via-pink-800 to-slate-900 text-center space-y-6 text-white shadow-2xl shadow-rose-950/20 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white">
              Ingin Kunjungan Langsung ke Pesantren Putri?
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-medium">
              Daftar PPDB Online sekarang atau hubungi tim administrasi kami untuk mengonfirmasi jadwal kunjungan santriwati.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link
                href="/ppdb"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-slate-100 text-rose-950 font-black text-base shadow-lg transition-all hover:-translate-y-0.5"
              >
                <span>Daftar PPDB Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/program"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/15 hover:bg-white/25 text-white font-bold border border-white/20 transition-all text-base hover:-translate-y-0.5"
              >
                <span>Lihat Program Pendidikan</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
