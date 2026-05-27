import React, { useState } from 'react'
import SidebarAdmin from '../SidebarAdmin'

export default function PendaftaranMitra() {
  // 'list' untuk tabel pendaftaran, 'detail' untuk melihat formulir pendaftar
  const [view, setView] = useState('list')

  return (
    <div className="flex min-h-screen bg-[#D1E9FF] font-sans">
      <SidebarAdmin />
      
      <main className="flex-1 p-8 overflow-y-auto">
        
        {/* --- TAMPILAN 1: DAFTAR PENDAFTARAN --- */}
        {view === 'list' && (
          <div className="max-w-5xl mx-auto">
            <div className="mb-8 text-center border-b border-[#A5D5FF] pb-4">
              <h1 className="text-4xl font-black text-gray-900">Pendaftaran</h1>
              <p className="text-lg font-bold text-gray-700">Pendaftaran Mitra</p>
            </div>

            <div className="bg-white rounded-3xl shadow-sm overflow-hidden min-h-[400px]">
              <div className="p-6 text-center">
                <h2 className="font-bold text-gray-800 text-lg">Pendaftaran Mitra</h2>
              </div>

              <table className="w-full text-sm text-left">
                <thead className="bg-[#EAEAEA] text-gray-800 font-bold border-y border-gray-200">
                  <tr>
                    <th className="p-4 pl-8 w-1/3">Nama SPPG</th>
                    <th className="p-4 w-1/4">Tanggal</th>
                    <th className="p-4 w-1/4">Status</th>
                    <th className="p-4 w-32"></th>
                  </tr>
                </thead>
                <tbody className="font-bold text-gray-700">
                  <tr className="border-b border-gray-100">
                    <td className="p-4 pl-8">SPPG Sehat</td>
                    <td className="p-4">15 Mei 2026</td>
                    <td className="p-4">Belum Ditinjau</td>
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => setView('detail')} 
                        className="bg-[#2577F1] text-white px-6 py-1.5 rounded-md text-xs hover:bg-blue-700 transition"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4 pl-8">SPPG Anak Bangsa</td>
                    <td className="p-4">6 Mei 2026</td>
                    <td className="p-4">Verifikasi</td>
                    <td className="p-4 text-center">
                      <button className="bg-[#2577F1] text-white px-6 py-1.5 rounded-md text-xs hover:bg-blue-700 transition">Detail</button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4 pl-8">SPPG Anak Sehat</td>
                    <td className="p-4">7 Februari 2026</td>
                    <td className="p-4">Disetujui - Aktif</td>
                    <td className="p-4 text-center">
                      <button className="bg-[#2577F1] text-white px-6 py-1.5 rounded-md text-xs hover:bg-blue-700 transition">Detail</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- TAMPILAN 2: DETAIL FORMULIR PENDAFTARAN --- */}
        {view === 'detail' && (
          <div className="max-w-4xl mx-auto">
            {/* Header Detail */}
            <div className="flex items-center justify-center relative mb-8">
              <button 
                onClick={() => setView('list')} 
                className="absolute left-0 text-4xl font-black text-gray-900 hover:text-blue-600 transition"
              >
                &lt;
              </button>
              <div className="bg-[#4285F4] text-white px-10 py-3 rounded-lg font-bold text-xl shadow-sm">
                Formulir Pendaftaran Mitra SPPG Baru
              </div>
            </div>

            {/* Formulir Card */}
            <div className="bg-white rounded-xl shadow-sm p-10 font-medium">
              
              {/* Bagian 1: Data Mitra */}
              <div className="mb-8">
                <h3 className="text-lg font-black text-gray-900 mb-4 border-b pb-2">Data Mitra</h3>
                <div className="space-y-4 px-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-1">Nama Pendaftar</label>
                    <input type="text" readOnly defaultValue="Zahra Illiyin" className="w-full border border-gray-300 p-2.5 rounded-md text-sm text-gray-700 outline-none bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-1">Nama Instansi <span className="text-red-500 font-normal text-xs ml-2">*opsional</span></label>
                    <input type="text" readOnly defaultValue="-" className="w-full border border-gray-300 p-2.5 rounded-md text-sm text-gray-700 outline-none bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-1">NIK / NPWP</label>
                    <input type="text" readOnly defaultValue="3213345678910111" className="w-full border border-gray-300 p-2.5 rounded-md text-sm text-gray-700 outline-none bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-1">E-Mail</label>
                    <input type="text" readOnly defaultValue="zahrailliyin@gmail.com" className="w-full border border-gray-300 p-2.5 rounded-md text-sm text-gray-700 outline-none bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-1">Nomor HP</label>
                    <input type="text" readOnly defaultValue="081234567890" className="w-full border border-gray-300 p-2.5 rounded-md text-sm text-gray-700 outline-none bg-white" />
                  </div>
                </div>
              </div>

              {/* Bagian 2: Data SPPG */}
              <div className="mb-8">
                <h3 className="text-lg font-black text-gray-900 mb-4 border-b pb-2">Data SPPG</h3>
                <div className="space-y-4 px-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-1">Nama SPPG</label>
                    <input type="text" readOnly defaultValue="SPPG Sehat" className="w-full border border-gray-300 p-2.5 rounded-md text-sm text-gray-700 outline-none bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-1">Alamat SPPG</label>
                    <input type="text" readOnly defaultValue="Jl. Indonesia No.34 Kabupaten subang, Jawa Barat" className="w-full border border-gray-300 p-2.5 rounded-md text-sm text-gray-700 outline-none bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-1 flex justify-between w-full pr-2">
                      <span>Kapasitas Produksi</span>
                      <span className="text-gray-500 font-normal">(Porsi / Hari)</span>
                    </label>
                    <input type="text" readOnly defaultValue="600 Porsi" className="w-full border border-gray-300 p-2.5 rounded-md text-sm text-gray-700 outline-none bg-white" />
                  </div>
                </div>
              </div>

              {/* Bagian 3: Upload Dokumen */}
              <div className="mb-10">
                <h3 className="text-lg font-black text-gray-900 mb-4 border-b pb-2">Upload Dokumen</h3>
                <div className="space-y-4 px-4">
                  <div className="w-full border border-gray-300 p-3 rounded-md text-sm text-gray-800 bg-white">
                    Upload Proposal (PDF)
                  </div>
                  <div className="w-full border border-gray-300 p-3 rounded-md text-sm text-gray-800 bg-white">
                    Upload Foto Dapur
                  </div>
                </div>
              </div>

              {/* Tombol Aksi */}
              <div className="flex justify-center gap-6 px-4">
                <button className="bg-[#1E73E8] text-white px-10 py-3 rounded-lg font-bold w-1/3 hover:bg-blue-700 transition shadow-sm">
                  Setujui & Buat Akun
                </button>
                <button className="bg-[#DF3D46] text-white px-10 py-3 rounded-lg font-bold w-1/3 hover:bg-red-700 transition shadow-sm">
                  Tolak
                </button>
              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  )
}