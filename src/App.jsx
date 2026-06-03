import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

// Import semua halaman dari folder pages
import AuthAdmin from './pages/AuthAdmin'
import DashboardAdmin from './pages/DashboardAdmin'
import KelolaSPPG from './pages/KelolaSPPG'
import KelolaSekolah from './pages/KelolaSekolah'
import PendaftaranMitra from './pages/PendaftaranMitra'
import ManajemenAkun from './pages/ManajemenAkun'
import LaporanMasuk from './pages/LaporanMasuk'
import DistribusiMakanan from './pages/DistribusiMakanan'
import AkunAdmin from './pages/AkunAdmin'
import PengaturanAdmin from './pages/PengaturanAdmin'

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect otomatis dari localhost awal ke halaman login */}
        <Route path="/" element={<Navigate to="/admin/login" />} />
        
        {/* Rute Halaman */}
        <Route path="/admin/login" element={<AuthAdmin />} />
        <Route path="/admin/dashboard" element={<DashboardAdmin />} />
        <Route path="/admin/sppg" element={<KelolaSPPG />} />
        <Route path="/admin/sekolah" element={<KelolaSekolah />} />
        <Route path="/admin/pendaftaran-mitra" element={<PendaftaranMitra />} />
        <Route path="/admin/manajemen-akun" element={<ManajemenAkun />} />
        <Route path="/admin/laporan-masuk" element={<LaporanMasuk />} />
        <Route path="/admin/distribusi-makanan" element={<DistribusiMakanan />} />
        <Route path="/admin/akun" element={<AkunAdmin />} />
        <Route path="/admin/pengaturan" element={<PengaturanAdmin />} />
        
      </Routes>
    </Router>
  )
}