import React, { useState } from 'react';
import { Search, Flame, Radio, ArrowUpRight, Heart, MessageCircle, Share2, Eye, Filter, Zap } from 'lucide-react';
import { SocialTrendPost, HashtagStat } from '../../types';

interface SocialListeningViewProps {
  posts: SocialTrendPost[];
  hashtags: HashtagStat[];
  onTriggerScraper: () => void;
}

export const SocialListeningView: React.FC<SocialListeningViewProps> = ({
  posts,
  hashtags,
  onTriggerScraper
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<'all' | 'tiktok' | 'instagram'>('all');
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const keywords = ['Semua Keyword', 'hargaemas', 'emasantam', 'buybackemas', 'perhiasanemas', 'tokoemas', 'investasiemas', 'emasbatangan'];

  const filteredPosts = posts.filter(post => {
    if (selectedPlatform !== 'all' && post.platform !== selectedPlatform) return false;
    if (selectedTag !== 'all' && !post.hashtags.some(h => h.toLowerCase().includes(selectedTag.toLowerCase()))) return false;
    if (searchKeyword && !post.caption.toLowerCase().includes(searchKeyword.toLowerCase()) && !post.author.toLowerCase().includes(searchKeyword.toLowerCase())) return false;
    return true;
  });

  const tiktokCount = posts.filter(p => p.platform === 'tiktok').length;
  const igCount = posts.filter(p => p.platform === 'instagram').length;

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-soft">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">
            Social Listening Kanal Media Sosial
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Pemantauan langsung percakapan publik seputar industri jual-beli emas di TikTok dan Instagram Reels
          </p>
        </div>
        <button
          onClick={onTriggerScraper}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold shadow-md shadow-blue-500/20 transition-all cursor-pointer shrink-0"
        >
          <Radio className="w-3.5 h-3.5 text-white animate-pulse" />
          <span>Ambil Data Percakapan Baru</span>
        </button>
      </div>

      {/* Row 1: Spike Detection & Platform Volume Tracker */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Spike Detection (Deteksi Lonjakan) */}
        <div className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white p-5 rounded-3xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-100">
                Deteksi Lonjakan (Spike Alert)
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <h3 className="text-lg font-bold leading-tight">
              Lonjakan 28.4% Terdeteksi
            </h3>
            <p className="text-xs text-blue-100 mt-2 leading-relaxed">
              Tagar <strong>#hargaemas</strong> dan <strong>#emasantam</strong> mengalami eskalasi views tertinggi dalam 24 jam terakhir.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs">
            <span>Status: Momentum Aktif</span>
            <span className="font-bold">Kecepatan: Tinggi</span>
          </div>
        </div>

        {/* Card 2: Volume TikTok */}
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-soft flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Volume Percakapan TikTok
            </span>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">
              {tiktokCount} Video Terpantau
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Fokus percakapan: Review harga buyback, gramasi 0.5g-1g, dan uji keaslian timbangan.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600">
            <span>Pangsa Suara: ~60%</span>
            <span className="text-blue-600 font-bold">Interaksi Tinggi</span>
          </div>
        </div>

        {/* Card 3: Volume Instagram Reels */}
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-soft flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Volume Instagram Reels
            </span>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">
              {igCount} Reels Terpantau
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Fokus percakapan: Desain gelang rantai 750 (17K), cincin tunangan, dan mahar pernikahan.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600">
            <span>Pangsa Suara: ~40%</span>
            <span className="text-indigo-600 font-bold">Estetika & Mode</span>
          </div>
        </div>
      </div>

      {/* Row 2: Keyword Filter Bar & Search */}
      <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-soft space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {keywords.map(kw => (
              <button
                key={kw}
                onClick={() => setSelectedTag(kw === 'Semua Keyword' ? 'all' : kw)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  (kw === 'Semua Keyword' && selectedTag === 'all') || selectedTag === kw
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {kw === 'Semua Keyword' ? kw : `#${kw}`}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Filter teks percakapan..."
              className="w-full text-xs pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Row 3: Live Post Stream Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPosts.map(post => (
          <div
            key={post.id}
            className="bg-white rounded-3xl border border-slate-100 hover:border-blue-200 p-5 shadow-soft hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <img
                    src={post.authorAvatar}
                    alt={post.author}
                    className="w-8 h-8 rounded-full object-cover border border-slate-100"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 leading-tight">{post.author}</h4>
                    <span className="text-[10px] text-slate-400">{post.authorHandle}</span>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  post.platform === 'tiktok' ? 'bg-black text-white' : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                }`}>
                  {post.platform.toUpperCase()}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                {post.caption}
              </p>

              <div className="flex flex-wrap gap-1 mb-4">
                {post.hashtags.map((tag, i) => (
                  <span key={i} className="text-[10px] font-medium text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                    #{tag.replace(/^#/, '')}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-blue-500" />
                  {post.views >= 1000 ? (post.views / 1000).toFixed(0) + 'k' : post.views}
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-rose-500" />
                  {(post.likes / 1000).toFixed(1)}k
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-3.5 h-3.5 text-slate-400" />
                  {post.comments}
                </span>
              </div>

              <a
                href={post.postUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-800"
              >
                <span>Lihat</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
