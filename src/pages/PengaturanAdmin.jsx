import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SidebarAdmin from '../SidebarAdmin'
import { api, clearAuth } from '../api'

export default function PengaturanAdmin() {
  const navigate = useNavigate()
  const [oldPw, setOldPw] = useState('')
  const [newPw, setNewPw] = useState('')
  const [pwMsg, setPwMsg] = useState('')
  const [pwLoading, setPwLoading] = useState(false)
  const [showOld, setShowOld] = useState(false)
  const [showNew, setShowNew] = useState(false)

  const handleChangePw = async (e) => {
    e.preventDefault()
    setPwLoading(true)
    setPwMsg('')
    try {
      await api.post('/change-password', { old_password: oldPw, new_password: newPw })
      setPwMsg('Password berhasil diubah!')
      setOldPw('')
      setNewPw('')
    } catch (err) {
      setPwMsg('Gagal: ' + err.message)
    } finally {
      setPwLoading(false)
    }
  }

  const handleLogout = () => {
    clearAuth()
    navigate('/admin/login')
  }

  return (
    <div className="flex min-h-screen bg-[#D1E9FF] font-sans">
      <SidebarAdmin />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-black text-gray-900 mb-8">Pengaturan</h1>

          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-sm p-8">
              <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-2">
                <span>🔒</span> Keamanan Akun
              </h3>
              {pwMsg && (
                <div className={`mb-4 p-3 rounded-lg text-sm font-bold ${pwMsg.startsWith('Gagal') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                  {pwMsg}
                </div>
              )}
              <form onSubmit={handleChangePw} className="space-y-4 max-w-md">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Password Lama</label>
                  <div className="relative">
                    <input type={showOld ? 'text' : 'password'} placeholder="••••••••" value={oldPw} onChange={(e) => setOldPw(e.target.value)} required
                      className="w-full bg-gray-50 border p-3 pr-11 rounded-xl outline-none focus:border-blue-500" />
                    <button type="button" onClick={() => setShowOld(!showOld)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showOld
                        ? <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                        : <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Password Baru</label>
                  <div className="relative">
                    <input type={showNew ? 'text' : 'password'} placeholder="Minimal 8 karakter" value={newPw} onChange={(e) => setNewPw(e.target.value)} required minLength={8}
                      className="w-full bg-gray-50 border p-3 pr-11 rounded-xl outline-none focus:border-blue-500" />
                    <button type="button" onClick={() => setShowNew(!showNew)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showNew
                        ? <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                        : <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>}
                    </button>
                  </div>
                </div>
                <button type="submit" disabled={pwLoading} className="bg-orange-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-orange-600 transition mt-2 disabled:opacity-60">
                  {pwLoading ? 'Memproses...' : 'Ganti Password'}
                </button>
              </form>
            </div>

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

            <div className="bg-red-50 rounded-3xl shadow-sm p-8 border border-red-100">
              <h3 className="text-xl font-black text-red-700 mb-2">Zona Bahaya</h3>
              <p className="text-sm text-red-600 font-medium mb-4">Keluar dari sistem atau menghapus sesi login aktif Anda.</p>
              <button onClick={handleLogout} className="bg-red-600 text-white px-8 py-2 rounded-xl font-bold hover:bg-red-700 transition">
                Log Out
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
