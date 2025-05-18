import axios from 'axios'

// Updated API URL to include /api prefix
const API_URL = 'http://127.0.0.1:8000/api/students'

// Fetch students with pagination defaults
export async function getStudents({ page = 1, limit = 10 } = {}) {
  const token = localStorage.getItem('token')
  const res = await axios.get(`${API_URL}?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return res.data
}

export async function createStudent(studentData) {
  const token = localStorage.getItem('token')
  const res = await axios.post(API_URL, studentData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return res
}

export async function editStudent(id, updatedData) {
  const token = localStorage.getItem('token')
  const res = await axios.put(`${API_URL}/${id}`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return res
}

export async function deleteStudent(id) {
  const token = localStorage.getItem('token')
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return res
}
