const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const getToken = () => localStorage.getItem('admin_token')

export const saveAuth = (token) => {
  localStorage.setItem('admin_token', token)
}

export const clearAuth = () => {
  localStorage.removeItem('admin_token')
}

const req = async (method, path, body, isForm) => {
  const headers = {}
  const token = getToken()
  if (token) headers['Authorization'] = `Bearer ${token}`
  if (!isForm && body) headers['Content-Type'] = 'application/json'

  const res = await fetch(BASE_URL + path, {
    method,
    headers,
    body: body ? (isForm ? body : JSON.stringify(body)) : undefined,
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.message || 'Terjadi kesalahan server')
  return data
}

export const api = {
  get:      (path)        => req('GET',    path),
  post:     (path, body)  => req('POST',   path, body),
  put:      (path, body)  => req('PUT',    path, body),
  patch:    (path, body)  => req('PATCH',  path, body),
  del:      (path)        => req('DELETE', path),
  postForm: (path, form)  => req('POST',   path, form, true),
}
