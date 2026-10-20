import React from 'react';
import { DollarSign, TrendingUp, ArrowUpRight, Clock, Search, ShieldCheck } from 'lucide-react';

export const GoldMarketView: React.FC = () => {
  const goldPrices = [
    { brand: 'Antam Logam Mulia', weight: '1 Gram', sellPrice: 'Rp 1.485.000', buybackPrice: 'Rp 1.332.000', spread: '10.3%', change: '+Rp 12.000' },
    { brand: 'UBS Gold', weight: '1 Gram', sellPrice: 'Rp 1.462.000', buybackPrice: 'Rp 1.318.000', spread: '9.8%', change: '+Rp 10.000' },
    { brand: 'Lotus Archi', weight: '1 Gram', sellPrice: 'Rp 1.460.000', buybackPrice: 'Rp 1.315.000', spread: '9.9%', change: '+Rp 9.000' },
    { brand: 'Galeri 24 Pegadaian', weight: '1 Gram', sellPrice: 'Rp 1.468.000', buybackPrice: 'Rp 1.325.000', spread: '9.7%', change: '+Rp 11.000' },
  ];

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">
          Gold Market Intelligence
        </h2>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Menghubungkan dinamika percakapan media sosial dengan konteks pasar fisik dan pergerakan harga emas riil
        </p>
      </div>

      {/* Row 1: Harga Emas Terkini & Spread */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {goldPrices.map((item, i) => (
          <div key={i} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-soft flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  {item.brand}
                </span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {item.change}
                </span>
              </div>
              <div className="text-xl font-extrabold text-slate-900 mt-1">
                {item.sellPrice}
              </div>
              <span className="text-[11px] text-slate-400 font-medium block mt-0.5">
                Harga Jual ({item.weight})
              </span>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Buyback: <strong className="text-slate-700">{item.buybackPrice}</strong></span>
              <span className="text-blue-600 font-bold">Spread {item.spread}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Row 2: Korelasi Harga & Percakapan & Analisis Kata Kunci */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Korelasi Harga dan Percakapan */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-slate-800">
                Korelasi Kenaikan Harga vs Lonjakan Percakapan
              </h3>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                Korelasi Tinggi (r = 0.84)
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Setiap kali harga emas Antam naik lebih dari Rp 10.000 per gram dalam 1 hari, volume unggahan video di TikTok & Instagram Reels melonjak rata-rata <strong>3.4 kali lipat</strong> dalam 6 jam pertama.
            </p>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-600">
                <span>Rata-rata Waktu Reaksi Netizen:</span>
                <strong className="text-slate-800">45 Menit Pasca Rilis Harga</strong>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>Pola Reaksi Dominan:</span>
                <strong className="text-emerald-700">68% Berbagi Info Kenaikan (Bullish)</strong>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>Kanal Paling Cepat Merespons:</span>
                <strong className="text-blue-700">TikTok Short Video</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Analisis Kata Kunci: "harga emas hari ini" */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-slate-800">
                Analisis Kata Kunci: "Harga Emas Hari Ini"
              </h3>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                Volume Tinggi
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Kata kunci utama yang dicari konsumen di mesin pencari dan kolom pencarian TikTok untuk membandingkan harga beli dan harga buyback toko emas.
            </p>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 bg-blue-50/80 rounded-2xl border border-blue-100">
                <span className="text-xl font-extrabold text-blue-700 block">08:30 - 10:00</span>
                <span className="text-[11px] font-bold text-blue-800">Waktu Pencarian Puncak</span>
                <p className="text-[10px] text-blue-600 mt-0.5">WIB (Pasca update harga)</p>
              </div>

              <div className="p-3 bg-indigo-50/80 rounded-2xl border border-indigo-100">
                <span className="text-xl font-extrabold text-indigo-700 block">1.2M+</span>
                <span className="text-[11px] font-bold text-indigo-800">Estimasi Jangkauan Bulanan</span>
                <p className="text-[10px] text-indigo-600 mt-0.5">Di media sosial Indonesia</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Indikator Peluang Pasar */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-3xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200 block mb-1">
            Indikator Peluang Pasar
          </span>
          <h3 className="text-base font-bold">
            Momen Strategis Promosi Buyback Transparan & Emas Batangan Mikro
          </h3>
          <p className="text-xs text-blue-100 mt-1 leading-relaxed max-w-2xl">
            Spread harga yang melebar di butik resmi menciptakan peluang emas bagi gerai toko independen untuk menarik konsumen melalui penawaran buyback kompetitif dan kemudahan proses verifikasi.
          </p>
        </div>
        <div className="bg-white/10 px-4 py-2.5 rounded-2xl border border-white/20 text-center shrink-0">
          <span className="text-xs text-blue-200 block">Skor Peluang Pasar</span>
          <span className="text-xl font-extrabold text-amber-300">92 / 100</span>
        </div>
      </div>
    </div>
  );
};
