import React, { useEffect, useState } from 'react'
import SidebarAdmin from '../SidebarAdmin'
import { api } from '../api'

function fmtDate(d) { return d ? new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-' }

const PAGE_SIZE = 10

export default function KelolaSPPG() {
  const [view, setView] = useState('list')
  const [list, setList] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    api.get('/admin/registrations?status=disetujui')
      .then((res) => setList(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const openDetail = (item) => {
    setSelected(item)
    setView('detail')
  }

  const filtered = list.filter((s) =>
    !search || s.sppg_name.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const handleSearch = (val) => { setSearch(val); setPage(1) }

  return (
    <div className="flex min-h-screen bg-[#D1E9FF] font-sans">
      <SidebarAdmin />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8 overflow-y-auto min-w-0">

        {view === 'list' && (
          <div className="max-w-6xl mx-auto">
            <div className="mb-6 sm:mb-8 text-center">
              <h1 className="text-3xl sm:text-4xl font-black text-gray-900">Utama</h1>
              <p className="text-base sm:text-lg font-bold text-gray-700">Kelola SPPG</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="px-4 sm:px-6 py-4 bg-white border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-0.5">Utama</p>
                  <h2 className="text-base sm:text-lg font-black text-gray-800 leading-tight">Daftar SPPG Aktif</h2>
                </div>
                <input
                  type="text"
                  placeholder="Cari SPPG..."
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full sm:w-64 px-4 py-2 rounded-lg text-sm outline-none bg-[#D1E9FF] border border-[#A5D5FF] text-gray-700 placeholder-gray-400 focus:border-[#2577F1] transition"
                />
                <div className="flex items-center gap-2 bg-[#EEF5FF] border border-[#A5D5FF] rounded-lg px-4 py-2 self-start sm:self-auto">
                  <span className="text-2xl font-black text-[#2577F1] leading-none">{list.length}</span>
                  <span className="text-xs font-semibold text-gray-500 leading-tight">Total<br/>SPPG</span>
                </div>
              </div>

              {loading ? (
                <div className="p-10 text-center text-gray-400 font-bold">Memuat data...</div>
              ) : (
                <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-sm text-left border-collapse">
                  <thead className="bg-[#EAEAEA] text-gray-700 text-xs font-bold uppercase tracking-wide">
                    <tr>
                      <th className="px-4 py-2.5 border border-gray-300">Nama SPPG</th>
                      <th className="px-4 py-2.5 border border-gray-300">Alamat</th>
                      <th className="px-4 py-2.5 border border-gray-300 text-center">Kapasitas (Porsi/Hari)</th>
                      <th className="px-4 py-2.5 border border-gray-300">Pendaftar</th>
                      <th className="px-4 py-2.5 border border-gray-300 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {filtered.length === 0 && (
                      <tr><td colSpan={5} className="px-4 py-6 text-center text-gray-400 font-semibold border border-gray-200">Belum ada SPPG terdaftar</td></tr>
                    )}
                    {paginated.map((s) => (
                      <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-2.5 border border-gray-200 font-semibold text-gray-800 whitespace-nowrap">{s.sppg_name}</td>
                        <td className="px-4 py-2.5 border border-gray-200 text-gray-600 text-xs">{s.sppg_address}</td>
                        <td className="px-4 py-2.5 border border-gray-200 text-center font-semibold">{s.production_capacity}</td>
                        <td className="px-4 py-2.5 border border-gray-200 text-gray-600 whitespace-nowrap">{s.registrant_name}</td>
                        <td className="px-4 py-2.5 border border-gray-200 text-center">
                          <button
                            onClick={() => openDetail(s)}
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
                    {filtered.length === 0 ? '0' : `${(currentPage - 1) * PAGE_SIZE + 1}–${Math.min(currentPage * PAGE_SIZE, filtered.length)}`} dari {filtered.length} SPPG
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
            <div className="flex items-center gap-4 mb-6 border-b border-[#A5D5FF] pb-4">
              <button onClick={() => setView('list')} className="text-3xl font-black text-gray-900 hover:text-blue-600 transition">
                &lt;
              </button>
              <h1 className="text-xl sm:text-2xl font-black text-gray-900 break-words">{selected.sppg_name}</h1>
            </div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
              <div className="w-full md:w-[45%]">
                {selected.kitchen_photo_path ? (
                  <img src={selected.kitchen_photo_path} alt="Foto Dapur" className="w-full h-auto object-cover border border-gray-300 rounded-sm mb-4 bg-gray-200" />
                ) : (
                  <div className="w-full h-48 bg-gray-100 rounded-sm mb-4 flex items-center justify-center text-gray-400 font-bold">Foto Dapur</div>
                )}
                <p className="text-base sm:text-lg font-medium text-gray-900 pr-4">{selected.sppg_address}</p>
              </div>

              <div className="w-full md:w-[55%]">
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4 sm:mb-6 break-words">{selected.sppg_name}</h2>
                <div className="space-y-3 sm:space-y-4 text-base sm:text-lg lg:text-xl font-medium text-gray-900 mb-6 sm:mb-8">
                  <p>Status: <span className="font-bold text-green-600">Disetujui</span></p>
                  <p>Pendaftar: {selected.registrant_name}</p>
                  <p>E-mail: {selected.email}</p>
                  <p>No. HP: {selected.phone}</p>
                  <p>Kapasitas: {selected.production_capacity} Porsi/Hari</p>
                  <p>Terdaftar: {fmtDate(selected.created_at)}</p>
                </div>

                {selected.proposal_path && (
                  <a
                    href={selected.proposal_path}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block bg-[#2577F1] text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-blue-700 transition"
                  >
                    Lihat Proposal
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}
