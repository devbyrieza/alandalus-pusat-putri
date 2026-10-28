# DESIGN.md — Al-Andalus Pusat Putri

Design system hasil Fase 1 restyle UI. Berlaku untuk seluruh perubahan lapisan
presentasi (className/Tailwind, CSS, layout, komponen visual, animasi) di repo ini.

**Keputusan yang disetujui pemilik project (2026-10-29):**
- Peran referensi: **Kombinasi** — zcode.z.ai (struktur: navbar glass, announcement
  pill, hairline), tilas.vercel.app (nuansa: hangat, editorial, flat border-driven),
  ngodingpakeai.com/pricing (pola halaman paket/biaya).
- Kedalaman: **flat + hairline** (default; bisa ditinjau ulang).
- Efek dekoratif lama (glow-blob, glow-ring, gradient-text, hover-lift besar,
  glass berat): **dihapus semua**. Glass hanya tersisa di navbar saat scroll.

**ATURAN MUTLAK:** warna brand, konten/teks/data/gambar/link, metadata SEO, logika
bisnis, routing, API, database, autentikasi, state, dan validasi form TIDAK
berubah. Mode terang/gelap tidak ditambah/dikurangi. Tidak ada dependency baru.

---

## 1. Identitas brand — TERKUNCI: **PINK + GOLD MUDA** (dipakai apa adanya)

> **Peringatan warna**: nilai `--primary: #0f172a` (navy) di blok `:root`
> globals.css adalah **sisa salinan usang dan BUKAN warna live**. Palet live
> project ini PINK, dipetakan lewat `@theme` → `--color-primary-*` →
> `--color-pink-*`. JANGAN pernah mengubah palet ke navy/maroon.

| Token | Nilai | Sumber |
|---|---|---|
| Primary (skala) | `--color-pink-50 #fdf2f8` … `500 #ec4899` … `900 #831843` | `@theme` globals.css |
| `--color-primary-light` | `pink-50` · `--color-primary-dark` = `pink-800 #9d174d` | `@theme` |
| Anchor brand (injected) | `--brand-primary: #ec4899` | `branding.ts` → `layout.tsx` |
| Secondary (skala) | `--color-andalus-gold-50 #fffdeb` … `400 #F5DD17` … `900 #423500` | `@theme` globals.css |
| `--color-secondary` | `var(--color-andalus-gold-400)` = `#F5DD17`; anchor `#fde68a` | `@theme` + `branding.ts` |
| `--bg` | `#f1f5f9` (slate-100) | `:root` |
| `--text-main` | `#0f172a` | `:root` |
| Font sans | Inter | via `next/font`, tidak diganti |

Sumber nilai: `src/app/globals.css` (skala `@theme`), `src/config/branding.ts`,
injeksi `--brand-*` di `src/app/layout.tsx`. Nilai `NEXT_PUBLIC_PRIMARY_COLOR`
di `.env*` tidak dibaca `branding.ts` (hardcoded) — abaikan.

## 2. Prinsip visual

1. **Tenang, anggun, berwibawa** — pink dipakai sebagai warna institusi yang
   matang (solid & tint lembut), BUKAN sebagai efek norak; tanpa neon/glow,
   tanpa animasi ramai.
2. **Kedalaman dari border & layering, bukan bayangan** — kartu flat, border 1px,
   shadow sangat halus.
3. **Satu aksen per bagian** — pink dominan (solid `pink-600/700` untuk tombol,
   tint `pink-50/100` untuk latar aksen); gold muda hemat sebagai sekunder.
4. **Hirarki dari ukuran & weight, bukan warna** — H3 ke bawah warna tinta/slate.
5. **Pill untuk aksi & info.**

## 3. Design tokens

### Radius
`sm` 8 (input/badge kecil) · `md` 10 (tombol kecil, nav, tabel) · `lg` 12
(**kartu standar**) · `xl` 16 (panel/bento/hero) · `2xl` 20 (modal) · `full`
(tombol, badge, pill). Konsistenkan elemen yang masih memakai radius lain.

### Shadow (netral, slate)
`xs` `0 1px 2px rgba(15,23,42,.05)` (rest) · `sm` `0 1px 3px rgba(15,23,42,.06),
0 1px 2px rgba(15,23,42,.04)` (hover) · `md` `0 4px 12px -2px rgba(15,23,42,.08)`
(dropdown) · `lg` `0 12px 28px -6px rgba(15,23,42,.12)` (modal) · hairline
`inset 0 0.5px 0 rgba(255,255,255,.12)` untuk tombol/panel gelap. Colored glow
tidak dipakai lagi pada elemen baru.

### Border
Terang: `1px solid slate-200`; hover kartu: border `pink-200` bila interaktif.
Section gelap (pink-700/800 bila ada): `rgba(255,255,255,.1)`.

### Tipografi (font tidak berubah)
H1 800/−0.03em slate-950 (maks 1 frasa aksen pink solid) · H2 700/−0.025em ·
H3 700 slate-900 (bukan pink/gold) · H4–H6 600 slate-800 · body 400–450/1.7
slate-600 · small slate-500 · label kecil 600–700, tracking **0.04–0.06em**
(turun dari 0.1–0.15em/800). `text-gradient-*` → warna solid pink.

### Spacing
Section `clamp(4rem, 8vw, 6.5rem)` · container `max-w-6xl px-4 sm:px-6 lg:px-8` ·
kartu `p-6`, panel `p-8`, grid `gap-4 sm:gap-6`.

### Motion
150/200/250ms, `cubic-bezier(0,0,0.2,1)`; hover kartu = border + shadow naik,
**tanpa translateY** (kartu-link boleh −1px). HAPUS: lift massal, rotate ikon,
shimmer, marquee, shine-hover. Scroll-reveal fade+12px sekali per section.
**WAJIB** `prefers-reduced-motion: reduce` mematikan semua animasi/transition.

## 4. Komponen dasar

- **Button**: primary = pill solid pink (`pink-600 #db2777` untuk kontras AA di
  teks putih; anchor `#ec4899` untuk elemen dekoratif non-teks), shadow-xs, hover
  satu shade lebih gelap (`pink-700`), active `scale(.98)`; secondary = pill
  putih border `slate-200`, hover `bg-pink-50`; accent (hemat) = pill gold muda;
  ghost = teks slate-600 hover `bg-slate-100`.
- **Card**: putih, border 1px `slate-200`, radius 12/16, `shadow-xs`; hover
  interaktif: border `pink-200` + `shadow-sm`.
- **Badge/SectionLabel**: pill, 600–700, tracking 0.04–0.06em; tint `pink-100` +
  teks `pink-800`, atau tint `andalus-gold-100` + teks `andalus-gold-800`.
- **Input**: border `slate-200`, radius 10; focus border pink + ring
  `0 0 0 3px rgba(236,72,153,.12)`.
- **Navbar** (zcode): sticky h-16, transparan → scroll: `bg-white/85`
  `backdrop-blur(12px)` + border-b hairline; link aktif slate-900 + garis bawah
  2px pink; CTA pill pink; mobile hamburger 200ms.
- **Announcement pill**: pill ber-border di atas H1 untuk info PPDB (gaya elemen
  yang sudah ada, tanpa menambah teks).
- **Footer**: border-t hairline, link `text-sm` slate-500 hover slate-800.
- **Halaman paket/biaya**: pola npai/pricing (header tengah, tier kartu border
  1px radius 16, unggulan = border 2px pink + badge pill, harga besar weight 800
  + coret, daftar centang, CTA full-width mobile).

## 5. Do & Don't

**Do**: whitespace lega; kontras AA (teks putih di atas pink hanya pada
`pink-600` ke bawah — `pink-400/500` tidak lolos kontras untuk teks kecil);
`:focus-visible` ring; `tabular-nums`; uji 375/768/1440.
**Don't**: gradient berlapis; glow/neon; lift besar; uppercase tracking lebar;
shadow berwarna; `cursor:pointer` global; `table{display:block}` global;
**mengganti pink dengan navy/maroon/warna lain**.

## 6. Mapping kelas lama → arah baru

| Kelas/efek lama | Arah baru |
|---|---|
| Tombol gradient + colored shadow | solid pink, shadow-xs, hover shade gelap |
| Kartu hover −3/−4px | radius 12/16, border, hover border+shadow |
| `.glow-blob-*`, `.glow-ring-*`, `.shimmer`, `.shine-hover`, marquee | hapus dari halaman (bertahap) |
| `.glass`/`.glass-panel-*` | hanya navbar & overlay; blur 12px |
| `.section-label` 800/0.1em | 700/0.06em |
| `.text-gradient-*`/`.gradient-text-*` | warna solid pink |
| H3–H5 warna primary penuh | slate-900/slate-800 |
| `.icon-box` rotate(3deg) | tanpa transform |
| `.hover-lift*` | deprecated |
| `* { cursor: pointer !important }` | hapus |
| `:root --primary: #0f172a` (navy usang) | dibiarkan tidak dipakai / dirapikan ke nilai pink live — TANPA mengubah kelas Tailwind yang sudah benar |

## 7. Dial project ini

Website publik pesantren: **VARIANCE sedang · MOTION rendah-sedang · DENSITY
sedang**. Karakter putri dijaga lewat pink solid dan tint lembut — elegan dan
matang, tanpa efek ramai.

## 8. Rencana eksekusi (Fase 2)

1. Branch `ui/restyle-andalus-pusat-putri` dari `main`; commit pertama:
   DESIGN.md + konsolidasi token `globals.css`.
2. Commit bertahap: layout global → komponen bersama → per halaman.
3. QA: lint/typecheck/build + screenshot 375/768/1440.
4. Laporan lalu berhenti menunggu persetujuan.
