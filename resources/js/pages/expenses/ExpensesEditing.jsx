import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import axios from 'axios'
import Swal from 'sweetalert2'

function ExpensesEditing() {
  const { expenseId } = useParams()
  const [expense, setExpense] = useState(null)
  const [description, setDescription] = useState('')
  const [totalExpense, setTotalExpense] = useState('')
  const [totalQuantity, setTotalQuantity] = useState('')
  const [totalAmountOfDonations, setTotalAmountOfDonations] = useState('')
  const [expenseType, setExpenseType] = useState('') // Add type field
  const [expenseDate, setExpenseDate] = useState('') // Add expense_date field
  const navigate = useNavigate()

  // Fetch expense data based on the ID from the API
  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/expenses/${expenseId}`
        )
        console.log(response)
        if (response.data && response.data.data) {
          const expenseData = response.data.data
          setExpense(expenseData)
          setDescription(expenseData.description)
          setTotalExpense(expenseData.expense_cash)
          setTotalQuantity(expenseData.goods_quantity)
          setTotalAmountOfDonations(expenseData.total_amount_of_donations)
          setExpenseType(expenseData.type) // Set the type field
          setExpenseDate(expenseData.expense_date) // Set the expense_date field
        }
      } catch (error) {
        console.error('Error fetching expense data:', error)
        Swal.fire('Error', 'Failed to fetch expense data.', 'error')
      }
    }

    fetchExpense()
  }, [expenseId])

  // Handle form submission for updating the expense
  const handleSubmit = async (e) => {
    e.preventDefault()

    const updatedExpense = {
      description,
      total_expense: totalExpense,
      total_quantity: totalQuantity,
      total_amount_of_donations: totalAmountOfDonations,
      type: expenseType, // Include the type field
      expense_date: expenseDate, // Include the expense_date field
    }

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/expenses/${expenseId}`,
        updatedExpense
      )

      if (response.status === 200) {
        Swal.fire('Success', 'Expense updated successfully.', 'success')
        navigate('/dashboard/expenses')
      } else {
        Swal.fire('Failed', 'There was an issue updating the expense.', 'error')
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to update the expense.', 'error')
      console.error('Error updating expense:', error)
    }
  }

  if (!expense) {
    return <div>Loading...</div>
  }

  return (
    <div className="content-body">
      <div className="container-fluid">
        <div className="row page-titles mx-0">
          <div className="col-sm-6 p-md-0">
            <div className="welcome-text">
              <h4>Edit Expense</h4>
            </div>
          </div>
          <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex align-items-center">
            <button
              onClick={() => navigate('/dashboard/expenses')}
              className="btn btn-secondary ml-auto"
            >
              Back to Expenses
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="totalExpense">Total Expense</label>
                    <input
                      type="number"
                      className="form-control"
                      id="totalExpense"
                      value={totalExpense}
                      onChange={(e) => setTotalExpense(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="totalQuantity">Total Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      id="totalQuantity"
                      value={totalQuantity}
                      onChange={(e) => setTotalQuantity(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="totalAmountOfDonations">
                      Total Amount of Donations
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="totalAmountOfDonations"
                      value={totalAmountOfDonations}
                      onChange={(e) =>
                        setTotalAmountOfDonations(e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="expenseType">Expense Type</label>
                    <input
                      type="text"
                      className="form-control"
                      id="expenseType"
                      value={expenseType}
                      onChange={(e) => setExpenseType(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="expenseDate">Expense Date</label>
                    <input
                      type="date"
                      className="form-control"
                      id="expenseDate"
                      value={expenseDate}
                      onChange={(e) => setExpenseDate(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary mt-3">
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExpensesEditing
