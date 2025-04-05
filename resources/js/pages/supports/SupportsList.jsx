import React, { useEffect, useState } from 'react'
import { FaArrowDown, FaArrowUp, FaPencilAlt, FaTrash } from 'react-icons/fa'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function SupportsList() {
  const [supports, setSupports] = useState([]) // To store fetched supports
  const [searchTerm, setSearchTerm] = useState('') // To store search query
  const [sortCriteria, setSortCriteria] = useState('id') // To handle sorting criteria
  const [sortOrder, setSortOrder] = useState('asc') // To handle sorting order
  const navigate = useNavigate()

  // Fetch supports data from the API
  const fetchSupports = async () => {
    // Show loading SweetAlert before fetching data
    Swal.fire({
      title: 'Loading...',
      text: 'Fetching supports...',
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading() // Show SweetAlert loading spinner
      },
    })

    try {
      const response = await axios.get('http://127.0.0.1:8000/api/supports')
      if (response.data && response.data.data) {
        setSupports(response.data.data)
      } else {
        console.warn('Expected an array, but received:', response.data)
        setSupports([])
      }
    } catch (error) {
      console.error('Error fetching supports data:', error)
    } finally {
      Swal.close() // Close SweetAlert after data is fetched
    }
  }

  // Fetch supports on component mount
  useEffect(() => {
    fetchSupports()
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

  // Filter supports based on search term
  const filteredSupports = supports.filter((support) =>
    support.helper_fullname.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Sort filtered supports based on selected criteria
  const sortedSupports = [...filteredSupports].sort((a, b) => {
    if (sortCriteria === 'id' || sortCriteria === 'total_cash_donated') {
      return sortOrder === 'asc'
        ? a[sortCriteria] - b[sortCriteria]
        : b[sortCriteria] - a[sortCriteria]
    } else if (sortCriteria === 'helper_fullname') {
      return sortOrder === 'asc'
        ? a[sortCriteria].localeCompare(b[sortCriteria])
        : b[sortCriteria].localeCompare(a[sortCriteria])
    }
    return 0
  })

  // Handle support deletion
  const handleDelete = (supportId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will permanently delete the support record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `http://127.0.0.1:8000/api/supports/${supportId}`
          )
          if (response.status === 200) {
            setSupports((prevSupports) =>
              prevSupports.filter((support) => support.id !== supportId)
            )
            Swal.fire(
              'Deleted!',
              'The support record has been deleted.',
              'success'
            )
          } else {
            Swal.fire(
              'Failed',
              'There was an issue deleting the support.',
              'error'
            )
          }
        } catch (error) {
          Swal.fire('Error', 'Something went wrong!', 'error')
          console.error('Error deleting support:', error)
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
              <h4>Supports List</h4>
            </div>
          </div>
          <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex align-items-center">
            <button
              onClick={() => navigate('/dashboard/supports/addSupports')}
              className="btn btn-success ml-auto"
            >
              Add New Support
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
                    placeholder="Search by Helper Full Name"
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
                            onClick={() => handleSort('helper_fullname')}
                          >
                            Helper Full Name
                            {sortCriteria === 'helper_fullname' &&
                              (sortOrder === 'asc' ? (
                                <FaArrowUp />
                              ) : (
                                <FaArrowDown />
                              ))}
                          </button>
                        </th>
                        <th>Helper Number</th>
                        <th>Helper Email</th>
                        <th>Help Date</th>
                        <th>Total Cash Donated</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedSupports.map((support) => (
                        <tr key={support.id}>
                          <td>{support.id}</td>
                          <td>{support.helper_fullname}</td>
                          <td>{support.helper_number}</td>
                          <td>{support.helper_email}</td>
                          <td>{support.help_date}</td>
                          <td>{support.total_cash_donated}</td>
                          <td>
                            <button
                              onClick={() =>
                                navigate(
                                  `/dashboard/supports/editSupport/${support.id}`
                                )
                              }
                              className="btn btn-primary shadow btn-xs sharp me-1"
                            >
                              <FaPencilAlt />
                            </button>
                            <button
                              onClick={() => handleDelete(support.id)}
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

export default SupportsList
