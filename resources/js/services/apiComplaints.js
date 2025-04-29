const BASE_URL = 'http://127.0.0.1:8000/api/complaints'

export async function getComplaints() {
  try {
    const res = await fetch(BASE_URL)
    if (!res.ok) throw new Error('Failed to fetch complaints')
    const data = await res.json()
    return data
  } catch (error) {
    console.error(error)
    throw new Error('Complaints could not be fetched')
  }
}

export async function deleteComplaint(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    })

    if (!res.ok) throw new Error('Failed to delete complaint')

    if (res.status === 204) return { success: true }

    const data = await res.json().catch(() => null)
    return data || { success: true }
  } catch (error) {
    console.error(error)
    throw new Error('Complaint could not be deleted')
  }
}

export async function createComplaint(complaintData) {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(complaintData),
    })
    if (!res.ok) throw new Error('Failed to create complaint')
    return await res.json()
  } catch (error) {
    console.error(error)
    throw new Error('Complaint could not be created')
  }
}

export async function editComplaint(id, updatedData) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    })
    if (!res.ok) throw new Error('Failed to update complaint')
    return await res.json()
  } catch (error) {
    console.error(error)
    throw new Error('Complaint could not be updated')
  }
}
