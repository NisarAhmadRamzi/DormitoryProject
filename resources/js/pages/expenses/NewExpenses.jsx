import React, { useState } from 'react'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function NewExpenses() {
  const [expenseData, setExpenseData] = useState({
    type: '',
    expense_cash: '',
    goods_quantity: '',
    description: '',
    expense_date: '',
    total_expense: '',
    total_quantity: '',
    total_amount_of_donations: '',
  })
  const navigate = useNavigate()

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setExpenseData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  // Submit new expense data
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Show loading SweetAlert before sending data
    Swal.fire({
      title: 'Saving... ',
      text: 'Saving new expense...',
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading() // Show SweetAlert loading spinner
      },
    })

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/expenses',
        expenseData
      )

      if (response.status === 201) {
        Swal.fire('Success', 'Expense added successfully!', 'success')
        navigate('/dashboard/expenses') // Redirect to the expenses list
      }
    } catch (error) {
      console.error('Error adding new expense:', error)
      Swal.fire('Error', 'Failed to add the expense!', 'error')
    } finally {
      Swal.close() // Close the loading SweetAlert
    }
  }

  return (
    <div className="content-body">
      <div className="container-fluid">
        <div className="row page-titles mx-0">
          <div className="col-sm-6 p-md-0">
            <div className="welcome-text">
              <h4>Add New Expense</h4>
            </div>
          </div>
          <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex align-items-center">
            <button
              onClick={() => navigate('/dashboard/expenses')}
              className="btn btn-secondary ml-auto"
            >
              Back to Expenses List
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header"></div>

              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="type">Expense Type</label>
                    <input
                      type="text"
                      id="type"
                      name="type"
                      className="form-control"
                      value={expenseData.type}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="expense_cash">Expense Cash</label>
                    <input
                      type="number"
                      id="expense_cash"
                      name="expense_cash"
                      className="form-control"
                      value={expenseData.expense_cash}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="goods_quantity">Goods Quantity</label>
                    <input
                      type="number"
                      id="goods_quantity"
                      name="goods_quantity"
                      className="form-control"
                      value={expenseData.goods_quantity}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      className="form-control"
                      value={expenseData.description}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="expense_date">Expense Date</label>
                    <input
                      type="date"
                      id="expense_date"
                      name="expense_date"
                      className="form-control"
                      value={expenseData.expense_date}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="total_expense">Total Expense</label>
                    <input
                      type="number"
                      id="total_expense"
                      name="total_expense"
                      className="form-control"
                      value={expenseData.total_expense}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="total_quantity">Total Quantity</label>
                    <input
                      type="number"
                      id="total_quantity"
                      name="total_quantity"
                      className="form-control"
                      value={expenseData.total_quantity}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="total_amount_of_donations">
                      Total Amount of Donations
                    </label>
                    <input
                      type="number"
                      id="total_amount_of_donations"
                      name="total_amount_of_donations"
                      className="form-control"
                      value={expenseData.total_amount_of_donations}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-success">
                    Save Expense
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

export default NewExpenses
