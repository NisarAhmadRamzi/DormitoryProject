// src/services/apiLibraryAdmin.js
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000/api/dashboard/library-admin'

const axiosConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    Accept: 'application/json',
  },
  withCredentials: true,
})

export async function getLibraryAdminDashboardStats() {
  const res = await axios.get(API_URL, axiosConfig())
  return res.data
}
