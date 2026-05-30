import React, { useEffect, useState } from 'react'
import SidebarAdmin from '../SidebarAdmin'
import { api } from '../api'

export default function AkunAdmin() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    api.get('/profile/detail')
      .then((res) => {
        setProfile(res.data)
        setForm({ name: res.data.name || '', email: res.data.email || '', phone: res.data.phone || '' })
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setMsg('')
    try {
      const res = await api.put('/profile/detail', form)
      setProfile(res.data)
      setIsEditing(false)
      setMsg('Perubahan berhasil disimpan!')
    } catch (e) {
      setMsg('Gagal: ' + e.message)
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    if (profile) setForm({ name: profile.name || '', email: profile.email || '', phone: profile.phone || '' })
    setIsEditing(false)
    setMsg('')
  }

  return (
    <div className="flex min-h-screen bg-[#D1E9FF] font-sans">
      <SidebarAdmin />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-black text-gray-900 mb-8">Informasi Pribadi</h1>

          {loading ? (
            <div className="text-center py-20 text-gray-400 font-bold">Memuat data...</div>
          ) : (
            <div className="bg-white rounded-3xl shadow-sm p-10 flex gap-10">
              <div className="w-1/3 flex flex-col items-center border-r border-gray-100 pr-10">
                <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center text-5xl mb-4 border-4 border-[#2577F1]">
                  👸
                </div>
                <h3 className="font-bold text-gray-800 text-center">{profile?.role_name || 'admin'}</h3>
              </div>

              <div className="w-2/3 space-y-5">
                {msg && (
                  <div className={`p-3 rounded-lg text-sm font-bold ${msg.startsWith('Gagal') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                    {msg}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-gray-500 uppercase mb-1">Nama Lengkap</label>
                    {isEditing ? (
                      <input
                        className="w-full bg-gray-50 border p-2 rounded-lg outline-none focus:border-blue-500"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    ) : (
                      <p className="font-bold text-gray-800">{profile?.name || '-'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-500 uppercase mb-1">E-mail</label>
                    {isEditing ? (
                      <input
                        type="email"
                        className="w-full bg-gray-50 border p-2 rounded-lg outline-none focus:border-blue-500"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    ) : (
                      <p className="font-bold text-gray-800">{profile?.email || '-'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-500 uppercase mb-1">No. Handphone</label>
                    {isEditing ? (
                      <input
                        className="w-full bg-gray-50 border p-2 rounded-lg outline-none focus:border-blue-500"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                    ) : (
                      <p className="font-bold text-gray-800">{profile?.phone || '-'}</p>
                    )}
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 flex gap-4">
                  {isEditing ? (
                    <>
                      <button onClick={handleSave} disabled={saving} className="bg-green-600 text-white px-8 py-2 rounded-xl font-bold hover:bg-green-700 transition disabled:opacity-60">
                        {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
                      </button>
                      <button onClick={handleCancel} className="bg-gray-200 text-gray-700 px-8 py-2 rounded-xl font-bold hover:bg-gray-300 transition">
                        Batal
                      </button>
                    </>
                  ) : (
                    <button onClick={() => setIsEditing(true)} className="bg-[#2577F1] text-white px-8 py-2 rounded-xl font-bold hover:bg-blue-700 transition">
                      Edit Profil
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
