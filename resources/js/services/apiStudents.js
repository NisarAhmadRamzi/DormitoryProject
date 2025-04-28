const BASE_URL = 'http://127.0.0.1:8000/api/students'

export async function getStudents() {
  try {
    const res = await fetch(BASE_URL)
    if (!res.ok) throw new Error('Failed to fetch students')
    const data = await res.json()
    return data.data // Assuming your response has { data: [...] }
  } catch (error) {
    console.error(error)
    throw new Error('Students could not be fetched')
  }
}

export async function deleteStudent(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    })

    if (!res.ok) throw new Error('Failed to delete student')
    return res.status === 204 ? { success: true } : await res.json()
  } catch (error) {
    console.error(error)
    throw new Error('Student could not be deleted')
  }
}

export async function createStudent(studentData) {
  // studentData['id_number'] = 2;
  // studentData['password'] = 'student'
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentData),
    })
    if (!res.ok) {
      const errorText = await res.text() // Get HTML response for debugging
      console.error('Error response:', errorText)
      throw new Error('Failed to create student')
    }
    return await res.json()
  } catch (error) {
    console.error(error)
    throw new Error('Student could not be created')
  }
}

export async function editStudent(id, updatedData) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    })
    if (!res.ok) throw new Error('Failed to update student')
    return await res.json()
  } catch (error) {
    console.error(error)
    throw new Error('Student could not be updated')
  }
}
