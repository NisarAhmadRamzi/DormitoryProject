import React, { useEffect, useState } from 'react'
import { FaArrowDown, FaArrowUp, FaPencilAlt, FaTrash } from 'react-icons/fa'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function ExpensesList() {
  const [expenses, setExpenses] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortCriteria, setSortCriteria] = useState('id')
  const [sortOrder, setSortOrder] = useState('asc')
  const navigate = useNavigate()

  // Fetch expenses data from the API
  const fetchExpenses = async () => {
    // Show loading SweetAlert before fetching data
    Swal.fire({
      title: 'Loading... ',
      text: 'Fetching expenses...',
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading() // Show SweetAlert loading spinner
      },
    })

    try {
      const response = await axios.get('http://127.0.0.1:8000/api/expenses')
      if (response.data && response.data.data) {
        setExpenses(response.data.data)
      } else {
        console.warn('Expected an array, but received:', response.data)
        setExpenses([])
      }
    } catch (error) {
      console.error('Error fetching expenses data:', error)
    } finally {
      Swal.close() // Close SweetAlert after data is fetched
    }
  }

  // Fetch expenses on component mount
  useEffect(() => {
    fetchExpenses()
  }, [])

  // Handle sorting for columns
  const handleSort = (criteria) => {
    if (sortCriteria === criteria) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortCriteria(criteria)
      setSortOrder('asc')
    }
  }

  // Filter expenses based on search term
  const filteredExpenses = expenses.filter((expense) =>
    expense.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Sort filtered expenses based on selected criteria
  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (sortCriteria === 'id' || sortCriteria === 'total_expense') {
      return sortOrder === 'asc'
        ? a[sortCriteria] - b[sortCriteria]
        : b[sortCriteria] - a[sortCriteria]
    } else if (sortCriteria === 'description') {
      return sortOrder === 'asc'
        ? a[sortCriteria].localeCompare(b[sortCriteria])
        : b[sortCriteria].localeCompare(a[sortCriteria])
    }
    return 0
  })

  // Handle expense deletion
  const handleDelete = (expenseId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will permanently delete the expense!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `http://127.0.0.1:8000/api/expenses/${expenseId}`
          )
          if (response.status === 200) {
            setExpenses((prevExpenses) =>
              prevExpenses.filter((expense) => expense.id !== expenseId)
            )
            Swal.fire('Deleted!', 'The expense has been deleted.', 'success')
          } else {
            Swal.fire(
              'Failed',
              'There was an issue deleting the expense.',
              'error'
            )
          }
        } catch (error) {
          Swal.fire('Error', 'Something went wrong!', 'error')
          console.error('Error deleting expense:', error)
        }
      }
    })
  }

  return (
    <div className="content-body">
      <div className="container-fluid">
        <div className="row page-titles mx-0">
          <div className="col-sm-6 p-md-0">
            <div className="welcome-text">
              <h4>Expenses List</h4>
            </div>
          </div>
          <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex align-items-center">
            <button
              onClick={() => navigate('/dashboard/expenses/addExpenses')}
              className="btn btn-success ml-auto"
            >
              Add New Expense
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header"></div>

              <div className="card-body">
                {/* Search input */}
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Description"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="table-responsive">
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>
                          <button
                            className="btn btn-link text-decoration-none"
                            onClick={() => handleSort('id')}
                          >
                            ID
                            {sortCriteria === 'id' &&
                              (sortOrder === 'asc' ? (
                                <FaArrowUp />
                              ) : (
                                <FaArrowDown />
                              ))}
                          </button>
                        </th>
                        <th>
                          <button
                            className="btn btn-link text-decoration-none"
                            onClick={() => handleSort('description')}
                          >
                            Description
                            {sortCriteria === 'description' &&
                              (sortOrder === 'asc' ? (
                                <FaArrowUp />
                              ) : (
                                <FaArrowDown />
                              ))}
                          </button>
                        </th>
                        <th>Total Expense</th>
                        <th>Total Quantity</th>
                        <th>Total Amount of Donations</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedExpenses.map((expense) => (
                        <tr key={expense.id}>
                          <td>{expense.id}</td>
                          <td>{expense.description}</td>
                          <td>{expense.total_expense}</td>
                          <td>{expense.total_quantity}</td>
                          <td>{expense.total_amount_of_donations}</td>
                          <td>
                            <button
                              onClick={() =>
                                navigate(`/dashboard/expenses/${expense.id}`)
                              }
                              className="btn btn-primary shadow btn-xs sharp me-1"
                            >
                              <FaPencilAlt />
                            </button>
                            <button
                              onClick={() => handleDelete(expense.id)}
                              className="my-2 btn btn-danger shadow btn-xs sharp"
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExpensesList
