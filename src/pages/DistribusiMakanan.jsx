import React, { useEffect, useState } from 'react'
import SidebarAdmin from '../SidebarAdmin'
import { api } from '../api'

function fmtDate(d) { return d ? new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-' }

export default function DistribusiMakanan() {
  const [list, setList] = useState([])
  const [summary, setSummary] = useState({ total: 0, in_delivery: 0, received: 0 })
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(null)
  const [dateFilter, setDateFilter] = useState('')

  const load = (date) => {
    setLoading(true)
    const query = date ? `?date=${date}` : ''
    api.get(`/admin/distributions${query}`)
      .then((res) => {
        const d = res.data || {}
        setSummary(d.summary || { total: 0, in_delivery: 0, received: 0 })
        setList(d.school || [])
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => { load('') }, [])

  const handleDateChange = (e) => {
    setDateFilter(e.target.value)
    load(e.target.value)
  }

  const updateStatus = async (id, status) => {
    setUpdating(id)
    try {
      await api.patch(`/admin/distributions/${id}/status`, { status })
      setList((prev) => prev.map((d) => d.id === id ? { ...d, status } : d))
      setSummary((prev) => {
        const wasDelivery = list.find((d) => d.id === id)?.status === 'dalam_pengiriman'
        if (status === 'diterima' && wasDelivery) {
          return { ...prev, in_delivery: prev.in_delivery - 1, received: prev.received + 1 }
        }
        return prev
      })
    } catch {}
    finally { setUpdating(null) }
  }

  return (
    <div className="flex min-h-screen bg-[#D1E9FF] font-sans">
      <SidebarAdmin />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">

          <div className="mb-8 text-center border-b border-[#A5D5FF] pb-4">
            <h1 className="text-4xl font-black text-gray-900">Pelaporan</h1>
            <p className="text-lg font-bold text-gray-700">Distribusi Makanan</p>
          </div>

          <div className="mb-6">
            <input
              type="date"
              value={dateFilter}
              onChange={handleDateChange}
              className="bg-[#D1D5DB] px-4 py-2 rounded-lg font-bold text-gray-800 text-sm outline-none cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-3xl p-6 flex flex-col items-center justify-center shadow-sm py-10">
              <span className="text-5xl mb-2 text-[#2577F1]">🚚</span>
              <span className="text-6xl font-black text-gray-900">{summary.total}</span>
              <p className="text-sm font-bold text-gray-800 mt-2">Total Distribusi</p>
            </div>
            <div className="bg-white rounded-3xl p-6 flex flex-col items-center justify-center shadow-sm py-10">
              <span className="text-5xl mb-2 text-yellow-500">🕒</span>
              <span className="text-6xl font-black text-gray-900">{summary.in_delivery}</span>
              <p className="text-sm font-bold text-gray-800 mt-2">Dalam Pengiriman</p>
            </div>
            <div className="bg-white rounded-3xl p-6 flex flex-col items-center justify-center shadow-sm py-10">
              <span className="text-5xl mb-2 text-green-500">✅</span>
              <span className="text-6xl font-black text-gray-900">{summary.received}</span>
              <p className="text-sm font-bold text-gray-800 mt-2">Diterima</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm p-8">
            <h3 className="font-bold text-gray-600 mb-6 text-lg">
              {dateFilter ? fmtDate(dateFilter) : 'Semua Distribusi'}
            </h3>

            {loading ? (
              <div className="p-10 text-center text-gray-400 font-bold">Memuat data...</div>
            ) : list.length === 0 ? (
              <p className="text-center text-gray-400 font-bold py-6">Belum ada data distribusi</p>
            ) : (
              <div className="space-y-4">
                {list.map((item) => (
                  <div key={item.id} className="bg-[#D1F4FA] rounded-xl p-5 flex items-center justify-between">
                    <div className="flex items-start gap-4 w-4/5">
                      <span className="text-3xl mt-1">🏫</span>
                      <div className="space-y-1">
                        <h4 className="font-black text-gray-900 text-base">Sekolah #{item.school_id}</h4>
                        <p className="font-black text-gray-900 text-sm pt-1">{item.portions} Porsi</p>
                        <p className="font-bold text-gray-800 text-xs flex items-center gap-2">
                          <span className="text-blue-600 text-lg">🏢</span> SPPG #{item.sppg_id}
                        </p>
                        <p className="text-xs text-gray-500 font-semibold">{fmtDate(item.dist_date)}</p>
                      </div>
                    </div>

                    <div className="w-1/5 flex flex-col items-end gap-2">
                      {item.status === 'diterima' ? (
                        <span className="bg-[#4CAF50] text-white px-5 py-2 rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm">
                          ✓ Diterima
                        </span>
                      ) : (
                        <>
                          <span className="bg-[#FFB300] text-white px-5 py-2 rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm">
                            🕒 Dalam Pengiriman
                          </span>
                          <button
                            onClick={() => updateStatus(item.id, 'diterima')}
                            disabled={updating === item.id}
                            className="bg-[#2577F1] text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-700 transition disabled:opacity-60"
                          >
                            {updating === item.id ? '...' : 'Tandai Diterima'}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  )
}
