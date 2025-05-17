import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000/api/assets'

// Get all assets
export async function getAssets() {
  try {
    const res = await axios.get(BASE_URL, {
      withCredentials: true,
    })
    return res.data
  } catch (error) {
    console.error(error)
    throw new Error('Assets could not be fetched')
  }
}

// Delete an asset
export async function deleteAsset(id) {
  try {
    const res = await axios.delete(`${BASE_URL}/${id}`, {
      withCredentials: true,
    })
    return res.status === 204 ? { success: true } : res.data
  } catch (error) {
    console.error(error)
    throw new Error('Asset could not be deleted')
  }
}

// Create a new asset
export async function createAsset(assetData) {
  try {
    const res = await axios.post(BASE_URL, assetData, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      withCredentials: true,
    })
    return res.data
  } catch (error) {
    console.error(error)
    throw new Error('Asset could not be created')
  }
}

// Edit/update an asset
export async function editAsset(id, updatedData) {
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
    throw new Error('Asset could not be updated')
  }
}
