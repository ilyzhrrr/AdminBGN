import React from 'react'
import SidebarAdmin from '../SidebarAdmin'

export default function PengaturanAdmin() {
  return (
    <div className="flex min-h-screen bg-[#D1E9FF] font-sans">
      <SidebarAdmin />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-black text-gray-900 mb-8">Pengaturan</h1>

          <div className="space-y-6">
            {/* Keamanan */}
            <div className="bg-white rounded-3xl shadow-sm p-8">
              <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-2">
                <span>🔒</span> Keamanan Akun
              </h3>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Password Lama</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-gray-50 border p-3 rounded-xl outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Password Baru</label>
                  <input type="password" placeholder="Minimal 8 karakter" className="w-full bg-gray-50 border p-3 rounded-xl outline-none focus:border-blue-500" />
                </div>
                <button className="bg-orange-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-orange-600 transition mt-2">
                  Ganti Password
                </button>
              </div>
            </div>

            {/* Preferensi Sistem */}
            <div className="bg-white rounded-3xl shadow-sm p-8 text-gray-800">
              <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                <span>⚙️</span> Preferensi Sistem
              </h3>
              <div className="space-y-4 font-bold">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <div>
                    <p>Notifikasi E-mail</p>
                    <p className="text-xs text-gray-500 font-medium">Terima laporan harian via e-mail</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-6 h-6 accent-[#2577F1] cursor-pointer" />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <div>
                    <p>Mode Pemeliharaan</p>
                    <p className="text-xs text-gray-500 font-medium">Nonaktifkan pendaftaran mitra sementara</p>
                  </div>
                  <input type="checkbox" className="w-6 h-6 accent-[#2577F1] cursor-pointer" />
                </div>
              </div>
            </div>

            {/* Bahaya */}
            <div className="bg-red-50 rounded-3xl shadow-sm p-8 border border-red-100">
              <h3 className="text-xl font-black text-red-700 mb-2">Zona Bahaya</h3>
              <p className="text-sm text-red-600 font-medium mb-4">Keluar dari sistem atau menghapus sesi login aktif Anda.</p>
              <button 
                onClick={() => window.location.href = '/admin/login'}
                className="bg-red-600 text-white px-8 py-2 rounded-xl font-bold hover:bg-red-700 transition"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}