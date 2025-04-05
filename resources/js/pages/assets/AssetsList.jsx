import React, { useEffect, useState } from 'react'
import { FaArrowDown, FaArrowUp, FaPencilAlt, FaTrash } from 'react-icons/fa'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function AssetsList() {
  const [assets, setAssets] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortCriteria, setSortCriteria] = useState('id')
  const [sortOrder, setSortOrder] = useState('asc')
  const navigate = useNavigate()

  // Fetch assets data from the API
  const fetchAssets = async () => {
    // Show loading SweetAlert before fetching data
    Swal.fire({
      title: 'Loading... ',
      text: 'Fetching assets...',
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading() // Show SweetAlert loading spinner
      },
    })

    try {
      const response = await axios.get('http://127.0.0.1:8000/api/assets')
      if (response.data && Array.isArray(response.data.data)) {
        setAssets(response.data.data)
      } else {
        console.warn('Expected an array, but received:', response.data)
        setAssets([])
      }
    } catch (error) {
      console.error('Error fetching assets data:', error)
    } finally {
      Swal.close() // Close SweetAlert after data is fetched
    }
  }

  // Fetch assets on component mount
  useEffect(() => {
    fetchAssets()
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

  // Filter assets based on search term
  const filteredAssets = assets.filter((asset) =>
    asset.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Sort filtered assets based on selected criteria
  const sortedAssets = [...filteredAssets].sort((a, b) => {
    if (sortCriteria === 'id' || sortCriteria === 'quantity') {
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

  // Handle asset deletion
  const handleDelete = (assetId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will permanently delete the asset!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `http://127.0.0.1:8000/api/assets/${assetId}`
          )
          if (response.status === 200) {
            setAssets((prevAssets) =>
              prevAssets.filter((asset) => asset.id !== assetId)
            )
            Swal.fire('Deleted!', 'The asset has been deleted.', 'success')
          } else {
            Swal.fire(
              'Failed',
              'There was an issue deleting the asset.',
              'error'
            )
          }
        } catch (error) {
          Swal.fire('Error', 'Something went wrong!', 'error')
          console.error('Error deleting asset:', error)
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
              <h4>Assets List</h4>
            </div>
          </div>
          <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex align-items-center">
            <button
              onClick={() => navigate('/dashboard/assets/addAsset')}
              className="btn btn-success ml-auto"
            >
              Add New Asset
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
                        <th>Quantity</th>
                        <th>Total Donations</th>
                        <th>Total Amount Before Expense</th>
                        <th>Total Amount After Expense</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedAssets.map((asset) => (
                        <tr key={asset.id}>
                          <td>{asset.id}</td>
                          <td>{asset.description}</td>
                          <td>{asset.quantity}</td>
                          <td>{asset.total_amount_of_donations}</td>
                          <td>{asset.total_amount_of_cash_before_expense}</td>
                          <td>{asset.total_amount_of_cash_after_expense}</td>
                          <td>
                            <button
                              onClick={() =>
                                navigate(`/dashboard/assets/${asset.id}`)
                              }
                              className="btn btn-primary shadow btn-xs sharp me-1"
                            >
                              <FaPencilAlt />
                            </button>
                            <button
                              onClick={() => handleDelete(asset.id)}
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

export default AssetsList
