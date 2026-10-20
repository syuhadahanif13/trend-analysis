import React from 'react';
import { TrendingUp, AlertCircle, ArrowUpRight, Flame, CheckCircle2, Scale, ExternalLink } from 'lucide-react';
import { HeroBanner } from '../HeroBanner';
import { SentimentOverviewDonut } from '../SalesOverviewDonut';
import { RevenueUpdatesBar } from '../RevenueUpdatesBar';
import { YearlySalesLine } from '../YearlySalesLine';
import { ActiveUserMap } from '../ActiveUserMap';
import { PaymentGatewaysCard } from '../PaymentGatewaysCard';
import { SocialTrendPost, HashtagStat } from '../../types';

interface ExecutiveDashboardViewProps {
  posts: SocialTrendPost[];
  hashtags: HashtagStat[];
  onOpenFeed: () => void;
  onOpenAI: () => void;
  onExport: () => void;
}

export const ExecutiveDashboardView: React.FC<ExecutiveDashboardViewProps> = ({
  posts,
  hashtags,
  onOpenFeed,
  onOpenAI,
  onExport
}) => {
  const totalViewsNum = posts.reduce((acc, p) => acc + p.views, 0);
  const tiktokViewsNum = posts.filter(p => p.platform === 'tiktok').reduce((acc, p) => acc + p.views, 0);
  const igViewsNum = posts.filter(p => p.platform === 'instagram').reduce((acc, p) => acc + p.views, 0);
  const buyIntentNum = posts.filter(p => p.sentiment === 'bullish_buy').reduce((acc, p) => acc + p.views, 0);
  const sellIntentNum = posts.filter(p => p.sentiment === 'bearish_sell').reduce((acc, p) => acc + p.views, 0);

  const formatShort = (n: number) => {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
    if (n >= 1_000) return (n / 1_000).toFixed(0) + 'k';
    return n.toString();
  };

  const tiktokPercent = totalViewsNum > 0 ? Math.round((tiktokViewsNum / totalViewsNum) * 100) : 40;
  const igPercent = totalViewsNum > 0 ? Math.round((igViewsNum / totalViewsNum) * 100) : 25;
  const buyPercent = totalViewsNum > 0 ? Math.round((buyIntentNum / totalViewsNum) * 100) : 20;
  const sellPercent = totalViewsNum > 0 ? Math.round((sellIntentNum / totalViewsNum) * 100) : 15;

  const bullishRatio = buyIntentNum + sellIntentNum > 0
    ? Math.round((buyIntentNum / (buyIntentNum + sellIntentNum)) * 100)
    : 68;
  const bearishRatio = 100 - bullishRatio;

  return (
    <div className="space-y-6">
      {/* Alert Notifikasi Penting Eksekutif */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
            <AlertCircle className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-800 block">
              Peluang Buyback & Penjualan Hari Ini
            </span>
            <p className="text-[11px] text-slate-600">
              Lonjakan percakapan buyback Antam meningkat 28.4%. Waktu ideal meluncurkan promosi buyback spread rendah.
            </p>
          </div>
        </div>
        <button
          onClick={onOpenAI}
          className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors shrink-0"
        >
          Lihat Rekomendasi
        </button>
      </div>

      {/* Hero Banner: Social Trend Score & Velocity */}
      <HeroBanner
        totalReach={totalViewsNum > 0 ? formatShort(totalViewsNum) : '34.3M'}
        tiktokViews={tiktokViewsNum > 0 ? formatShort(tiktokViewsNum) : '13.7M'}
        tiktokPercent={`(${tiktokPercent}%)`}
        instagramViews={igViewsNum > 0 ? formatShort(igViewsNum) : '8.6M'}
        instagramPercent={`(${igPercent}%)`}
        buyingIntent={buyIntentNum > 0 ? formatShort(buyIntentNum) : '6.9M'}
        buyingPercent={`(${buyPercent}%)`}
        buybackBuzz={sellIntentNum > 0 ? formatShort(sellIntentNum) : '5.1M'}
        buybackPercent={`(${sellPercent}%)`}
      />

      {/* Row 1: Three Visual Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Sentimen Positif, Negatif, Netral */}
        <SentimentOverviewDonut
          bullishPercent={bullishRatio}
          bearishPercent={bearishRatio}
          bullishLabel="Minat Beli Emas (Akumulasi)"
          bearishLabel="Tekanan Jual (Buyback Likuidasi)"
          onExplore={onOpenAI}
        />

        {/* Card 2: Interaksi & Lonjakan Percakapan Harian */}
        <RevenueUpdatesBar
          title="Daily Buzz Momentum"
          onExplore={onOpenFeed}
        />

        {/* Card 3: Tren Harga Emas vs Percakapan Sosial */}
        <YearlySalesLine
          title="Harga Emas vs Percakapan"
          firstAmount="Rp 1.485.000"
          firstYear="Spot Emas Antam"
          secondAmount="5.4k post"
          secondYear="Volume Diskusi"
          onExplore={onOpenFeed}
        />
      </div>

      {/* Row 2: Sebaran Audiens Wilayah & Topik Viral */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActiveUserMap
            percentageGrowth="+8.06% Keaktifan vs Bulan Lalu"
            totalUsers="23,214"
            label="Total Kreator & Audiens Emas Aktif"
            onExport={onExport}
          />
        </div>

        <div className="lg:col-span-1">
          <PaymentGatewaysCard
            hashtags={hashtags}
            onViewAll={onOpenFeed}
          />
        </div>
      </div>
    </div>
  );
};
