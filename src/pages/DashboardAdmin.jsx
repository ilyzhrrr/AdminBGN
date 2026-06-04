import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SidebarAdmin from '../SidebarAdmin'
import { api } from '../api'

function fmt(n) { return (n || 0).toLocaleString('id-ID') }
function fmtDate(d) { return d ? new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-' }
function statusLabel(s) {
  const map = { pending: 'Pending', belum_ditinjau: 'Belum Ditinjau', verifikasi: 'Verifikasi', disetujui: 'Disetujui' }
  return map[s] || s
}

export default function DashboardAdmin() {
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/admin/dashboard')
      .then((res) => setData(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const d = data || {}
  const sppgStatus = d.sppg_status || {}
  const total = (sppgStatus.active || 0) + (sppgStatus.pending || 0) + (sppgStatus.inactive || 0)
  const pct = (n) => total > 0 ? `${Math.round((n / total) * 100)}%` : '0%'
  const userTotal = (d.total_sppg || 0) + (d.total_school || 0) + (d.total_student || 0) + (d.total_umum || 0)
  const upct = (n) => userTotal > 0 ? `${Math.round((n / userTotal) * 100)}%` : '0%'

  return (
    <div className="flex min-h-screen bg-[#D1E9FF] font-sans">
      <SidebarAdmin />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8 overflow-y-auto min-w-0">
        <div className="max-w-6xl mx-auto space-y-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-6 sm:mb-8 text-center">Dashboard</h1>

          {loading ? (
            <div className="text-center py-20 text-gray-500 font-bold">Memuat data...</div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-white rounded-3xl p-5 sm:p-6 flex flex-col items-center justify-center shadow-sm">
                  <span className="text-4xl sm:text-5xl mb-2 text-[#2577F1]">🏢</span>
                  <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900">{fmt(d.total_sppg)}</span>
                  <p className="text-base sm:text-lg font-bold text-gray-800">Mitra SPPG</p>
                </div>
                <div className="bg-white rounded-3xl p-5 sm:p-6 flex flex-col items-center justify-center shadow-sm">
                  <span className="text-4xl sm:text-5xl mb-2">🏫</span>
                  <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900">{fmt(d.total_school)}</span>
                  <p className="text-base sm:text-lg font-bold text-gray-800">Sekolah Terdaftar</p>
                </div>
                <div className="bg-white rounded-3xl p-5 sm:p-6 flex flex-col items-center justify-center shadow-sm">
                  <span className="text-4xl sm:text-5xl mb-2">🎓</span>
                  <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900">{fmt(d.total_student)}</span>
                  <p className="text-base sm:text-lg font-bold text-gray-800">Total Siswa</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-800">Pendaftaran Mitra Terbaru</h3>
                    <span onClick={() => navigate('/admin/pendaftaran-mitra')}
                      className="text-sm text-blue-600 font-bold cursor-pointer hover:underline">Lihat Semua</span>
                  </div>
                  <div className="overflow-x-auto rounded-xl border border-gray-200 flex-1">
                    <table className="w-full text-sm text-left border-collapse">
                      <thead className="bg-[#EAEAEA] text-gray-700 text-xs font-bold uppercase tracking-wide">
                        <tr>
                          <th className="px-3 py-2 border border-gray-300">Nama SPPG</th>
                          <th className="px-3 py-2 border border-gray-300 text-center">Tanggal</th>
                          <th className="px-3 py-2 border border-gray-300 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-700">
                        {(d.sppg || []).length === 0 && (
                          <tr><td colSpan={3} className="px-3 py-4 text-center text-gray-400 border border-gray-200">Belum ada data</td></tr>
                        )}
                        {(d.sppg || []).slice(0, 3).map((s, i) => (
                          <tr key={i} className="hover:bg-gray-50 transition-colors">
                            <td className="px-3 py-2 border border-gray-200 font-semibold text-gray-800 whitespace-nowrap">{s.name}</td>
                            <td className="px-3 py-2 border border-gray-200 text-center text-gray-600 whitespace-nowrap">{fmtDate(s.created_at)}</td>
                            <td className="px-3 py-2 border border-gray-200 text-center">
                              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${s.status === 'disetujui' ? 'bg-green-100 text-green-700' : s.status === 'verifikasi' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'}`}>
                                {statusLabel(s.status)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-800">Laporan Terbaru</h3>
                    <span onClick={() => navigate('/admin/laporan-masuk')}
                      className="text-sm text-blue-600 font-bold cursor-pointer hover:underline">Semua Laporan</span>
                  </div>
                  <div className="flex-1 space-y-3 text-sm">
                    {(d.recent_reports || []).length === 0 && (
                      <p className="text-gray-400 font-bold text-center py-4">Belum ada laporan</p>
                    )}
                    {(d.recent_reports || []).slice(0, 3).map((r, i) => (
                      <p key={i} className="font-bold text-gray-800 border-b border-gray-200 pb-3">
                        Laporan #{r.id}
                        <span className="font-semibold text-gray-600 ml-2 block mt-1">{r.issue_type} — {statusLabel(r.status)}</span>
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white rounded-3xl p-6 shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <span className="text-blue-500 text-lg">📊</span> Status SPPG
                  </h3>
                  <div className="space-y-4 font-bold text-sm">
                    {[
                      { label: 'Aktif', val: sppgStatus.active, color: 'bg-green-500' },
                      { label: 'Pending', val: sppgStatus.pending, color: 'bg-orange-500' },
                      { label: 'Non-Aktif', val: sppgStatus.inactive, color: 'bg-gray-300' },
                    ].map(({ label, val, color }) => (
                      <div key={label} className="flex items-center justify-between">
                        <span className="w-24 text-gray-700">{label}</span>
                        <div className="flex-1 bg-gray-100 h-3 rounded-full overflow-hidden mx-4">
                          <div className={`${color} h-full`} style={{ width: pct(val || 0) }}></div>
                        </div>
                        <span className="w-6 text-right">{val || 0}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <span className="text-gray-700 text-lg">👤</span> Akun Pengguna
                  </h3>
                  <div className="space-y-4 font-bold text-sm">
                    {[
                      { label: 'Mitra SPPG', val: d.total_sppg, color: 'bg-blue-500' },
                      { label: 'Sekolah', val: d.total_school, color: 'bg-green-500' },
                      { label: 'Siswa', val: d.total_student, color: 'bg-yellow-400' },
                      { label: 'Umum', val: d.total_umum, color: 'bg-orange-500' },
                    ].map(({ label, val, color }) => (
                      <div key={label} className="flex items-center justify-between">
                        <span className="w-24 text-gray-700">{label}</span>
                        <div className="flex-1 bg-gray-100 h-3 rounded-full overflow-hidden mx-4">
                          <div className={`${color} h-full`} style={{ width: upct(val || 0) }}></div>
                        </div>
                        <span className="w-12 text-right">{fmt(val)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
