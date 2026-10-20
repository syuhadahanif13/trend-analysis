import React from 'react';
import { MoreHorizontal, Sparkles } from 'lucide-react';

interface SentimentOverviewDonutProps {
  bullishPercent?: number;
  bearishPercent?: number;
  bullishLabel?: string;
  bearishLabel?: string;
  onExplore?: () => void;
}

export const SentimentOverviewDonut: React.FC<SentimentOverviewDonutProps> = ({
  bullishPercent = 68,
  bearishPercent = 32,
  bullishLabel = 'Minat Beli Emas (Akumulasi)',
  bearishLabel = 'Jual / Buyback (Likuidasi)',
  onExplore
}) => {
  // SVG Donut calculation
  const size = 160;
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  const purplePercent = bullishPercent / 100;
  const cyanPercent = bearishPercent / 100;
  const purpleDash = circumference * purplePercent;
  const cyanDash = circumference * cyanPercent;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-soft border border-slate-100 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-bold text-slate-800 text-base">
            Market Sentiment Ratio
          </h3>
          <p className="text-[11px] text-slate-400 font-medium">Beli vs Jual Emas di Sosmed</p>
        </div>
        <button 
          onClick={onExplore}
          title="Lihat Detail Sentimen"
          className="text-slate-300 hover:text-blue-600 transition-colors p-1"
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Chart and Legend container */}
      <div className="flex items-center justify-around gap-2 my-auto py-2">
        {/* SVG Donut Chart with center value */}
        <div className="relative flex items-center justify-center">
          <svg width={size} height={size} className="transform -rotate-90">
            {/* Background Track */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#F1F5F9"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {/* Purple Arc (Bullish) */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#4F46E5"
              strokeWidth={strokeWidth}
              strokeDasharray={`${purpleDash} ${circumference}`}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-700"
            />
            {/* Cyan Arc (Bearish) */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#06B6D4"
              strokeWidth={strokeWidth}
              strokeDasharray={`${cyanDash} ${circumference}`}
              strokeDashoffset={-purpleDash - 8}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-700"
            />
          </svg>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-lg font-extrabold text-slate-900 tracking-tight leading-none">
              {bullishPercent}%
            </span>
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider mt-0.5">
              Bullish
            </span>
          </div>
        </div>

        {/* Legend on the right */}
        <div className="space-y-3.5">
          <div className="flex items-start gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full border-2 border-[#4F46E5] bg-white mt-1 shrink-0" />
            <div>
              <p className="text-xs font-bold text-slate-800 leading-none">
                {bullishPercent}%
              </p>
              <p className="text-[10px] font-medium text-slate-400 mt-0.5 max-w-[110px] leading-tight">
                {bullishLabel}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full border-2 border-[#06B6D4] bg-white mt-1 shrink-0" />
            <div>
              <p className="text-xs font-bold text-slate-800 leading-none">
                {bearishPercent}%
              </p>
              <p className="text-[10px] font-medium text-slate-400 mt-0.5 max-w-[110px] leading-tight">
                {bearishLabel}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
