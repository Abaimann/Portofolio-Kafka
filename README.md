# ✨ KAFKA – Frontend Developer Portfolio

> *Crafting responsive, clean, and interactive digital experiences with obsessive attention to motion and performance.*

Portofolio web modern, interaktif, dan ultra-ringan milik Kafka (Frontend Developer). Dibangun dengan pendekatan *clean code*, animasi halus 60+ FPS, modularitas arsitektur aset, serta efisiensi render tingkat lanjut.

---

## 🚀 Fitur Utama & Pengalaman Interaktif

- **📷 Aperture Loader & Iris Transition**: Animasi intro diafragma berputar dengan transisi bukaan lingkaran (*iris circular wipe*) yang dramatis.
- **☀️/🌙 Dynamic Sky Diurnal System (Tema Siang & Malam)**:
  - Transisi warna gradien langit halus menggunakan CSS Houdini `@property --sky*`.
  - Pergantian tema otomatis berdasarkan waktu lokal pengguna (siang/malam), parameter URL (`?tema=pagi` / `?tema=malam`), serta tombol diafragma (*aperture*) interaktif dengan dukungan keyboard (*Enter/Space*).
  - Bintang berkelap-kelip (*twinkling stars*) dan bulan berpendar pada mode malam.
- **🎯 3D Parallax Viewfinder Hero**:
  - Bingkai bidik *viewfinder* dengan tipografi raksasa interaktif `KAFKA`.
  - Simulasi kedalaman *parallax* bertingkat saat mouse digerakkan (*pointermove*) lengkap dengan perspektif 3D tilt pada potret diri.
- **⚡ Interactive Tools & Client Carousel**:
  - Dua lajur kartu galeri karya interaktif (Webora, BuildHauss, Djeroe, EduLink, SLBB, Bangodua, Razita, dll.) dengan manipulasi sentuh (*swipe*), tarikan mouse (*drag*), roda *trackpad*, serta akselerasi mengikuti kecepatan *scroll*.
  - Logo stack teknologi (HTML, CSS, JS, TS, React, Next.js, Vue, Tailwind CSS, GSAP, Vite, Git, Figma, Vitest, Lighthouse).
- **📖 About Me Typography Reveal**:
  - Huruf dan kata dipecah dinamis (*staggered character reveal*).
  - Ikon 3D mengambang dengan inersia kecepatan *scroll* (*scroll velocity tracking*).
- **💼 Pengalaman Kerja Berurutan**:
  - Kartu hitam bergaya *services showcase* dengan penomoran bergaris tipis dan metrik progres per baris yang mulus.
- **📁 Projects Showcase (Sticky Stack Cards)**:
  - Tampilan kartu bertumpuk (*sticky stacking cards*) dengan preview galeri gambar asli untuk tiap proyek:
    1. **Djeroe Coffee Shop**: Website interaktif kafe modern dengan katalog menu & suasana kafe.
    2. **BuildHauss Architecture**: Portfolio studio arsitektur, ruang interior & visualisasi 3D isometrik.
    3. **Webora Digital Agency**: Profil agensi digital, platform EduLink, dan dashboard sistem monitoring.
- **✉️ Form Kontak Cepat & Minimalist Tap Cursor**:
  - Integrasi form pesan instan ke email klien.
  - Efek cincin aksen klik ringan (*cursor tap ring*) untuk pengguna desktop mouse.

---

## ⚡ Hasil Optimasi Performa & Refactoring Arsitektur

Website ini telah melalui perombakan dan optimalisasi arsitektur secara menyeluruh:

1. **Modularisasi Kode & Eliminasi Monolitik**:
   - Berkas `index.html` menyusut dari **250 KB (3.800+ baris)** menjadi hanya **~27 KB (194 baris)** (~90% reduksi ukuran berkas HTML).
   - Seluruh CSS dipisahkan secara modular ke direktori `assets/css/` (`variables.css`, `base.css`, `components.css`, `animations.css`).
   - Seluruh JavaScript dipisahkan ke direktori `assets/js/` (`theme.js`, `hero.js`, `navigation.js`, `klien.js`, `sections.js`, `scroll.js`, `app.js`).
   - Seluruh skrip JavaScript ditulis dengan konsistensi gaya **Method Chaining Vertikal** berindentasi satu tingkat.

2. **Ekstraksi & Optimasi Aset Gambar**:
   - Gambar potret berukuran 144 KB base64 diekstrak menjadi file WebP lokal yang dioptimalkan (`assets/images/kafka.webp`, ~105 KB).
   - Seluruh gambar showcase proyek (`assets/images/projects/`) dan galeri karya (`assets/images/gallery/`) dikonversi ke WebP terkompresi tinggi (rata-rata 10–50 KB per gambar) dengan atribut `loading="lazy"` dan `decoding="async"`.
   - Dilengkapi icon tab browser lengkap (*favicon multi-size*): `favicon.ico`, `favicon-32x32.png`, `favicon.png` (192x192), dan `apple-touch-icon.png` (180x180).

3. **Eliminasi Layout Thrashing (Forced Reflows)**:
   - Menghapus pembacaan layout sinkron (`offsetTop`, `offsetHeight`, `getBoundingClientRect()`) yang bergantian dengan penulisan style di dalam frame scroll.
   - Posisi vertikal dokumen dan dimensi statis dihitung dan disimpan (*cached*) saat inisialisasi, `resize`, dan saat font siap (`document.fonts.ready`).
   - Seluruh kalkulasi scroll-linked murni menggunakan kalkulasi aritmetika instan tanpa memicu reflow browser.

4. **Viewport Culling & Manajemen Siklus Hidup rAF**:
   - Integrasi `IntersectionObserver` pada seluruh seksi interaktif (Klien, About Me, Pengalaman, Projects, Dekorasi 3D) sehingga elemen yang berada di luar layar tidak mengonsumsi GPU/CPU.
   - Penghentian otomatis loop animasi (*idle auto-sleep*) saat tab browser sedang tidak aktif melalui event `visibilitychange`.
   - Mengaktifkan `visibility: hidden` pada elemen bintang di tema siang, membebaskan GPU dari 90 animasi *box-shadow* terus-menerus.

---

## 📂 Struktur Berkas

```
Portofolio-Kafka/
├── .gitignore
├── README.md
├── index.html               # Bersih & ramping (~27 KB)
├── favicon.ico
├── favicon-32x32.png
├── favicon.png
├── apple-touch-icon.png
└── assets/
    ├── css/
    │   ├── variables.css      # @property, tema warna :root & mode malam
    │   ├── base.css           # Reset, tipografi dasar, cursor, utility
    │   ├── components.css     # Komponen UI (hero, nav, dock, card, dll.)
    │   └── animations.css     # Kumpulan seluruh @keyframes animasi
    ├── js/
    │   ├── theme.js           # Pengelola tema siang/malam otomatis & manual
    │   ├── hero.js            # Efek parallax 3D hero & generator bintang
    │   ├── navigation.js      # Pengontrol dock navigasi & scroll-spy
    │   ├── klien.js           # Carousel interaktif logo & kartu karya nyata
    │   ├── sections.js        # Logika interaktif seksi About, Ex, Projects, 3D
    │   ├── scroll.js          # Pembatas kecepatan scroll wheel & efek klik
    │   └── app.js             # Inisialisasi utama aplikasi & tech stack
    └── images/
        ├── kafka.webp         # Foto potret Kafka (WebP teroptimasi)
        ├── projects/          # Gambar screenshot showcase proyek nyata
        │   ├── djeroe-1.webp ...
        │   ├── buildhauss-1.webp ...
        │   └── webora-1.webp ...
        └── gallery/           # Gambar preview untuk carousel klien
            ├── gal-1.webp ... gal-16.webp
```

---

## 🛠️ Menjalankan Proyek

Proyek ini murni berbasis web statis standar tanpa dependensi build tools yang rumit:
1. *Clone* repositori ini:
   ```bash
   git clone https://github.com/Abaimann/Portofolio-Kafka.git
   ```
2. Buka berkas `index.html` langsung di browser favorit Anda, atau jalankan melalui live server lokal (seperti *Live Server* VSCode atau `npx serve .`).
