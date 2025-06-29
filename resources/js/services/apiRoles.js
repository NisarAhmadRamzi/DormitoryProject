// import axios from 'axios'

// const API_URL = 'http://127.0.0.1:8000/api/roles'

// const axiosConfig = () => ({
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem('token')}`,
//     'Content-Type': 'application/json',
//     Accept: 'application/json',
//   },
//   withCredentials: true,
// })

// // Get Roles
// export async function getRoles({ page = 1, limit = 10 } = {}) {
//   const res = await axios.get(
//     `${API_URL}?page=${page}&limit=${limit}`,
//     axiosConfig()
//   )
//   return res.data
// }

// // Create Role
// export async function createRole(roleData) {
//   const res = await axios.post(API_URL, roleData, axiosConfig())
//   return res.data
// }

// // Edit Role
// export async function editRole(id, updatedData) {
//   // Corrected function name
//   const res = await axios.put(`${API_URL}/${id}`, updatedData, axiosConfig())
//   return res.data
// }

// // Delete Role
// export async function deleteRole(id) {
//   const res = await axios.delete(`${API_URL}/${id}`, axiosConfig())
//   return res.data
// }

// services/apiRoles.js
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
 * GET  /api/roles?page=&limit=
 * returns { data: [ { id, name, permissions: [...], created_at, updated_at }, … ], meta: { … } }
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
 * body: { name: string, permissions: [permissionId, …] }
 */
export async function createRole(roleData) {
  const res = await axios.post(API_URL, roleData, axiosConfig())
  return res.data
}

/**
 * PATCH /api/roles/:id
 * body: { name: string, permissions: [permissionId, …] }
 */
export async function editRole({ id, name, permissions }) {
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
 * returns { data: [ { id, name }, … ] }
 */
export async function getPermissions() {
  const res = await axios.get(
    // assuming you’ve got a permissions endpoint
    `${API_URL.replace('/roles', '/permissions')}`,
    axiosConfig()
  )
  return res.data
}
