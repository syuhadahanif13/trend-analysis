import React from 'react';
import { MoreHorizontal } from 'lucide-react';

interface YearlySalesLineProps {
  title?: string;
  firstAmount?: string;
  firstYear?: string;
  secondAmount?: string;
  secondYear?: string;
  onExplore?: () => void;
}

export const YearlySalesLine: React.FC<YearlySalesLineProps> = ({
  title = 'Trend Velocity & Virality',
  firstAmount = '5.4k/hari',
  firstYear = '2024 (Akumulasi)',
  secondAmount = '4.4k/hari',
  secondYear = '2023 (Baseline)',
  onExplore
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-soft border border-slate-100 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="font-bold text-slate-800 text-base">
            {title}
          </h3>
          <p className="text-[11px] text-slate-400 font-medium">Laju Pertumbuhan Konten Emas</p>
        </div>
        <button 
          onClick={onExplore}
          title="Detail Velocity"
          className="text-slate-300 hover:text-blue-600 transition-colors p-1"
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Smooth Wave Lines Chart Area */}
      <div className="relative h-36 flex items-center justify-center my-auto">
        <svg
          viewBox="0 0 320 120"
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Soft gradient fill under wave */}
            <linearGradient id="yearlyBlueGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="yearlyIndigoGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Area Fill for Smooth Cyan Wave */}
          <path
            d="M 10,100 C 40,95 70,75 110,85 C 150,95 180,60 215,80 C 250,100 280,75 310,95 L 310,120 L 10,120 Z"
            fill="url(#yearlyBlueGrad)"
          />

          {/* Line 2: Soft Sky Blue / Cyan Wave */}
          <path
            d="M 10,100 C 40,95 70,75 110,85 C 150,95 180,60 215,80 C 250,100 280,75 310,95"
            stroke="#7DD3FC"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Area Fill for Indigo Wave */}
          <path
            d="M 10,105 C 50,105 80,70 120,65 C 155,60 170,18 200,20 C 230,22 250,75 280,60 C 295,50 305,65 310,75 L 310,120 L 10,120 Z"
            fill="url(#yearlyIndigoGrad)"
          />

          {/* Line 1: Rich Indigo / Purple Wave with Peaks */}
          <path
            d="M 10,105 C 50,105 80,70 120,65 C 155,60 170,18 200,20 C 230,22 250,75 280,60 C 295,50 305,65 310,75"
            stroke="#4F46E5"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />

          {/* Highlight Dot at the Highest Peak (x=200, y=20) matching reference */}
          <circle
            cx="200"
            cy="20"
            r="4.5"
            fill="#4F46E5"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            className="drop-shadow-sm"
          />
        </svg>
      </div>

      {/* Legend below chart */}
      <div className="flex items-center justify-center gap-6 pt-3 border-t border-slate-50">
        {/* Item 1: Indigo */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#4F46E5]" />
          <span className="text-xs font-bold text-slate-800">
            {firstAmount}
          </span>
          <span className="text-[11px] font-medium text-slate-400">
            {firstYear}
          </span>
        </div>

        {/* Item 2: Cyan */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
          <span className="text-xs font-bold text-slate-800">
            {secondAmount}
          </span>
          <span className="text-[11px] font-medium text-slate-400">
            {secondYear}
          </span>
        </div>
      </div>
    </div>
  );
};
