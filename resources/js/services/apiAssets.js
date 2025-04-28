const BASE_URL = 'http://127.0.0.1:8000/api/assets'

export async function getAssets() {
  try {
    const res = await fetch(BASE_URL)
    if (!res.ok) throw new Error('Failed to fetch assets')
    const data = await res.json()
    return data
  } catch (error) {
    console.error(error)
    throw new Error('Assets could not be fetched')
  }
}

export async function deleteAsset(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    })

    if (!res.ok) throw new Error('Failed to delete asset')

    if (res.status === 204) return { success: true }

    const data = await res.json().catch(() => null)
    return data || { success: true }
  } catch (error) {
    console.error(error)
    throw new Error('Asset could not be deleted')
  }
}

export async function createAsset(assetData) {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(assetData),
    })
    if (!res.ok) throw new Error('Failed to create asset')
    return await res.json()
  } catch (error) {
    console.error(error)
    throw new Error('Asset could not be created')
  }
}

export async function editAsset(id, updatedData) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    })
    if (!res.ok) throw new Error('Failed to update asset')
    return await res.json()
  } catch (error) {
    console.error(error)
    throw new Error('Asset could not be updated')
  }
}
