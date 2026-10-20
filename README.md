# GoldTrends - Social Media Trend Analysis (Industri Jual-Beli Emas)

Platform analitik tren media sosial khusus industri jual-beli emas di Indonesia (Antam LM, UBS, Toko Emas, Buyback, dan Perhiasan) yang ditenagai oleh:
1. Apify Actor subimpact/social-trends-hashtag-scraper (Unified TikTok & Instagram Reels scraper).
2. Supabase Cloud Server: Database PostgreSQL, Rest API, dan Realtime backend terintegrasi penuh.

Tampilan antarmuka dirancang presisi sesuai referensi gambar: modern, rounded, soft pastel, clean, dan profesional.

---

## Konfigurasi Server Supabase

- Supabase URL: https://esbkddgvwpzxdmrklgqv.supabase.co
- Project Ref: esbkddgvwpzxdmrklgqv
- Database Tables:
  - trend_posts: Menyimpan video trending dari TikTok & Instagram Reels lengkap dengan metrik views, likes, shares, dan sentimen (Beli/Jual/Edukasi).
  - hashtag_stats: Metrik volume dan pertumbuhan hashtag industri emas (#hargaemas, #emasantam, dll).
  - regional_buzz: Sebaran interaksi audiens emas di wilayah Indonesia (Jakarta, Surabaya, Bandung, Medan, Bali, Makassar).
  - scraper_runs: Riwayat eksekusi dan log scraper Apify.

---

## Fitur Utama

1. Dashboard Visual Trend Analytics:
   - Sidebar Navigasi: Menu Analytics (Trend Overview, Viral Reels & TikTok, Hashtag Intelligence, AI Market Insights), Market Radar (Toko & Brand Watch, Sentimen Jual-Beli, Regional Buzz Map), Data Engine (Apify Scraper), dan profil admin dengan opsi logout.
   - Header: Supabase Status Pill, Search bar rounded, tombol AI Market Insights, dan tombol Sync Apify Trends.
   - Hero Social Buzz & Trend Velocity: Banner latar 3D ribbon bergelombang dengan 5 kartu metrik:
     - Total Social Reach: 34.3M
     - By TikTok Reels: 13.7M (40%)
     - By Instagram Reels: 8.6M (25%)
     - Minat Beli (Bullish): 6.9M (20%)
     - Buyback & Jual (Bearish): 5.1M (15%)
   - Market Sentiment Ratio: Donut chart rasio Bullish (Minat Beli Emas) vs Bearish (Tekanan Jual / Buyback Likuidasi).
   - Daily Buzz Momentum: Bar chart vertikal aktivitas interaksi harian konten emas.
   - Trend Velocity & Virality Rate: Smooth wave line chart perbandingan virality rate 2024 vs 2023.
   - Regional Audience Buzz: Peta sebaran interaksi sentra pasar emas (Jakarta Cikini, Surabaya, Bandung, Medan, Makassar, Bali) dengan opsi Export CSV.
   - Top Trending Hashtags: Tagar terpopuler (#hargaemas, #emasantam, #investasiemas) dengan volume views, pertumbuhan, dan tombol galeri video viral.

2. Integrasi Apify Actor subimpact/social-trends-hashtag-scraper:
   - Mendukung input Apify API Token langsung dari modal UI.
   - Pengaturan hashtag target: #hargaemas, #emasantam, #jualbeliemas, #tokoemas, #investasiemas, #emasbatangan, #buybackemas, #cincintunangan.
   - Menghubungkan ke API run-sync Apify untuk ekstraksi TikTok & Instagram Reels.
   - Sinkronisasi otomatis ke database Supabase pada tabel trend_posts dan scraper_runs.

3. AI Market & Trend Intelligence:
   - Analisis sentimen otomatis (rasio minat beli vs tekanan buyback).
   - Ringkasan eksekutif AI mengenai sentimen publik terhadap harga emas.
   - Identifikasi pemicu percakapan teratas di media sosial.
   - Generator ide konten viral TikTok & Reels (hook 3 detik, alur konsep, rekomendasi audio, dan hashtags).
   - Rekomendasi strategis untuk pedagang toko emas dan investor.

4. Autentikasi Pengguna:
   - Halaman login minimalis tanpa elemen yang tidak diperlukan.
   - Akun: admin / m@juterusrajaemas.

5. Galeri Konten Viral:
   - Filter berdasarkan platform (TikTok / Instagram Reels).
   - Filter berdasarkan kategori emas (Antam, Perhiasan, Toko Emas, Buyback, Edukasi).
   - Link postingan valid yang langsung terhubung ke konten resmi.

---

## Cara Menjalankan Proyek

1. Jalankan Development Server:
   npm run dev

2. Buka browser di http://localhost:5173.
