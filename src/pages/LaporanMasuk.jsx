import React, { useState } from 'react'
import SidebarAdmin from '../SidebarAdmin'

export default function LaporanMasuk() {
  // 'list' untuk tabel laporan, 'detail' untuk melihat rincian laporan
  const [view, setView] = useState('list')

  return (
    <div className="flex min-h-screen bg-[#D1E9FF] font-sans">
      <SidebarAdmin />
      
      <main className="flex-1 p-8 overflow-y-auto">
        
        {/* --- TAMPILAN 1: DAFTAR LAPORAN --- */}
        {view === 'list' && (
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 text-center border-b border-[#A5D5FF] pb-4">
              <h1 className="text-4xl font-black text-gray-900">Pelaporan</h1>
              <p className="text-lg font-bold text-gray-700">Laporan Masuk</p>
            </div>

            <div className="bg-white rounded-3xl shadow-sm overflow-hidden min-h-[500px]">
              
              {/* Header Card & Filter Tanggal */}
              <div className="p-6 flex justify-between items-center border-b border-gray-100">
                <h2 className="font-bold text-gray-800 text-lg pl-2">
                  Laporan Masuk
                </h2>
                <div className="bg-[#D1D5DB] px-4 py-2 rounded-lg font-bold text-gray-800 text-sm flex items-center gap-2">
                  <span>📅</span> Rabu, 3 Juni 2026
                </div>
              </div>

              {/* Tabel */}
              <table className="w-full text-sm text-center">
                <thead className="bg-[#EAEAEA] text-gray-800 font-bold">
                  <tr>
                    <th className="p-4 text-left pl-8 w-[20%]">Pelapor</th>
                    <th className="p-4 w-[20%]">SPPG Terkait</th>
                    <th className="p-4 w-[20%]">Masalah</th>
                    <th className="p-4 w-[15%]">Tanggal</th>
                    <th className="p-4 w-[15%]">Status</th>
                    <th className="p-4 w-[10%]"></th>
                  </tr>
                </thead>
                <tbody className="font-bold text-gray-700">
                  <tr className="border-b border-gray-100">
                    <td className="p-4 text-left pl-8">SDN 1 Subang</td>
                    <td className="p-4">SPPG Indonesia</td>
                    <td className="p-4">Makanan Kurang</td>
                    <td className="p-4">1 Juni 2026</td>
                    <td className="p-4">Belum Ditinjau</td>
                    <td className="p-4">
                      <button onClick={() => setView('detail')} className="bg-[#1E73E8] text-white px-5 py-1.5 rounded-md text-xs hover:bg-blue-700 transition">Detail</button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4 text-left pl-8">SDN 2 Subang</td>
                    <td className="p-4">SPPG Ceria</td>
                    <td className="p-4">Makanan Basi</td>
                    <td className="p-4">30 Mei 2026</td>
                    <td className="p-4">Sedang Ditinjau</td>
                    <td className="p-4">
                      <button className="bg-[#1E73E8] text-white px-5 py-1.5 rounded-md text-xs hover:bg-blue-700 transition">Detail</button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4 text-left pl-8">SMPN 1 Subang</td>
                    <td className="p-4">SPPG Indonesia</td>
                    <td className="p-4">Makanan Mengandung Alergi</td>
                    <td className="p-4">12 Maret 2026</td>
                    <td className="p-4">Selesai</td>
                    <td className="p-4">
                      <button className="bg-[#1E73E8] text-white px-5 py-1.5 rounded-md text-xs hover:bg-blue-700 transition">Detail</button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4 text-left pl-8">SMPN 2 Subang</td>
                    <td className="p-4">SPPG Anak Sekolah</td>
                    <td className="p-4">Makanan Terlambat Datang</td>
                    <td className="p-4">4 Februari 2026</td>
                    <td className="p-4">Selesai</td>
                    <td className="p-4">
                      <button className="bg-[#1E73E8] text-white px-5 py-1.5 rounded-md text-xs hover:bg-blue-700 transition">Detail</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- TAMPILAN 2: DETAIL LAPORAN --- */}
        {view === 'detail' && (
          <div className="max-w-4xl mx-auto">
            {/* Header Detail */}
            <div className="flex items-center gap-4 mb-8 border-b border-[#A5D5FF] pb-4">
              <button 
                onClick={() => setView('list')} 
                className="text-4xl font-black text-gray-900 hover:text-blue-600 transition"
              >
                &lt;
              </button>
              <div>
                <h1 className="text-2xl font-black text-gray-900">Detail Laporan Masuk</h1>
                <p className="text-gray-700 font-bold">SDN 1 Subang</p>
              </div>
            </div>

            {/* Konten Detail */}
            <div className="bg-white rounded-2xl shadow-sm p-8 font-medium">
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-500 mb-1">Pelapor</label>
                    <p className="text-lg font-black text-gray-900 bg-gray-50 p-3 rounded-lg border border-gray-200">SDN 1 Subang</p>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-500 mb-1">SPPG Terkait</label>
                    <p className="text-lg font-black text-gray-900 bg-gray-50 p-3 rounded-lg border border-gray-200">SPPG Indonesia</p>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-500 mb-1">Tanggal Masuk</label>
                    <p className="text-lg font-black text-gray-900 bg-gray-50 p-3 rounded-lg border border-gray-200">1 Juni 2026</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-500 mb-1">Kategori Masalah</label>
                    <p className="text-lg font-black text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">Makanan Kurang</p>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-500 mb-1">Ubah Status Laporan</label>
                    <select className="w-full text-lg font-black text-gray-900 bg-white p-3 rounded-lg border border-gray-300 outline-none focus:border-blue-500 cursor-pointer">
                      <option value="belum">Belum Ditinjau</option>
                      <option value="sedang">Sedang Ditinjau</option>
                      <option value="selesai">Selesai</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-bold text-gray-500 mb-2">Deskripsi Detail Masalah</label>
                <textarea 
                  readOnly 
                  rows="4"
                  className="w-full bg-gray-50 p-4 rounded-xl border border-gray-200 outline-none text-gray-800 resize-none font-semibold"
                  defaultValue="Terdapat kekurangan jumlah porsi makanan yang dikirimkan hari ini. Total siswa ada 90, namun makanan yang diterima hanya berjumlah 83 porsi. Mohon segera ditindaklanjuti ke SPPG Indonesia."
                ></textarea>
              </div>

              <div className="flex justify-end gap-4 border-t border-gray-100 pt-6">
                <button 
                  onClick={() => setView('list')}
                  className="px-8 py-3 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition"
                >
                  Kembali
                </button>
                <button 
                  className="bg-[#007BFF] text-white px-8 py-3 rounded-xl font-bold shadow-sm hover:bg-blue-600 transition"
                >
                  Simpan Perubahan
                </button>
              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  )
}