import React from 'react';
import { Store, TrendingUp, Users, Heart, Eye, ArrowUpRight, BarChart2 } from 'lucide-react';

export const CompetitorView: React.FC = () => {
  const competitors = [
    { name: 'Antam Logam Mulia', sov: '42%', posts: 1420, avgViews: '850k', engagementRate: '6.4%', sentiment: '88% Positif', strategy: 'Kampanye cetakan tematik, hari besar, dan kemasan Reddot CertiEye.' },
    { name: 'Raja Emas Indonesia', sov: '21%', posts: 720, avgViews: '620k', engagementRate: '7.8%', sentiment: '91% Positif', strategy: 'Layanan buyback cepat tanpa potongan liar, uji kadar air, dan edukasi spread.' },
    { name: 'UBS Gold', sov: '16%', posts: 540, avgViews: '410k', engagementRate: '5.9%', sentiment: '84% Positif', strategy: 'Kolaborasi karakter pop-culture, emas batangan kado, dan desain stylish.' },
    { name: 'Semar Nusantara', sov: '12%', posts: 410, avgViews: '380k', engagementRate: '6.1%', sentiment: '86% Positif', strategy: 'Kolaborasi selebriti, perhiasan emas muda 375 & tua 750, live shopping harian.' },
    { name: 'Pegadaian Galeri 24', sov: '9%', posts: 310, avgViews: '290k', engagementRate: '4.8%', sentiment: '82% Positif', strategy: 'Jaringan outlet fisik luas, sistem cicil emas, dan jaminan BUMN.' },
  ];

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">
          Competitor Intelligence & Brand Radar
        </h2>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Memantau posisi merek, pangsa suara (Share of Voice), dan aktivitas kampanye kompetitor industri emas di ruang digital
        </p>
      </div>

      {/* Row 1: Share of Voice (SOV) Bar Overview */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-slate-800">
            Pangsa Suara Digital (Share of Voice)
          </h3>
          <span className="text-xs font-semibold text-slate-400">Total Percakapan Brand Emas</span>
        </div>

        {/* Multi-segment Progress Bar */}
        <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex mb-4">
          <div style={{ width: '42%' }} className="bg-blue-600" title="Antam: 42%" />
          <div style={{ width: '21%' }} className="bg-amber-500" title="Raja Emas: 21%" />
          <div style={{ width: '16%' }} className="bg-indigo-500" title="UBS Gold: 16%" />
          <div style={{ width: '12%' }} className="bg-purple-500" title="Semar Nusantara: 12%" />
          <div style={{ width: '9%' }} className="bg-emerald-500" title="Galeri 24: 9%" />
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />
            <span className="text-slate-600 truncate">Antam LM (42%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
            <span className="text-slate-600 truncate">Raja Emas (21%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shrink-0" />
            <span className="text-slate-600 truncate">UBS Gold (16%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shrink-0" />
            <span className="text-slate-600 truncate">Semar (12%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
            <span className="text-slate-600 truncate">Galeri 24 (9%)</span>
          </div>
        </div>
      </div>

      {/* Row 2: Perbandingan Kompetitor Detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {competitors.map((comp, i) => (
          <div key={i} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-soft flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                  SOV {comp.sov}
                </span>
                <span className="text-xs font-bold text-emerald-600">{comp.sentiment}</span>
              </div>
              <h4 className="text-base font-bold text-slate-800">{comp.name}</h4>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                <strong>Arah Strategi:</strong> {comp.strategy}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block">Rata-rata Views</span>
                <strong className="text-slate-800">{comp.avgViews}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Engagement Rate</span>
                <strong className="text-blue-600">{comp.engagementRate}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
