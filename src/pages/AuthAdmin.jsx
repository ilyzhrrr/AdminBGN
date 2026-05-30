import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, saveAuth } from '../api'

export default function AuthAdmin() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [regForm, setRegForm] = useState({ name: '', email: '', password: '', phone: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [showLoginPw, setShowLoginPw] = useState(false)
  const [showRegPw, setShowRegPw] = useState(false)
  const navigate = useNavigate()

  const setReg = (k) => (e) => setRegForm({ ...regForm, [k]: e.target.value })

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await api.post('/login', { email, password })
      if (res.role !== 'admin') {
        setError('Akun ini bukan akun admin. Silakan gunakan portal NutriSafe.')
        return
      }
      saveAuth(res.token)
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await api.post('/register', { ...regForm, role_name: 'admin' })
      setIsLogin(true)
      setShowSuccess(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
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
            <span>🔮</span><span>Mengkoordinasi akun Mitra, Sekolah, Dan Siswa</span>
          </div>
          <div className="bg-white/25 p-3 rounded-xl flex items-center gap-3 text-xs font-semibold">
            <span>📋</span><span>Memantau SPPG</span>
          </div>
          <div className="bg-white/25 p-3 rounded-xl flex items-center gap-3 text-xs font-semibold">
            <span>💾</span><span>Menyimpan Data yang diperlukan pada program MBG</span>
          </div>
        </div>
      </aside>

      <main className="w-1/2 bg-[#D1E9FF] p-12 flex flex-col items-center justify-center relative">
        {showSuccess && isLogin && (
          <div className="absolute top-8 bg-green-500 text-white px-6 py-2 rounded-xl text-xs font-bold shadow-sm">
            Registrasi Berhasil! Silahkan Masuk
          </div>
        )}

        <h2 className="text-4xl font-black text-[#1E3A8A] mb-8">
          {isLogin ? 'Masuk Admin' : 'Daftar Admin'}
        </h2>

        <div className="bg-white p-10 rounded-3xl shadow-sm w-full max-w-xl">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm font-bold p-3 rounded-lg">
              {error}
            </div>
          )}

          {isLogin ? (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">✉️ Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                  className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-blue-500 bg-gray-50 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">🔒 Password</label>
                <div className="relative">
                  <input type={showLoginPw ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required
                    className="w-full p-3 pr-11 border border-gray-300 rounded-xl outline-none focus:border-blue-500 bg-gray-50 text-sm" />
                  <button type="button" onClick={() => setShowLoginPw(!showLoginPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showLoginPw
                      ? <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      : <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-[#007BFF] text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition text-sm mt-4 disabled:opacity-60">
                {loading ? 'Memproses...' : 'Masuk'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">👤 Nama Lengkap</label>
                <input type="text" value={regForm.name} onChange={setReg('name')} required
                  className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-blue-500 bg-gray-50 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">✉️ Email</label>
                <input type="email" value={regForm.email} onChange={setReg('email')} required
                  className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-blue-500 bg-gray-50 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">🔒 Password</label>
                <div className="relative">
                  <input type={showRegPw ? 'text' : 'password'} value={regForm.password} onChange={setReg('password')} required
                    className="w-full p-3 pr-11 border border-gray-300 rounded-xl outline-none focus:border-blue-500 bg-gray-50 text-sm" />
                  <button type="button" onClick={() => setShowRegPw(!showRegPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showRegPw
                      ? <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      : <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">📱 No. Handphone</label>
                <input type="text" value={regForm.phone} onChange={setReg('phone')} required
                  className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-blue-500 bg-gray-50 text-sm" />
              </div>
              <button type="submit" disabled={loading}
                className="col-span-2 w-full bg-[#007BFF] text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition text-sm mt-2 disabled:opacity-60">
                {loading ? 'Mendaftar...' : 'Daftar'}
              </button>
            </form>
          )}

          <div className="text-center mt-6 text-xs text-gray-500 font-medium">
            {isLogin ? (
              <p>Belum Punya Akun?{' '}
                <span onClick={() => { setIsLogin(false); setError(''); setShowSuccess(false) }}
                  className="text-blue-600 cursor-pointer font-bold underline ml-1">Daftar</span></p>
            ) : (
              <p>Sudah Punya Akun?{' '}
                <span onClick={() => { setIsLogin(true); setError('') }}
                  className="text-blue-600 cursor-pointer font-bold underline ml-1">Masuk</span></p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
