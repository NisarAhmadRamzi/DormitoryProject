const BASE_URL = 'http://127.0.0.1:8000/api/fees'
export async function getFees() {
  try {
    const res = await fetch(BASE_URL)
    if (!res.ok) throw new Error('Failed to fetch fees')
    const data = await res.json()
    return data
  } catch (error) {
    console.error(error)
    throw new Error('Fees could not be fetched')
  }
}

export async function deleteFee(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    })

    if (!res.ok) throw new Error('Failed to delete fee')

    if (res.status === 204) return { success: true }

    const data = await res.json().catch(() => null)
    return data || { success: true }
  } catch (error) {
    console.error(error)
    throw new Error('Fee could not be deleted')
  }
}

export async function createFee(feeData) {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(feeData),
    })
    if (!res.ok) throw new Error('Failed to create fee')
    return await res.json()
  } catch (error) {
    console.error(error)
    throw new Error('Fee could not be created')
  }
}

export async function editFee(id, updatedData) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    })
    if (!res.ok) throw new Error('Failed to update fee')
    return await res.json()
  } catch (error) {
    console.error(error)
    throw new Error('Fee could not be updated')
  }
}
