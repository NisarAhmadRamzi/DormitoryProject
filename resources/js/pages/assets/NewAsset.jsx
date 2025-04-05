import React, { useState } from 'react'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function NewAsset() {
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState('')
  const [totalAmountDonations, setTotalAmountDonations] = useState('')
  const [totalAmountBeforeExpense, setTotalAmountBeforeExpense] = useState('')
  const [totalAmountAfterExpense, setTotalAmountAfterExpense] = useState('')
  const navigate = useNavigate()

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate inputs
    if (
      !description ||
      !quantity ||
      !totalAmountBeforeExpense ||
      !totalAmountAfterExpense
    ) {
      Swal.fire('Error', 'All fields are required!', 'error')
      return
    }

    const assetData = {
      description,
      quantity,
      total_amount_of_donations: totalAmountDonations || 0, // Default to 0 if empty
      total_amount_of_cash_before_expense: totalAmountBeforeExpense,
      total_amount_of_cash_after_expense: totalAmountAfterExpense,
    }

    try {
      // Show loading SweetAlert while submitting data
      Swal.fire({
        title: 'Saving...',
        text: 'Adding new asset...',
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading()
        },
      })

      const response = await axios.post(
        'http://127.0.0.1:8000/api/assets',
        assetData
      )

      if (response.status === 201) {
        Swal.fire('Success', 'Asset has been added successfully!', 'success')
        navigate('/dashboard/assets') // Navigate to the assets list page
      } else {
        Swal.fire('Failed', 'Failed to add asset.', 'error')
      }
    } catch (error) {
      Swal.fire(
        'Error',
        'Something went wrong. Please try again later.',
        'error'
      )
      console.error('Error adding asset:', error)
    }
  }

  return (
    <div className="content-body">
      <div className="container-fluid">
        <div className="row page-titles mx-0">
          <div className="col-sm-6 p-md-0">
            <div className="welcome-text">
              <h4>Add New Asset</h4>
            </div>
          </div>
          <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex align-items-center">
            <button
              onClick={() => navigate('/dashboard/assets')}
              className="btn btn-secondary ml-auto"
            >
              Back to Assets List
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header"></div>

              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label htmlFor="description">Description</label>
                    <input
                      type="text"
                      id="description"
                      className="form-control"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="quantity">Quantity</label>
                    <input
                      type="number"
                      id="quantity"
                      className="form-control"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="total_amount_of_donations">
                      Total Amount of Donations
                    </label>
                    <input
                      type="number"
                      id="total_amount_of_donations"
                      className="form-control"
                      value={totalAmountDonations}
                      onChange={(e) => setTotalAmountDonations(e.target.value)}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="total_amount_of_cash_before_expense">
                      Total Amount Before Expense
                    </label>
                    <input
                      type="number"
                      id="total_amount_of_cash_before_expense"
                      className="form-control"
                      value={totalAmountBeforeExpense}
                      onChange={(e) =>
                        setTotalAmountBeforeExpense(e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="total_amount_of_cash_after_expense">
                      Total Amount After Expense
                    </label>
                    <input
                      type="number"
                      id="total_amount_of_cash_after_expense"
                      className="form-control"
                      value={totalAmountAfterExpense}
                      onChange={(e) =>
                        setTotalAmountAfterExpense(e.target.value)
                      }
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-success">
                    Add Asset
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

export default NewAsset
