# Design System & UI Specification — Website Parcel Lebaran

> **Versi:** 1.0  
> **Tanggal:** 20 Oktober 2026  
> **Stack:** HTML5 + Bootstrap 5.x + CSS murni + JavaScript vanilla  
> **Arah visual:** Sky Blue Premium, hangat, bersih, modern, mudah dipercaya.

## 1. Design Principles

1. **Produk adalah fokus utama.** Foto parcel harus autentik, terang secara natural, tajam, dan tidak ramai.
2. **Premium tetapi ramah.** Biru langit memberi kesan segar; navy memberi kedalaman; aksen emas dipakai secukupnya.
3. **Jelas sebelum dekoratif.** Harga, isi, opsi custom, cara pesan, dan waktu persiapan harus mudah ditemukan.
4. **Mobile-first.** Pengunjung harus bisa melihat paket dan membuka WhatsApp dengan mudah dari ponsel.
5. **Konsisten dan aksesibel.** Komponen, jarak, fokus keyboard, kontras, dan pola interaksi harus konsisten.

## 2. Visual Direction

### Palet warna

| Token | Hex | Penggunaan |
|---|---|---|
| `--sky-500` | `#69BCEB` | Primary CTA, elemen brand |
| `--sky-700` | `#278CC8` | Hover/active, link kuat |
| `--navy-900` | `#153B5B` | Heading, footer, teks penting |
| `--ice-50` | `#EFF8FD` | Latar section lembut |
| `--white` | `#FFFFFF` | Card dan latar utama |
| `--gold-500` | `#D9B56D` | Aksen premium kecil |
| `--text` | `#253746` | Teks body |
| `--muted` | `#607586` | Deskripsi sekunder |
| `--border` | `#DCEAF2` | Border dan divider |
| `--success` | `#237A57` | Status berhasil |
| `--danger` | `#B42318` | Error |

**Aturan:** warna gold bukan warna teks kecil di latar putih kecuali rasio kontras sudah lolos. Untuk tombol utama, gunakan warna biru yang cukup gelap dengan teks berkontras tinggi; jangan memakai sky blue pucat sebagai latar tombol berteks putih jika kontrasnya kurang.

### Tipografi
- Font utama: `Plus Jakarta Sans` bila dimuat secara efisien; fallback: `system-ui, -apple-system, "Segoe UI", sans-serif`.
- Body: 16–18px, line-height 1.6–1.75.
- H1 desktop: `clamp(2.25rem, 4vw, 3.75rem)`.
- H2: `clamp(1.75rem, 3vw, 2.5rem)`.
- H3: `clamp(1.15rem, 2vw, 1.5rem)`.
- Gunakan font-weight 400 untuk body, 600–700 untuk heading.
- Hindari terlalu banyak variasi font weight.

### Radius, shadow, spacing
- Radius card: 16–20px.
- Radius tombol: 999px untuk pill CTA atau 10–12px untuk bentuk modern.
- Shadow: lembut, rendah kontras, hanya untuk card mengambang.
- Spacing utama: kelipatan 4/8px.
- Container: Bootstrap `.container`; batasi lebar konten artikel agar nyaman dibaca.
- Hindari efek glassmorphism berat, gradient mencolok, dan dekorasi yang mengganggu foto produk.

## 3. Foto dan Art Direction

### Foto hero
- Foto parcel Lebaran asli atau foto produk yang benar-benar mewakili produk yang dijual.
- Komposisi horizontal 3:2 atau 16:9, parcel terlihat jelas, latar krem/putih dengan aksen biru muda.
- Pencahayaan lembut, detail isi dan kemasan tetap akurat.
- Hindari gambar AI yang menampilkan isi paket berbeda dari produk nyata.
- Gunakan crop responsif dengan `object-fit: cover`; tentukan `object-position` per gambar jika diperlukan.

### Foto kartu produk
- Rasio konsisten 4:3 atau 1:1 sesuai aset katalog.
- Background dan pencahayaan seragam.
- Jangan campur foto buram dengan foto studio tanpa alasan.
- Alt text menjelaskan isi visual, bukan daftar keyword.

### Portofolio
- Gunakan foto pesanan nyata dan izin publikasi.
- Bila ada logo klien, pastikan izin dan kerahasiaan telah diperiksa.
- Tampilkan caption singkat yang menjelaskan konteks.

## 4. Layout dan Grid

- Gunakan grid Bootstrap: 12 kolom.
- Desktop: 3–4 kartu paket per baris tergantung lebar.
- Tablet: 2 kartu per baris.
- Mobile: 1 kartu per baris, atau 2 hanya jika kartu tetap terbaca.
- Section spacing desktop: 80–104px; tablet 64–80px; mobile 48–64px.
- Hindari baris teks yang terlalu panjang.
- Gunakan white space sebagai bagian dari kesan premium.

## 5. Global Navigation

### Desktop
- Navbar putih, logo di kiri, menu di tengah/kanan, CTA WhatsApp paling menonjol.
- Sticky navbar opsional; bila sticky, tinggi tidak terlalu besar dan anchor target tidak tertutup.
- Dropdown Paket memiliki jarak yang cukup, state hover/focus/active yang jelas, dan navigasi keyboard.
- Hindari dropdown yang hanya bisa dibuka dengan hover.

### Mobile
- Brand dan tombol menu terlihat.
- Menu terbuka dengan fokus yang terkelola dan tombol yang memiliki `aria-expanded`.
- Submenu Paket bisa diakses dengan sentuhan.
- CTA WhatsApp dapat berada di menu atau sebagai tombol yang mudah ditemukan.
- Floating WhatsApp hanya digunakan bila tidak menutupi CTA, cookie controls, atau konten penting.

## 6. Page Blueprints

### 6.1 Beranda
1. Navbar.
2. Hero dua kolom: copy di kiri, foto parcel di kanan (stack pada mobile).
   - Eyebrow: “Parcel Lebaran untuk Momen Berbagi”
   - H1 contoh: “Parcel Lebaran Berkesan untuk Keluarga dan Relasi”
   - Deskripsi faktual, jangan klaim yang belum terbukti.
   - CTA utama: “Lihat Paket”
   - CTA sekunder: “Konsultasi via WhatsApp”
3. Trust indicators yang terverifikasi.
4. Kategori paket.
5. Produk pilihan.
6. Value propositions.
7. Section kebutuhan korporat.
8. Portofolio terpilih.
9. Cara pemesanan dalam 3–5 langkah.
10. Testimoni asli (jika tersedia).
11. FAQ singkat.
12. CTA penutup.
13. Footer.

### 6.2 Tentang
- Hero pendek dengan foto asli.
- Cerita brand dan tujuan layanan.
- Nilai/standar kerja yang nyata.
- Proses persiapan paket.
- Area layanan faktual.
- CTA ke paket dan WhatsApp.

### 6.3 Listing Paket
- Breadcrumb.
- H1 “Paket Lebaran”.
- Intro singkat.
- Filter kategori/anggaran hanya jika benar-benar fungsional.
- Grid kartu paket.
- Informasi harga dan ketersediaan yang akurat.
- FAQ atau panduan memilih paket.
- CTA penutup.

### 6.4 Detail Paket
- Breadcrumb.
- Galeri foto.
- Nama paket, ringkasan, harga/ketentuan penawaran.
- Isi paket terstruktur.
- Cocok untuk penerima apa.
- Detail ukuran/kemasan.
- Opsi custom.
- MOQ, waktu persiapan, batas pemesanan, pengiriman, dan kebijakan relevan.
- FAQ spesifik.
- Paket terkait.
- CTA WhatsApp dengan nama paket di pesan.

### 6.5 Portofolio
- Intro dan filter jika jumlah konten cukup.
- Grid foto konsisten.
- Caption berisi konteks dan layanan yang diberikan.
- Studi kasus pilihan.
- CTA konsultasi.

### 6.6 Blog
- Listing dengan artikel unggulan, kategori, dan kartu artikel.
- Detail artikel dengan judul, penulis, tanggal yang benar, daftar isi bila panjang, konten, sumber, CTA relevan, dan artikel terkait.
- Lebar artikel dibatasi untuk keterbacaan.
- Elemen share bersifat opsional dan tidak mengganggu.
- Hindari pop-up yang langsung menutup konten.

### 6.7 Kontak
- CTA WhatsApp.
- Nomor dan jam layanan yang telah diverifikasi.
- Alamat/area pengiriman bila tersedia.
- Informasi yang perlu disiapkan calon pemesan.
- Form opsional dengan label, validasi, dan penjelasan privasi.

## 7. Komponen UI

### Button
- **Primary:** biru cukup gelap, teks putih, hover lebih gelap.
- **Secondary:** putih/transparent dengan border biru.
- **Text link:** underline atau perubahan visual yang jelas saat hover/focus.
- Semua tombol memiliki state hover, focus-visible, active, disabled.

### Package card
- Gambar di bagian atas dengan rasio tetap.
- Nama paket sebagai heading.
- Deskripsi 1–3 baris.
- Harga atau keterangan penawaran yang akurat.
- Link detail dan/atau CTA.
- Seluruh card tidak perlu dibuat clickable jika ada tombol/link eksplisit yang lebih aksesibel.

### Badge
- Kategori atau label yang faktual, misalnya “Custom tersedia” hanya jika benar.
- Hindari badge “Best Seller” tanpa data penjualan.

### FAQ accordion
- Gunakan komponen Bootstrap dengan tombol yang dapat diakses keyboard.
- Jawaban harus terlihat saat dibuka dan tidak hanya berisi keyword.
- Jangan menjanjikan FAQ rich result Google.

### Breadcrumb
- Diletakkan dekat bagian atas konten.
- Memiliki struktur navigasi yang jelas.
- Schema breadcrumb mengikuti breadcrumb yang terlihat.

### WhatsApp CTA
- Warna hijau WhatsApp dapat digunakan sebagai aksen sekunder, tetapi jangan sampai mengalahkan identitas biru.
- Label jelas: “Tanya via WhatsApp” atau “Pesan paket ini”.
- Pesan awal menyebut konteks paket.
- Gunakan format nomor internasional `6282131087971`.

## 8. Motion & Interaction
- Transisi singkat 150–250ms untuk hover/focus.
- Tidak menggunakan parallax berat.
- Tidak memutar carousel otomatis secara default.
- Hormati `prefers-reduced-motion`.
- Dropdown dan accordion harus tetap berfungsi tanpa animasi.
- Hindari interaksi yang hanya bergantung pada hover.

## 9. Responsive Behavior

### Breakpoint
Gunakan breakpoint Bootstrap yang sesuai versi yang dipin pada proyek. Jangan mendefinisikan breakpoint kedua yang bertentangan tanpa alasan.

### Mobile
- Hero stack vertikal.
- CTA dapat full-width jika lebih mudah digunakan.
- Kartu satu kolom.
- Tabel detail produk diubah menjadi list/definition list bila perlu.
- Navbar, gambar, dan tombol tidak menyebabkan horizontal overflow.

### Tablet
- Hero dua kolom bila ruang mencukupi.
- Grid 2 kolom.
- Jaga panjang teks dan ukuran tombol.

### Desktop
- Hero dua kolom.
- Grid 3–4 kolom.
- Konten artikel tetap dibatasi lebarnya.
- Jangan memperbesar teks dan ruang kosong berlebihan pada layar ultrawide.

## 10. CSS Architecture

Gunakan CSS variables dan struktur file yang sederhana:

```text
assets/css/
├── tokens.css       /* design tokens, jika dipisah */
├── base.css         /* reset ringan, body, heading, link */
├── layout.css       /* section, container tambahan, grid spesifik */
├── components.css   /* card, button, badge, CTA */
└── style.css        /* entry point/import atau semua CSS bila proyek kecil */
```

Untuk MVP kecil, satu `style.css` sudah cukup. Jangan membuat struktur file terlalu rumit tanpa kebutuhan.

Prinsip CSS:
- Bootstrap menangani grid/utilities/components dasar.
- CSS custom menangani identitas visual dan komponen khusus.
- Hindari `!important` kecuali benar-benar diperlukan.
- Jangan menimpa class Bootstrap global secara agresif.
- Gunakan class berawalan proyek seperti `.parcel-hero`, `.package-card`, `.section-soft`.
- Gunakan `clamp()` untuk tipografi dan spacing responsif.
- Pastikan focus state tidak dihapus.

### Contoh token CSS

```css
:root {
  --sky-500: #69bceb;
  --sky-700: #278cc8;
  --navy-900: #153b5b;
  --ice-50: #eff8fd;
  --white: #ffffff;
  --gold-500: #d9b56d;
  --text: #253746;
  --muted: #607586;
  --border: #dceaf2;
  --radius-card: 18px;
  --shadow-card: 0 12px 32px rgba(21, 59, 91, 0.08);
}

body {
  color: var(--text);
  background: var(--white);
  font-family: "Plus Jakarta Sans", system-ui, -apple-system, "Segoe UI", sans-serif;
  line-height: 1.65;
}

.section-soft {
  background: var(--ice-50);
}

.package-card {
  height: 100%;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  background: var(--white);
  transition: transform 180ms ease, box-shadow 180ms ease;
}

.package-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-card);
}

:focus-visible {
  outline: 3px solid var(--sky-700);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 11. Iconography
- Gunakan satu sistem ikon yang konsisten.
- Ikon hanya memperkuat label, bukan menggantikan label penting.
- Ikon dekoratif diberi `aria-hidden="true"`.
- Hindari emoji sebagai pengganti ikon UI utama.
- Pastikan ikon tidak mengubah alignment tombol.

## 12. SEO-Aware Design
- Satu H1 utama yang terlihat.
- Jangan membuat heading hanya untuk styling.
- Konten utama tidak terkunci di tab/slider yang sulit ditemukan crawler.
- Semua link penting menggunakan `<a href="...">`.
- Gambar hero tidak lazy-load jika menjadi kandidat LCP; gambar di bawah fold dapat lazy-load.
- Tambahkan `width`/`height` pada gambar.
- Sediakan OG image 1200×630 sebagai aset share, dengan brand dan visual produk yang terbaca.
- Meta title/description unik per URL.
- Canonical, robots, dan schema dikelola per template halaman.
- Schema tidak boleh memuat klaim yang tidak terlihat di halaman.
- Jangan memasang `FAQPage` demi mengejar rich result FAQ Google.
- Jangan mengandalkan meta keywords atau “AI schema” yang tidak didukung sebagai jalan pintas ranking.

## 13. Accessibility Checklist
- [ ] Kontras teks memenuhi WCAG 2.2 AA sejauh memungkinkan.
- [ ] Semua elemen interaktif bisa diakses dengan keyboard.
- [ ] Focus ring terlihat dan tidak terpotong.
- [ ] Menu mobile dan dropdown punya state aksesibel.
- [ ] Gambar informatif memiliki alt; gambar dekoratif alt kosong.
- [ ] Form mempunyai label dan pesan error yang jelas.
- [ ] CTA tidak hanya dibedakan melalui warna.
- [ ] Tidak ada animasi yang memaksa atau berkedip.
- [ ] Floating CTA tidak menutupi konten.
- [ ] Zoom browser tidak merusak layout.

## 14. QA Visual
Uji setidaknya:
- 360×800 mobile kecil
- 390×844 mobile umum
- 768px tablet
- 1024px laptop kecil
- 1440px desktop

Periksa:
- Navbar dan dropdown.
- Hero crop.
- Kartu dengan judul panjang.
- Harga dan CTA.
- Gambar gagal dimuat.
- Footer.
- WhatsApp URL dan pesan otomatis.
- Focus state.
- Tidak ada horizontal overflow.
- Konsistensi spacing dan warna antarhalaman.

## 15. Handoff ke Developer
Sebelum coding:
1. Konfirmasi nama brand, logo, domain, dan konten faktual.
2. Kumpulkan foto produk asli, daftar paket, isi, harga, ketentuan, dan area layanan.
3. Finalisasi wireframe untuk desktop/mobile.
4. Pin versi Bootstrap yang stabil saat proyek dimulai.
5. Terapkan design tokens dan komponen reusable.
6. Buat metadata, Open Graph, canonical, schema, sitemap, dan robots per template.
7. Uji accessibility, performa, dan data terstruktur sebelum rilis.
