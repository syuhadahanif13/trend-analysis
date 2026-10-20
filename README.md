# GoldTrends — Social Media Trend Analysis (Industri Jual-Beli Emas)

Platform analitik tren media sosial khusus industri jual-beli emas di Indonesia (Antam LM, UBS, Toko Emas, Buyback, dan Perhiasan) yang ditenagai oleh:
1. **Apify Actor** [**`subimpact/social-trends-hashtag-scraper`**](https://apify.com/subimpact/social-trends-hashtag-scraper) (Unified TikTok & Instagram Reels scraper).
2. **Supabase Cloud Server**: Database PostgreSQL, Rest API, dan Realtime backend terintegrasi penuh.

Tampilan antarmuka (UI) dirancang presisi sesuai referensi gambar: modern, rounded, soft pastel, clean, dan elegan.

---

## 🗄️ Konfigurasi Server Supabase

- **Supabase URL**: `https://esbkddgvwpzxdmrklgqv.supabase.co`
- **Project Ref**: `esbkddgvwpzxdmrklgqv`
- **Database Tables**:
  - `trend_posts`: Menyimpan video trending dari TikTok & Instagram Reels lengkap dengan metrik views, likes, shares, dan sentimen (Beli/Jual/Edukasi).
  - `hashtag_stats`: Metrik volume dan pertumbuhan hashtag industri emas (`#hargaemas`, `#emasantam`, dll).
  - `regional_buzz`: Sebaran interaksi audiens emas di wilayah Indonesia (Jakarta, Surabaya, Bandung, Medan, Bali, Makassar).
  - `scraper_runs`: Riwayat eksekusi dan log scraper Apify.

---

## 🌟 Fitur Utama

1. **Dashboard Visual Presisi Sesuai Referensi**:
   - **Sidebar Navigasi**: Logo Catalog Gold, menu Home, App (Viral Reels & TikTok, Apify Scraper, Contacts, Chats, Calendar, Email, Tickets), Page, dan profile card pengguna dengan tombol Setting & Logout.
   - **Header**: Live **Supabase Status Pill** (menampilkan koneksi & latency real-time), Search bar rounded, action buttons (Mail, Bell Notifikasi, Settings), serta tombol cepat **Sync Apify Trends**.
   - **Hero Sales Distribution**: Banner latar 3D ribbon bergelombang dengan 5 kartu metrik:
     - `Total Sales / Social Reach`: `$34,343.00`
     - `By Website (TikTok)`: `$4.5k (40%)`
     - `By Mobile (Instagram Reels)`: `$2.8k (25%)`
     - `By Market (Buying Intent)`: `$2.2k (20%)`
     - `By Agent (Toko Emas)`: `$1.7k (15%)`
   - **Sales Overview**: Donut chart interaktif dengan center value (`$500,00`), legend Profit (`$23,450`) & Expanse (`$23,450`).
   - **Revenue Updates**: Bar chart vertikal pastel dengan satu bar khusus berwarna biru indigo pekat dan highlight circular dot di puncaknya.
   - **Yearly Sales**: Smooth wave line chart kurva ganda (2023 vs 2022) dengan highlight peak dot.
   - **Active User / Regional Map**: Peta sebaran pengguna aktif (`23,214` / `+8.06%`) dengan tombol Export CSV data tren langsung dari Supabase.
   - **Payment Gateways**: Widget daftar transaksi / topik tren emas (`Paypal` / `+$6235`, `Wallet` / `-$235`, `Credit card` / `+$2235`) dengan tombol **View all transactions** yang membuka galeri video viral.

2. **Integrasi Apify Actor `subimpact/social-trends-hashtag-scraper`**:
   - Mendukung input **Apify API Token** langsung dari UI (disimpan secara aman di localStorage browser).
   - Pengaturan hashtag kustom: `#hargaemas`, `#emasantam`, `#jualbeliemas`, `#tokoemas`, `#investasiemas`, `#emasbatangan`, `#buybackemas`, `#cincintunangan`.
   - Menghubungkan ke API `https://api.apify.com/v2/acts/subimpact~social-trends-hashtag-scraper/run-sync-get-dataset-items`.
   - **Otomatis Sinkronisasi ke Supabase**: Setiap scraping yang selesai langsung disimpan ke tabel `trend_posts` dan dicatat ke `scraper_runs`.

3. **Viral Feed Modal**:
   - Filter berdasarkan platform (TikTok / Instagram Reels).
   - Filter berdasarkan kategori emas (Emas Antam LM, Perhiasan Emas, Toko & Brand Emas, Buyback/Jual Emas, Edukasi & Finansial).
   - Klasifikasi otomatis sentimen: **Beli Emas (Bullish)**, **Jual/Buyback (Bearish)**, atau **Edukasi**.
   - Tautan langsung ke konten asli.

---

## 🚀 Cara Menjalankan Proyek

1. **Jalankan Development Server**:
   ```bash
   npm run dev
   ```
2. Buka browser di [http://localhost:5173](http://localhost:5173).
