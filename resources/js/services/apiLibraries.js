const BASE_URL = 'http://127.0.0.1:8000/api/libraries'

export async function getLibraries() {
  try {
    const res = await fetch(BASE_URL)
    if (!res.ok) throw new Error('Failed to fetch libraries')
    const data = await res.json()
    return data
  } catch (error) {
    console.error(error)
    throw new Error('Libraries could not be fetched')
  }
}

// export async function deleteLibrary(id) {
//   try {
//     const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
//     if (!res.ok) throw new Error('Failed to delete library')
//     return await res.json()
//   } catch (error) {
//     console.error(error)
//     throw new Error('Library could not be deleted')
//   }
// }
export async function deleteLibrary(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    })

    if (!res.ok) throw new Error('Failed to delete library')

    // Some APIs return no content (204), so avoid trying to parse JSON
    if (res.status === 204) return { success: true }

    const data = await res.json().catch(() => null)
    return data || { success: true }
  } catch (error) {
    console.error(error)
    throw new Error('Library could not be deleted')
  }
}

export async function createLibrary(libraryData) {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(libraryData),
    })
    if (!res.ok) throw new Error('Failed to create library')
    return await res.json()
  } catch (error) {
    console.error(error)
    throw new Error('Library could not be created')
  }
}

export async function editLibrary(id, updatedData) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    })
    if (!res.ok) throw new Error('Failed to update library')
    return await res.json()
  } catch (error) {
    console.error(error)
    throw new Error('Library could not be updated')
  }
}
