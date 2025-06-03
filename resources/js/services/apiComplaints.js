import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000/api/complaints'

// Get all complaints
export async function getComplaints() {
  try {
    const token = localStorage.getItem('token')
    const res = await axios.get(BASE_URL, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res.data
  } catch (error) {
    console.error(error)
    throw new Error('Complaints could not be fetched')
  }
}

// Delete a complaint by ID
export async function deleteComplaint(id) {
  try {
    const token = localStorage.getItem('token')
    const res = await axios.delete(`${BASE_URL}/${id}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res.status === 204 ? { success: true } : res.data
  } catch (error) {
    console.error(error)
    throw new Error('Complaint could not be deleted')
  }
}

// Create a new complaint
export async function createComplaint(complaintData) {
  try {
    const token = localStorage.getItem('token')
    const res = await axios.post(BASE_URL, complaintData, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
    return res.data
  } catch (error) {
    console.error(error)
    throw new Error('Complaint could not be created')
  }
}

// Edit/update an existing complaint
export async function editComplaint(id, updatedData) {
  try {
    const token = localStorage.getItem('token')
    const res = await axios.put(`${BASE_URL}/${id}`, updatedData, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
    return res.data
  } catch (error) {
    console.error(error)
    throw new Error('Complaint could not be updated')
  }
}
