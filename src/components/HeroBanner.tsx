import React from 'react';

interface HeroBannerProps {
  totalReach?: string;
  tiktokViews?: string;
  tiktokPercent?: string;
  instagramViews?: string;
  instagramPercent?: string;
  buyingIntent?: string;
  buyingPercent?: string;
  buybackBuzz?: string;
  buybackPercent?: string;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  totalReach = '34.3M',
  tiktokViews = '13.7M',
  tiktokPercent = '(40%)',
  instagramViews = '8.6M',
  instagramPercent = '(25%)',
  buyingIntent = '6.9M',
  buyingPercent = '(20%)',
  buybackBuzz = '5.1M',
  buybackPercent = '(15%)'
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl p-7 mb-6 shadow-soft transition-all duration-300">
      {/* Background Gradient & 3D Ribbon / Wave Effect matching the reference */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#D9E6FC] via-[#E2EDFF] to-[#E9DCFD]" />
      
      {/* Abstract 3D Wave lines SVG background */}
      <div className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 1000 300"
          className="w-full h-full object-cover scale-110"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.5" />
            </linearGradient>
            <pattern id="dotPattern" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#4338CA" fillOpacity="0.25" />
            </pattern>
          </defs>

          {/* Ribbon waves resembling the dotted 3D mesh in reference */}
          <path
            d="M 200,300 C 350,150 450,280 600,120 C 750,-20 850,220 1000,100 L 1000,300 Z"
            fill="url(#waveGrad)"
          />
          <path
            d="M 220,300 C 370,160 470,290 620,130 C 770,-10 870,230 1020,110 L 1000,300 Z"
            fill="url(#dotPattern)"
          />
          <path
            d="M 300,300 C 420,180 500,290 680,150 C 820,30 920,200 1050,140"
            stroke="white"
            strokeWidth="3"
            fill="none"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* Decorative soft glowing sphere on right */}
      <div className="absolute -top-16 right-32 w-56 h-56 rounded-full bg-gradient-to-br from-indigo-200/50 to-blue-300/40 blur-2xl pointer-events-none" />

      {/* Header text content: Trend Analytics context */}
      <div className="relative z-10 mb-7">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">
            Social Buzz & Trend Velocity
          </h2>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-600/10 text-blue-700 border border-blue-200">
            Live Stream
          </span>
        </div>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Distribusi Jangkauan Media Sosial (TikTok & Instagram Reels) Industri Jual-Beli Emas
        </p>
      </div>

      {/* 5 White Metric Cards Layout */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {/* Card 1: Total Social Reach */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-white/80 transition-transform duration-200 hover:-translate-y-0.5">
          <div className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
            {totalReach}
          </div>
          <div className="text-[11px] font-semibold text-slate-400 mt-1">
            Total Social Reach
          </div>
        </div>

        {/* Card 2: TikTok Views */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-white/80 transition-transform duration-200 hover:-translate-y-0.5">
          <div className="flex items-baseline gap-1">
            <span className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
              {tiktokViews}
            </span>
            <span className="text-[11px] font-semibold text-blue-600">
              {tiktokPercent}
            </span>
          </div>
          <div className="text-[11px] font-semibold text-slate-400 mt-1">
            By TikTok Reels
          </div>
        </div>

        {/* Card 3: Instagram Reels Views */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-white/80 transition-transform duration-200 hover:-translate-y-0.5">
          <div className="flex items-baseline gap-1">
            <span className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
              {instagramViews}
            </span>
            <span className="text-[11px] font-semibold text-indigo-600">
              {instagramPercent}
            </span>
          </div>
          <div className="text-[11px] font-semibold text-slate-400 mt-1">
            By Instagram Reels
          </div>
        </div>

        {/* Card 4: Minat Beli Emas (Accumulation) */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-white/80 transition-transform duration-200 hover:-translate-y-0.5">
          <div className="flex items-baseline gap-1">
            <span className="text-xl md:text-2xl font-extrabold text-emerald-600 tracking-tight">
              {buyingIntent}
            </span>
            <span className="text-[11px] font-semibold text-slate-400">
              {buyingPercent}
            </span>
          </div>
          <div className="text-[11px] font-semibold text-slate-400 mt-1">
            Minat Beli (Bullish)
          </div>
        </div>

        {/* Card 5: Sentimen Buyback & Jual */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-white/80 transition-transform duration-200 hover:-translate-y-0.5 col-span-2 sm:col-span-1">
          <div className="flex items-baseline gap-1">
            <span className="text-xl md:text-2xl font-extrabold text-rose-500 tracking-tight">
              {buybackBuzz}
            </span>
            <span className="text-[11px] font-semibold text-slate-400">
              {buybackPercent}
            </span>
          </div>
          <div className="text-[11px] font-semibold text-slate-400 mt-1">
            Buyback & Jual
          </div>
        </div>
      </div>
    </div>
  );
};
