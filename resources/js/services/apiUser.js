import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000/api/users'

// Config helper - allows custom headers
const axiosConfig = (isMultipart = false) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    Accept: 'application/json',
  }

  // Only set content-type for JSON requests
  if (!isMultipart) {
    headers['Content-Type'] = 'application/json'
  }

  return {
    headers,
    withCredentials: true,
  }
}

// Get users
export async function getUsers({ page = 1, limit = 10 } = {}) {
  const res = await axios.get(
    `${API_URL}?page=${page}&limit=${limit}`,
    axiosConfig()
  )
  return res.data
}

// Create user (with file upload)
export async function createUser(formData) {
  const res = await axios.post(API_URL, formData, axiosConfig(true)) // multipart = true
  return res.data
}

// Edit user (with file upload)
export async function editUser(id, formData) {
  const res = await axios.post(
    `${API_URL}/updateUsers/${id}`,
    formData,
    axiosConfig(true)
  )
  return res.data
}

// Delete user
export async function deleteUser(id) {
  const res = await axios.delete(`${API_URL}/${id}`, axiosConfig())
  return res.data
}
