import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000/api/expenses'

const axiosConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
})

// Get all expenses
export async function getExpenses() {
  try {
    const res = await axios.get(BASE_URL, axiosConfig())
    return res.data
  } catch (error) {
    console.error(error.response?.data || error.message)
    throw new Error('Expenses could not be fetched')
  }
}

// Delete an expense
export async function deleteExpense(id) {
  try {
    const res = await axios.delete(`${BASE_URL}/${id}`, axiosConfig())
    return res.status === 204 ? { success: true } : res.data
  } catch (error) {
    console.error(error.response?.data || error.message)
    throw new Error('Expense could not be deleted')
  }
}

// Create a new expense
export async function createExpense(expenseData) {
  try {
    const res = await axios.post(BASE_URL, expenseData, axiosConfig())
    return res.data
  } catch (error) {
    console.error(error.response?.data || error.message)
    throw new Error('Expense could not be created')
  }
}

// Edit/update an expense
export async function editExpense(id, updatedData) {
  try {
    const res = await axios.put(`${BASE_URL}/${id}`, updatedData, axiosConfig())
    return res.data
  } catch (error) {
    console.error(error.response?.data || error.message)
    throw new Error('Expense could not be updated')
  }
}
