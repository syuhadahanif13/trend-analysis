-- 1. Table: trend_posts
CREATE TABLE IF NOT EXISTS public.trend_posts (
  id TEXT PRIMARY KEY,
  platform TEXT NOT NULL,
  author TEXT NOT NULL,
  author_handle TEXT,
  author_avatar TEXT,
  caption TEXT NOT NULL,
  hashtags TEXT[] DEFAULT '{}',
  views BIGINT DEFAULT 0,
  likes BIGINT DEFAULT 0,
  comments BIGINT DEFAULT 0,
  shares BIGINT DEFAULT 0,
  timestamp TEXT,
  post_url TEXT,
  thumbnail_url TEXT,
  gold_category TEXT DEFAULT 'antam',
  sentiment TEXT DEFAULT 'neutral',
  estimated_reach BIGINT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Table: hashtag_stats
CREATE TABLE IF NOT EXISTS public.hashtag_stats (
  id TEXT PRIMARY KEY,
  tag TEXT NOT NULL,
  platform TEXT DEFAULT 'both',
  mentions BIGINT DEFAULT 0,
  views TEXT,
  growth TEXT,
  sentiment_score INT DEFAULT 70,
  color TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Table: regional_buzz
CREATE TABLE IF NOT EXISTS public.regional_buzz (
  id TEXT PRIMARY KEY,
  city TEXT NOT NULL,
  province TEXT,
  active_users TEXT,
  growth TEXT,
  coord_x NUMERIC,
  coord_y NUMERIC,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Table: scraper_runs
CREATE TABLE IF NOT EXISTS public.scraper_runs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  actor_id TEXT DEFAULT 'subimpact/social-trends-hashtag-scraper',
  hashtags TEXT[] DEFAULT '{}',
  items_count INT DEFAULT 0,
  status TEXT DEFAULT 'completed',
  logs TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS and add public read/write policies for anon access
ALTER TABLE public.trend_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hashtag_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.regional_buzz ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scraper_runs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read on trend_posts" ON public.trend_posts FOR SELECT USING (true);
CREATE POLICY "Allow public insert on trend_posts" ON public.trend_posts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on trend_posts" ON public.trend_posts FOR UPDATE USING (true);

CREATE POLICY "Allow public read on hashtag_stats" ON public.hashtag_stats FOR SELECT USING (true);
CREATE POLICY "Allow public insert on hashtag_stats" ON public.hashtag_stats FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on hashtag_stats" ON public.hashtag_stats FOR UPDATE USING (true);

CREATE POLICY "Allow public read on regional_buzz" ON public.regional_buzz FOR SELECT USING (true);
CREATE POLICY "Allow public insert on regional_buzz" ON public.regional_buzz FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read on scraper_runs" ON public.scraper_runs FOR SELECT USING (true);
CREATE POLICY "Allow public insert on scraper_runs" ON public.scraper_runs FOR INSERT WITH CHECK (true);

-- Populate initial seed data
INSERT INTO public.hashtag_stats (id, tag, platform, mentions, views, growth, sentiment_score, color)
VALUES
  ('ht-1', '#hargaemas', 'both', 14200, '12.4M', '+28.4%', 78, '#EF4444'),
  ('ht-2', '#emasantam', 'tiktok', 9850, '8.9M', '+19.2%', 84, '#F59E0B'),
  ('ht-3', '#investasiemas', 'instagram', 7600, '6.5M', '+14.7%', 91, '#3B82F6'),
  ('ht-4', '#tokoemas', 'both', 5400, '4.8M', '+11.5%', 72, '#10B981'),
  ('ht-5', '#jualbeliemas', 'both', 4300, '3.9M', '+9.8%', 65, '#8B5CF6')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.regional_buzz (id, city, province, active_users, growth, coord_x, coord_y)
VALUES
  ('reg-1', 'Jakarta & Bodetabek', 'DKI & Jabar', '11,450', '+14.2%', 28, 62),
  ('reg-2', 'Surabaya & Sekitarnya', 'Jawa Timur', '5,320', '+9.1%', 42, 68),
  ('reg-3', 'Bandung Raya', 'Jawa Barat', '3,180', '+7.4%', 30, 66),
  ('reg-4', 'Medan', 'Sumatera Utara', '2,640', '+12.0%', 18, 35),
  ('reg-5', 'Makassar', 'Sulawesi Selatan', '1,890', '+6.8%', 58, 55),
  ('reg-6', 'Denpasar & Bali', 'Bali', '1,210', '+8.3%', 47, 72)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.trend_posts (id, platform, author, author_handle, author_avatar, caption, hashtags, views, likes, comments, shares, timestamp, post_url, thumbnail_url, gold_category, sentiment, estimated_reach)
VALUES
  ('post-1', 'tiktok', 'Raja Emas Official', '@rajaemasindonesia', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100', 'Harga emas Antam tembus rekor baru lagi hari ini. Waktunya hold atau mulai lepas sebagian? Cek tips buyback tanpa potongan tinggi disini. #hargaemas #emasantam #buybackemas #investasiemas', ARRAY['hargaemas', 'emasantam', 'buybackemas', 'investasiemas'], 842000, 49300, 2140, 8900, '2 jam yang lalu', 'https://www.tiktok.com/tag/hargaemas', 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=600', 'antam', 'bullish_buy', 1200000),
  ('post-2', 'instagram', 'Galeri Perhiasan Cantik', '@galeri_emas_fashion', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', 'Model gelang rantai emas kadar 750 (17K) terbaru 2024. Mewah buat kondangan sekaligus tabungan masa depan. #tokoemas #perhiasanemas #cincintunangan #emas750', ARRAY['tokoemas', 'perhiasanemas', 'cincintunangan', 'emas750'], 412000, 31200, 890, 3400, '4 jam yang lalu', 'https://www.instagram.com/explore/tags/perhiasanemas/', 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600', 'perhiasan', 'bullish_buy', 600000),
  ('post-3', 'tiktok', 'Finansial Anak Muda', '@melekfinansial', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', 'Gaji UMR mau mulai nabung emas 0.5 gram atau 1 gram? Jangan salah pilih vendor, ini beda Antam vs UBS vs Lotus Archi! #tabunganemas #investasiemas #emasantam #finansial', ARRAY['tabunganemas', 'investasiemas', 'emasantam', 'finansial'], 1250000, 98400, 4200, 24000, '6 jam yang lalu', 'https://www.tiktok.com', 'https://images.unsplash.com/photo-1624365169365-dcfbe1d8213e?w=600', 'edukasi', 'bullish_buy', 1800000),
  ('post-4', 'instagram', 'Sentra Emas Cikini', '@cikini_gold_center', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', 'Ramai pengunjung jual perhiasan lama untuk upgrade ke emas batangan murni 99.99%. Selisih spread lagi menguntungkan! #jualbeliemas #tokoemas #emasbatangan #harganewemas', ARRAY['jualbeliemas', 'tokoemas', 'emasbatangan', 'harganewemas'], 310000, 18500, 630, 1200, '8 jam yang lalu', 'https://www.instagram.com', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600', 'buyback', 'bearish_sell', 450000),
  ('post-5', 'tiktok', 'Emas Barokah Review', '@emas_barokah', 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100', 'Cek keaslian emas batangan dengan aplikasi CertiEye dan timbangan digital mikro. Awas emas palsu beredar! #edukasiemas #emasantam #emasbatangan #tokoemas', ARRAY['edukasiemas', 'emasantam', 'emasbatangan', 'tokoemas'], 670000, 42100, 1820, 9800, '12 jam yang lalu', 'https://www.tiktok.com', 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600', 'edukasi', 'neutral', 920000),
  ('post-6', 'tiktok', 'Semar Gold Hunter', '@semargold_hunter', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100', 'Review koleksi kalung rantai emas putih dan rose gold 18K. Cocok buat gift anniversary & mahar pernikahan. #perhiasanemas #cincintunangan #tokoemas', ARRAY['perhiasanemas', 'cincintunangan', 'tokoemas'], 520000, 38200, 1100, 4200, '1 hari yang lalu', 'https://www.tiktok.com', 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600', 'perhiasan', 'bullish_buy', 750000)
ON CONFLICT (id) DO NOTHING;
