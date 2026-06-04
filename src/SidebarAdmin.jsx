import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { api } from './api'

export default function SidebarAdmin() {
  const navigate = useNavigate()
  const location = useLocation()
  const scrollRef = useRef(null)
  const [adminName, setAdminName] = useState('')
  const [open, setOpen] = useState(false)

  const isActive = (path) => location.pathname.includes(path)

  useEffect(() => {
    const savedScroll = sessionStorage.getItem('sidebarScrollPos')
    if (savedScroll && scrollRef.current) {
      scrollRef.current.scrollTop = parseInt(savedScroll, 10)
    }
  }, [])

  useEffect(() => {
    api.get('/profile/detail')
      .then((res) => setAdminName(res.data?.name || res.name || ''))
      .catch(() => {})
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const handleScroll = (e) => {
    sessionStorage.setItem('sidebarScrollPos', e.target.scrollTop)
  }

  const go = (path) => {
    navigate(path)
    setOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Buka menu"
        className="lg:hidden fixed top-3 left-3 z-30 bg-[#2577F1] text-white p-2 rounded-lg shadow-lg active:scale-95 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}

      <aside
        className={`
          bg-[#2577F1] text-white flex flex-col shadow-lg shrink-0
          fixed lg:sticky top-0 left-0 z-50
          w-[260px] sm:w-[280px] h-screen
          transition-transform duration-300 ease-out
          ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
        `}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Tutup menu"
          className="lg:hidden absolute top-3 right-3 text-white/90 hover:text-white text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10"
        >
          ✕
        </button>

        <div className="p-5 flex items-center gap-3">
          <img src="/logo.png" alt="Logo NutriSafe" className="w-10 h-auto" />
          <div>
            <h2 className="font-black text-xl leading-tight text-white">NutriSafe MBG</h2>
            <p className="text-sm font-medium text-blue-200">Admin BGN</p>
          </div>
        </div>

        <div className="mx-4 mb-6 bg-white/20 p-3 rounded-xl border border-white/10">
          <p className="font-bold flex items-center gap-2 text-sm">
            <span>📍</span> Kecamatan Ciasem, Subang
          </p>
          <p className="text-[10px] font-medium text-blue-100 mt-1">Admin: {adminName || '...'}</p>
        </div>

        <nav
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex-1 space-y-1 overflow-y-auto px-3 pb-6"
        >
          <div
            onClick={() => go('/admin/dashboard')}
            className={`p-3 rounded-lg cursor-pointer font-bold flex justify-between items-center text-sm ${isActive('dashboard') ? 'bg-[#5B9DF8] text-white' : 'hover:bg-[#5B9DF8]/50 text-blue-100'}`}
          >
            <span>Dashboard Umum</span>
            {isActive('dashboard') && <span>&gt;</span>}
          </div>

          <div className="mt-4">
            <div className="p-3 text-sm font-bold bg-[#1C60C8] rounded-t-lg flex items-center cursor-pointer">
              <span className="flex items-center gap-2">📰 Utama</span>
            </div>
            <div
              onClick={() => go('/admin/sppg')}
              className={`p-3 text-sm font-semibold cursor-pointer flex justify-between ${isActive('sppg') ? 'bg-[#5B9DF8] text-white' : 'bg-[#1E6BE0] text-blue-100 hover:bg-[#5B9DF8]/50'}`}
            >
              <span>Kelola SPPG</span>
              {isActive('sppg') && <span>&gt;</span>}
            </div>
            <div
              onClick={() => go('/admin/sekolah')}
              className={`p-3 text-sm font-semibold cursor-pointer rounded-b-lg flex justify-between ${isActive('sekolah') ? 'bg-[#5B9DF8] text-white' : 'bg-[#1E6BE0] text-blue-100 hover:bg-[#5B9DF8]/50'}`}
            >
              <span>Kelola Sekolah</span>
              {isActive('sekolah') && <span>&gt;</span>}
            </div>
          </div>

          <div className="mt-4">
            <div className="p-3 text-sm font-bold bg-[#1C60C8] rounded-t-lg flex items-center cursor-pointer">
              <span className="flex items-center gap-2">📝 Pendaftaran</span>
            </div>
            <div
              onClick={() => go('/admin/pendaftaran-mitra')}
              className={`p-3 text-sm font-semibold cursor-pointer flex justify-between ${isActive('pendaftaran-mitra') ? 'bg-[#5B9DF8] text-white' : 'bg-[#1E6BE0] text-blue-100 hover:bg-[#5B9DF8]/50'}`}
            >
              <span>Pendaftaran Mitra</span>
              {isActive('pendaftaran-mitra') && <span>&gt;</span>}
            </div>
            <div
              onClick={() => go('/admin/manajemen-akun')}
              className={`p-3 text-sm font-semibold cursor-pointer rounded-b-lg flex justify-between ${isActive('manajemen-akun') ? 'bg-[#5B9DF8] text-white' : 'bg-[#1E6BE0] text-blue-100 hover:bg-[#5B9DF8]/50'}`}
            >
              <span>Manajemen Akun</span>
              {isActive('manajemen-akun') && <span>&gt;</span>}
            </div>
          </div>

          <div className="mt-4">
            <div className="p-3 text-sm font-bold bg-[#1C60C8] rounded-t-lg flex items-center cursor-pointer">
              <span className="flex items-center gap-2">📊 Pelaporan</span>
            </div>
            <div
              onClick={() => go('/admin/laporan-masuk')}
              className={`p-3 text-sm font-semibold cursor-pointer flex justify-between ${isActive('laporan-masuk') ? 'bg-[#5B9DF8] text-white' : 'bg-[#1E6BE0] text-blue-100 hover:bg-[#5B9DF8]/50'}`}
            >
              <span>Laporan Masuk</span>
              {isActive('laporan-masuk') && <span>&gt;</span>}
            </div>
            <div
              onClick={() => go('/admin/distribusi-makanan')}
              className={`p-3 text-sm font-semibold cursor-pointer rounded-b-lg flex justify-between ${isActive('distribusi-makanan') ? 'bg-[#5B9DF8] text-white' : 'bg-[#1E6BE0] text-blue-100 hover:bg-[#5B9DF8]/50'}`}
            >
              <span>Distribusi Makanan</span>
              {isActive('distribusi-makanan') && <span>&gt;</span>}
            </div>
          </div>
        </nav>

        <div className="p-4 border-t border-white/20 mt-auto">
          <div
            onClick={() => go('/admin/akun')}
            className="flex items-center gap-2 cursor-pointer font-semibold text-sm hover:text-blue-200 mb-3">
            <span>👤</span> Akun
          </div>
          <div
            onClick={() => go('/admin/pengaturan')}
            className="flex items-center gap-2 cursor-pointer font-semibold text-sm hover:text-blue-200">
            <span>⚙️</span> Pengaturan
          </div>
        </div>
      </aside>
    </>
  )
}
