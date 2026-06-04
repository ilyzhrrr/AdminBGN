import React, { useEffect, useState } from 'react'
import SidebarAdmin from '../SidebarAdmin'
import { api } from '../api'

function fmtDate(d) { return d ? new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-' }
const STATUS_LABEL = {
  pending: 'Pending', belum_ditinjau: 'Belum Ditinjau', verifikasi: 'Verifikasi', disetujui: 'Disetujui'
}

const PAGE_SIZE = 10

export default function PendaftaranMitra() {
  const [view, setView] = useState('list')
  const [list, setList] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [msg, setMsg] = useState('')
  const [page, setPage] = useState(1)

  const load = () => {
    setLoading(true)
    api.get('/admin/registrations')
      .then((res) => setList(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const openDetail = async (id) => {
    try {
      const res = await api.get(`/admin/registrations/${id}`)
      setSelected(res.data)
      setView('detail')
      setMsg('')
    } catch {}
  }

  const updateStatus = async (id, status) => {
    setUpdating(true)
    try {
      await api.patch(`/admin/registrations/${id}/status`, { status })
      setMsg(`Status berhasil diubah ke "${STATUS_LABEL[status] || status}"`)
      load()
      setTimeout(() => setView('list'), 1500)
    } catch (e) {
      setMsg('Gagal: ' + e.message)
    } finally {
      setUpdating(false)
    }
  }

  const totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paginated = list.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  return (
    <div className="flex min-h-screen bg-[#D1E9FF] font-sans">
      <SidebarAdmin />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8 overflow-y-auto min-w-0">

        {view === 'list' && (
          <div className="max-w-5xl mx-auto">
            <div className="mb-6 sm:mb-8 text-center border-b border-[#A5D5FF] pb-4">
              <h1 className="text-3xl sm:text-4xl font-black text-gray-900">Pendaftaran</h1>
              <p className="text-base sm:text-lg font-bold text-gray-700">Pendaftaran Mitra</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="px-4 sm:px-6 py-4 bg-white border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-0.5">Pendaftaran</p>
                  <h2 className="text-base sm:text-lg font-black text-gray-800 leading-tight">Daftar Pendaftaran Mitra SPPG</h2>
                </div>
                <div className="flex items-center gap-2 bg-[#EEF5FF] border border-[#A5D5FF] rounded-lg px-4 py-2 self-start sm:self-auto">
                  <span className="text-2xl font-black text-[#2577F1] leading-none">{list.length}</span>
                  <span className="text-xs font-semibold text-gray-500 leading-tight">Total<br/>Pendaftar</span>
                </div>
              </div>

              {loading ? (
                <div className="p-10 text-center text-gray-400 font-bold">Memuat data...</div>
              ) : (
                <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] text-sm text-left border-collapse">
                  <thead className="bg-[#EAEAEA] text-gray-700 text-xs font-bold uppercase tracking-wide">
                    <tr>
                      <th className="px-4 py-2.5 border border-gray-300">Nama SPPG</th>
                      <th className="px-4 py-2.5 border border-gray-300 text-center">Tanggal</th>
                      <th className="px-4 py-2.5 border border-gray-300 text-center">Status</th>
                      <th className="px-4 py-2.5 border border-gray-300 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {list.length === 0 && (
                      <tr><td colSpan={4} className="px-4 py-6 text-center text-gray-400 font-semibold border border-gray-200">Belum ada pendaftaran</td></tr>
                    )}
                    {paginated.map((r) => (
                      <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-2.5 border border-gray-200 font-semibold text-gray-800 whitespace-nowrap">{r.sppg_name}</td>
                        <td className="px-4 py-2.5 border border-gray-200 text-center text-gray-600 whitespace-nowrap">{fmtDate(r.created_at)}</td>
                        <td className="px-4 py-2.5 border border-gray-200 text-center">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${r.status === 'disetujui' ? 'bg-green-100 text-green-700' : r.status === 'verifikasi' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'}`}>
                            {STATUS_LABEL[r.status] || r.status}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 border border-gray-200 text-center">
                          <button onClick={() => openDetail(r.id)}
                            className="bg-[#2577F1] text-white px-4 py-1 rounded-full text-xs font-semibold hover:bg-blue-700 transition">
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
                    {list.length === 0 ? '0' : `${(currentPage - 1) * PAGE_SIZE + 1}–${Math.min(currentPage * PAGE_SIZE, list.length)}`} dari {list.length} pendaftar
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
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 sm:gap-0 sm:justify-center sm:relative mb-6 sm:mb-8">
              <button onClick={() => setView('list')} className="sm:absolute sm:left-0 text-3xl sm:text-4xl font-black text-gray-900 hover:text-blue-600 transition shrink-0">
                &lt;
              </button>
              <div className="bg-[#2577F1] text-white px-4 sm:px-10 py-3 rounded-lg font-bold text-base sm:text-xl shadow-sm flex-1 sm:flex-none text-center">
                Formulir Pendaftaran Mitra SPPG
              </div>
            </div>

            {msg && (
              <div className={`mb-4 p-3 rounded-lg text-sm font-bold text-center ${msg.startsWith('Gagal') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                {msg}
              </div>
            )}

            <div className="bg-white rounded-xl shadow-sm p-5 sm:p-10 font-medium space-y-6 sm:space-y-8">
              <div>
                <h3 className="text-lg font-black text-gray-900 mb-4 border-b pb-2">Data Mitra</h3>
                <div className="space-y-4 sm:px-4">
                  {[
                    ['Nama Pendaftar', selected.registrant_name],
                    ['Nama Instansi', selected.institution_name || '-'],
                    ['E-Mail', selected.email],
                    ['Nomor HP', selected.phone],
                  ].map(([lbl, val]) => (
                    <div key={lbl}>
                      <label className="block text-sm font-bold text-gray-800 mb-1">{lbl}</label>
                      <input readOnly value={val} className="w-full border border-gray-300 p-2.5 rounded-md text-sm text-gray-700 outline-none bg-white" />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-black text-gray-900 mb-4 border-b pb-2">Data SPPG</h3>
                <div className="space-y-4 sm:px-4">
                  {[
                    ['Nama SPPG', selected.sppg_name],
                    ['Alamat SPPG', selected.sppg_address],
                    ['Kapasitas Produksi', `${selected.production_capacity} Porsi/Hari`],
                  ].map(([lbl, val]) => (
                    <div key={lbl}>
                      <label className="block text-sm font-bold text-gray-800 mb-1">{lbl}</label>
                      <input readOnly value={val} className="w-full border border-gray-300 p-2.5 rounded-md text-sm text-gray-700 outline-none bg-white" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 sm:px-4 pt-4">
                {selected.status !== 'disetujui' && (
                  <button onClick={() => updateStatus(selected.id, 'disetujui')} disabled={updating}
                    className="bg-[#2577F1] text-white px-6 sm:px-10 py-3 rounded-lg font-bold w-full sm:w-1/3 hover:bg-blue-700 transition shadow-sm disabled:opacity-60">
                    {updating ? 'Memproses...' : 'Setujui & Buat Akun'}
                  </button>
                )}
                {selected.status !== 'verifikasi' && selected.status !== 'disetujui' && (
                  <button onClick={() => updateStatus(selected.id, 'verifikasi')} disabled={updating}
                    className="bg-yellow-500 text-white px-6 sm:px-10 py-3 rounded-lg font-bold w-full sm:w-1/3 hover:bg-yellow-600 transition shadow-sm disabled:opacity-60">
                    Tandai Verifikasi
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
