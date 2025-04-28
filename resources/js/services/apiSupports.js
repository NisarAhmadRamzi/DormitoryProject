const BASE_URL = 'http://127.0.0.1:8000/api/supports'

// Get all supports
export async function getSupports() {
  try {
    const res = await fetch(BASE_URL)
    if (!res.ok) throw new Error('Failed to fetch supports')
    const data = await res.json()
    return data
  } catch (error) {
    console.error(error)
    throw new Error('Supports could not be fetched')
  }
}

// Delete a support by ID
export async function deleteSupport(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    })

    if (!res.ok) throw new Error('Failed to delete support')

    if (res.status === 204) return { success: true }

    const data = await res.json().catch(() => null)
    return data || { success: true }
  } catch (error) {
    console.error(error)
    throw new Error('Support could not be deleted')
  }
}

// Create a new support
export async function createSupport(supportData) {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(supportData),
    })
    if (!res.ok) throw new Error('Failed to create support')
    return await res.json()
  } catch (error) {
    console.error(error)
    throw new Error('Support could not be created')
  }
}

// Edit/update an existing support
export async function editSupport(id, updatedData) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    })
    if (!res.ok) throw new Error('Failed to update support')
    return await res.json()
  } catch (error) {
    console.error(error)
    throw new Error('Support could not be updated')
  }
}
