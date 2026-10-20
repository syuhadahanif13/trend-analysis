import React, { useState } from 'react';
import { X, Sparkles, TrendingUp, Lightbulb, Target, RefreshCw, CheckCircle2, Video, Tag } from 'lucide-react';
import { AIAnalysisResult } from '../services/aiAnalysisService';

interface AIAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: AIAnalysisResult;
  onRefresh: () => void;
  isRefreshing?: boolean;
}

export const AIAnalysisModal: React.FC<AIAnalysisModalProps> = ({
  isOpen,
  onClose,
  analysis,
  onRefresh,
  isRefreshing = false
}) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'ideas' | 'strategy'>('summary');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header Modal */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-gradient-to-r from-blue-50/60 via-indigo-50/40 to-amber-50/40 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-blue-500/25">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-800">
                  AI Trend & Market Intelligence (Emas)
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                  AI Intelligence Engine
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Dianalisis dari {analysis.totalPostsAnalyzed} postingan TikTok & Reels • Terakhir diperbarui: {analysis.generatedAt}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-all active:scale-95 disabled:opacity-50"
              title="Perbarui Analisis AI"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-blue-600' : 'text-slate-500'}`} />
              <span>{isRefreshing ? 'Menganalisis...' : 'Refresh AI'}</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-slate-200/60 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-2.5 border-b border-slate-100 bg-white flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('summary')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'summary'
                ? 'bg-blue-50 text-blue-600 font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Executive Summary & Sinyal Pasar
          </button>
          <button
            onClick={() => setActiveTab('ideas')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'ideas'
                ? 'bg-blue-50 text-blue-600 font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Ide Konten Viral TikTok & Reels
          </button>
          <button
            onClick={() => setActiveTab('strategy')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'strategy'
                ? 'bg-blue-50 text-blue-600 font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Rekomendasi Toko Emas & Investor
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {activeTab === 'summary' && (
            <>
              {/* Market Signal Card */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-5 text-white shadow-md relative overflow-hidden">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-amber-300" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-100">
                    Sinyal Dominan Pasar Media Sosial
                  </span>
                </div>
                <h4 className="text-base md:text-lg font-extrabold leading-snug">
                  {analysis.marketSentiment.headline}
                </h4>

                {/* Sentiment Ratio Bar */}
                <div className="mt-4 pt-3 border-t border-white/20">
                  <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                    <span className="text-emerald-300">Minat Beli: {analysis.marketSentiment.bullishPercent}%</span>
                    <span className="text-rose-300">Tekanan Jual/Buyback: {analysis.marketSentiment.bearishPercent}%</span>
                    <span className="text-blue-200">Edukasi: {analysis.marketSentiment.neutralPercent}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-white/20 rounded-full overflow-hidden flex">
                    <div style={{ width: `${analysis.marketSentiment.bullishPercent}%` }} className="bg-emerald-400" />
                    <div style={{ width: `${analysis.marketSentiment.bearishPercent}%` }} className="bg-rose-400" />
                    <div style={{ width: `${analysis.marketSentiment.neutralPercent}%` }} className="bg-blue-300" />
                  </div>
                </div>
              </div>

              {/* Executive Summary Narrative */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Ringkasan Eksekutif AI</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {analysis.executiveSummary}
                </p>
              </div>

              {/* Top Keyword Triggers */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                  Pemicu Percakapan Teratas di TikTok & Instagram
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {analysis.topTriggers.map((item, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-2xl border border-slate-100 shadow-2xs flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-slate-800">{item.keyword}</div>
                        <div className="text-[10px] text-slate-400 font-medium">{item.sentiment}</div>
                      </div>
                      <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg">
                        {item.count}x
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'ideas' && (
            <div className="space-y-4">
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 text-xs text-amber-900 leading-relaxed flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  Ide konten ini dihasilkan AI berdasarkan analisis video-video yang meraih 500k+ views minggu ini di TikTok & Instagram Reels seputar jual-beli emas.
                </span>
              </div>

              {analysis.viralContentIdeas.map((idea, idx) => (
                <div key={idx} className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-2xs hover:border-blue-300 transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h4 className="text-sm font-bold text-slate-800">{idea.title}</h4>
                  </div>

                  <div className="space-y-3 mt-3">
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs">
                      <span className="font-bold text-slate-700 block mb-0.5">Hook 3 Detik Pertama:</span>
                      <span className="italic text-blue-700 font-medium">"{idea.hook3s}"</span>
                    </div>

                    <div className="text-xs text-slate-600 leading-relaxed">
                      <strong className="text-slate-800">Alur Konsep:</strong> {idea.concept}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <Video className="w-3.5 h-3.5 text-indigo-500" />
                        <span>Audio: <strong className="text-slate-700">{idea.recommendedAudio}</strong></span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Tag className="w-3.5 h-3.5 text-blue-500" />
                        {idea.suggestedTags.map((t, i) => (
                          <span key={i} className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'strategy' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* For Toko Emas */}
              <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                    Toko
                  </div>
                  <h4 className="text-sm font-bold text-slate-800">
                    Untuk Toko Emas & Pedagang
                  </h4>
                </div>
                <ul className="space-y-2.5">
                  {analysis.strategicRecommendations.forTokoEmas.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* For Investors */}
              <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs">
                    Tren
                  </div>
                  <h4 className="text-sm font-bold text-slate-800">
                    Untuk Investor & Konsumen
                  </h4>
                </div>
                <ul className="space-y-2.5">
                  {analysis.strategicRecommendations.forInvestors.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>AI Engine Aktif • Analisis Sentimen Real-Time</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold transition-colors"
          >
            Tutup Laporan AI
          </button>
        </div>
      </div>
    </div>
  );
};
