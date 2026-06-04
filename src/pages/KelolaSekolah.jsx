import React, { useEffect, useState } from 'react'
import SidebarAdmin from '../SidebarAdmin'
import { api } from '../api'

function fmtDate(d) { return d ? new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-' }

const PAGE_SIZE = 10

export default function KelolaSekolah() {
  const [view, setView] = useState('list')
  const [list, setList] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [gradeFilter, setGradeFilter] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    api.get('/admin/schools')
      .then((res) => setList(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const openDetail = async (id) => {
    try {
      const res = await api.get(`/admin/schools/${id}`)
      setSelected(res.data)
      setView('detail')
    } catch {}
  }

  const filtered = list.filter((s) => {
    const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase())
    const matchGrade = !gradeFilter || s.grade === gradeFilter
    return matchSearch && matchGrade
  })

  const grades = [...new Set(list.map((s) => s.grade).filter(Boolean))]

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const handleSearch = (val) => { setSearch(val); setPage(1) }
  const handleGrade = (val) => { setGradeFilter(val); setPage(1) }

  return (
    <div className="flex min-h-screen bg-[#D1E9FF] font-sans">
      <SidebarAdmin />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8 overflow-y-auto min-w-0">

        {view === 'list' && (
          <div className="max-w-6xl mx-auto">
            <div className="mb-6 sm:mb-8 text-center border-b border-[#A5D5FF] pb-4">
              <h1 className="text-3xl sm:text-4xl font-black text-gray-900">Utama</h1>
              <p className="text-base sm:text-lg font-bold text-gray-700">Kelola Sekolah</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="px-4 sm:px-6 py-4 bg-white border-b border-gray-100 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-4">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-0.5">Utama</p>
                  <h2 className="text-base sm:text-lg font-black text-gray-800 leading-tight">Daftar Sekolah</h2>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <input
                    type="text"
                    placeholder="Cari sekolah..."
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full sm:w-52 px-4 py-2 rounded-lg text-sm outline-none bg-[#D1E9FF] border border-[#A5D5FF] text-gray-700 placeholder-gray-400 focus:border-[#2577F1] transition"
                  />
                  <select
                    value={gradeFilter}
                    onChange={(e) => handleGrade(e.target.value)}
                    className="px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-[#D1E9FF] border border-[#A5D5FF] outline-none cursor-pointer focus:border-[#2577F1] transition"
                  >
                    <option value="">Semua Jenjang</option>
                    {grades.map((g) => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                <div className="flex items-center gap-2 bg-[#EEF5FF] border border-[#A5D5FF] rounded-lg px-4 py-2 self-start lg:self-auto">
                  <span className="text-2xl font-black text-[#2577F1] leading-none">{list.length}</span>
                  <span className="text-xs font-semibold text-gray-500 leading-tight">Total<br/>Sekolah</span>
                </div>
              </div>

              {loading ? (
                <div className="p-10 text-center text-gray-400 font-bold">Memuat data...</div>
              ) : (
                <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-sm text-left border-collapse">
                  <thead className="bg-[#EAEAEA] text-gray-700 text-xs font-bold uppercase tracking-wide">
                    <tr>
                      <th className="px-4 py-2.5 border border-gray-300">Nama Sekolah</th>
                      <th className="px-4 py-2.5 border border-gray-300 text-center">Jenjang</th>
                      <th className="px-4 py-2.5 border border-gray-300 text-center">Jml. Siswa</th>
                      <th className="px-4 py-2.5 border border-gray-300 text-center">SPPG Pemasok</th>
                      <th className="px-4 py-2.5 border border-gray-300 text-center">Status</th>
                      <th className="px-4 py-2.5 border border-gray-300 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {filtered.length === 0 && (
                      <tr><td colSpan={6} className="px-4 py-6 text-center text-gray-400 font-semibold border border-gray-200">Belum ada data sekolah</td></tr>
                    )}
                    {paginated.map((s) => (
                      <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-2.5 border border-gray-200 font-semibold text-gray-800 whitespace-nowrap">{s.name}</td>
                        <td className="px-4 py-2.5 border border-gray-200 text-center text-gray-600 whitespace-nowrap">{s.grade || '-'}</td>
                        <td className="px-4 py-2.5 border border-gray-200 text-center font-semibold">{s.student_count || 0}</td>
                        <td className="px-4 py-2.5 border border-gray-200 text-center text-gray-600">{s.sppg_name || '-'}</td>
                        <td className="px-4 py-2.5 border border-gray-200 text-center">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${s.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                            {s.status === 'active' ? 'Aktif' : s.status || '-'}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 border border-gray-200 text-center">
                          <button
                            onClick={() => openDetail(s.id)}
                            className="bg-[#2577F1] text-white px-4 py-1 rounded-full text-xs font-semibold hover:bg-blue-700 transition"
                          >
                            Detail
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              )}

              {!loading && (
                <div className="flex flex-wrap justify-end items-center gap-2 px-4 py-3 border-t border-gray-200">
                  <span className="text-xs text-gray-500 mr-2">
                    {filtered.length === 0 ? '0' : `${(currentPage - 1) * PAGE_SIZE + 1}–${Math.min(currentPage * PAGE_SIZE, filtered.length)}`} dari {filtered.length} sekolah
                  </span>
                  <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}
                    className="px-2.5 py-1 rounded border border-gray-300 text-xs font-semibold text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed">
                    &lsaquo;
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button key={p} onClick={() => setPage(p)}
                      className={`px-2.5 py-1 rounded border text-xs font-semibold transition-colors ${p === currentPage ? 'bg-[#2577F1] text-white border-[#2577F1]' : 'border-gray-300 text-gray-600 hover:bg-gray-100'}`}>
                      {p}
                    </button>
                  ))}
                  <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                    className="px-2.5 py-1 rounded border border-gray-300 text-xs font-semibold text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed">
                    &rsaquo;
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {view === 'detail' && selected && (
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-6 p-4 border-b border-[#A5D5FF]">
              <button onClick={() => setView('list')} className="text-3xl font-black text-gray-900 hover:text-blue-600 transition shrink-0">
                &lt;
              </button>
              <h1 className="text-lg sm:text-xl font-black text-gray-900 break-words">{selected.name}</h1>
            </div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-10">
              <div className="w-full md:w-1/2">
                <img src="/sekolah.png" alt="Foto Sekolah" className="w-full h-auto object-cover rounded-sm mb-4 shadow-sm" />
              </div>

              <div className="w-full md:w-1/2 space-y-3 mt-2 md:mt-4">
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-3 sm:mb-4 break-words">{selected.name}</h2>
                <p className="text-base sm:text-lg font-medium text-gray-800">Status: {selected.status === 'active' ? 'Aktif' : selected.status || '-'}</p>
                <p className="text-base sm:text-lg font-medium text-gray-800 break-words">E-mail: {selected.email || '-'}</p>
                <p className="text-base sm:text-lg font-medium text-gray-800">Jumlah Guru: {selected.teacher_count || 0}</p>
                <p className="text-base sm:text-lg font-medium text-gray-800">Jumlah Siswa: {selected.student_count || 0}</p>
                <p className="text-base sm:text-lg font-medium text-gray-800">SPPG Pemasok: {selected.sppg_name || '-'}</p>
                <p className="text-base sm:text-lg font-medium text-gray-800">Alamat: {selected.address || '-'}</p>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}