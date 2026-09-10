# PRD — Warung Soto Saben Landing Page

## Problem Statement (asli)
"Build a landing page: https://warung-soto-3.preview.emergentagent.com/?utm_source=share lanjutkan web ini"

Maksud: melanjutkan/membangun ulang landing page Warung Soto Saben (warung soto resep turun-temurun, Yogyakarta) yang sudah ada di preview lama, dengan standar desain lebih tinggi (arah award-level: kinetic hero, editorial marquee, numbered chapters, motion premium via framer-motion + lenis).

## Persona Pengguna
- Pelanggan warung yang ingin melihat menu, harga, lokasi cabang, dan memesan lewat WhatsApp.
- Penyelenggara acara (hajatan, kantor, tirakatan) yang ingin memesan soto min. 50 porsi.
- Rombongan keluarga/komunitas yang ingin reservasi tempat di Cabang Berbah (min. 10 orang).

## Arsitektur
- Frontend-only React SPA (react-router-dom): `/` (landing), `/galeri`, `/pesan`.
- Tidak ada backend yang dibutuhkan — semua pemesanan via tautan WhatsApp (wa.me/6285103030305) dengan pesan tersusun otomatis.
- Foto asli warung diunduh dari situs preview lama ke `/app/frontend/public/images/` (22 foto).
- Motion: framer-motion (masked line reveal, scroll reveal, parallax hero), Lenis smooth scroll.
- Desain: palet hangat (bone #F9F6F0, ink #2C2621, sambal #C84B31, emas #A07340, line #E5DFD3), font Cormorant Garamond + Plus Jakarta Sans, grain overlay, glass sticky navbar.
- Data konten terpusat di `src/lib/site.js` (menu, cabang, galeri, testimoni, FAQ).

## Yang Sudah Diimplementasikan (10 Sep 2026)
- Beranda: hero kinetik (masked line-by-line reveal + parallax foto + watermark "Saben"), marquee editorial lambat, bab 01 Cerita Kami, 02 Daftar Harga (menu + tombol WA per item), 03–05 Cabang (Berbah/Keputren/Trayeman dengan foto asli + fitur + Maps), 06 Jejak Acara, 07 Testimoni, 08 FAQ (accordion), footer gelap dengan 3 cabang + CTA WA.
- Halaman /galeri: grid masonry 22 foto, filter (Semua/Acara/Cabang/Hidangan), lightbox (prev/next/Escape/backdrop).
- Halaman /pesan: formulir reservasi tempat (khusus Cabang Berbah, arisan/rapat/reuni, min. 10 porsi, sound system tersedia) → membuka WhatsApp dengan pesan tersusun; pilihan menu lengkap (soto, minuman, lauk); ringkasan estimasi harga real-time; toast sukses/error.
- index.html: lang="id", title & meta description Warung Soto Saben.
- Fix bug: MaskedLines whileInView tidak terpicu karena IntersectionObserver menghitung clipping ancestor — observer dipindah ke span luar (pola variants).

## Verifikasi (10 Sep 2026)
- curl: halaman 200, /images/soto-1.jpg 200, /api/ 200 (Hello World).
- Screenshot e2e: hero, menu, cabang, acara, footer, FAQ accordion (jawaban tampil), galeri (grid, filter 6 item acara, lightbox next/prev), pesan (estimasi Rp 1.440.000 untuk 120 porsi ayam; URL wa.me terbentuk benar dengan isi pesan lengkap; validasi tanggal lampau & porsi<50 tertahan), mobile hero + menu hamburger.

## Catatan Konten
- Testimoni (Bu Harti, Pak Bambang, Mas Danu) adalah contoh — ganti dengan testimoni asli.
- Nomor WhatsApp: 0851 0303 0305 (wa.me/6285103030305) — sesuai situs lama.

## Backlog (prioritas)
- P0: Ganti testimoni contoh dengan testimoni asli pelanggan.
- P1: Keranjang menu multi-item → satu pesan WhatsApp gabungan (pengunjung pilih beberapa menu + jumlah).
- P1: SEO (Open Graph image, JSON-LD LocalBusiness/Restaurant, sitemap).
- P2: Mode bahasa Inggris; tombol arah ke cabang terdekat (geolokasi); integrasi Google Reviews asli.
- P2: Halaman detail per cabang (foto lebih banyak, denah, jadwal live music).
