import React from 'react';
import { MoreHorizontal } from 'lucide-react';

interface RevenueUpdatesBarProps {
  title?: string;
  onExplore?: () => void;
}

export const RevenueUpdatesBar: React.FC<RevenueUpdatesBarProps> = ({
  title = 'Daily Buzz Momentum',
  onExplore
}) => {
  // Bar data representing daily buzz index
  const bars = [
    { day: 'Sen', height: 35, highlighted: false },
    { day: 'Sel', height: 50, highlighted: false },
    { day: 'Rab', height: 38, highlighted: false },
    { day: 'Kam', height: 85, highlighted: true }, // Viral peak
    { day: 'Jum', height: 60, highlighted: false },
    { day: 'Sab', height: 42, highlighted: false },
    { day: 'Min', height: 30, highlighted: false },
  ];

  const yLabels = ['80k', '50k', '30k', '10k'];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-soft border border-slate-100 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-bold text-slate-800 text-base">
            {title}
          </h3>
          <p className="text-[11px] text-slate-400 font-medium">Interaksi Konten Harian</p>
        </div>
        <button 
          onClick={onExplore}
          title="Detail Momentum"
          className="text-slate-300 hover:text-blue-600 transition-colors p-1"
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Bar Chart Area */}
      <div className="flex items-end gap-3 h-44 pb-2 pt-2 px-2">
        {/* Y Axis Numbers */}
        <div className="flex flex-col justify-between h-full text-[10px] font-semibold text-slate-400 select-none pr-1">
          {yLabels.map((lbl) => (
            <span key={lbl}>{lbl}</span>
          ))}
        </div>

        {/* Bars Container */}
        <div className="flex-1 flex items-end justify-between h-full px-2">
          {bars.map((bar, idx) => (
            <div key={idx} className="flex flex-col items-center justify-end h-full w-4 sm:w-5 group">
              {bar.highlighted ? (
                // Highlighted Bar: Rich Indigo with White Dot at top
                <div 
                  className="w-full bg-[#4F46E5] rounded-full relative flex items-start justify-center transition-all duration-500 hover:bg-[#4338CA] shadow-sm shadow-indigo-500/20"
                  style={{ height: `${bar.height}%` }}
                >
                  {/* Dot on top of the bar */}
                  <div className="w-2.5 h-2.5 rounded-full bg-white border-2 border-[#4F46E5] mt-1 shadow-sm" />
                </div>
              ) : (
                // Regular Soft Lavender / Pastel Violet Bar
                <div 
                  className="w-full bg-[#E0E7FE] hover:bg-[#C7D2FE] rounded-full transition-all duration-300"
                  style={{ height: `${bar.height}%` }}
                />
              )}
              <span className="text-[10px] text-slate-400 font-medium mt-1.5">{bar.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
