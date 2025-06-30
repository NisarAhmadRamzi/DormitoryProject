
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000/api/roles'

const axiosConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
})

/**
 * GET /api/roles?page=&limit=
 */
export async function getRoles({ page = 1, limit = 10 } = {}) {
  const res = await axios.get(
    `${API_URL}?page=${page}&limit=${limit}`,
    axiosConfig()
  )
  return res.data
}

/**
 * POST /api/roles
 */
export async function createRole(roleData) {
  const res = await axios.post(API_URL, roleData, axiosConfig())
  return res.data
}

/**
 * PATCH /api/roles/:id
 * Called updateRole to match usage in EditRoleForm.jsx
 */
export async function updateRole({ id, name, permissions }) {
  const payload = { name, permissions }
  const res = await axios.patch(`${API_URL}/${id}`, payload, axiosConfig())
  return res.data
}

/**
 * DELETE /api/roles/:id
 */
export async function deleteRole(id) {
  const res = await axios.delete(`${API_URL}/${id}`, axiosConfig())
  return res.data
}

/**
 * GET /api/permissions
 */
export async function getPermissions() {
  const res = await axios.get(
    `${API_URL.replace('/roles', '/permissions')}`,
    axiosConfig()
  )
  return res.data
}
