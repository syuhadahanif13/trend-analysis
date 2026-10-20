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

## Struktur Menu & Modul Sistem

01. Executive Dashboard
    Ringkasan tren, sentimen, peluang bisnis, dan alert penting dalam satu layar.
    - Social Trend Score
    - Sentimen positif, negatif, dan netral
    - Topik emas yang sedang viral
    - Tren harga emas vs percakapan sosial
    - Peluang buyback dan penjualan

02. Social Listening
    Memantau percakapan publik tentang emas di berbagai kanal.
    - Keyword monitoring
    - Hashtag dan mention tracker
    - Trending topics
    - Volume percakapan per platform
    - Deteksi lonjakan percakapan (spike detection)

03. Trend & Sentiment Analysis
    Memahami apa yang dibicarakan masyarakat, bagaimana perasaannya, dan ke mana arah tren bergerak.
    - Sentiment analysis Bahasa Indonesia
    - Topic clustering
    - Emerging trends
    - Analisis alasan membeli atau menjual emas
    - Prediksi tren jangka pendek dengan tingkat keyakinan

04. Gold Market Intelligence
    Menghubungkan tren sosial dengan konteks pasar emas.
    - Harga emas terkini dan historis
    - Tren minat buyback vs pembelian
    - Korelasi harga dan percakapan
    - Analisis kata kunci seperti "harga emas hari ini"
    - Indikator peluang pasar

05. Competitor Intelligence
    Memantau posisi merek dan aktivitas kompetitor di ruang digital.
    - Share of Voice
    - Perbandingan engagement
    - Tren kampanye kompetitor
    - Konten dengan performa tertinggi
    - Perbandingan sentimen merek

07. Strategic Insights & Action
    Mengubah data mentah menjadi saran tindakan yang bisa dijalankan.
    - Daily brief pasar emas
    - Rekomendasi konten promosi
    - Ide kampanye buyback atau penjualan
    - Deteksi risiko reputasi
    - Tanya data menggunakan bahasa natural

08. Alerts & Reports
    Mengirimkan informasi penting secara otomatis kepada pengambil keputusan.
    - Alert melalui dashboard dan email
    - Laporan harian, mingguan, dan bulanan
    - Scheduled reports
    - Eskalasi isu viral
    - Ekspor CSV, Excel, dan PDF

09. Data Sources & Settings
    Mengatur sumber data, keyword, pengguna, dan tata kelola sistem.
    - Konfigurasi API dan sumber data
    - Master keyword dan brand
    - Pengelolaan akun kompetitor
    - Hak akses berdasarkan jabatan
    - Audit log dan status integrasi

---

## Cara Menjalankan Proyek

1. Jalankan Development Server:
   npm run dev

2. Buka browser di http://localhost:5173.
