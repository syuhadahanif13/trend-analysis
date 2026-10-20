import React from 'react';
import { MoreHorizontal, Hash, TrendingUp, Sparkles } from 'lucide-react';
import { HashtagStat } from '../types';

interface PaymentGatewaysCardProps {
  onViewAll?: () => void;
  hashtags?: HashtagStat[];
}

export const PaymentGatewaysCard: React.FC<PaymentGatewaysCardProps> = ({
  onViewAll,
  hashtags = []
}) => {
  // Production default hashtag watch
  const items = hashtags.length > 0 ? hashtags.slice(0, 3) : [
    {
      id: 'ht-1',
      tag: '#hargaemas',
      platform: 'both',
      mentions: 14200,
      views: '12.4M Views',
      growth: '+28.4%',
      sentimentScore: 84,
      color: '#FF4D6D',
      subtitle: 'Antam LM & Spot Rate'
    },
    {
      id: 'ht-2',
      tag: '#emasantam',
      platform: 'tiktok',
      mentions: 9850,
      views: '8.9M Views',
      growth: '+19.2%',
      sentimentScore: 91,
      color: '#F59E0B',
      subtitle: 'Emas Batangan & Mini'
    },
    {
      id: 'ht-3',
      tag: '#investasiemas',
      platform: 'instagram',
      mentions: 7600,
      views: '6.5M Views',
      growth: '+14.7%',
      sentimentScore: 88,
      color: '#2563EB',
      subtitle: 'Nabung Emas Pemula'
    }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-soft border border-slate-100 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-slate-800 text-base">
            Top Trending Hashtags
          </h3>
          <p className="text-[11px] text-slate-400 font-medium">Tagar Terpopuler di TikTok & Reels</p>
        </div>
        <button 
          onClick={onViewAll}
          title="Lihat Semua Tagar"
          className="text-slate-300 hover:text-blue-600 transition-colors p-1"
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* List items with matching circular color icons */}
      <div className="space-y-4 my-auto">
        {items.map((item, idx) => (
          <div key={item.id || idx} className="flex items-center justify-between group">
            <div className="flex items-center gap-3.5">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-extrabold text-sm shadow-sm transition-transform group-hover:scale-105"
                style={{ backgroundColor: item.color || '#3B82F6' }}
              >
                <Hash className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 leading-tight">
                  {item.tag}
                </h4>
                <p className="text-[11px] font-medium text-slate-400">
                  {(item as any).subtitle || `${item.views} • ${item.platform.toUpperCase()}`}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-bold text-emerald-600 flex items-center justify-end gap-0.5">
                <TrendingUp className="w-3 h-3" />
                <span>{item.growth}</span>
              </div>
              <div className="text-[10px] text-slate-400 font-medium">
                {item.views}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Button: View all viral content */}
      <div className="mt-5">
        <button
          onClick={onViewAll}
          className="w-full py-3 bg-[#EEF2FF] hover:bg-[#E0E7FE] text-[#4F46E5] rounded-2xl text-xs font-bold tracking-tight transition-all active:scale-[0.99] text-center cursor-pointer"
        >
          Buka Galeri Video Viral ({items.length}+ Topik)
        </button>
      </div>
    </div>
  );
};
