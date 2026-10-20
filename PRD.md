# PRD — Website Parcel Lebaran

> **Status:** Draft v1.0  
> **Dokumen diperbarui:** 20 Oktober 2026  
> **Target implementasi:** 2026–2027  
> **Bahasa utama:** Bahasa Indonesia  
> **Nama brand/domain:** Belum ditentukan; gunakan placeholder sampai informasi bisnis dikonfirmasi.

## 1. Ringkasan Produk

Website katalog dan pemasaran untuk bisnis parcel/hampers Lebaran. Website membantu pengunjung memahami brand, menjelajahi kategori paket, melihat portofolio, mendapatkan informasi yang jelas, membaca panduan, dan menghubungi admin melalui WhatsApp.

Website dibangun dengan HTML semantik, Bootstrap 5.x yang stabil pada saat implementasi, dan CSS kustom. JavaScript vanilla hanya digunakan untuk interaksi ringan. Tidak menggunakan framework frontend besar.

**Nomor WhatsApp tujuan:** `082131087971`  
**Format tautan:** `https://wa.me/6282131087971`  
**Contoh pesan:** `https://wa.me/6282131087971?text=Halo%2C%20saya%20ingin%20bertanya%20tentang%20paket%20parcel%20Lebaran.`

> Sebelum publikasi, verifikasi bahwa nomor aktif dan pemiliknya menyetujui penggunaan nomor tersebut. Jangan menampilkan harga, testimoni, alamat, sertifikasi, atau klaim yang belum diverifikasi.

## 2. Tujuan dan Sasaran

### Tujuan bisnis
- Menghasilkan pertanyaan dan pesanan melalui WhatsApp.
- Memperlihatkan variasi paket dan kualitas penyajian produk.
- Membangun kepercayaan untuk pembeli individu, keluarga, perusahaan, instansi, dan kebutuhan relasi bisnis.
- Mengembangkan traffic organik melalui halaman kategori dan konten blog yang berguna.

### Tujuan pengguna
- Menemukan paket sesuai anggaran, penerima, isi, dan jumlah pesanan.
- Memahami isi paket, ukuran, opsi personalisasi, minimum order, waktu produksi, pengiriman, dan cara pemesanan.
- Melihat bukti pekerjaan sebelumnya melalui portofolio asli.
- Mendapat jawaban yang cepat tanpa harus mencari informasi dari banyak halaman.

### KPI yang dapat diukur
- Klik WhatsApp per halaman dan per paket.
- Rasio klik CTA terhadap sesi halaman.
- Jumlah pertanyaan berkualitas dan pesanan yang berasal dari website (dicatat admin).
- Organic clicks/impressions, CTR, halaman terindeks, dan query relevan di Google Search Console.
- Core Web Vitals dan error teknis.
- Engagement pada halaman paket, portofolio, dan artikel.

Target angka ditetapkan setelah baseline 30–60 hari; jangan menjanjikan ranking atau jumlah lead tertentu.

## 3. Audiens Utama

1. **Pembeli individu/keluarga:** mencari parcel untuk keluarga, kerabat, tetangga, atau tuan rumah.
2. **Perusahaan dan HR/GA/Procurement:** mencari parcel karyawan, klien, mitra, dan stakeholder.
3. **UMKM/komunitas/instansi:** memerlukan paket dalam jumlah tertentu dan kemungkinan branding.
4. **Pelanggan custom:** ingin menyesuaikan isi, kemasan, kartu ucapan, atau identitas perusahaan.

## 4. Ruang Lingkup

### Termasuk MVP
- Beranda
- Tentang
- Halaman daftar paket
- Halaman kategori paket
- Halaman detail tiap paket
- Portofolio
- Blog: daftar artikel dan detail artikel
- Kontak/cara pemesanan (dapat berupa section dan halaman khusus)
- CTA WhatsApp dengan pesan kontekstual
- SEO teknis dasar, metadata, Open Graph, canonical, sitemap, robots.txt, JSON-LD yang sesuai
- Responsive design, aksesibilitas dasar, analitik berbasis persetujuan bila diperlukan
- Halaman kebijakan privasi dan syarat pemesanan jika memang dibutuhkan oleh praktik bisnis

### Tidak termasuk dalam MVP
- Checkout dan pembayaran online
- Akun pelanggan
- Dashboard admin/CMS
- Stok real-time dan sinkronisasi gudang
- Perhitungan ongkir otomatis
- Chatbot AI
- Review otomatis dari pihak ketiga

Jika konten perlu dikelola oleh tim nonteknis, pertimbangkan CMS pada fase berikutnya. Untuk website statis, data paket dan artikel dapat disimpan dalam file HTML/JSON atau template sederhana.

## 5. Arsitektur Informasi dan URL

Gunakan URL pendek, deskriptif, lowercase, dan konsisten. Hindari parameter tidak perlu.

- `/` — Beranda
- `/tentang/` — Tentang
- `/paket/` — Semua paket
- `/paket/parcel-lebaran-premium/` — Detail paket
- `/paket/parcel-lebaran-ekonomis/` — Detail paket
- `/paket/parcel-lebaran-korporat/` — Detail paket korporat
- `/paket/parcel-lebaran-custom/` — Detail paket custom
- `/portofolio/` — Galeri proyek
- `/blog/` — Daftar artikel
- `/blog/panduan-memilih-parcel-lebaran/` — Artikel
- `/kontak/` — Kontak dan pemesanan
- `/kebijakan-privasi/` — Kebijakan privasi bila ada pemrosesan data yang relevan
- `/404.html` — Halaman tidak ditemukan

Slug final harus berdasarkan riset kata kunci, maksud pencarian, dan struktur bisnis yang sebenarnya. Jangan membuat halaman tipis hanya untuk mengejar variasi kata kunci.

## 6. Navigasi

Navbar desktop:
- Logo/nama brand
- Beranda
- Tentang
- Paket (dropdown)
  - Semua Paket
  - Parcel Premium
  - Parcel Ekonomis
  - Parcel Korporat
  - Parcel Custom
- Portofolio
- Blog
- Tombol utama “Pesan via WhatsApp”

Navbar mobile:
- Tombol menu yang bisa dioperasikan keyboard
- Dropdown paket yang mudah digunakan dengan sentuhan
- CTA WhatsApp yang terlihat, tidak menutupi konten
- Fokus keyboard dan atribut aksesibilitas yang benar

Gunakan komponen navbar/dropdown Bootstrap dan JavaScript bundle Bootstrap resmi. Pastikan dropdown berfungsi dengan keyboard dan layar sentuh.

## 7. Spesifikasi Isi per Halaman

### 7.1 Beranda
Urutan section yang disarankan:
1. **Hero:** H1 jelas, ringkasan nilai utama, CTA “Lihat Paket” dan “Tanya via WhatsApp”, foto parcel asli berkualitas.
2. **Trust strip:** fakta yang dapat dibuktikan, misalnya jenis layanan, cakupan pengiriman, atau pengalaman. Jangan mengarang angka.
3. **Kategori paket:** premium, ekonomis, korporat, custom; tiap kartu menuju halaman relevan.
4. **Paket pilihan:** foto, nama, isi utama, kisaran harga jika sudah terverifikasi, dan CTA.
5. **Alasan memilih brand:** jelaskan proses pemilihan isi, kualitas kemasan, opsi personalisasi, dan layanan—hanya sesuai kemampuan nyata.
6. **Pilihan untuk perusahaan:** volume order, kartu ucapan/logo, invoice, jadwal pengiriman, dan mekanisme approval bila benar tersedia.
7. **Portofolio pilihan:** foto pesanan yang benar-benar pernah dibuat dengan izin publikasi.
8. **Proses pemesanan:** pilih paket → konsultasi → konfirmasi isi/harga → pembayaran sesuai ketentuan → produksi/persiapan → pengiriman.
9. **Testimoni:** hanya testimoni asli, dengan izin.
10. **FAQ ringkas:** pertanyaan yang benar-benar sering ditanyakan.
11. **CTA penutup:** WhatsApp dengan pesan awal.
12. **Footer:** kontak, navigasi, jam layanan jika ada, media sosial resmi, kebijakan.

SEO beranda:
- Satu H1 utama yang spesifik.
- Title dan meta description unik.
- Konten tekstual yang menjelaskan produk, bukan gambar saja.
- Tautan internal menuju kategori, portofolio, dan artikel penting.

### 7.2 Tentang
Isi:
- Profil bisnis dan cerita brand yang faktual.
- Misi/pendekatan dalam menyiapkan parcel.
- Standar pemilihan isi dan kemasan yang benar-benar diterapkan.
- Tim atau proses kerja jika relevan.
- Area layanan/pengiriman yang benar-benar dijangkau.
- Foto tim, tempat kerja, atau proses asli jika tersedia.
- CTA ke katalog dan WhatsApp.

Hindari klaim seperti “nomor satu”, “terbaik”, “terpercaya sejak...” tanpa bukti yang dapat diverifikasi.

### 7.3 Paket (halaman listing)
Isi:
- Intro singkat untuk membantu memilih.
- Filter sederhana bila katalog cukup banyak: kategori, anggaran, tujuan penerima, opsi custom.
- Kartu paket dengan foto, nama, ringkasan isi, harga/kisaran harga yang valid, ketersediaan atau status pre-order jika terkelola.
- Link ke detail masing-masing paket.
- Penjelasan bahwa isi dapat berubah hanya jika kebijakan bisnis memang demikian.
- CTA WhatsApp dengan nama paket terpilih.

Jangan menyebut filter sebagai filter stok real-time jika tidak ada integrasi stok.

### 7.4 Halaman detail paket
Setiap paket harus memuat:
- Nama paket yang unik dan deskriptif.
- Galeri foto asli; alt text mendeskripsikan gambar secara natural.
- Harga atau “Hubungi kami untuk penawaran” dengan alasan yang jelas; jangan menampilkan harga palsu.
- Daftar isi paket dan kuantitas/ukuran jika diketahui.
- Dimensi/jenis kemasan jika relevan.
- Cocok untuk siapa dan situasi pemberian.
- Opsi personalisasi: kartu ucapan, logo, warna, sleeve, atau custom lain—hanya yang tersedia.
- Minimum pemesanan, estimasi persiapan, batas pemesanan musiman, metode pengiriman, dan kebijakan substitusi jika ada.
- Cara penyimpanan dan tanggal kedaluwarsa untuk makanan jika informasinya tersedia.
- FAQ spesifik produk.
- Breadcrumb dan tautan ke paket sejenis.
- CTA WhatsApp berisi nama paket dan pertanyaan yang relevan.

Data produk untuk schema harus sama dengan informasi yang tampak pada halaman. Jangan menambahkan rating, harga, ketersediaan, atau review yang tidak nyata.

### 7.5 Portofolio
Isi:
- Intro yang menjelaskan jenis proyek.
- Galeri berdasarkan kategori, tipe penerima, atau kebutuhan (jika jumlah karya cukup).
- Setiap proyek: foto asli, konteks singkat, jenis paket, opsi custom yang digunakan, dan jumlah pesanan hanya jika mendapat izin untuk dipublikasikan.
- Studi kasus singkat untuk proyek penting: brief → solusi → hasil yang dapat dibuktikan.
- CTA untuk mendiskusikan kebutuhan serupa.

Dapatkan izin penggunaan foto, logo klien, dan identitas penerima. Jangan memublikasikan informasi pesanan yang bersifat rahasia.

### 7.6 Blog
Halaman daftar:
- Intro dan kategori editorial.
- Artikel unggulan dan artikel terbaru.
- Kartu dengan judul, ringkasan, penulis, tanggal publikasi/pembaruan yang benar, dan gambar.
- Pagination atau “Muat lainnya” yang tetap dapat dirayapi melalui link HTML.

Halaman artikel:
- Judul yang menjawab kebutuhan pembaca.
- Ringkasan jawaban singkat setelah judul bila sesuai.
- Penulis dengan bio dan halaman profil jika memungkinkan.
- Tanggal publikasi dan pembaruan yang akurat.
- Daftar isi untuk artikel panjang.
- Isi orisinal, contoh nyata, foto sendiri, langkah praktis, dan sumber tepercaya bila digunakan.
- FAQ hanya bila benar-benar membantu pembaca.
- Artikel terkait dan CTA paket yang relevan.
- Breadcrumb, canonical, Open Graph, dan JSON-LD `Article`/`BlogPosting` yang sesuai.

Topik awal:
- Cara memilih parcel Lebaran berdasarkan penerima dan anggaran.
- Perbedaan parcel ekonomis, premium, dan korporat.
- Checklist pemesanan parcel Lebaran untuk perusahaan.
- Ide kartu ucapan parcel untuk keluarga dan relasi bisnis.
- Cara menyimpan makanan dalam parcel dengan aman (gunakan sumber otoritatif).
- Kapan sebaiknya memesan parcel Lebaran untuk pesanan banyak.
- Cara menyiapkan parcel custom dengan logo perusahaan.

Artikel harus menjawab intent pembaca, bukan sekadar mengulang keyword. Cantumkan sumber, penulis, dan pengalaman langsung bila relevan.

### 7.7 Kontak dan pemesanan
Isi:
- Tombol WhatsApp utama.
- Nomor bisnis, jam operasional, email, alamat, dan area pengiriman hanya bila sudah diverifikasi.
- Ringkasan informasi yang perlu disiapkan: nama paket, jumlah, tujuan pengiriman, tanggal dibutuhkan, opsi custom.
- Form sederhana opsional; minimalkan data pribadi.
- Ekspektasi waktu balasan yang realistis.
- Tautan kebijakan privasi jika formulir/analitik mengumpulkan data.

### 7.8 Halaman sistem
- 404 dengan pencarian/navigasi kembali.
- Halaman kebijakan privasi yang sesuai praktik pengumpulan data.
- Halaman syarat pemesanan/pengiriman jika diperlukan.
- Halaman pencarian internal hanya jika ada fungsi pencarian yang nyata.

## 8. Perilaku WhatsApp

Gunakan format:
`https://wa.me/6282131087971?text={URL_ENCODED_MESSAGE}`

Contoh pesan:
- Umum: `Halo, saya ingin bertanya tentang parcel Lebaran.`
- Paket: `Halo, saya tertarik dengan paket [NAMA PAKET]. Mohon info isi, harga, dan ketersediaannya.`
- Korporat: `Halo, saya ingin konsultasi parcel Lebaran untuk kebutuhan perusahaan. Perkiraan jumlah: [JUMLAH], tanggal dibutuhkan: [TANGGAL].`

Persyaratan:
- Nomor ditulis dalam format internasional tanpa `+`, spasi, atau tanda baca pada URL.
- Pesan di-URL-encode.
- Gunakan `target="_blank"` dan `rel="noopener noreferrer"` bila dibuka di tab baru.
- Tombol memiliki label aksesibel; jangan hanya memakai ikon.
- Lacak klik melalui event analitik jika consent dan konfigurasi privasi sudah benar.
- Jangan mengirim data pribadi sensitif ke URL atau analytics.

## 9. SEO, AEO, GEO, dan Discoverability

### 9.1 SEO on-page
- Riset kata kunci dan intent per halaman.
- Satu H1 utama; hierarki H2/H3 logis.
- Title unik dan deskriptif; meta description unik dan berguna.
- URL pendek, lowercase, konsisten.
- Canonical self-referencing pada halaman indexable.
- Internal linking kontekstual.
- Gambar dikompresi, dimensi ditentukan, alt text akurat.
- Konten penting tersedia sebagai teks HTML yang dapat dirayapi.
- Tidak melakukan keyword stuffing, doorway pages, cloaking, atau konten massal yang tidak memberi nilai.

### 9.2 SEO teknis
- HTTPS.
- `robots.txt` yang tidak memblokir CSS/JS/gambar penting.
- XML sitemap berisi URL canonical yang boleh diindeks.
- Status HTTP tepat: 200 untuk halaman aktif, 301 untuk redirect permanen, 404/410 untuk konten yang dihapus.
- Canonical dan redirect konsisten; hindari duplikasi URL dengan slash/parameter.
- HTML semantik, tautan `<a href>` asli, halaman dapat dirayapi tanpa bergantung pada interaksi.
- Mobile-first, performa, aksesibilitas, dan Core Web Vitals.
- Google Search Console dan Bing Webmaster Tools.
- Validasi melalui URL Inspection, Rich Results Test, Schema Markup Validator, Lighthouse/PageSpeed Insights.
- Pantau error server, broken links, sitemap, canonical, dan indexing.

### 9.3 AEO dan GEO
AEO (Answer Engine Optimization) dan GEO (Generative Engine Optimization) bukan jaminan tampil di jawaban AI. Fondasinya tetap konten yang bermanfaat, jelas, dapat dipercaya, mudah ditemukan, dan memiliki sumber/identitas yang transparan.

Praktik:
- Jawab pertanyaan utama secara langsung di awal bagian.
- Gunakan heading berbentuk pertanyaan bila sesuai intent.
- Berikan fakta spesifik yang bisa diverifikasi, detail produk, kebijakan, batasan, dan contoh nyata.
- Jelaskan siapa penulis/pemilik bisnis dan cara menghubungi.
- Gunakan bahasa alami, definisi jelas, tabel/list bila membantu pemahaman.
- Tampilkan informasi penting sebagai teks, bukan hanya dalam gambar.
- Tautkan sumber eksternal yang kredibel untuk klaim faktual.
- Hindari membuat halaman “AI-only”, pengulangan sinonim, klaim tanpa bukti, dan konten yang diproduksi massal tanpa nilai tambah.
- Tidak perlu membuat file khusus atau markup “AI schema” hanya demi berharap muncul di AI Search; ikuti panduan resmi yang berlaku.

### 9.4 Local SEO
Jika bisnis melayani lokasi tertentu:
- Tampilkan nama bisnis, alamat, telepon, jam operasional, dan area layanan yang benar-benar valid.
- Buat profil Google Business Profile jika memenuhi kelayakan.
- Konsistenkan data bisnis di website dan direktori tepercaya.
- Gunakan `LocalBusiness` hanya bila cocok dengan bisnis nyata dan isi sesuai fakta.
- Jangan membuat halaman kota massal yang hanya mengganti nama kota tanpa informasi unik.
- Jika bisnis tidak menerima pelanggan di lokasi fisik, jangan menyiratkan adanya toko publik.

### 9.5 Meta tags dan Open Graph
Setiap halaman perlu:
- `title`
- `meta name="description"`
- `meta name="robots"` sesuai status indexability
- `link rel="canonical"`
- `meta property="og:title"`
- `og:description`
- `og:type` (`website` atau `article`)
- `og:url`
- `og:image` berupa URL absolut ke gambar yang dapat diakses
- `og:site_name`
- `og:locale` (`id_ID`)
- Twitter/X card metadata sebagai pelengkap kompatibilitas platform
- Favicon dan theme color

Meta robots tidak perlu ditambahkan jika default index/follow sudah sesuai; tambahkan eksplisit hanya jika diperlukan. Open Graph membantu tampilan share sosial, bukan faktor ranking langsung.

### 9.6 Schema / structured data
Gunakan JSON-LD, dengan isi yang konsisten terhadap halaman yang terlihat. Schema adalah petunjuk pemahaman, bukan jaminan rich result.

Pilihan sesuai kebutuhan:
- `Organization` untuk identitas bisnis.
- `WebSite` untuk website.
- `BreadcrumbList` pada halaman bertingkat.
- `Article` atau `BlogPosting` pada artikel.
- `Product` hanya pada halaman produk yang memenuhi panduan, dengan harga/ketersediaan/review hanya jika nyata dan memenuhi ketentuan.
- `LocalBusiness` jika benar sesuai jenis usaha dan lokasi.
- `ImageObject` atau `VideoObject` jika relevan dan memenuhi pedoman.
- `Person` untuk penulis/author jika ada identitas penulis yang nyata.

Jangan pasang semua schema di semua halaman. Jangan menambahkan `FAQPage` dengan ekspektasi rich result FAQ di Google; dukungan rich result FAQ telah dihentikan pada 2026. FAQ tetap boleh ditulis untuk pengguna. Jangan membuat rating/review fiktif atau markup tersembunyi. Pastikan markup lolos validator dan sesuai konten tampak.

### 9.7 Sitemap, robots, dan indexing
- `sitemap.xml`: hanya URL canonical yang ingin diindeks; gunakan `lastmod` hanya jika tanggal benar-benar mencerminkan perubahan signifikan.
- `robots.txt`: arahkan ke sitemap; jangan menganggap robots.txt sebagai cara menghapus URL dari indeks.
- Untuk halaman yang tidak ingin diindeks, gunakan `noindex` yang dapat dirayapi agar crawler bisa membaca directive.
- Jangan masukkan halaman staging, hasil pencarian internal, URL duplikat, atau halaman tipis ke sitemap.
- Ajukan sitemap di Search Console setelah domain live.

## 10. Design System

### Palet warna
- Sky Blue / primary: `#69BCEB`
- Deep Sky: `#278CC8`
- Navy: `#153B5B`
- Ice Blue: `#EFF8FD`
- White: `#FFFFFF`
- Warm Gold accent: `#D9B56D`
- Body text: `#253746`
- Muted text: `#607586`
- Border: `#DCEAF2`

Periksa kontras warna sebelum final. Jangan memakai biru muda untuk teks kecil di latar putih jika kontrasnya tidak memadai.

### Tipografi
- Font sistem atau Google Font yang dioptimalkan, misalnya Plus Jakarta Sans.
- H1/H2 tegas, body nyaman dibaca.
- Gunakan skala ukuran responsif dengan `clamp()`.
- Batasi panjang baris teks agar mudah dipindai.

### Komponen
- Navbar sticky opsional dengan shadow tipis.
- Hero dengan foto produk asli.
- Card paket dengan rasio gambar konsisten.
- Badge kategori sederhana.
- CTA utama biru, CTA sekunder outline.
- Breadcrumb.
- Accordion FAQ bila bermanfaat dan dapat diakses.
- Footer berisi navigasi dan kontak.
- Floating WhatsApp button dengan label/accessible name dan tidak menutupi konten atau kontrol lain.

## 11. Persyaratan Teknis

- HTML5 semantik.
- Bootstrap 5.x versi stabil terbaru saat mulai implementasi; pin versi dan upgrade melalui pengujian.
- CSS kustom dalam `assets/css/style.css`, bukan inline style berlebihan.
- JavaScript vanilla dalam `assets/js/main.js`.
- Gunakan Bootstrap Icons hanya bila diperlukan; hindari ketergantungan berlebihan.
- Gunakan Bootstrap bundle untuk komponen dropdown/navbar yang memerlukan JavaScript.
- Gunakan `defer` untuk script non-kritis bila sesuai.
- Gambar hero boleh eager-load; gambar di bawah fold gunakan lazy loading.
- Tentukan `width` dan `height` gambar untuk mengurangi layout shift.
- Hindari autoplay video/audio dan animasi yang mengganggu.
- Hormati `prefers-reduced-motion`.
- Gunakan `:focus-visible`, label form, alt text, dan struktur heading yang benar.

### Struktur folder usulan
```text
parcel-lebaran/
├── index.html
├── tentang/
│   └── index.html
├── paket/
│   ├── index.html
│   ├── parcel-premium/index.html
│   ├── parcel-ekonomis/index.html
│   ├── parcel-korporat/index.html
│   └── parcel-custom/index.html
├── portofolio/index.html
├── blog/
│   ├── index.html
│   └── panduan-memilih-parcel-lebaran/index.html
├── kontak/index.html
├── kebijakan-privasi/index.html
├── 404.html
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   ├── images/
│   └── icons/
├── robots.txt
└── sitemap.xml
```

## 12. Aksesibilitas dan UX
- Target WCAG 2.2 AA sejauh memungkinkan.
- Kontras teks memadai.
- Semua aksi dapat dilakukan dengan keyboard.
- Focus state terlihat.
- Tombol dan link punya nama yang jelas.
- Dropdown, modal, dan accordion mengikuti pola aksesibilitas.
- Ukuran target sentuh nyaman.
- Form punya label, pesan error, dan status yang jelas.
- Jangan menyampaikan informasi hanya melalui warna.
- WhatsApp CTA tidak menutupi tombol consent atau konten penting.

## 13. Performa dan Core Web Vitals
Target internal untuk pengalaman yang baik, dievaluasi pada persentil ke-75 pengguna nyata:
- LCP ≤ 2,5 detik
- INP ≤ 200 ms
- CLS ≤ 0,1

Strategi:
- Foto WebP/AVIF dengan fallback bila diperlukan.
- Ukuran gambar responsif melalui `srcset` dan `sizes`.
- Kompresi foto tanpa mengorbankan detail produk.
- Kurangi script pihak ketiga.
- Hindari layout shift dari gambar/font/banner.
- Cache asset statis dan gunakan CDN bila relevan.
- Uji mobile dan koneksi lambat, bukan hanya desktop lokal.

## 14. Analytics dan Privasi
- Gunakan Google Search Console untuk performa organik.
- Analytics opsional untuk page view, CTA click, kategori yang diminati, dan form submission.
- Hindari mengirim nama, nomor telepon, isi chat, atau data sensitif ke event analytics.
- Terapkan mekanisme consent sesuai teknologi yang digunakan dan aturan yang berlaku.
- Jelaskan penggunaan data secara jujur dalam kebijakan privasi.
- Simpan data lead hanya selama diperlukan dan batasi akses.

## 15. Acceptance Criteria

### Konten dan navigasi
- Semua item navbar bekerja pada desktop dan mobile.
- Dropdown Paket dapat dioperasikan dengan mouse, sentuhan, dan keyboard.
- Setiap paket mempunyai halaman detail dan CTA WhatsApp dengan nama paket di pesan.
- Semua harga, isi paket, testimoni, klaim, kontak, dan foto sudah diverifikasi.
- Tidak ada placeholder yang tertinggal saat go-live.

### SEO
- Setiap halaman indexable mempunyai title, description, canonical, dan H1 yang sesuai.
- URL canonical konsisten dan status HTTP benar.
- Sitemap valid dan robots.txt tidak memblokir aset penting.
- JSON-LD valid dan cocok dengan konten halaman.
- Open Graph memakai URL absolut dan gambar share yang bisa diakses.
- Tidak ada broken links kritis, duplicate title massal, atau halaman staging terindeks.

### UX/performa
- Tidak ada horizontal overflow pada ukuran layar utama.
- Gambar memiliki dimensi dan alt text yang sesuai.
- CTA WhatsApp mengarah ke nomor yang benar dan pesan ter-encode.
- Core Web Vitals diuji sebelum dan sesudah rilis.
- Fokus keyboard, label, dan kontras diperiksa.

## 16. Rencana Rilis

1. **Discovery:** konfirmasi nama brand, domain, produk, harga, area layanan, kebijakan, dan aset.
2. **Content:** susun data produk, foto, FAQ, portofolio, dan artikel.
3. **Design:** finalisasi wireframe, warna, tipografi, komponen, dan responsive states.
4. **Build:** HTML, Bootstrap, CSS, JS, metadata, schema, sitemap.
5. **QA:** uji perangkat, keyboard, tautan, WhatsApp, validator schema, Lighthouse, dan broken links.
6. **Launch:** HTTPS, domain canonical, Search Console, sitemap, analytics/consent.
7. **Iteration:** pantau performa dan pertanyaan pelanggan; perbarui konten berdasarkan data.

## 17. Informasi yang Perlu Dikonfirmasi Sebelum Produksi
- Nama brand, domain, logo, dan favicon.
- Lokasi bisnis dan area pengiriman.
- Jenis paket, isi, harga, foto asli, ukuran, stok/pre-order.
- MOQ dan estimasi produksi.
- Pilihan custom yang tersedia.
- Metode pembayaran, pengiriman, retur, dan pembatalan.
- Jam layanan dan SLA balasan WhatsApp.
- Bukti/testimoni dan izin penggunaan logo/foto klien.
- Nama penulis artikel dan kredensial yang relevan.
- Email bisnis, media sosial resmi, dan kontak alternatif.
