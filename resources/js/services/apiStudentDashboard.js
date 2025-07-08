// apiStudentDashboard.js
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000/api/dashboard/student'

const axiosConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    Accept: 'application/json',
  },
  withCredentials: true,
})

export async function getStudentDashboardStats() {
  try {
    const res = await axios.get(API_URL, axiosConfig())
    return res.data
  } catch (error) {
    console.error('Failed to fetch student dashboard:', error)
    throw error
  }
}
