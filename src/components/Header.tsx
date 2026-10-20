import React from 'react';
import { Search, Mail, Bell, Settings, Sparkles, RefreshCw, Database, Lightbulb } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  openScraperModal: () => void;
  openInsightsModal: () => void;
  isScraping?: boolean;
  supabaseConnected?: boolean;
  latencyMs?: number;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  openScraperModal,
  openInsightsModal,
  isScraping = false,
  supabaseConnected = true,
  latencyMs = 45
}) => {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div className="flex flex-wrap items-center gap-4 md:gap-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight leading-none">
            Gold Social Trends
          </h1>
          <p className="text-[11px] text-slate-400 font-medium mt-1">
            Dashboard Analitik & Sentimen Media Sosial Jual-Beli Emas
          </p>
        </div>

        {/* Supabase Server Status Badge */}
        <div 
          title={`Supabase Server: https://esbkddgvwpzxdmrklgqv.supabase.co (${latencyMs}ms)`}
          className="flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200/80 rounded-full shadow-2xs text-[11px] font-semibold text-slate-600"
        >
          <Database className="w-3.5 h-3.5 text-emerald-600" />
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-slate-700">Supabase Prod</span>
          <span className="text-[10px] text-slate-400 font-mono">({latencyMs}ms)</span>
        </div>

        {/* Search bar matching the rounded soft pill in reference */}
        <div className="relative w-60 md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4 text-blue-500" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari hashtag, brand emas..."
            className="w-full bg-[#E5ECF6]/70 hover:bg-[#E0E8F4] focus:bg-white text-xs text-slate-700 pl-9 pr-4 py-2 rounded-full border border-transparent focus:border-blue-300 focus:outline-none transition-all placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        {/* Strategic Market Insights Button */}
        <button
          onClick={openInsightsModal}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-full text-xs font-bold shadow-sm shadow-amber-500/20 transition-all active:scale-95 cursor-pointer"
        >
          <Lightbulb className="w-3.5 h-3.5" />
          <span>Market Insights</span>
        </button>

        {/* Scraper Trigger Action Button */}
        <button
          onClick={openScraperModal}
          disabled={isScraping}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full text-xs font-semibold shadow-sm shadow-blue-500/25 transition-all active:scale-95 disabled:opacity-60 cursor-pointer"
        >
          {isScraping ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Sparkles className="w-3.5 h-3.5" />
          )}
          <span>{isScraping ? 'Scraping Apify...' : 'Sync Apify Trends'}</span>
        </button>

        {/* Action Icons matching the three circular buttons in top right */}
        <div className="flex items-center gap-1.5 ml-1">
          <button 
            title="Pemberitahuan Tren Emas"
            className="relative w-9 h-9 rounded-full bg-white hover:bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 shadow-sm transition-all cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-blue-600 rounded-full" />
          </button>

          <button 
            title="Pengaturan"
            className="w-9 h-9 rounded-full bg-white hover:bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 shadow-sm transition-all cursor-pointer"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
