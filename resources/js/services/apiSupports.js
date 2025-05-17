import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000/api/supports'

// Get all supports
export async function getSupports() {
  try {
    const res = await axios.get(BASE_URL, {
      withCredentials: true,
    })
    return res.data
  } catch (error) {
    console.error(error)
    throw new Error('Supports could not be fetched')
  }
}

// Delete a support by ID
export async function deleteSupport(id) {
  try {
    const res = await axios.delete(`${BASE_URL}/${id}`, {
      withCredentials: true,
    })
    return res.status === 204 ? { success: true } : res.data
  } catch (error) {
    console.error(error)
    throw new Error('Support could not be deleted')
  }
}

// Create a new support
export async function createSupport(supportData) {
  try {
    const res = await axios.post(BASE_URL, supportData, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      withCredentials: true,
    })
    return res.data
  } catch (error) {
    console.error(error)
    throw new Error('Support could not be created')
  }
}

// Edit/update an existing support
export async function editSupport(id, updatedData) {
  try {
    const res = await axios.put(`${BASE_URL}/${id}`, updatedData, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      withCredentials: true,
    })
    return res.data
  } catch (error) {
    console.error(error)
    throw new Error('Support could not be updated')
  }
}
