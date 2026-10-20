import React from 'react';
import { 
  TrendingUp, 
  Radio, 
  PieChart, 
  DollarSign, 
  Store, 
  Lightbulb, 
  Bell, 
  Settings, 
  LogOut,
  Database
} from 'lucide-react';
import { AuthUser } from '../services/authService';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: AuthUser | null;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  onLogout
}) => {
  const menuItems = [
    { id: 'executive', number: '01', title: 'Executive Dashboard', icon: TrendingUp },
    { id: 'listening', number: '02', title: 'Social Listening', icon: Radio },
    { id: 'sentiment', number: '03', title: 'Trend & Sentiment Analysis', icon: PieChart },
    { id: 'market', number: '04', title: 'Gold Market Intelligence', icon: DollarSign },
    { id: 'competitor', number: '05', title: 'Competitor Intelligence', icon: Store },
    { id: 'insights', number: '07', title: 'Strategic Insights & Action', icon: Lightbulb },
    { id: 'alerts', number: '08', title: 'Alerts & Reports', icon: Bell },
    { id: 'settings', number: '09', title: 'Data Sources & Settings', icon: Settings },
  ];

  return (
    <aside className="w-72 bg-white border-r border-slate-100 flex flex-col justify-between p-5 shrink-0 min-h-screen">
      <div>
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-3 mb-7 cursor-pointer">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/20 text-white">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-slate-800 block leading-none">
              GoldTrends
            </span>
            <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">
              Social Analytics
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all text-left cursor-pointer ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span className={`text-[11px] font-mono font-bold w-5 shrink-0 ${
                  isActive ? 'text-blue-600' : 'text-slate-400'
                }`}>
                  {item.number}
                </span>
                <span className="truncate flex-1">{item.title}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Profile Card at bottom */}
      <div className="pt-4 border-t border-slate-100">
        <div className="bg-slate-50/80 p-3 rounded-2xl border border-slate-100/80">
          <div className="flex items-center gap-3 mb-2.5">
            <img 
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'} 
              alt="User Avatar" 
              className="w-9 h-9 rounded-full object-cover border border-white shadow-2xs"
            />
            <div className="overflow-hidden">
              <h4 className="text-xs font-bold text-slate-800 truncate">{currentUser?.name || 'Admin'}</h4>
              <p className="text-[10px] text-slate-400">{currentUser?.role || 'Administrator'}</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-slate-500 text-xs">
            <span className="flex items-center gap-1.5 text-slate-400 text-[10px]">
              <Database className="w-3 h-3 text-emerald-500" />
              <span>Prod Server</span>
            </span>
            <button 
              onClick={onLogout}
              className="flex items-center gap-1.5 text-rose-600 hover:text-rose-700 font-semibold text-[11px] transition-colors cursor-pointer"
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
