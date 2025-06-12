import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000/api/permissions'

const axiosConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
})

// Get Permissions
export async function getPermission({ page = 1, limit = 10 } = {}) {
  const res = await axios.get(
    `${API_URL}?page=${page}&limit=${limit}`,
    axiosConfig()
  )
  return res.data
}

// Create Permission
export async function createPermission(permissionData) {
  const res = await axios.post(API_URL, permissionData, axiosConfig())
  return res.data
}

// Edit Permission
export async function editPermission(id, updatedData) {
  const res = await axios.put(`${API_URL}/${id}`, updatedData, axiosConfig())
  return res.data
}

// Delete Permission
export async function deletePermission(id) {
  const res = await axios.delete(`${API_URL}/${id}`, axiosConfig())
  return res.data
}
