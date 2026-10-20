import React, { useState } from 'react';
import { Database, Radio, Key, Hash, Shield, CheckCircle2, RefreshCw, Trash2, Plus } from 'lucide-react';
import { ApifyService } from '../../services/apifyService';

interface DataSettingsViewProps {
  onTriggerScraper: () => void;
  latencyMs: number;
}

export const DataSettingsView: React.FC<DataSettingsViewProps> = ({
  onTriggerScraper,
  latencyMs
}) => {
  const [apifyToken, setApifyToken] = useState<string>(ApifyService.getSavedToken());
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [keywords, setKeywords] = useState<string[]>([
    'hargaemas', 'emasantam', 'buybackemas', 'tokoemas', 'investasiemas', 'emasbatangan', 'emasmini', 'cincintunangan'
  ]);
  const [newKeyword, setNewKeyword] = useState<string>('');

  const handleSaveToken = (e: React.FormEvent) => {
    e.preventDefault();
    ApifyService.saveToken(apifyToken);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleAddKeyword = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = newKeyword.trim().replace(/^#/, '');
    if (clean && !keywords.includes(clean)) {
      setKeywords([...keywords, clean]);
      setNewKeyword('');
    }
  };

  const handleRemoveKeyword = (tag: string) => {
    setKeywords(keywords.filter(k => k !== tag));
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">
          Data Sources & System Settings
        </h2>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Mengatur koneksi database Supabase, konfigurasi Apify Actor scraper, master keyword, dan tata kelola akun
        </p>
      </div>

      {/* Row 1: Status Koneksi & Konfigurasi API */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Supabase Status */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-800">Database Server (Supabase Cloud)</h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                Terhubung Aktif
              </span>
            </div>

            <div className="space-y-2 text-xs text-slate-600 mt-4">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-400">Endpoint URL:</span>
                <span className="font-mono text-slate-700">https://esbkddgvwpzxdmrklgqv.supabase.co</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-400">Project Reference:</span>
                <span className="font-mono text-slate-700">esbkddgvwpzxdmrklgqv</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-400">Latency Server:</span>
                <span className="font-bold text-emerald-600">{latencyMs} ms</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Tabel Aktif:</span>
                <span className="text-slate-700">trend_posts, hashtag_stats, regional_buzz, scraper_runs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Apify Actor Scraper Config */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-800">Apify Actor Scraper</h3>
              </div>
              <span className="text-[10px] font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-bold">
                subimpact/social-trends-hashtag-scraper
              </span>
            </div>

            <form onSubmit={handleSaveToken} className="space-y-3 mt-4">
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Apify Personal API Token (Opsional)
                </label>
                <input
                  type="password"
                  value={apifyToken}
                  onChange={(e) => setApifyToken(e.target.value)}
                  placeholder="apify_api_..."
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  {isSaved ? 'Tersimpan!' : 'Simpan Token'}
                </button>
                <button
                  type="button"
                  onClick={onTriggerScraper}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Uji Koneksi Scraper
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Row 2: Master Keyword & Brand Tracker Management */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-800">Master Keyword & Tagar Target</h3>
          </div>
          <span className="text-xs font-semibold text-slate-400">{keywords.length} Kata Kunci Aktif</span>
        </div>

        {/* Form Tambah Keyword */}
        <form onSubmit={handleAddKeyword} className="flex gap-2">
          <input
            type="text"
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            placeholder="Tambah keyword baru (contoh: emasmini)..."
            className="flex-1 text-xs px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah</span>
          </button>
        </form>

        {/* Chips Keyword */}
        <div className="flex flex-wrap gap-2 pt-2">
          {keywords.map(kw => (
            <span
              key={kw}
              className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-xl transition-colors"
            >
              <span>#{kw}</span>
              <button
                type="button"
                onClick={() => handleRemoveKeyword(kw)}
                className="text-slate-400 hover:text-rose-600"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Row 3: Hak Akses & Audit Log */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hak Akses Berdasarkan Jabatan */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-4 h-4 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-800">Hak Akses Jabatan (Roles)</h3>
          </div>
          <div className="space-y-2 text-xs text-slate-600">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
              <div>
                <strong className="text-slate-800 block">Administrator</strong>
                <span className="text-[10px] text-slate-400">Akses penuh dashboard, scraping, ekspor data, & konfigurasi API</span>
              </div>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Aktif</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
              <div>
                <strong className="text-slate-800 block">Analis Pasar & Pemasaran</strong>
                <span className="text-[10px] text-slate-400">Melihat tren, klaster sentimen, dan ekspor ringkasan konten</span>
              </div>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">View Only</span>
            </div>
          </div>
        </div>

        {/* Audit Log Sinkronisasi */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-800">Audit Log & Riwayat Sinkronisasi</h3>
          </div>
          <div className="space-y-2 text-xs text-slate-600">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
              <div>
                <strong className="text-slate-800 block">Sinkronisasi Database Supabase Berhasil</strong>
                <span className="text-[10px] text-slate-400">31 baris postingan tersimpan di tabel trend_posts</span>
              </div>
              <span className="text-[10px] text-slate-400">Hari ini</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
              <div>
                <strong className="text-slate-800 block">Pengecekan Latensi Supabase</strong>
                <span className="text-[10px] text-slate-400">Status 200 OK ({latencyMs}ms)</span>
              </div>
              <span className="text-[10px] text-slate-400">Real-time</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
