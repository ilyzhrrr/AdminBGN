import React, { useEffect, useState } from 'react'
import SidebarAdmin from '../SidebarAdmin'
import { api } from '../api'

function fmtDate(d) { return d ? new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-' }

const STATUS_LABEL = {
  belum_ditinjau: 'Belum Ditinjau',
  sedang_ditinjau: 'Sedang Ditinjau',
  selesai: 'Selesai',
}

const ISSUE_LABEL = {
  food_shortage: 'Makanan Kurang',
  spoiled_food: 'Makanan Basi',
  allergen: 'Makanan Mengandung Alergi',
  late_delivery: 'Makanan Terlambat',
}

const PAGE_SIZE = 10

export default function LaporanMasuk() {
  const [view, setView] = useState('list')
  const [list, setList] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)
  const [newStatus, setNewStatus] = useState('')
  const [updating, setUpdating] = useState(false)
  const [msg, setMsg] = useState('')
  const [page, setPage] = useState(1)

  const load = () => {
    setLoading(true)
    api.get('/admin/reports')
      .then((res) => setList(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const openDetail = async (id) => {
    try {
      const res = await api.get(`/admin/reports/${id}`)
      setSelected(res.data)
      setNewStatus(res.data.status)
      setView('detail')
      setMsg('')
    } catch {}
  }

  const saveStatus = async () => {
    if (!selected || !newStatus) return
    setUpdating(true)
    try {
      await api.patch(`/admin/reports/${selected.id}/status`, { status: newStatus })
      setMsg('Status berhasil diperbarui')
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
      <main className="flex-1 p-8 overflow-y-auto">

        {view === 'list' && (
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 text-center border-b border-[#A5D5FF] pb-4">
              <h1 className="text-4xl font-black text-gray-900">Pelaporan</h1>
              <p className="text-lg font-bold text-gray-700">Laporan Masuk</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 bg-white border-b border-gray-100 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-0.5">Pelaporan</p>
                  <h2 className="text-lg font-black text-gray-800 leading-tight">Laporan Masuk</h2>
                </div>
                <div className="bg-[#EEF5FF] border border-[#A5D5FF] px-4 py-2 rounded-lg font-bold text-gray-700 text-sm flex items-center gap-2">
                  <span>📅</span>
                  <span>{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2 bg-[#EEF5FF] border border-[#A5D5FF] rounded-lg px-4 py-2">
                  <span className="text-2xl font-black text-[#2577F1] leading-none">{list.length}</span>
                  <span className="text-xs font-semibold text-gray-500 leading-tight">Total<br/>Laporan</span>
                </div>
              </div>

              {loading ? (
                <div className="p-10 text-center text-gray-400 font-bold">Memuat data...</div>
              ) : (
                <table className="w-full text-sm text-left border-collapse">
                  <thead className="bg-[#EAEAEA] text-gray-700 text-xs font-bold uppercase tracking-wide">
                    <tr>
                      <th className="px-4 py-2.5 border border-gray-300">ID Laporan</th>
                      <th className="px-4 py-2.5 border border-gray-300">Masalah</th>
                      <th className="px-4 py-2.5 border border-gray-300 text-center">Tanggal</th>
                      <th className="px-4 py-2.5 border border-gray-300 text-center">Status</th>
                      <th className="px-4 py-2.5 border border-gray-300 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {list.length === 0 && (
                      <tr><td colSpan={5} className="px-4 py-6 text-center text-gray-400 font-semibold border border-gray-200">Belum ada laporan</td></tr>
                    )}
                    {paginated.map((r) => (
                      <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-2.5 border border-gray-200 font-semibold text-gray-800">#{r.id}</td>
                        <td className="px-4 py-2.5 border border-gray-200 text-gray-600 whitespace-nowrap">{ISSUE_LABEL[r.issue_type] || r.issue_type}</td>
                        <td className="px-4 py-2.5 border border-gray-200 text-center text-gray-600 whitespace-nowrap">{fmtDate(r.report_date)}</td>
                        <td className="px-4 py-2.5 border border-gray-200 text-center">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${r.status === 'selesai' ? 'bg-green-100 text-green-700' : r.status === 'sedang_ditinjau' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'}`}>
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
              )}

              {!loading && (
                <div className="flex justify-end items-center gap-2 px-4 py-3 border-t border-gray-200">
                  <span className="text-xs text-gray-500 mr-2">
                    {list.length === 0 ? '0' : `${(currentPage - 1) * PAGE_SIZE + 1}–${Math.min(currentPage * PAGE_SIZE, list.length)}`} dari {list.length} laporan
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
            <div className="flex items-center gap-4 mb-8 border-b border-[#A5D5FF] pb-4">
              <button onClick={() => setView('list')} className="text-4xl font-black text-gray-900 hover:text-blue-600 transition">
                &lt;
              </button>
              <div>
                <h1 className="text-2xl font-black text-gray-900">Detail Laporan Masuk</h1>
                <p className="text-gray-700 font-bold">Laporan #{selected.id}</p>
              </div>
            </div>

            {msg && (
              <div className={`mb-4 p-3 rounded-lg text-sm font-bold text-center ${msg.startsWith('Gagal') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                {msg}
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-sm p-8 font-medium">
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-500 mb-1">ID Sekolah</label>
                    <p className="text-lg font-black text-gray-900 bg-gray-50 p-3 rounded-lg border border-gray-200">#{selected.school_id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-500 mb-1">ID SPPG</label>
                    <p className="text-lg font-black text-gray-900 bg-gray-50 p-3 rounded-lg border border-gray-200">#{selected.sppg_id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-500 mb-1">Tanggal Laporan</label>
                    <p className="text-lg font-black text-gray-900 bg-gray-50 p-3 rounded-lg border border-gray-200">{fmtDate(selected.report_date)}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-500 mb-1">Kategori Masalah</label>
                    <p className="text-lg font-black text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                      {ISSUE_LABEL[selected.issue_type] || selected.issue_type}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-500 mb-1">Ubah Status Laporan</label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="w-full text-lg font-black text-gray-900 bg-white p-3 rounded-lg border border-gray-300 outline-none focus:border-blue-500 cursor-pointer"
                    >
                      <option value="belum_ditinjau">Belum Ditinjau</option>
                      <option value="sedang_ditinjau">Sedang Ditinjau</option>
                      <option value="selesai">Selesai</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-bold text-gray-500 mb-2">Deskripsi Detail Masalah</label>
                <textarea
                  readOnly
                  rows="4"
                  className="w-full bg-gray-50 p-4 rounded-xl border border-gray-200 outline-none text-gray-800 resize-none font-semibold"
                  value={selected.description || '-'}
                />
              </div>

              {selected.photo_url && (
                <div className="mb-8">
                  <label className="block text-sm font-bold text-gray-500 mb-2">Foto Bukti</label>
                  <img src={selected.photo_url} alt="Bukti Laporan" className="max-w-xs rounded-xl border border-gray-200" />
                </div>
              )}

              <div className="flex justify-end gap-4 border-t border-gray-100 pt-6">
                <button onClick={() => setView('list')} className="px-8 py-3 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition">
                  Kembali
                </button>
                <button onClick={saveStatus} disabled={updating} className="bg-[#2577F1] text-white px-8 py-3 rounded-xl font-bold shadow-sm hover:bg-blue-700 transition disabled:opacity-60">
                  {updating ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}
