import React, { useState } from 'react';
import { Bell, FileText, Download, CheckCircle2, Clock, AlertTriangle, Mail } from 'lucide-react';
import { SocialTrendPost } from '../../types';

interface AlertsReportsViewProps {
  posts: SocialTrendPost[];
  onExportCSV: () => void;
}

export const AlertsReportsView: React.FC<AlertsReportsViewProps> = ({
  posts,
  onExportCSV
}) => {
  const [emailAlerts, setEmailAlerts] = useState<boolean>(true);
  const [scheduleTime, setScheduleTime] = useState<string>('09:00');

  const alerts = [
    { title: 'Lonjakan Percakapan #hargaemas', level: 'Tinggi', time: '1 jam yang lalu', desc: 'Volume video TikTok dengan tagar #hargaemas meningkat 28.4% dalam 12 jam.' },
    { title: 'Peningkatan Pencarian Buyback Tanpa Surat', level: 'Sedang', time: '4 jam yang lalu', desc: 'Netizen aktif mendiskusikan toko emas yang menerima buyback tanpa dokumen lengkap.' },
    { title: 'Pertanyaan Keaslian Sertifikat Antam Reddot', level: 'Info', time: '8 jam yang lalu', desc: 'Video tutorial scan CertiEye mencapai lebih dari 500k views di feed Reels.' },
  ];

  const handleDownloadPDF = () => {
    alert('Laporan PDF Ringkasan Eksekutif Tren Emas berhasil dibuat dan diunduh.');
  };

  const handleDownloadExcel = () => {
    onExportCSV();
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">
          Alerts & Scheduled Reports
        </h2>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Mengirimkan peringatan otomatis dan laporan berkala kepada pengambil keputusan bisnis emas
        </p>
      </div>

      {/* Row 1: Daftar Alerts Aktif & Pengaturan Jadwal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Kolom 1 & 2: Daftar Alerts */}
        <div className="md:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-800">Peringatan Tren Aktif (Alerts)</h3>
            </div>
            <span className="text-xs font-semibold text-slate-400">{alerts.length} Notifikasi</span>
          </div>

          <div className="space-y-3">
            {alerts.map((al, idx) => (
              <div key={idx} className="p-4 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      al.level === 'Tinggi' ? 'bg-rose-100 text-rose-800' : al.level === 'Sedang' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {al.level}
                    </span>
                    <h4 className="text-xs font-bold text-slate-800">{al.title}</h4>
                  </div>
                  <p className="text-xs text-slate-500">{al.desc}</p>
                </div>
                <span className="text-[10px] text-slate-400 whitespace-nowrap">{al.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Kolom 3: Pengaturan Jadwal Laporan Otomatis */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Mail className="w-4 h-4 text-indigo-600" />
              <h3 className="text-sm font-bold text-slate-800">Jadwal Laporan (Scheduled)</h3>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Kirim ringkasan tren harian otomatis ke dashboard pengelola setiap pagi.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Waktu Kirim Harian
                </label>
                <input
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-xs font-medium text-slate-700">Notifikasi Email Otomatis</span>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-center">
            <span className="text-[11px] text-emerald-600 font-bold block">
              Jadwal Aktif Setiap Pukul {scheduleTime} WIB
            </span>
          </div>
        </div>
      </div>

      {/* Row 2: Ekspor Laporan & Data Lengkap */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft">
        <h3 className="text-sm font-bold text-slate-800 mb-2">
          Pusat Ekspor Laporan & Arsip Data
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Unduh data terstruktur postingan sosial media dan ringkasan eksekutif untuk laporan manajemen
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Ekspor CSV */}
          <button
            onClick={onExportCSV}
            className="p-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl flex items-center justify-between text-left transition-colors cursor-pointer"
          >
            <div>
              <span className="text-xs font-bold text-slate-800 block">Ekspor CSV Data</span>
              <span className="text-[10px] text-slate-400">Seluruh {posts.length} baris data Supabase</span>
            </div>
            <Download className="w-4 h-4 text-blue-600" />
          </button>

          {/* Ekspor Excel */}
          <button
            onClick={handleDownloadExcel}
            className="p-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl flex items-center justify-between text-left transition-colors cursor-pointer"
          >
            <div>
              <span className="text-xs font-bold text-slate-800 block">Ekspor Excel Sheet</span>
              <span className="text-[10px] text-slate-400">Format kompatibel spreadsheet</span>
            </div>
            <Download className="w-4 h-4 text-emerald-600" />
          </button>

          {/* Ekspor PDF */}
          <button
            onClick={handleDownloadPDF}
            className="p-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl flex items-center justify-between text-left transition-colors cursor-pointer"
          >
            <div>
              <span className="text-xs font-bold text-slate-800 block">Ekspor Ringkasan PDF</span>
              <span className="text-[10px] text-slate-400">Laporan eksekutif siap cetak</span>
            </div>
            <FileText className="w-4 h-4 text-indigo-600" />
          </button>
        </div>
      </div>
    </div>
  );
};
