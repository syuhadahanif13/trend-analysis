import React from 'react';
import { Scale, TrendingUp, PieChart, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { SocialTrendPost } from '../../types';

interface TrendSentimentViewProps {
  posts: SocialTrendPost[];
}

export const TrendSentimentView: React.FC<TrendSentimentViewProps> = ({ posts }) => {
  const bullishCount = posts.filter(p => p.sentiment === 'bullish_buy').length;
  const bearishCount = posts.filter(p => p.sentiment === 'bearish_sell').length;
  const neutralCount = posts.filter(p => p.sentiment === 'neutral' || !p.sentiment).length;
  const total = posts.length || 1;

  const bullishPercent = Math.round((bullishCount / total) * 100);
  const bearishPercent = Math.round((bearishCount / total) * 100);
  const neutralPercent = 100 - bullishPercent - bearishPercent;

  const topicClusters = [
    { title: 'Investasi Emas Batangan & Hedging', share: '38%', description: 'Diskusi pembelian Antam LM, Lotus Archi, dan strategi proteksi inflasi.', growth: '+24%' },
    { title: 'Perhiasan Emas 750 & Gaya Hidup', share: '29%', description: 'Model gelang rantai itali, kalung rose gold, dan perhiasan mahar pernikahan.', growth: '+18%' },
    { title: 'Buyback & Pencairan Dana Cepat', share: '18%', description: 'Pencarian toko emas yang menerima buyback tanpa surat dan potongan transparan.', growth: '+31%' },
    { title: 'Edukasi Keaslian & Timbangan Digital', share: '15%', description: 'Pemeriksaan barcode CertiEye, uji kadar timbang air, dan pencegahan emas palsu.', growth: '+12%' },
  ];

  const buyReasons = [
    'Proteksi nilai aset terhadap kekhawatiran depresiasi rupiah dan inflasi.',
    'Menabung gramasi kecil (0.5g - 1g) yang terjangkau untuk pekerja berpenghasilan bulanan.',
    'Persiapan mahar pernikahan dan mas kawin bernilai riil.',
    'Mudah dicairkan kembali sewaktu-waktu dibanding properti atau saham.'
  ];

  const sellReasons = [
    'Kebutuhan likuiditas mendesak untuk modal usaha atau biaya sekolah.',
    'Realisasi keuntungan (profit taking) setelah harga emas Antam mencapai rekor baru.',
    'Menukar model perhiasan lama (kadar muda) menjadi emas batangan murni 99.99%.'
  ];

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">
          Analisis Tren & Sentimen Publik
        </h2>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Memahami apa yang dibicarakan masyarakat dalam Bahasa Indonesia, bagaimana sentimen perasaannya, dan ke mana arah tren bergerak
        </p>
      </div>

      {/* Row 1: Sentiment Gauge & Prediksi Tren Jangka Pendek */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Distribusi Sentimen */}
        <div className="md:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-800">
                Distribusi Sentimen Percakapan (Bahasa Indonesia)
              </h3>
              <span className="text-xs font-semibold text-slate-400">Total {posts.length} Data Dianalisis</span>
            </div>

            {/* Progress Bar Sentimen */}
            <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex mb-4">
              <div style={{ width: `${bullishPercent}%` }} className="bg-emerald-500 transition-all duration-500" title={`Positif/Beli: ${bullishPercent}%`} />
              <div style={{ width: `${neutralPercent}%` }} className="bg-blue-400 transition-all duration-500" title={`Netral/Edukasi: ${neutralPercent}%`} />
              <div style={{ width: `${bearishPercent}%` }} className="bg-rose-500 transition-all duration-500" title={`Negatif/Jual: ${bearishPercent}%`} />
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
                <span className="text-xl font-extrabold text-emerald-700 block">{bullishPercent}%</span>
                <span className="text-xs font-bold text-emerald-800">Sentimen Beli (Positif)</span>
                <p className="text-[10px] text-emerald-600 mt-0.5">Minat akumulasi tinggi</p>
              </div>

              <div className="p-3 bg-blue-50 rounded-2xl border border-blue-100">
                <span className="text-xl font-extrabold text-blue-700 block">{neutralPercent}%</span>
                <span className="text-xs font-bold text-blue-800">Edukasi & Netral</span>
                <p className="text-[10px] text-blue-600 mt-0.5">Pertanyaan keaslian & cara beli</p>
              </div>

              <div className="p-3 bg-rose-50 rounded-2xl border border-rose-100">
                <span className="text-xl font-extrabold text-rose-700 block">{bearishPercent}%</span>
                <span className="text-xs font-bold text-rose-800">Sentimen Jual (Negatif)</span>
                <p className="text-[10px] text-rose-600 mt-0.5">Tekanan buyback & lepas aset</p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Prediksi Tren Jangka Pendek */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 rounded-3xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-200">
                Prediksi Tren Jangka Pendek
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 font-bold text-[10px] border border-emerald-300/30">
                Keyakinan: 88%
              </span>
            </div>
            <h3 className="text-lg font-bold leading-tight">
              Arah Tren: Akumulasi Positif (Bullish Momentum)
            </h3>
            <p className="text-xs text-blue-100 mt-2.5 leading-relaxed">
              Percakapan pembelian emas diproyeksikan tetap dominan selama 7-14 hari ke depan, didorong oleh momentum rekor harga dan minat emas batangan gramasi mikro.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs">
            <span>Rekomendasi Aksi:</span>
            <span className="font-bold text-amber-300">Siapkan Pasokan Stok</span>
          </div>
        </div>
      </div>

      {/* Row 2: Topic Clustering */}
      <div>
        <h3 className="text-base font-bold text-slate-800 mb-3">
          Klaster Topik Utama (Topic Clustering)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topicClusters.map((cluster, i) => (
            <div key={i} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-soft flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                    {cluster.share}
                  </span>
                  <span className="text-xs font-bold text-emerald-600">{cluster.growth}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-800 leading-snug">{cluster.title}</h4>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{cluster.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 3: Alasan Membeli vs Alasan Menjual */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Alasan Membeli */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
              Beli
            </div>
            <h3 className="text-base font-bold text-slate-800">
              Alasan Utama Konsumen Membeli Emas
            </h3>
          </div>
          <ul className="space-y-3">
            {buyReasons.map((reason, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Alasan Menjual */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs">
              Jual
            </div>
            <h3 className="text-base font-bold text-slate-800">
              Alasan Utama Konsumen Menjual Emas (Buyback)
            </h3>
          </div>
          <ul className="space-y-3">
            {sellReasons.map((reason, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
