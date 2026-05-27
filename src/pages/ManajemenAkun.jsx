import React, { useState } from 'react'
import SidebarAdmin from '../SidebarAdmin'

export default function ManajemenAkun() {
  // 'list' untuk tabel akun, 'edit' untuk form ubah data
  const [view, setView] = useState('list')
  // State untuk tab yang aktif
  const [activeTab, setActiveTab] = useState('sekolah')

  return (
    <div className="flex min-h-screen bg-[#D1E9FF] font-sans">
      <SidebarAdmin />
      
      <main className="flex-1 p-8 overflow-y-auto">
        
        {/* --- TAMPILAN 1: DAFTAR MANAJEMEN AKUN --- */}
        {view === 'list' && (
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 text-center border-b border-[#A5D5FF] pb-4">
              <h1 className="text-4xl font-black text-gray-900">Pendaftaran</h1>
              <p className="text-lg font-bold text-gray-700">Manajemen Akun</p>
            </div>

            <div className="bg-white rounded-3xl shadow-sm overflow-hidden min-h-[500px]">
              
              {/* Header Card & Filter */}
              <div className="p-6 flex justify-between items-center border-b border-gray-100">
                <h2 className="font-bold text-gray-800 text-lg w-1/3 leading-tight">
                  Manajemen Akun<br/>Pengguna
                </h2>
                <input 
                  type="text" 
                  placeholder="Cari Pengguna....." 
                  className="w-1/3 p-3 bg-[#D1E9FF] rounded-xl outline-none border border-[#A5D5FF] text-gray-700 font-semibold text-center"
                />
                <div className="w-1/3 flex justify-end relative">
                  <select className="p-3 bg-[#D1E9FF] rounded-xl font-bold text-gray-800 outline-none border border-[#A5D5FF] cursor-pointer appearance-none pr-10 w-40">
                    <option>Semua (9)</option>
                  </select>
                  <span className="absolute right-4 top-3 text-gray-800 pointer-events-none font-bold">v</span>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex justify-around items-center p-4 border-b border-gray-200 font-bold text-gray-700 text-lg">
                <div 
                  onClick={() => setActiveTab('mitra')} 
                  className={`cursor-pointer px-6 py-2 rounded-xl transition ${activeTab === 'mitra' ? 'bg-[#E0F2FE] text-gray-900' : 'hover:bg-gray-50'}`}
                >
                  Mitra SPPG (4)
                </div>
                <div 
                  onClick={() => setActiveTab('sekolah')} 
                  className={`cursor-pointer px-6 py-2 rounded-xl transition ${activeTab === 'sekolah' ? 'bg-[#E0F2FE] text-gray-900' : 'hover:bg-gray-50'}`}
                >
                  Sekolah (9)
                </div>
                <div 
                  onClick={() => setActiveTab('siswa')} 
                  className={`cursor-pointer px-6 py-2 rounded-xl transition ${activeTab === 'siswa' ? 'bg-[#E0F2FE] text-gray-900' : 'hover:bg-gray-50'}`}
                >
                  Siswa (1.627)
                </div>
              </div>

              {/* Table */}
              <table className="w-full text-sm text-left">
                <thead className="bg-[#EAEAEA] text-gray-800 font-bold">
                  <tr>
                    <th className="p-4 pl-6 w-[20%]">Nama Sekolah</th>
                    <th className="p-4 text-center w-[25%]">E-mail Login</th>
                    <th className="p-4 text-center w-[15%]">Jumlah<br/>Siswa</th>
                    <th className="p-4 text-center w-[25%]">SPPG<br/>Pemasok</th>
                    <th className="p-4 w-[15%]"></th>
                  </tr>
                </thead>
                <tbody className="font-bold text-gray-700">
                  <tr className="border-b border-gray-100">
                    <td className="p-4 pl-6">SDN 1 Subang</td>
                    <td className="p-4 text-center underline">SDN1.Subang@mbg.ac.id</td>
                    <td className="p-4 text-center">90</td>
                    <td className="p-4 text-center">SPPG Indonesia</td>
                    <td className="p-4 text-center">
                      <button onClick={() => setView('edit')} className="bg-[#1E73E8] text-white px-6 py-1.5 rounded-md text-xs hover:bg-blue-700 transition">Edit</button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4 pl-6">SDN 2 Subang</td>
                    <td className="p-4 text-center underline">SDN2.Subang@mbg.ac.id</td>
                    <td className="p-4 text-center">91</td>
                    <td className="p-4 text-center">SPPG Ceria</td>
                    <td className="p-4 text-center">
                      <button className="bg-[#1E73E8] text-white px-6 py-1.5 rounded-md text-xs hover:bg-blue-700 transition">Edit</button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4 pl-6">SDN 3 Subang</td>
                    <td className="p-4 text-center underline">SDN3.Subang@mbg.ac.id</td>
                    <td className="p-4 text-center">91</td>
                    <td className="p-4 text-center">SPPG Ceria</td>
                    <td className="p-4 text-center">
                      <button className="bg-[#1E73E8] text-white px-6 py-1.5 rounded-md text-xs hover:bg-blue-700 transition">Edit</button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4 pl-6">SDN 4 Subang</td>
                    <td className="p-4 text-center underline">SDN4.Subang@mbg.ac.id</td>
                    <td className="p-4 text-center">90</td>
                    <td className="p-4 text-center">SPPG Sekolah Kita</td>
                    <td className="p-4 text-center">
                      <button className="bg-[#1E73E8] text-white px-6 py-1.5 rounded-md text-xs hover:bg-blue-700 transition">Edit</button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4 pl-6">SMPN 1 Subang</td>
                    <td className="p-4 text-center underline">SMPN1.Subang@mbg.ac.id</td>
                    <td className="p-4 text-center">311</td>
                    <td className="p-4 text-center">SPPG Indonesia</td>
                    <td className="p-4 text-center">
                      <button className="bg-[#1E73E8] text-white px-6 py-1.5 rounded-md text-xs hover:bg-blue-700 transition">Edit</button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4 pl-6">SMPN 2 Subang</td>
                    <td className="p-4 text-center underline">SMPN2.Subang@mbg.ac.id</td>
                    <td className="p-4 text-center">298</td>
                    <td className="p-4 text-center">SPPG Anak Sekolah</td>
                    <td className="p-4 text-center">
                      <button className="bg-[#1E73E8] text-white px-6 py-1.5 rounded-md text-xs hover:bg-blue-700 transition">Edit</button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4 pl-6">SMPN 3 Subang</td>
                    <td className="p-4 text-center underline">SMPN3.Subang@mbg.ac.id</td>
                    <td className="p-4 text-center">322</td>
                    <td className="p-4 text-center">SPPG Sekolah Kita</td>
                    <td className="p-4 text-center">
                      <button className="bg-[#1E73E8] text-white px-6 py-1.5 rounded-md text-xs hover:bg-blue-700 transition">Edit</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- TAMPILAN 2: EDIT AKUN --- */}
        {view === 'edit' && (
          <div className="max-w-5xl mx-auto relative pt-4">
            {/* Tombol Back */}
            <button 
              onClick={() => setView('list')} 
              className="absolute left-0 top-4 text-4xl font-black text-gray-900 hover:text-blue-600 transition"
            >
              &lt;
            </button>

            <div className="flex gap-12 mt-12 items-start justify-center">
              
              {/* Sisi Kiri: Gambar & Judul */}
              <div className="w-[45%] flex flex-col items-center">
                <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">SD Negeri 1 Subang</h2>
                <img src="/sekolah.png" alt="SDN 1 Subang" className="w-full max-w-sm h-auto object-cover border border-gray-300 shadow-sm bg-gray-200" />
              </div>

              {/* Sisi Kanan: Form Edit */}
              <div className="w-[55%] flex flex-col items-center">
                <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-md">
                  <h3 className="text-3xl font-black text-gray-900 mb-6">Edit</h3>
                  
                  <div className="space-y-4 font-bold">
                    <div>
                      <label className="block text-sm text-gray-800 mb-1">Nama Sekolah</label>
                      <input type="text" className="w-full bg-[#E0F2FE] p-3 rounded-xl outline-none text-gray-700" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-800 mb-1">Lokasi</label>
                      <input type="text" className="w-full bg-[#E0F2FE] p-3 rounded-xl outline-none text-gray-700" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-800 mb-1">E-Mail</label>
                      <input type="email" className="w-full bg-[#E0F2FE] p-3 rounded-xl outline-none text-gray-700" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-800 mb-1">Password</label>
                      <input type="password" className="w-full bg-[#E0F2FE] p-3 rounded-xl outline-none text-gray-700" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-800 mb-1">No. Handphone</label>
                      <input type="text" className="w-full bg-[#E0F2FE] p-3 rounded-xl outline-none text-gray-700" />
                    </div>
                  </div>
                </div>

                <button className="bg-[#007BFF] text-white px-8 py-3 rounded-xl font-bold mt-6 shadow-sm hover:bg-blue-600 transition">
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