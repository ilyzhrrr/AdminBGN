import React from 'react'
import SidebarAdmin from '../SidebarAdmin'

export default function DistribusiMakanan() {
  const dataDistribusi = [
    {
      namaSekolah: 'SDN 1 Subang',
      alamat: 'Jl. H.O. Iskandar, Desa No.60, Subang, Kec. Subang, Kabupaten Subang, Jawa Barat 45586',
      porsi: '100 Porsi',
      sppg: 'SPPG Indonesia',
      status: 'Diterima'
    },
    {
      namaSekolah: 'SMPN 1 Subang',
      alamat: 'Jl. Letjen Suprapto No.105, Karanganyar, Kec. Subang, Kabupaten Subang, Jawa Barat 41211',
      porsi: '311 Porsi',
      sppg: 'SPPG Indonesia',
      status: 'Diterima'
    },
    {
      namaSekolah: 'SDN 2 Subang',
      alamat: 'Jl. Letjen Suprapto No.105, Karanganyar, Kec. Subang, Kabupaten Subang, Jawa Barat 41211',
      porsi: '102 Porsi',
      sppg: 'SPPG Ceria',
      status: 'Diterima'
    },
    {
      namaSekolah: 'SDN 3 Subang',
      alamat: 'Jl. Letjen Suprapto No.105, Karanganyar, Kec. Subang, Kabupaten Subang, Jawa Barat 41211',
      porsi: '100 Porsi',
      sppg: 'SPPG Ceria',
      status: 'Diterima'
    },
    {
      namaSekolah: 'SDN 4 Subang',
      alamat: 'Jl. Letjen Suprapto No.105, Karanganyar, Kec. Subang, Kabupaten Subang, Jawa Barat 41211',
      porsi: '100 Porsi',
      sppg: 'SPPG Sekolah Kita',
      status: 'Dalam Pengiriman'
    },
    {
      namaSekolah: 'SMPN 2 Subang',
      alamat: 'Jl. Letjen Suprapto No.105, Karanganyar, Kec. Subang, Kabupaten Subang, Jawa Barat 41211',
      porsi: '311 Porsi',
      sppg: 'SPPG Anak Sekolah',
      status: 'Dalam Pengiriman'
    },
    {
      namaSekolah: 'SMPN 3 Subang',
      alamat: 'Jl. Letjen Suprapto No.105, Karanganyar, Kec. Subang, Kabupaten Subang, Jawa Barat 41211',
      porsi: '343 Porsi',
      sppg: 'SPPG Sekolah Kita',
      status: 'Dalam Pengiriman'
    },
    {
      namaSekolah: 'SMAN 1 Subang',
      alamat: 'Jl. Letjen Suprapto No.105, Karanganyar, Kec. Subang, Kabupaten Subang, Jawa Barat 41211',
      porsi: '381 Porsi',
      sppg: 'SPPG Sekolah Kita',
      status: 'Dalam Pengiriman'
    },
    {
      namaSekolah: 'SMAN 2 Subang',
      alamat: 'Jl. Letjen Suprapto No.105, Karanganyar, Kec. Subang, Kabupaten Subang, Jawa Barat 41211',
      porsi: '392 Porsi',
      sppg: 'SPPG Anak Sekolah',
      status: 'Dalam Pengiriman'
    }
  ]

  return (
    <div className="flex min-h-screen bg-[#D1E9FF] font-sans">
      <SidebarAdmin />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          
          <div className="mb-8 text-center border-b border-[#A5D5FF] pb-4">
            <h1 className="text-4xl font-black text-gray-900">Pelaporan</h1>
            <p className="text-lg font-bold text-gray-700">Distribusi Makanan</p>
          </div>

          <div className="mb-6">
            <button className="bg-[#D1D5DB] px-4 py-2 rounded-lg font-bold text-gray-800 text-sm flex items-center gap-2">
              <span>📅</span> Rabu, 3 Juni 2026
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-3xl p-6 flex flex-col items-center justify-center shadow-sm py-10">
              <span className="text-5xl mb-2 text-[#2577F1]">🚚</span>
              <span className="text-6xl font-black text-gray-900">9</span>
              <p className="text-sm font-bold text-gray-800 mt-2">Total Distribusi Hari Ini</p>
            </div>
            <div className="bg-white rounded-3xl p-6 flex flex-col items-center justify-center shadow-sm py-10">
              <span className="text-5xl mb-2 text-yellow-500">🕒</span>
              <span className="text-6xl font-black text-gray-900">4</span>
              <p className="text-sm font-bold text-gray-800 mt-2">Dalam Pengiriman</p>
            </div>
            <div className="bg-white rounded-3xl p-6 flex flex-col items-center justify-center shadow-sm py-10">
              <span className="text-5xl mb-2 text-green-500">✅</span>
              <span className="text-6xl font-black text-gray-900">4</span>
              <p className="text-sm font-bold text-gray-800 mt-2">Diterima</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm p-8">
            <h3 className="font-bold text-gray-600 mb-6 text-lg">23 Maret 2026</h3>
            
            <div className="space-y-4">
              {dataDistribusi.map((item, index) => (
                <div key={index} className="bg-[#D1F4FA] rounded-xl p-5 flex items-center justify-between">
                  <div className="flex items-start gap-4 w-4/5">
                    <span className="text-3xl mt-1">🏫</span>
                    <div className="space-y-1">
                      <h4 className="font-black text-gray-900 text-base">{item.namaSekolah}</h4>
                      <p className="text-[11px] font-semibold text-gray-700 leading-tight w-3/4">
                        {item.alamat}
                      </p>
                      <p className="font-black text-gray-900 text-sm pt-1">{item.porsi}</p>
                      <p className="font-bold text-gray-800 text-xs flex items-center gap-2">
                        <span className="text-blue-600 text-lg">🏢</span> {item.sppg}
                      </p>
                    </div>
                  </div>
                  
                  <div className="w-1/5 flex justify-end">
                    {item.status === 'Diterima' ? (
                      <span className="bg-[#4CAF50] text-white px-5 py-2 rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm">
                        ✓ Diterima
                      </span>
                    ) : (
                      <span className="bg-[#FFB300] text-white px-5 py-2 rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm">
                        🕒 Dalam Pengiriman
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </main>
    </div>
  )
}