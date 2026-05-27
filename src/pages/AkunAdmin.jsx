import React, { useState } from 'react'
import SidebarAdmin from '../SidebarAdmin'

export default function AkunAdmin() {
  const [isEditing, setIsEditing] = useState(false)
  const [adminData, setAdminData] = useState({
    nama: 'Princess Kurang Tidur Squad',
    email: 'admin.ciasem@nutrisafe.id',
    role: 'Admin Ciasem',
    telepon: '0812-3456-7890',
    lokasi: 'Kecamatan Ciasem, Subang'
  })

  const handleSave = () => {
    setIsEditing(false)
    alert('Perubahan berhasil disimpan!')
  }

  return (
    <div className="flex min-h-screen bg-[#D1E9FF] font-sans">
      <SidebarAdmin />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-black text-gray-900 mb-8">Informasi Pribadi</h1>

          <div className="bg-white rounded-3xl shadow-sm p-10 flex gap-10">
            {/* Foto Profil */}
            <div className="w-1/3 flex flex-col items-center border-r border-gray-100 pr-10">
              <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center text-5xl mb-4 border-4 border-[#2577F1]">
                👸
              </div>
              <h3 className="font-bold text-gray-800 text-center">{adminData.role}</h3>
              <button className="text-blue-600 text-xs font-bold mt-2 hover:underline">Ubah Foto</button>
            </div>

            {/* Form Informasi */}
            <div className="w-2/3 space-y-5">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black text-gray-500 uppercase mb-1">Nama Lengkap</label>
                  {isEditing ? (
                    <input 
                      className="w-full bg-gray-50 border p-2 rounded-lg outline-none focus:border-blue-500"
                      value={adminData.nama} 
                      onChange={(e) => setAdminData({...adminData, nama: e.target.value})}
                    />
                  ) : (
                    <p className="font-bold text-gray-800">{adminData.nama}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-500 uppercase mb-1">E-mail</label>
                  {isEditing ? (
                    <input 
                      className="w-full bg-gray-50 border p-2 rounded-lg outline-none focus:border-blue-500"
                      value={adminData.email} 
                      onChange={(e) => setAdminData({...adminData, email: e.target.value})}
                    />
                  ) : (
                    <p className="font-bold text-gray-800">{adminData.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-500 uppercase mb-1">No. Handphone</label>
                  {isEditing ? (
                    <input 
                      className="w-full bg-gray-50 border p-2 rounded-lg outline-none focus:border-blue-500"
                      value={adminData.telepon} 
                      onChange={(e) => setAdminData({...adminData, telepon: e.target.value})}
                    />
                  ) : (
                    <p className="font-bold text-gray-800">{adminData.telepon}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-500 uppercase mb-1">Wilayah Tugas</label>
                  <p className="font-bold text-gray-800">{adminData.lokasi}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 flex gap-4">
                {isEditing ? (
                  <>
                    <button 
                      onClick={handleSave}
                      className="bg-green-600 text-white px-8 py-2 rounded-xl font-bold hover:bg-green-700 transition"
                    >
                      Simpan Perubahan
                    </button>
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-200 text-gray-700 px-8 py-2 rounded-xl font-bold hover:bg-gray-300 transition"
                    >
                      Batal
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="bg-[#2577F1] text-white px-8 py-2 rounded-xl font-bold hover:bg-blue-700 transition"
                  >
                    Edit Profil
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}