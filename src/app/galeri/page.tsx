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
  BookOpen,
  Trophy,
  Utensils,
  Sparkles,
  Maximize2
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { BRANDING } from "@/config/branding";

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  category: "gedung" | "asrama" | "belajar" | "olahraga" | "restorasi";
  categoryLabel: string;
  description: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "1",
    src: "/images/galeri/masjid-putri-1.jpg",
    title: "Masjid Jami' Al-Andalus Putri",
    category: "gedung",
    categoryLabel: "Gedung & Kampus",
    description: "Pusat kegiatan ibadah, kajian, dan tarbiyah santriwati.",
  },
  {
    id: "2",
    src: "/images/galeri/asrama-putri-1.jpg",
    title: "Gedung Asrama Santriwati",
    category: "asrama",
    categoryLabel: "Asrama & Kamar",
    description: "Gedung asrama bertingkat dengan lingkungan yang aman dan asri.",
  },
  {
    id: "3",
    src: "/images/galeri/asrama-putri-2.jpg",
    title: "Area Halaman & Kompleks Asrama",
    category: "asrama",
    categoryLabel: "Asrama & Kamar",
    description: "Halaman asrama yang luas untuk kegiatan rutin dan ukhuwah santriwati.",
  },
  {
    id: "4",
    src: "/images/galeri/kelas-putri-1.jpg",
    title: "Gedung Pembelajaran & Ruang Kelas",
    category: "belajar",
    categoryLabel: "Ruang Belajar",
    description: "Fasilitas kelas modern ber-AC pendukung Kurikulum TICE.",
  },
  {
    id: "5",
    src: "/images/galeri/kelas-putri-2.jpg",
    title: "Ruang Kelas & Halaqah Al-Qur'an",
    category: "belajar",
    categoryLabel: "Ruang Belajar",
    description: "Ruang bimbingan tahfidz intensif dan kajian syar'i santriwati.",
  },
  {
    id: "6",
    src: "/images/galeri/kamar-santri-1.jpg",
    title: "Kamar Santriwati & Ranjang Susun",
    category: "asrama",
    categoryLabel: "Asrama & Kamar",
    description: "Kamar bersih dan tertata rapi untuk kenyamanan istirahat santriwati.",
  },
  {
    id: "7",
    src: "/images/galeri/lab-komputer.jpg",
    title: "Laboratorium Komputer",
    category: "belajar",
    categoryLabel: "Ruang Belajar",
    description: "Fasilitas IT terpadu untuk pembelajaran akademik dan riset.",
  },
  {
    id: "8",
    src: "/images/galeri/lapangan-basket.jpg",
    title: "Sarana Olahraga Terbuka",
    category: "olahraga",
    categoryLabel: "Sarana Olahraga",
    description: "Lapangan olahraga indoor/outdoor khusus area santriwati.",
  },
  {
    id: "9",
    src: "/images/galeri/restorasi.jpg",
    title: "Ruang Restorasi (Makan Bersama)",
    category: "restorasi",
    categoryLabel: "Restorasi & Layanan",
    description: "Ruang makan higienis dengan sajian menu gizi seimbang harian.",
  },
];

const CATEGORIES = [
  { key: "semua", label: "Semua Foto", icon: Images },
  { key: "gedung", label: "Gedung & Kampus", icon: Building },
  { key: "asrama", label: "Asrama & Kamar", icon: Home },
  { key: "belajar", label: "Ruang Belajar", icon: BookOpen },
  { key: "olahraga", label: "Sarana Olahraga", icon: Trophy },
  { key: "restorasi", label: "Restorasi & Layanan", icon: Utensils },
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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm font-semibold tracking-wide"
          >
            <Sparkles className="w-4 h-4" />
            <span>DOKUMENTASI FOTO AL-ANDALUS PUTRI</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white"
          >
            Galeri Pesantren & Fasilitas <br />
            <span className="bg-gradient-to-r from-rose-400 to-pink-300 bg-clip-text text-transparent">
              {BRANDING.schoolName}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-lg"
          >
            Dokumentasi resmi lingkungan asrama, ruang kelas, masjid, dan sarana prasarana khusus santriwati.
          </motion.p>
        </div>

        {/* CATEGORY FILTER TABS */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 border ${
                  isActive
                    ? "bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/25 scale-105"
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
                className="group relative cursor-pointer rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-rose-500/50 shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-800 text-xs font-semibold text-rose-400">
                    {item.categoryLabel}
                  </div>

                  <div className="absolute top-3 right-3 p-2 rounded-full bg-slate-950/80 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-5 space-y-1">
                  <h3 className="font-bold text-lg text-white group-hover:text-rose-400 transition-colors">
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
        <div className="mt-20 p-8 rounded-3xl bg-gradient-to-r from-rose-950/60 via-slate-900 to-pink-950/60 border border-rose-500/30 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Ingin Kunjungan Langsung ke Pesantren Putri?
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Daftar PPDB Online sekarang atau hubungi tim administrasi kami untuk mengonfirmasi jadwal kunjungan santriwati.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/daftar"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold shadow-lg shadow-rose-500/25 transition-all"
            >
              <span>Daftar PPDB Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/fasilitas"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold border border-slate-700 transition-all"
            >
              <span>Lihat Detail Fasilitas</span>
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 p-3 rounded-full bg-slate-950/80 hover:bg-rose-500 text-white hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/10] w-full bg-slate-950">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>

              <div className="p-6 bg-slate-900 border-t border-slate-800 space-y-2">
                <div className="inline-block px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
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
