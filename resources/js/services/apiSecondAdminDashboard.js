import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000/api/dashboard/second-admin'

// Reuse axios config (same as before)
const axiosConfig = (isMultipart = false) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    Accept: 'application/json',
  }

  if (!isMultipart) {
    headers['Content-Type'] = 'application/json'
  }

  return {
    headers,
    withCredentials: true,
  }
}

// ✅ Get Second Admin Dashboard Stats
export async function getSecondAdminDashboardStats() {
  const res = await axios.get(API_URL, axiosConfig())
  return res.data
}
