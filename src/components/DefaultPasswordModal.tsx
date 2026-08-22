"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShieldAlert, KeyRound, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DefaultPasswordModalProps {
  profileUrl?: string;
}

export function DefaultPasswordModal({ profileUrl = "/dashboard/admin/profil" }: DefaultPasswordModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Check if session has default password flag
    try {
      const cookies = document.cookie.split("; ");
      const sessionCookie = cookies.find((row) => row.startsWith("app_session="));
      if (sessionCookie) {
        const value = decodeURIComponent(sessionCookie.split("=")[1]);
        const parsed = JSON.parse(value);
        if (parsed.is_default_password) {
          if (pathname !== profileUrl) {
            router.push(profileUrl);
          }
          setIsOpen(true);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [pathname, profileUrl, router]);

  if (pathname === profileUrl && isOpen) {
    return (
      <div className="bg-red-500 text-white px-4 py-3 text-center text-sm font-bold shadow-md z-[9999] relative">
        <div className="flex items-center justify-center gap-2">
          <ShieldAlert className="w-5 h-5" />
          <span>PEMBARUAN KATA SANDI DIWAJIBKAN: Silakan ganti kata sandi default Anda melalui form di halaman ini demi keamanan akun.</span>
        </div>
      </div>
    );
  }

  if (pathname === profileUrl) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-red-200/80 overflow-hidden"
          >
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-400/10 rounded-full blur-2xl pointer-events-none" />

            {/* Icon Header */}
            <div className="w-14 h-14 bg-red-50 rounded-2xl border border-red-200 flex items-center justify-center mb-5 text-red-600 shadow-inner">
              <ShieldAlert className="w-8 h-8 animate-pulse" />
            </div>

            {/* Title & Description */}
            <h3 className="text-xl font-black text-slate-900 mb-2 tracking-tight">
              Pembaruan Kata Sandi Diwajibkan
            </h3>
            <p className="text-sm text-slate-600 font-medium leading-relaxed mb-6">
              Saat ini Anda masih menggunakan <span className="font-bold text-red-700">Kata Sandi Default</span> atau Anda diminta untuk memperbarui kata sandi. Demi keamanan akun dan data institusi, Anda diwajibkan untuk segera memperbarui kata sandi Anda.
            </p>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link
                href={profileUrl}
                className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold text-sm shadow-lg shadow-red-500/25 border border-red-400 flex items-center justify-center gap-2 transition-all group"
              >
                <KeyRound className="w-4 h-4" />
                <span>Ganti Kata Sandi Sekarang</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
