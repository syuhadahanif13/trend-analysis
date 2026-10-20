import React, { useState, useEffect } from 'react';
import { X, Radio, Key, Hash, Play, CheckCircle2, AlertCircle, RefreshCw, Info, Database, ExternalLink } from 'lucide-react';
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
  const [runUrl, setRunUrl] = useState<string>('');
  const [tokenInfo, setTokenInfo] = useState<{ checked: boolean; valid: boolean; username?: string; message?: string }>({
    checked: false,
    valid: false
  });

  useEffect(() => {
    if (isOpen) {
      const saved = ApifyService.getSavedToken();
      setToken(saved);
      if (saved) {
        checkTokenValidity(saved);
      }
    }
  }, [isOpen]);

  const checkTokenValidity = async (tok: string) => {
    if (!tok.trim()) {
      setTokenInfo({ checked: false, valid: false });
      return;
    }
    const res = await ApifyService.verifyToken(tok.trim());
    setTokenInfo({
      checked: true,
      valid: res.valid,
      username: res.username,
      message: res.message
    });
  };

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
    if (!token.trim()) {
      setStatusMessage('Apify Personal API Token wajib diisi.');
      setLogs(['[ERROR] Masukkan Apify Personal API Token untuk menjalankan scraping dan mencatat riwayat di Apify Console.']);
      return;
    }

    setIsRunning(true);
    setLogs([]);
    setRunUrl('');
    setStatusMessage('Memulai koneksi scraping ke Apify...');

    ApifyService.saveToken(token.trim());

    try {
      const currentLogs: string[] = [];
      const addLog = (msg: string) => {
        const line = `[${new Date().toLocaleTimeString()}] ${msg}`;
        currentLogs.push(line);
        setLogs((prev) => [...prev, line]);
        setStatusMessage(msg);

        // Detect run URL in log
        const match = msg.match(/https:\/\/console\.apify\.com\/actors\/runs\/[a-zA-Z0-9_-]+/);
        if (match) {
          setRunUrl(match[0]);
        }
      };

      const results = await ApifyService.runScraper(
        {
          hashtags,
          token: token.trim(),
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

      setStatusMessage(`Selesai! Berhasil mengambil ${results.length} postingan dan tersimpan di Supabase.`);
      onScrapeSuccess(results);
      setTimeout(() => {
        setIsRunning(false);
      }, 1000);
    } catch (err: any) {
      setLogs((prev) => [...prev, `[ERROR] ${err.message}`]);
      setStatusMessage(`Gagal: ${err.message}`);
      setIsRunning(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header Modal */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">
                Apify Social Trends Scraper
              </h3>
              <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                <span>Actor:</span>
                <span className="font-mono text-blue-600 font-bold">subimpact/social-trends-hashtag-scraper</span>
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
                Server Penyimpanan: <strong className="font-semibold">Supabase Cloud (trend_posts)</strong>
              </div>
            </div>
            <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
              Terhubung
            </span>
          </div>

          {/* Actor Info Box */}
          <div className="bg-blue-50/70 rounded-2xl p-4 border border-blue-100 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="text-xs text-blue-900 leading-relaxed space-y-1">
              <p>
                Platform menjalankan actor <strong className="font-semibold">subimpact/social-trends-hashtag-scraper</strong> langsung di akun Apify Anda sehingga seluruh log dan riwayat scrape tersimpan resmi di console Apify.
              </p>
              <a
                href="https://console.apify.com/actors/runs"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 hover:underline pt-1"
              >
                <span>Buka Dashboard Riwayat Run di Apify Console</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Apify API Token Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-2">
                <Key className="w-3.5 h-3.5 text-blue-600" />
                <span>Apify Personal API Token</span>
              </label>
              <a
                href="https://console.apify.com/account/integrations"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-medium text-blue-600 hover:underline flex items-center gap-1"
              >
                <span>Dapatkan Token di sini</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="flex gap-2">
              <input
                type="password"
                value={token}
                onChange={(e) => {
                  setToken(e.target.value);
                  setTokenInfo({ checked: false, valid: false });
                }}
                placeholder="apify_api_..."
                className="flex-1 text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500 transition-colors font-mono"
              />
              <button
                type="button"
                onClick={() => checkTokenValidity(token)}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap cursor-pointer"
              >
                Cek Token
              </button>
            </div>

            {tokenInfo.checked && (
              <div className="mt-2">
                {tokenInfo.valid ? (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Akun Apify terhubung: @{tokenInfo.username}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs text-rose-700 font-semibold bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200">
                    <AlertCircle className="w-4 h-4 text-rose-600" />
                    <span>{tokenInfo.message}</span>
                  </div>
                )}
              </div>
            )}

            {!token && (
              <p className="text-[11px] text-amber-600 mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>Masukkan token API dari console.apify.com agar riwayat run tercatat di dashboard Apify Anda.</span>
              </p>
            )}
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
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
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
                    className="text-slate-400 hover:text-rose-500 cursor-pointer"
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
                  <p className="text-[10px] text-slate-500">Video viral & komentar pasar emas</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl border border-indigo-200 bg-indigo-50/50">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Instagram Reels</h4>
                  <p className="text-[10px] text-slate-500">Reels & caption toko emas</p>
                </div>
              </div>
            </div>
          </div>

          {/* Direct Apify Run Link Banner */}
          {runUrl && (
            <div className="bg-emerald-50 rounded-2xl p-3 border border-emerald-200 flex items-center justify-between">
              <div className="text-xs text-emerald-900 font-medium">
                Riwayat scraping tercatat di Apify Console!
              </div>
              <a
                href={runUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold transition-colors"
              >
                <span>Lihat Run Apify</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}

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
          <span className="text-xs text-slate-500 font-medium truncate max-w-xs">
            {statusMessage || 'Siap melakukan sinkronisasi data ke Supabase'}
          </span>
          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              disabled={isRunning}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              Tutup
            </button>
            <button
              onClick={handleStartScrape}
              disabled={isRunning}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/25 transition-all active:scale-95 disabled:opacity-60 cursor-pointer"
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
