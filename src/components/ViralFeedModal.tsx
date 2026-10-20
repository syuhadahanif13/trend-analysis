import React, { useState } from 'react';
import { X, ExternalLink, Heart, MessageCircle, Share2, Eye, Filter, ArrowUpRight, Play } from 'lucide-react';
import { SocialTrendPost } from '../types';

interface ViralFeedModalProps {
  isOpen: boolean;
  onClose: () => void;
  posts: SocialTrendPost[];
}

export const ViralFeedModal: React.FC<ViralFeedModalProps> = ({
  isOpen,
  onClose,
  posts
}) => {
  const [platformFilter, setPlatformFilter] = useState<'all' | 'tiktok' | 'instagram'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  if (!isOpen) return null;

  const filteredPosts = posts.filter((post) => {
    if (platformFilter !== 'all' && post.platform !== platformFilter) return false;
    if (categoryFilter !== 'all' && post.goldCategory !== categoryFilter) return false;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-5xl shadow-2xl border border-slate-100 flex flex-col max-h-[88vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50 shrink-0">
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              Galeri Konten Viral — Industri Jual-Beli Emas
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Live Scraped Stream (TikTok & Instagram Reels) • Terintegrasi Supabase Server
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-200/60 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="px-6 py-3 border-b border-slate-100 bg-white flex flex-wrap items-center justify-between gap-3 shrink-0">
          {/* Platform Toggle */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setPlatformFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                platformFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Semua Platform ({posts.length})
            </button>
            <button
              onClick={() => setPlatformFilter('tiktok')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                platformFilter === 'tiktok' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              TikTok ({posts.filter(p => p.platform === 'tiktok').length})
            </button>
            <button
              onClick={() => setPlatformFilter('instagram')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                platformFilter === 'instagram' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Instagram Reels ({posts.filter(p => p.platform === 'instagram').length})
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="all">Semua Kategori Emas</option>
              <option value="antam">Emas Antam LM & Batangan</option>
              <option value="perhiasan">Perhiasan Emas (750 / 17K)</option>
              <option value="toko_emas">Toko & Sentra Emas Cikini</option>
              <option value="buyback">Buyback / Jual Emas</option>
              <option value="edukasi">Edukasi & Nabung Emas</option>
            </select>
          </div>
        </div>

        {/* Posts Grid Container */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-3xl border border-slate-100 hover:border-blue-200 shadow-soft hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group"
            >
              {/* Media Thumbnail & Platform Badge */}
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <img
                  src={post.thumbnailUrl}
                  alt={post.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-black/20 to-black/30" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                    post.platform === 'tiktok'
                      ? 'bg-black text-white border border-white/20'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  }`}>
                    {post.platform}
                  </span>
                  
                  {/* Sentiment Badge */}
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    post.sentiment === 'bullish_buy'
                      ? 'bg-emerald-500 text-white'
                      : post.sentiment === 'bearish_sell'
                      ? 'bg-rose-500 text-white'
                      : 'bg-blue-500 text-white'
                  }`}>
                    {post.sentiment === 'bullish_buy' ? 'Beli Emas' : post.sentiment === 'bearish_sell' ? 'Jual/Buyback' : 'Edukasi'}
                  </span>
                </div>

                {/* Center Play Overlay on hover */}
                <a
                  href={post.postUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30"
                >
                  <div className="w-12 h-12 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </a>

                {/* Bottom Overlay Metrics */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Eye className="w-3.5 h-3.5 text-blue-400" />
                    <span>{post.views.toLocaleString()}</span>
                  </div>
                  <span className="text-[10px] opacity-80">{post.timestamp}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  {/* Author */}
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={post.authorAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author)}&background=D97706&color=ffffff&bold=true&rounded=true&size=128`}
                      alt={post.author}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author)}&background=D97706&color=ffffff&bold=true&rounded=true&size=128`;
                      }}
                      className="w-7 h-7 rounded-full object-cover border border-slate-200"
                    />
                    <div className="overflow-hidden">
                      <h4 className="text-xs font-bold text-slate-800 truncate">{post.author}</h4>
                      <p className="text-[10px] text-slate-400 truncate">{post.authorHandle}</p>
                    </div>
                  </div>

                  {/* Caption */}
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-3">
                    {post.caption}
                  </p>

                  {/* Hashtags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {post.hashtags.map((h, i) => (
                      <span key={i} className="text-[10px] font-medium text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                        #{h.replace(/^#/, '')}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Engagement Metrics & External Link */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-slate-500 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 font-semibold text-slate-600">
                      <Heart className="w-3.5 h-3.5 text-rose-500" />
                      {(post.likes / 1000).toFixed(1)}k
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-slate-600">
                      <MessageCircle className="w-3.5 h-3.5 text-blue-500" />
                      {post.comments}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-slate-600">
                      <Share2 className="w-3.5 h-3.5 text-indigo-500" />
                      {post.shares}
                    </span>
                  </div>

                  <a
                    href={post.postUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-800 px-2 py-1 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <span>Buka Video</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>Menampilkan {filteredPosts.length} konten trending industri jual-beli emas</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold transition-colors"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};
