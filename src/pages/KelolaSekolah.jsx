import React, { useState } from 'react'
import SidebarAdmin from '../SidebarAdmin'

export default function KelolaSekolah() {
  const [view, setView] = useState('list')

  const dataSekolah = [
    { nama: 'SDN 1 Subang', jenjang: 'SD', siswa: 90, sppg: 'SPPG Indonesia', alergi: '7 Siswa Alergi' },
    { nama: 'SDN 2 Subang', jenjang: 'SD', siswa: 91, sppg: 'SPPG Ceria', alergi: '4 Siswa Alergi' },
    { nama: 'SDN 3 Subang', jenjang: 'SD', siswa: 91, sppg: 'SPPG Ceria', alergi: '-' },
    { nama: 'SDN 4 Subang', jenjang: 'SD', siswa: 90, sppg: 'SPPG Sekolah Kita', alergi: '1 Siswa Alergi' },
    { nama: 'SMPN 1 Subang', jenjang: 'SMP', siswa: 311, sppg: 'SPPG Indonesia', alergi: '12 Siswa Alergi' },
    { nama: 'SMPN 2 Subang', jenjang: 'SMP', siswa: 298, sppg: 'SPPG Anak Sekolah', alergi: '4 Siswa Alergi' },
    { nama: 'SMPN 3 Subang', jenjang: 'SMP', siswa: 322, sppg: 'SPPG Sekolah Kita', alergi: '7 Siswa Alergi' },
    { nama: 'SMAN 1 Subang', jenjang: 'SMA', siswa: 341, sppg: 'SPPG Sekolah Kita', alergi: '5 Siswa Alergi' },
    { nama: 'SMAN 2 Subang', jenjang: 'SMA', siswa: 355, sppg: 'SPPG Anak Sekolah', alergi: '1 Siswa Alergi' },
  ]

  return (
    <div className="flex min-h-screen bg-[#D1E9FF] font-sans">
      <SidebarAdmin />
      
      <main className="flex-1 p-8 overflow-y-auto">
        
        {/* --- TAMPILAN DAFTAR SEKOLAH --- */}
        {view === 'list' && (
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 text-center border-b border-[#A5D5FF] pb-4">
              <h1 className="text-4xl font-black text-gray-900">Utama</h1>
              <p className="text-lg font-bold text-gray-700">Kelola Sekolah</p>
            </div>

            <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
              <div className="p-8 flex justify-between items-center border-b border-gray-100">
                <h2 className="text-xl font-black text-gray-900 leading-snug w-1/3">
                  Daftar Sekolah -<br/>Kec. Ciasem, Subang
                </h2>
                <div className="flex gap-4 w-2/3 justify-end items-center">
                  <input 
                    type="text" 
                    placeholder="Cari....." 
                    className="bg-[#D1E9FF] px-6 py-3 rounded-xl outline-none w-1/2 font-bold text-gray-700 placeholder-gray-500" 
                  />
                  <select className="bg-[#D1E9FF] px-6 py-3 rounded-xl font-bold text-gray-800 outline-none cursor-pointer border-r-8 border-transparent">
                    <option>Semua (9)</option>
                    <option>SD (4)</option>
                    <option>SMP (3)</option>
                    <option>SMA (2)</option>
                  </select>
                </div>
              </div>

              <table className="w-full text-sm text-center">
                <thead className="bg-[#EAEAEA] text-gray-800 font-bold">
                  <tr>
                    <th className="p-4 text-left pl-8 w-[20%]">Nama Sekolah</th>
                    <th className="p-4 w-[10%]">Jenjang</th>
                    <th className="p-4 w-[15%]">Jumlah<br/>Siswa</th>
                    <th className="p-4 w-[20%]">SPPG<br/>Pemasok</th>
                    <th className="p-4 w-[20%]">Data<br/>Alergi</th>
                    <th className="p-4 w-[15%]"></th>
                  </tr>
                </thead>
                <tbody className="font-bold text-gray-700">
                  {dataSekolah.map((sekolah, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="p-4 text-left pl-8">{sekolah.nama}</td>
                      <td className="p-4">{sekolah.jenjang}</td>
                      <td className="p-4">{sekolah.siswa}</td>
                      <td className="p-4">{sekolah.sppg}</td>
                      <td className="p-4">{sekolah.alergi}</td>
                      <td className="p-4">
                        <button 
                          onClick={() => setView('detail')}
                          className="bg-[#1E73E8] text-white px-5 py-1.5 rounded-md text-xs hover:bg-blue-700 transition"
                        >
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- TAMPILAN DETAIL SEKOLAH --- */}
        {view === 'detail' && (
          <div className="max-w-5xl mx-auto">
            {/* Top Bar Navigation */}
            <div className="flex items-center gap-4 mb-6 p-4 border-b border-[#A5D5FF]">
              <button 
                onClick={() => setView('list')} 
                className="text-3xl font-black text-gray-900 hover:text-blue-600 transition"
              >
                &lt;
              </button>
              <h1 className="text-xl font-black text-gray-900">SDN 1 Subang</h1>
            </div>

            {/* Content Detail */}
            <div className="flex gap-10">
              
              {/* Kiri: Foto dan Alamat */}
              <div className="w-1/2">
                <img 
                  src="/sekolah.png" 
                  alt="Foto SDN 1 Subang" 
                  className="w-full h-auto object-cover rounded-sm mb-4 shadow-sm"
                />
                <p className="text-sm font-semibold text-gray-800 leading-snug">
                  Jl. H.O. Iskandar, Desa No.60, Subang, Kec. Subang, Kabupaten Kuningan, Jawa Barat 45586
                </p>
              </div>

              {/* Kanan: Informasi Detail */}
              <div className="w-1/2 space-y-3 mt-4">
                <h2 className="text-2xl font-black text-gray-900 mb-4">SD Negeri 1 Subang</h2>
                <p className="text-lg font-medium text-gray-900">Status: Aktif</p>
                <p className="text-lg font-medium text-gray-900">E-mail: SDN1.Subang@ac.id</p>
                <p className="text-lg font-medium text-gray-900">Jumlah Guru: 10</p>
                <p className="text-lg font-medium text-gray-900">Jumlah Siswa: 90</p>
              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  )
}