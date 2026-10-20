import React from 'react';
import { 
  TrendingUp, 
  Flame, 
  Hash, 
  Sparkles, 
  Radio, 
  Store, 
  Scale, 
  MapPin, 
  Settings, 
  LogOut,
  Database
} from 'lucide-react';
import { AuthUser, AuthService } from '../services/authService';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openScraperModal: () => void;
  openAIModal: () => void;
  currentUser: AuthUser | null;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  openScraperModal,
  openAIModal,
  currentUser,
  onLogout
}) => {
  return (
    <aside className="w-64 bg-white border-r border-slate-100 flex flex-col justify-between p-6 shrink-0 min-h-screen">
      <div>
        {/* Brand Logo - GoldTrends Analytics */}
        <div className="flex items-center gap-3 px-2 mb-8 cursor-pointer">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-500 flex items-center justify-center shadow-md shadow-blue-500/20 text-white">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight text-slate-800 block leading-none">
              GoldTrends
            </span>
            <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">
              Social Analytics
            </span>
          </div>
        </div>

        {/* Section 1: ANALYTICS */}
        <div className="mb-6">
          <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase px-3 mb-3">
            ANALYTICS
          </p>
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                activeTab === 'overview'
                  ? 'bg-blue-50/80 text-blue-600 font-bold shadow-sm shadow-blue-500/5'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <TrendingUp className={`w-4 h-4 ${activeTab === 'overview' ? 'text-blue-600' : 'text-slate-400'}`} />
              <span>Trend Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('feed')}
              className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                activeTab === 'feed'
                  ? 'bg-blue-50/80 text-blue-600 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Flame className={`w-4 h-4 ${activeTab === 'feed' ? 'text-blue-600' : 'text-slate-400'}`} />
              <span>Viral Reels & TikTok</span>
            </button>

            <button
              onClick={() => setActiveTab('hashtags')}
              className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                activeTab === 'hashtags'
                  ? 'bg-blue-50/80 text-blue-600 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Hash className="w-4 h-4 text-slate-400" />
              <span>Hashtag Intelligence</span>
            </button>

            <button
              onClick={openAIModal}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/70 transition-all group"
            >
              <div className="flex items-center gap-3.5">
                <Sparkles className="w-4 h-4 text-amber-500 group-hover:rotate-12 transition-transform" />
                <span className="font-semibold">AI Market Insights</span>
              </div>
            </button>
          </nav>
        </div>

        {/* Section 2: MARKET RADAR */}
        <div className="mb-6">
          <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase px-3 mb-3">
            MARKET RADAR
          </p>
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('brands')}
              className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                activeTab === 'brands'
                  ? 'bg-blue-50/80 text-blue-600 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Store className="w-4 h-4 text-slate-400" />
              <span>Toko & Brand Watch</span>
            </button>

            <button
              onClick={() => setActiveTab('sentiment')}
              className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                activeTab === 'sentiment'
                  ? 'bg-blue-50/80 text-blue-600 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Scale className="w-4 h-4 text-slate-400" />
              <span>Sentimen Jual-Beli</span>
            </button>

            <button
              onClick={() => setActiveTab('regional')}
              className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                activeTab === 'regional'
                  ? 'bg-blue-50/80 text-blue-600 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>Regional Buzz Map</span>
            </button>
          </nav>
        </div>

        {/* Section 3: DATA ENGINE */}
        <div>
          <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase px-3 mb-3">
            DATA ENGINE
          </p>
          <nav className="space-y-1">
            <button
              onClick={openScraperModal}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50/60 transition-all group"
            >
              <div className="flex items-center gap-3.5">
                <Radio className="w-4 h-4 text-emerald-500 group-hover:animate-pulse" />
                <span>Apify Scraper</span>
              </div>
              <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded">
                Live
              </span>
            </button>
          </nav>
        </div>
      </div>

      {/* Profile Card at bottom */}
      <div className="pt-6 border-t border-slate-100">
        <div className="bg-slate-50/80 p-3 rounded-2xl border border-slate-100/80">
          <div className="flex items-center gap-3 mb-3">
            <img 
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'} 
              alt="User Avatar" 
              className="w-10 h-10 rounded-full object-cover border border-white shadow-sm"
            />
            <div className="overflow-hidden">
              <h4 className="text-xs font-bold text-slate-800 truncate">{currentUser?.name || 'Admin'}</h4>
              <p className="text-[11px] text-slate-400">{currentUser?.role || 'Administrator'}</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-slate-500 text-xs">
            <span className="flex items-center gap-1.5 text-slate-400 text-[11px]">
              <Database className="w-3 h-3 text-emerald-500" />
              <span>Prod Server</span>
            </span>
            <button 
              onClick={onLogout}
              className="flex items-center gap-1.5 text-rose-600 hover:text-rose-700 font-semibold transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log out</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
