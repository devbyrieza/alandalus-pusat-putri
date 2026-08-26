"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Users,
  Trophy,
  Shield,
  Target,
  Monitor,
  Zap,
  TreePine,
  Waves,
  FileText,
  PenTool,
  Dumbbell,
  Play,
  Palette,
  Sparkles,
  ArrowRight,
  Calendar as CalendarIcon } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";

// ─── Types ───────────────────────────────────────────
type ActivityColor = "pink" | "cream" | "gold";

interface Activity {
  name: string;
  description: string;
  image: string;
  badge: string;
}

interface ExtraActivity {
  name: string;
  icon: React.ElementType;
  color: ActivityColor;
}

// ─── Data ────────────────────────────────────────────
const ACTIVITIES: Activity[] = [
  {
    name: "Pembelajaran Aktif",
    badge: "Akademik & Syar'i",
    description:
      "Metode pembelajaran interaktif yang memadukan keunggulan akademik umum dengan pendalaman bahasa Arab dan ilmu syar'i secara komprehensif.",
    image: "/images/Lab IPA_01.JPG" },
  {
    name: "Kegiatan Rutin Harian",
    badge: "Spiritual",
    description:
      "Pembiasaan ibadah melalui sholat berjamaah tepat waktu dan halaqah tahfidz Al-Qur'an setiap hari secara konsisten.",
    image: "/images/Thobur Shobah_02.JPG" },
  {
    name: "Ekstrakurikuler Unggulan",
    badge: "15+ Pilihan",
    description:
      "Tersedia 15+ pilihan kegiatan mulai dari beladiri hingga Desain Grafis untuk mengasah minat dan bakat santri.",
    image: "/images/Gedung_05.JPG" },
  {
    name: "Kemandirian, Skill & Leadership",
    badge: "Life Skills",
    description:
      "Program pelatihan entrepreneurship, leadership, dan keterampilan hidup mandiri guna mencetak santri yang siap berdikari di masa depan.",
    image: "/images/Upacara 17 Agustus_04.JPG" },
];

const EXTRA_ACTIVITIES: ExtraActivity[] = [
  { name: "Karate", icon: Trophy, color: "pink" },
  { name: "Pramuka", icon: Shield, color: "cream" },
  { name: "Panahan", icon: Target, color: "pink" },
  { name: "Futsal", icon: Trophy, color: "gold" },
  { name: "Volly", icon: Trophy, color: "pink" },
  { name: "Komputer", icon: Monitor, color: "cream" },
  { name: "Design Grafis", icon: Palette, color: "pink" },
  { name: "Kaligrafi", icon: PenTool, color: "gold" },
  { name: "Jurnalistik", icon: FileText, color: "pink" },
  { name: "Konten Kreator", icon: Play, color: "cream" },
  { name: "Basket", icon: Dumbbell, color: "pink" },
  { name: "Bulutangkis", icon: Zap, color: "gold" },
  { name: "Pertanian", icon: TreePine, color: "cream" },
  { name: "Periklanan", icon: Waves, color: "pink" },
  { name: "Tata Boga", icon: Sparkles, color: "gold" },
];

// ─── Activity Card ────────────────────────────────────
function ActivityCard({
  activity,
  index }: {
  activity: Activity;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-32px" }}
      transition={{
        delay: index * 0.09,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col bg-white rounded-xl border border-primary-100 shadow-premium-sm overflow-hidden transition-all duration-500 ease-spring hover:-translate-y-2 hover:shadow-premium-md hover:border-primary-200"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden shrink-0 bg-secondary-100">
        <Image
          src={activity.image}
          alt={activity.name}
          fill
          priority={index < 2}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white text-[0.6rem] font-bold text-primary-700 uppercase tracking-widest border border-primary-100/50 shadow-sm">
            {activity.badge}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col grow p-6 md:p-7">
        <h3 className="text-base md:text-lg font-bold text-ink-900 mb-2.5 tracking-tight leading-snug group-hover:text-primary-700 transition-colors duration-300">
          {activity.name}
        </h3>
        <p className="text-[0.8125rem] md:text-sm text-ink-500 leading-relaxed grow font-[450]">
          {activity.description}
        </p>

        {/* Bottom accent */}
        <div className="mt-5 pt-4 border-t border-primary-50 flex items-center justify-between">
          <div className="h-[2px] w-5 rounded-full bg-primary-200 group-hover:w-10 group-hover:bg-primary-500 transition-all duration-500" />
          <span className="text-[0.65rem] font-bold text-primary-300 uppercase tracking-widest group-hover:text-primary-500 transition-colors duration-300">
            Selengkapnya
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Extra Activity Chip ──────────────────────────────
function ExtraChip({ item, index }: { item: ExtraActivity; index: number }) {
  const Icon = item.icon;
  const colorMap = {
    pink:
      "bg-primary-50 text-primary-600 group-hover:bg-primary-100 ring-primary-200",
    cream:
      "bg-secondary-100 text-primary-700 group-hover:bg-secondary-200 ring-secondary-300",
    gold: "bg-gold-50 text-gold-600 group-hover:bg-gold-100 ring-gold-200" };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{
        delay: index * 0.025,
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col items-center justify-center gap-3 p-5 md:p-6 bg-white rounded-xl border border-secondary-200 hover:border-primary-200 hover:shadow-premium-sm hover:bg-secondary-50/50 transition-all duration-400 cursor-default"
    >
      <div
        className={[
          "w-12 h-12 md:w-13 md:h-13 rounded-xl flex items-center justify-center shadow-xs",
          "transition-all duration-400 group-hover:scale-110",
          colorMap[item.color] ].join(" ")}
      >
        <Icon className="w-6 h-6 md:w-6.5 md:h-6.5" />
      </div>
      <span className="text-xs md:text-[0.8125rem] font-bold text-ink-700 group-hover:text-primary-700 tracking-tight text-center transition-colors duration-300">
        {item.name}
      </span>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────
export function ActivitiesSection() {
  return (
    <section className="section-alt relative py-20 md:py-28 overflow-hidden">
      {/* Background Decorative Blur */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-secondary-100/60 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-0 w-[500px] h-[500px] rounded-full bg-primary-100/30 blur-[100px]"
      />

      <Container className="relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 border border-primary-100 mb-4"
            >
              <Users className="w-3.5 h-3.5 text-primary-600" />
              <span className="text-[0.7rem] font-bold text-primary-700 uppercase tracking-widest">
                Aktivitas Santriwati
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink-900 tracking-tight leading-tight"
            >
              Membangun Karakter Melalui{" "}
              <span className="text-primary-600 underline decoration-secondary-300 decoration-wavy underline-offset-4">
                Aktivitas Berkualitas
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="text-sm md:text-base text-ink-500 max-w-md font-[450] leading-relaxed"
          >
            Pesantren Islam Internasional Al-Andalus Putri mengintegrasikan
            kurikulum akademik, pembinaan tahfidz, dan pengembangan bakat dalam
            ekosistem belajar yang seimbang dan inspiratif.
          </motion.p>
        </div>

        {/* 4 Pilar Kegiatan Utama */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-16 md:mb-20">
          {ACTIVITIES.map((activity, index) => (
            <ActivityCard
              key={activity.name}
              activity={activity}
              index={index}
            />
          ))}
        </div>

        {/* Ekstrakurikuler Sub-Section */}
        <div className="pt-12 border-t border-primary-100/60">
          <div className="text-center max-w-xl mx-auto mb-10 md:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary-100 border border-secondary-200/80 mb-3"
            >
              <Trophy className="w-3.5 h-3.5 text-primary-700" />
              <span className="text-[0.7rem] font-bold text-primary-800 uppercase tracking-widest">
                Pengembangan Bakat
              </span>
            </motion.div>
            <h3 className="text-xl sm:text-2xl font-bold text-ink-900 tracking-tight">
              Pilihan Ekstrakurikuler
            </h3>
            <p className="text-xs sm:text-sm text-ink-500 mt-2 font-[450]">
              Beragam wadah minat dan bakat untuk melatih ketangkasan fisik,
              kreativitas seni, hingga literasi digital.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 md:gap-4">
            {EXTRA_ACTIVITIES.map((item, index) => (
              <ExtraChip key={item.name} item={item} index={index} />
            ))}
          </div>

          {/* CTA Link */}
          <div className="mt-10 text-center">
            <Link
              href="/kegiatan"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-primary-600 hover:text-primary-700 tracking-tight group transition-colors duration-300"
            >
              <span>Lihat Jadwal Harian &amp; Agenda Santriwati Lengkap</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
