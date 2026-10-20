import React from 'react';
import { Upload, MapPin } from 'lucide-react';

interface ActiveUserMapProps {
  percentageGrowth?: string;
  totalUsers?: string;
  label?: string;
  onExport?: () => void;
}

export const ActiveUserMap: React.FC<ActiveUserMapProps> = ({
  percentageGrowth = '+8.06% Keaktifan vs Bulan Lalu',
  totalUsers = '23,214',
  label = 'Total Kreator & Audiens Emas Aktif',
  onExport
}) => {
  // Dot pins across major gold trading centers
  const pins = [
    { city: 'Jakarta (Cikini)', x: '28%', y: '56%' },
    { city: 'Bandung', x: '32%', y: '60%' },
    { city: 'Surabaya', x: '42%', y: '62%' },
    { city: 'Medan', x: '18%', y: '38%' },
    { city: 'Makassar', x: '58%', y: '52%' },
    { city: 'Denpasar & Bali', x: '48%', y: '68%' },
    { city: 'Global Spot', x: '75%', y: '40%' }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-soft border border-slate-100 flex flex-col justify-between relative overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-800 text-base">
              Regional Audience Buzz
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              Sentra Emas
            </span>
          </div>
          <p className="text-xs font-semibold text-blue-600 mt-0.5">
            {percentageGrowth}
          </p>
        </div>

        {/* Export Button matching reference rounded-lg pill */}
        <button
          onClick={onExport}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-medium transition-all shadow-2xs active:scale-95 cursor-pointer"
        >
          <Upload className="w-3.5 h-3.5 text-slate-500" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Map Vector Illustration with Glowing Dots */}
      <div className="relative h-44 w-full my-auto flex items-center justify-center">
        {/* Stylized World / Archipelago outline */}
        <svg
          viewBox="0 0 800 400"
          className="w-full h-full object-contain opacity-40 text-slate-300 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M 80,60 Q 140,40 220,70 Q 230,120 180,180 Q 140,210 110,180 Q 70,120 80,60 Z" />
          <path d="M 180,200 Q 250,220 230,310 Q 190,370 160,320 Q 150,240 180,200 Z" />
          <path d="M 370,60 Q 450,50 460,110 Q 420,150 370,130 Q 350,90 370,60 Z" />
          <path d="M 380,150 Q 480,160 470,270 Q 420,340 370,280 Q 350,200 380,150 Z" />
          <path d="M 480,60 Q 640,40 700,130 Q 660,220 540,190 Q 480,130 480,60 Z" />
          <path d="M 580,210 Q 660,220 670,260 Q 610,270 580,210 Z" />
          <path d="M 660,270 Q 750,260 760,340 Q 680,360 650,310 Q 640,280 660,270 Z" />
        </svg>

        {/* Dynamic Pins */}
        {pins.map((pin, i) => (
          <div
            key={i}
            title={pin.city}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
            style={{ left: pin.x, top: pin.y }}
          >
            <div className="relative flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-sm" />
              <span className="absolute w-5 h-5 rounded-full bg-blue-400/40 animate-ping opacity-75" />
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-1.5 py-0.5 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {pin.city}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Metrics Label */}
      <div className="mt-2">
        <div className="text-2xl font-extrabold text-slate-900 tracking-tight leading-none">
          {totalUsers}
        </div>
        <div className="text-xs font-medium text-slate-400 mt-1">
          {label}
        </div>
      </div>
    </div>
  );
};
