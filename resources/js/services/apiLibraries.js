import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000/api/libraries'

// Get all libraries
export async function getLibraries() {
  try {
    const res = await axios.get(BASE_URL, {
      withCredentials: true,
    })
    return res.data
  } catch (error) {
    console.error(error)
    throw new Error('Libraries could not be fetched')
  }
}

// Delete a library
export async function deleteLibrary(id) {
  try {
    const res = await axios.delete(`${BASE_URL}/${id}`, {
      withCredentials: true,
    })
    return res.status === 204 ? { success: true } : res.data
  } catch (error) {
    console.error(error)
    throw new Error('Library could not be deleted')
  }
}

// Create a new library
export async function createLibrary(libraryData) {
  try {
    const res = await axios.post(BASE_URL, libraryData, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      withCredentials: true,
    })
    return res.data
  } catch (error) {
    console.error(error)
    throw new Error('Library could not be created')
  }
}

// Edit/update a library
export async function editLibrary(id, updatedData) {
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
    throw new Error('Library could not be updated')
  }
}
