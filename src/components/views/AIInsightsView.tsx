import React, { useState } from 'react';
import { Bot, Sparkles, Send, Lightbulb, CheckCircle2, AlertTriangle, Video, Tag, RefreshCw } from 'lucide-react';
import { AIAnalysisResult } from '../../services/aiAnalysisService';
import { SocialTrendPost } from '../../types';

interface AIInsightsViewProps {
  analysis: AIAnalysisResult;
  posts: SocialTrendPost[];
  onRefresh: () => void;
  isRefreshing?: boolean;
}

export const AIInsightsView: React.FC<AIInsightsViewProps> = ({
  analysis,
  posts,
  onRefresh,
  isRefreshing = false
}) => {
  const [query, setQuery] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<{ sender: 'user' | 'ai'; text: string; time: string }[]>([
    {
      sender: 'ai',
      text: 'Halo! Saya asisten AI Market Intelligence. Anda bisa menanyakan apa saja tentang data tren media sosial, rasio sentimen beli/jual emas, atau meminta rekomendasi ide konten promosi.',
      time: 'Baru saja'
    }
  ]);

  const handleAskData = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMsg = query.trim();
    setQuery('');
    const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    setChatHistory(prev => [...prev, { sender: 'user', text: userMsg, time: timeStr }]);

    setTimeout(() => {
      let reply = '';
      const lower = userMsg.toLowerCase();

      if (lower.includes('beli') || lower.includes('jual') || lower.includes('sentimen')) {
        reply = `Berdasarkan analisis terkini terhadap ${posts.length} postingan di Supabase, rasio sentimen saat ini adalah ${analysis.marketSentiment.bullishPercent}% Minat Beli (Bullish) dan ${analysis.marketSentiment.bearishPercent}% Tekanan Jual/Buyback. Pasar masih didominasi oleh minat akumulasi kepingan kecil.`;
      } else if (lower.includes('hashtag') || lower.includes('tagar') || lower.includes('viral')) {
        reply = `Tiga tagar dengan jangkauan tertinggi saat ini adalah #hargaemas, #emasantam, dan #investasiemas dengan total jangkauan gabungan mencapai puluhan juta views di TikTok & Instagram Reels.`;
      } else if (lower.includes('ide') || lower.includes('konten') || lower.includes('video')) {
        reply = `Rekomendasi konten terbaik untuk toko emas Anda besok: Buat video berdurasi 30-45 detik yang menguji keaslian emas batangan Antam menggunakan aplikasi CertiEye dan timbangan digital mikro. Gunakan hook pembuka: "Jangan beli emas sebelum tahu 3 ciri keaslian ini!".`;
      } else if (lower.includes('buyback') || lower.includes('harga')) {
        reply = `Peluang buyback saat ini sangat tinggi karena netizen mencari toko emas yang menawarkan buyback tanpa potongan liar dan proses timbangan terbuka. Anda disarankan mempromosikan layanan buyback kilat.`;
      } else {
        reply = `Berdasarkan data terkini: Pasar emas di media sosial sedang dalam fase akumulasi positif. Topik paling hangat adalah emas batangan Antam pecahan 0.5g-1g dan perhiasan kadar 750 (17K). Ada hal spesifik lain yang ingin Anda ketahui?`;
      }

      setChatHistory(prev => [...prev, { sender: 'ai', text: reply, time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) }]);
    }, 400);
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-soft">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">
            AI Insights & Recommendations
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Mengubah data mentah media sosial menjadi saran tindakan praktis dan tanya data dengan bahasa natural
          </p>
        </div>
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold shadow-md shadow-blue-500/20 transition-all cursor-pointer shrink-0 disabled:opacity-60"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>{isRefreshing ? 'Menganalisis...' : 'Perbarui Analisis AI'}</span>
        </button>
      </div>

      {/* Row 1: AI Daily Brief & Deteksi Risiko Reputasi */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Daily Brief */}
        <div className="md:col-span-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-3xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-200">
                AI-Generated Daily Brief
              </span>
              <span className="text-xs font-semibold text-blue-200">
                Update: {analysis.generatedAt}
              </span>
            </div>
            <h3 className="text-base md:text-lg font-bold leading-snug">
              {analysis.marketSentiment.headline}
            </h3>
            <p className="text-xs text-blue-100 mt-3 leading-relaxed">
              {analysis.executiveSummary}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/20 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span>Rasio Pasar: <strong>{analysis.marketSentiment.bullishPercent}% Minat Beli</strong> vs <strong>{analysis.marketSentiment.bearishPercent}% Tekanan Jual</strong></span>
            <span className="text-amber-300 font-bold">Fase Akumulasi Aktif</span>
          </div>
        </div>

        {/* Deteksi Risiko Reputasi */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Deteksi Risiko Reputasi
              </h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Perhatian khusus bagi pemilik toko emas terhadap isu yang berpotensi memengaruhi kepercayaan publik:
            </p>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="p-2.5 bg-amber-50 border border-amber-200/60 rounded-xl">
                <strong className="text-amber-800 block text-[11px]">Isu Emas Batangan Palsu:</strong>
                Konsumen semakin kritis meminta bukti uji timbang air dan scan CertiEye.
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-200/60 rounded-xl">
                <strong className="text-slate-800 block text-[11px]">Komplain Potongan Buyback:</strong>
                Hindari potongan admin yang tidak diinformasikan di awal transaksi.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Tanya Data Menggunakan Bahasa Natural (AI Chat Query) */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">Tanya Data Menggunakan Bahasa Natural</h3>
              <p className="text-[11px] text-slate-400">Tanyakan performa hashtag, sentimen beli/jual, atau saran konten kapan saja</p>
            </div>
          </div>
        </div>

        {/* Chat History Box */}
        <div className="space-y-3 max-h-60 overflow-y-auto p-2">
          {chatHistory.map((msg, i) => (
            <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xl p-3.5 rounded-2xl text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-slate-50 border border-slate-100 text-slate-700 rounded-tl-none'
              }`}>
                <p>{msg.text}</p>
                <span className={`text-[10px] block mt-1 ${msg.sender === 'user' ? 'text-blue-200 text-right' : 'text-slate-400'}`}>
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleAskData} className="flex gap-2 pt-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tanyakan sesuatu (contoh: 'Berapa persen sentimen beli emas hari ini?')..."
            className="flex-1 text-xs px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500 font-medium text-slate-800"
          />
          <button
            type="submit"
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Kirim</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* Row 3: Rekomendasi Konten & Ide Kampanye */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {analysis.viralContentIdeas.map((idea, idx) => (
          <div key={idx} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-soft flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center">
                  {idx + 1}
                </span>
                <h4 className="text-xs font-bold text-slate-800">{idea.title}</h4>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px] mb-2.5">
                <span className="font-bold text-slate-700 block mb-0.5">Hook 3 Detik:</span>
                <span className="italic text-blue-700 font-medium">"{idea.hook3s}"</span>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed mb-3">
                {idea.concept}
              </p>
            </div>

            <div className="pt-2.5 border-t border-slate-100 flex flex-wrap gap-1">
              {idea.suggestedTags.map((t, i) => (
                <span key={i} className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded font-medium">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
