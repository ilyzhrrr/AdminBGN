import React, { useState } from 'react'
import SidebarAdmin from '../SidebarAdmin'

export default function KelolaSPPG() {
  // 'list' untuk tabel daftar, 'detail' untuk rincian SPPG
  const [view, setView] = useState('list')

  return (
    <div className="flex min-h-screen bg-[#D1E9FF] font-sans">
      <SidebarAdmin />
      
      <main className="flex-1 p-8 overflow-y-auto">
        
        {/* --- TAMPILAN 1: DAFTAR SPPG --- */}
        {view === 'list' && (
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-black text-gray-900">Utama</h1>
              <p className="text-lg font-bold text-gray-700">Kelola SPPG</p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm min-h-[500px]">
              <div className="flex justify-between items-center mb-6 px-4">
                <h2 className="font-bold text-gray-800 text-lg leading-tight w-1/3">
                  Daftar SPPG -<br/>Kec. Ciasem, Subang
                </h2>
                <input 
                  type="text" 
                  placeholder="Cari....." 
                  className="w-1/3 p-3 bg-[#D1E9FF] rounded-xl outline-none border border-[#A5D5FF] text-gray-700 font-semibold text-center"
                />
                <div className="w-1/3 flex justify-end">
                  <select className="p-3 bg-[#D1E9FF] rounded-xl font-bold text-gray-800 outline-none border border-[#A5D5FF] cursor-pointer">
                    <option>Semua Status</option>
                    <option>Aktif</option>
                    <option>Non-Aktif</option>
                  </select>
                </div>
              </div>

              <table className="w-full text-sm text-left">
                <thead className="bg-[#EAEAEA] text-gray-800 font-bold">
                  <tr>
                    <th className="p-4 rounded-tl-xl w-1/4">Nama SPPG</th>
                    <th className="p-4 w-1/4">Alamat</th>
                    <th className="p-4 text-center w-[15%]">Sekolah<br/>Dilayani</th>
                    <th className="p-4 w-[15%]">Status</th>
                    <th className="p-4 rounded-tr-xl w-32"></th>
                  </tr>
                </thead>
                <tbody className="font-bold text-gray-700">
                  <tr className="border-b border-gray-100">
                    <td className="p-4">SPPG Anak Sekolah</td>
                    <td className="p-4">Jl. Sehat No.1</td>
                    <td className="p-4 text-center">2</td>
                    <td className="p-4">Aktif</td>
                    <td className="p-4">
                      <button 
                        onClick={() => setView('detail')} 
                        className="bg-[#2577F1] text-white px-5 py-1.5 rounded-lg text-xs hover:bg-blue-700 transition"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4">SPPG Ceria</td>
                    <td className="p-4">Jl. Bangsa No. 2</td>
                    <td className="p-4 text-center">2</td>
                    <td className="p-4">Aktif</td>
                    <td className="p-4">
                      <button className="bg-[#2577F1] text-white px-5 py-1.5 rounded-lg text-xs hover:bg-blue-700 transition">Detail</button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4">SPPG Indonesia</td>
                    <td className="p-4">Jl. Indonesia No. 3</td>
                    <td className="p-4 text-center">2</td>
                    <td className="p-4">Aktif</td>
                    <td className="p-4">
                      <button className="bg-[#2577F1] text-white px-5 py-1.5 rounded-lg text-xs hover:bg-blue-700 transition">Detail</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- TAMPILAN 2: DETAIL SPPG --- */}
        {view === 'detail' && (
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-6 border-b border-[#A5D5FF] pb-4">
              <button 
                onClick={() => setView('list')} 
                className="text-3xl font-black text-gray-900 hover:text-blue-600 transition"
              >
                &lt;
              </button>
              <h1 className="text-2xl font-black text-gray-900">SPPG Anak Sekolah</h1>
            </div>

            <div className="flex gap-8 items-start">
              <div className="w-[45%]">
                <img src="/sppg.png" alt="SPPG" className="w-full h-auto object-cover border border-gray-300 rounded-sm mb-4 bg-gray-200" />
                <p className="text-lg font-medium text-gray-900 pr-4">jl. Indonesia No.34 Kabupaten subang, Jawa Barat</p>
              </div>

              <div className="w-[55%]">
                <h2 className="text-3xl font-black text-gray-900 mb-6">SPPG Indonesia</h2>
                <div className="space-y-4 text-xl font-medium text-gray-900 mb-8">
                  <p>Status: <span className="font-medium">Aktif</span></p>
                  <p>E-mail: Anak.Sekolah@ac.id</p>
                  <p>Kapasitas: 100 Porsi</p>
                </div>

                <h3 className="text-xl font-black text-gray-900 mb-4">Sekolah Dilayani:</h3>
                <div className="space-y-4">
                  <div className="bg-[#A4EBFB] rounded-xl p-5 flex items-center gap-6 shadow-sm">
                    <span className="text-5xl">🏫</span>
                    <div>
                      <h4 className="text-lg font-black text-gray-900 mb-1">SDN 1 Subang</h4>
                      <p className="text-[11px] font-semibold text-gray-900 leading-tight">
                        Jl. H.O. Iskandar, Desa No.60, Subang, Kec. Subang, Kabupaten Kuningan,<br/>Jawa Barat 45586
                      </p>
                    </div>
                  </div>
                  <div className="bg-[#A4EBFB] rounded-xl p-5 flex items-center gap-6 shadow-sm">
                    <span className="text-5xl">🏢</span>
                    <div>
                      <h4 className="text-lg font-black text-gray-900 mb-1">SMPN 1 Subang</h4>
                      <p className="text-[11px] font-semibold text-gray-900 leading-tight">
                        Jl. Letjen Suprapto No.105, Karanganyar, Kec. Subang, Kabupaten Subang,<br/>Jawa Barat 41211
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}