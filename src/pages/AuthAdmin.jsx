import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AuthAdmin() {
  const [isLogin, setIsLogin] = useState(true)
  const [showSuccess, setShowSuccess] = useState(false)
  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()
    setIsLogin(true)
    setShowSuccess(true)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    navigate('/admin/dashboard')
  }

  return (
    <div className="flex min-h-screen font-sans">
      
      <aside className="w-1/2 bg-[#3B82F6] p-12 text-white flex flex-col relative justify-center">
        
        <div className="absolute top-8 left-8 flex items-center gap-3 cursor-pointer">
          <img src="/logo.png" alt="Logo BGN" className="w-10 h-auto" />
          <span className="text-xl font-bold">Admin BGN</span>
        </div>

        <div className="text-center mb-4 mt-8">
          <p className="text-lg font-medium opacity-90">Memantau SPPG Indonesia</p>
        </div>

        <div className="mb-8 flex justify-center">
          <img src="/utama.png" alt="Illustration Admin" className="w-full max-w-md" />
        </div>

        <div className="space-y-3 max-w-md mx-auto w-full">
          <div className="bg-white/25 p-3 rounded-xl flex items-center gap-3 text-xs font-semibold">
            <span className="text-base">🔮</span>
            <span>Mengkoordinasi akun Mitra, Sekolah, Dan Siswa</span>
          </div>
          <div className="bg-white/25 p-3 rounded-xl flex items-center gap-3 text-xs font-semibold">
            <span className="text-base">📋</span>
            <span>Memantau SPPG</span>
          </div>
          <div className="bg-white/25 p-3 rounded-xl flex items-center gap-3 text-xs font-semibold">
            <span className="text-base">💾</span>
            <span>Menyimpan Data yang diperlukan pada program MBG</span>
          </div>
        </div>
      </aside>

      <main className="w-1/2 bg-[#D1E9FF] p-12 flex flex-col items-center justify-center relative">
        
        {showSuccess && isLogin && (
          <div className="absolute top-8 bg-slate-400/90 text-gray-900 px-6 py-2 rounded-xl text-xs font-bold shadow-sm">
            Registrasi Berhasil! Silahkan Masuk
          </div>
        )}

        <h2 className="text-4xl font-black text-[#1E3A8A] mb-8">
          {isLogin ? 'Masuk Admin' : 'Daftar Admin'}
        </h2>

        <div className="bg-white p-10 rounded-3xl shadow-sm w-full max-w-xl">
          {isLogin ? (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">📸 Email</label>
                <input type="email" required className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-blue-500 bg-gray-50 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">🔒 Password</label>
                <input type="password" required className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-blue-500 bg-gray-50 text-sm" />
              </div>
              <button type="submit" className="w-full bg-[#007BFF] text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition text-sm mt-4">
                Masuk
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">👤 Nama Lengkap</label>
                <input type="text" required className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-blue-500 bg-gray-50 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">📸 Email</label>
                <input type="email" required className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-blue-500 bg-gray-50 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">🔒 Password</label>
                <input type="password" required className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-blue-500 bg-gray-50 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">📱 No. Handphone</label>
                <input type="text" required className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-blue-500 bg-gray-50 text-sm" />
              </div>
              <button type="submit" className="col-span-2 w-full bg-[#007BFF] text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition text-sm mt-2">
                Daftar
              </button>
            </form>
          )}

          <div className="text-center mt-6 text-xs text-gray-500 font-medium">
            {isLogin ? (
              <p>Belum Punya Akun? <span onClick={() => { setIsLogin(false); setShowSuccess(false); }} className="text-blue-600 cursor-pointer font-bold underline ml-1">Daftar</span></p>
            ) : (
              <p>Sudah Punya Akun? <span onClick={() => setIsLogin(true)} className="text-blue-600 cursor-pointer font-bold underline ml-1">Masuk</span></p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}