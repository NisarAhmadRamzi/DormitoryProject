// services/apiClient.js
export function apiFetch(url, options = {}) {
  const token = localStorage.getItem('token')

  return fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).then(async (res) => {
    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.message || 'Request failed')
    }
    return res.json()
  })
}
