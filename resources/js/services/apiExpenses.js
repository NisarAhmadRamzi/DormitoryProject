const BASE_URL = 'http://127.0.0.1:8000/api/expenses'

export async function getExpenses() {
  try {
    const res = await fetch(BASE_URL)
    if (!res.ok) throw new Error('Failed to fetch expenses')
    const data = await res.json()
    return data
  } catch (error) {
    console.error(error)
    throw new Error('Expenses could not be fetched')
  }
}

export async function deleteExpense(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    })

    if (!res.ok) throw new Error('Failed to delete expense')

    if (res.status === 204) return { success: true }

    const data = await res.json().catch(() => null)
    return data || { success: true }
  } catch (error) {
    console.error(error)
    throw new Error('Expense could not be deleted')
  }
}

export async function createExpense(expenseData) {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expenseData),
    })
    if (!res.ok) throw new Error('Failed to create expense')
    return await res.json()
  } catch (error) {
    console.error(error)
    throw new Error('Expense could not be created')
  }
}

export async function editExpense(id, updatedData) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    })
    if (!res.ok) throw new Error('Failed to update expense')
    return await res.json()
  } catch (error) {
    console.error(error)
    throw new Error('Expense could not be updated')
  }
}
