import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import axios from 'axios'
import Swal from 'sweetalert2'

function AssetEditing() {
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState('')
  const [totalAmountBeforeExpense, setTotalAmountBeforeExpense] = useState('')
  const { assetId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAssetData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/assets/${assetId}`
        )
        const asset = response.data.data
        setDescription(asset.description)
        setQuantity(asset.quantity)
      } catch (error) {
        console.error('Error fetching asset data:', error)
        Swal.fire('Error', 'Could not fetch asset data.', 'error')
      }
    }

    fetchAssetData()
  }, [assetId])

  // Handle form submission for updating asset
  const handleSubmit = async (e) => {
    e.preventDefault()

    const updatedAsset = {
      description,
      total_amount_of_cash_before_expense: totalAmountBeforeExpense,
    }

    try {
      Swal.fire({
        title: 'Updating...',
        text: 'Please wait while we update the asset.',
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading()
        },
      })

      const response = await axios.put(
        `http://127.0.0.1:8000/api/assets/${assetId}`,
        updatedAsset
      )

      if (response.status === 200) {
        Swal.fire('Success', 'Asset has been updated successfully!', 'success')
        navigate('/dashboard/assets')
      } else {
        Swal.fire('Error', 'Failed to update asset. Please try again.', 'error')
      }
    } catch (error) {
      Swal.fire(
        'Error',
        'Something went wrong. Please try again later.',
        'error'
      )
      console.error('Error updating asset:', error)
    }
  }

  return (
    <div className="content-body">
      <div className="container-fluid">
        <div className="row page-titles mx-0">
          <div className="col-sm-6 p-md-0">
            <div className="welcome-text">
              <h4>Edit Asset</h4>
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
                  <button type="submit" className="btn btn-success">
                    Update Asset
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

export default AssetEditing
