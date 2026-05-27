import React from 'react'
import SidebarAdmin from '../SidebarAdmin'

export default function DashboardAdmin() {
  return (
    <div className="flex min-h-screen bg-[#D1E9FF] font-sans">
      
      {/* Memanggil komponen sidebar terbaru yang sudah kita perbaiki */}
      <SidebarAdmin />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          <h1 className="text-4xl font-black text-gray-900 mb-8 text-center">Dashboard</h1>
          
          {/* Kartu Statistik */}
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-6 flex flex-col items-center justify-center shadow-sm">
              <span className="text-5xl mb-2 text-[#2577F1]">🏢</span>
              <div className="flex items-end gap-3 mb-1">
                <span className="text-6xl font-black text-gray-900">4</span>
              </div>
              <p className="text-lg font-bold text-gray-800">SPPG Aktif</p>
            </div>
            <div className="bg-white rounded-3xl p-6 flex flex-col items-center justify-center shadow-sm">
              <span className="text-5xl mb-2">🏫</span>
              <div className="flex items-end gap-3 mb-1">
                <span className="text-6xl font-black text-gray-900">9</span>
              </div>
              <p className="text-lg font-bold text-gray-800">Sekolah Terdaftar</p>
            </div>
            <div className="bg-white rounded-3xl p-6 flex flex-col items-center justify-center shadow-sm">
              <span className="text-5xl mb-2">🎓</span>
              <div className="flex items-end gap-3 mb-1">
                <span className="text-6xl font-black text-gray-900">1.627</span>
              </div>
              <p className="text-lg font-bold text-gray-800">Total Siswa</p>
            </div>
          </div>

          {/* Tabel Informasi */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800">Pendaftaran Mitra</h3>
                <span className="text-sm text-blue-600 font-bold cursor-pointer hover:underline">Lihat Semua</span>
              </div>
              <div className="overflow-hidden rounded-xl border border-gray-100 flex-1">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-100 text-gray-700 font-bold">
                    <tr>
                      <th className="p-3">Nama SPPG</th>
                      <th className="p-3">Tanggal</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="font-semibold text-gray-800">
                    <tr className="border-b border-gray-100"><td className="p-3">SPPG Sehat</td><td className="p-3">15 Mei 2026</td><td className="p-3">Belum Ditinjau</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3">SPPG Anak Bangsa</td><td className="p-3">6 Mei 2026</td><td className="p-3">Verifikasi</td></tr>
                    <tr><td className="p-3">SPPG Anak Sehat</td><td className="p-3">7 Februari 2026</td><td className="p-3">Disetujui - Aktif</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800">Laporan Terbaru</h3>
                <span className="text-sm text-blue-600 font-bold cursor-pointer hover:underline">Semua Laporan</span>
              </div>
              <div className="flex-1 space-y-3 text-sm">
                <p className="font-bold text-gray-800 border-b border-gray-200 pb-3">SDN 1 Subang<span className="font-semibold text-gray-600 ml-2 block mt-1">Makanan Kurang - 7 Siswa terdampak</span></p>
                <p className="font-bold text-gray-800 border-b border-gray-200 pb-3">SDN 2 Subang<span className="font-semibold text-gray-600 ml-2 block mt-1">Makanan Basi - 12 Siswa Terdampak</span></p>
                <p className="font-bold text-gray-800 pb-3">SMPN 1 Subang<span className="font-semibold text-gray-600 ml-2 block mt-1">Makanan mengandung alergi - Tidak ada menu khusus</span></p>
              </div>
            </div>
          </div>

          {/* Diagram Progress Bar */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-blue-500 text-lg">📊</span> Status SPPG
              </h3>
              <div className="space-y-4 font-bold text-sm">
                <div className="flex items-center justify-between">
                  <span className="w-24 text-gray-700">Aktif</span>
                  <div className="flex-1 bg-gray-100 h-3 rounded-full overflow-hidden mx-4">
                    <div className="bg-green-500 w-[60%] h-full"></div>
                  </div>
                  <span className="w-4 text-right">4</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="w-24 text-gray-700">Pending</span>
                  <div className="flex-1 bg-gray-100 h-3 rounded-full overflow-hidden mx-4">
                    <div className="bg-orange-500 w-[30%] h-full"></div>
                  </div>
                  <span className="w-4 text-right">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="w-24 text-gray-700">Non-Aktif</span>
                  <div className="flex-1 bg-gray-100 h-3 rounded-full overflow-hidden mx-4">
                    <div className="bg-gray-300 w-[15%] h-full"></div>
                  </div>
                  <span className="w-4 text-right">1</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-gray-700 text-lg">👤</span> Akun pengguna
              </h3>
              <div className="space-y-4 font-bold text-sm">
                <div className="flex items-center justify-between">
                  <span className="w-24 text-gray-700">Mitra SPPG</span>
                  <div className="flex-1 bg-gray-100 h-3 rounded-full overflow-hidden mx-4">
                    <div className="bg-blue-500 w-[20%] h-full"></div>
                  </div>
                  <span className="w-10 text-right">4</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="w-24 text-gray-700">Sekolah</span>
                  <div className="flex-1 bg-gray-100 h-3 rounded-full overflow-hidden mx-4">
                    <div className="bg-green-500 w-[30%] h-full"></div>
                  </div>
                  <span className="w-10 text-right">9</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="w-24 text-gray-700">Siswa</span>
                  <div className="flex-1 bg-gray-100 h-3 rounded-full overflow-hidden mx-4">
                    <div className="bg-yellow-400 w-[90%] h-full"></div>
                  </div>
                  <span className="w-10 text-right">1.627</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="w-24 text-gray-700">Umum</span>
                  <div className="flex-1 bg-gray-100 h-3 rounded-full overflow-hidden mx-4">
                    <div className="bg-orange-500 w-[70%] h-full"></div>
                  </div>
                  <span className="w-10 text-right">900</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}