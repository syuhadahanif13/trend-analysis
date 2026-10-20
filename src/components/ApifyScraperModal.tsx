import React, { useState, useEffect } from 'react';
import { X, Sparkles, Key, Hash, Play, CheckCircle2, AlertCircle, RefreshCw, Info, Database } from 'lucide-react';
import { ApifyService } from '../services/apifyService';
import { SupabaseService } from '../services/supabaseService';
import { INITIAL_HASHTAGS } from '../data/mockGoldTrends';
import { SocialTrendPost } from '../types';

interface ApifyScraperModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScrapeSuccess: (posts: SocialTrendPost[]) => void;
}

export const ApifyScraperModal: React.FC<ApifyScraperModalProps> = ({
  isOpen,
  onClose,
  onScrapeSuccess
}) => {
  const [token, setToken] = useState<string>('');
  const [hashtags, setHashtags] = useState<string[]>(INITIAL_HASHTAGS);
  const [newTag, setNewTag] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [statusMessage, setStatusMessage] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setToken(ApifyService.getSavedToken());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAddTag = () => {
    const clean = newTag.trim().replace(/^#/, '');
    if (clean && !hashtags.includes(clean)) {
      setHashtags([...hashtags, clean]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setHashtags(hashtags.filter(t => t !== tagToRemove));
  };

  const handleStartScrape = async () => {
    setIsRunning(true);
    setLogs([]);
    setStatusMessage('Memulai koneksi scraping...');

    if (token) {
      ApifyService.saveToken(token);
    }

    try {
      const currentLogs: string[] = [];
      const addLog = (msg: string) => {
        const line = `[${new Date().toLocaleTimeString()}] ${msg}`;
        currentLogs.push(line);
        setLogs((prev) => [...prev, line]);
        setStatusMessage(msg);
      };

      const results = await ApifyService.runScraper(
        {
          hashtags,
          token: token.trim() || undefined,
          platforms: ['tiktok', 'instagram']
        },
        addLog
      );

      // Save automatically to Supabase server
      addLog('Menyimpan hasil ke database Supabase...');
      const savedToSupabase = await SupabaseService.upsertTrendPosts(results);
      if (savedToSupabase) {
        addLog('Berhasil disinkronisasi ke tabel Supabase "trend_posts"');
      }

      await SupabaseService.recordScraperRun(hashtags, results.length, 'completed', currentLogs);

      setStatusMessage(`Selesai! Ditemukan ${results.length} postingan dan tersimpan di Supabase.`);
      onScrapeSuccess(results);
      setTimeout(() => {
        setIsRunning(false);
      }, 1000);
    } catch (err: any) {
      setLogs((prev) => [...prev, `[ERROR] ${err.message}`]);
      setStatusMessage('Gagal menjalankan scraper.');
      setIsRunning(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header Modal */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">
                Apify Social Trends Scraper
              </h3>
              <p className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                <span>Actor:</span>
                <span className="font-mono text-blue-600">subimpact/social-trends-hashtag-scraper</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isRunning}
            className="w-8 h-8 rounded-full hover:bg-slate-200/60 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Supabase Storage Notice */}
          <div className="bg-emerald-50/80 rounded-2xl p-3.5 border border-emerald-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Database className="w-4 h-4 text-emerald-600 shrink-0" />
              <div className="text-xs text-emerald-900 font-medium">
                Server Penyimpanan: <strong className="font-semibold">Supabase Cloud</strong>
              </div>
            </div>
            <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
              esbkddgvwpzxdmrklgqv
            </span>
          </div>

          {/* Actor Info Box */}
          <div className="bg-blue-50/70 rounded-2xl p-4 border border-blue-100 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="text-xs text-blue-900 leading-relaxed">
              Platform mengekstrak data reels & video TikTok serentak dengan kata kunci pasar emas, lalu menganalisis sentimen dan menyimpannya langsung ke database Supabase.
            </div>
          </div>

          {/* Apify API Token Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-2">
              <Key className="w-3.5 h-3.5 text-blue-600" />
              <span>Apify API Token (Opsional)</span>
            </label>
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="apify_api_..."
              className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500 transition-colors"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Jika dikosongkan, simulator data tren emas otomatis dijalankan dan disinkronkan ke Supabase.
            </p>
          </div>

          {/* Hashtag List */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-2">
              <Hash className="w-3.5 h-3.5 text-blue-600" />
              <span>Target Hashtags Tren Emas</span>
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                placeholder="Tambah hashtag (misal: emasmini)..."
                className="flex-1 text-xs px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-xl transition-colors"
              >
                + Tambah
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {hashtags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium px-2.5 py-1 rounded-lg transition-colors"
                >
                  #{tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="text-slate-400 hover:text-rose-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Target Platforms */}
          <div>
            <span className="block text-xs font-bold text-slate-700 mb-2">
              Platform Sumber
            </span>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2.5 p-3 rounded-xl border border-blue-200 bg-blue-50/50">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <div>
                  <h4 className="text-xs font-bold text-slate-800">TikTok Trends</h4>
                  <p className="text-[10px] text-slate-500">Short video & comments</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl border border-indigo-200 bg-indigo-50/50">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Instagram Reels</h4>
                  <p className="text-[10px] text-slate-500">Reels & caption buzz</p>
                </div>
              </div>
            </div>
          </div>

          {/* Live Progress Logs */}
          {logs.length > 0 && (
            <div className="bg-slate-900 rounded-2xl p-4 text-[11px] font-mono text-emerald-400 space-y-1 max-h-36 overflow-y-auto">
              {logs.map((log, i) => (
                <div key={i}>{log}</div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            {statusMessage || 'Siap melakukan sinkronisasi data ke Supabase'}
          </span>
          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              disabled={isRunning}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200/60 transition-colors"
            >
              Tutup
            </button>
            <button
              onClick={handleStartScrape}
              disabled={isRunning}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/25 transition-all active:scale-95 disabled:opacity-60"
            >
              {isRunning ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Syncing to Supabase...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Jalankan & Sync Supabase</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
