import React, { useEffect, useState } from 'react'
import { FaArrowDown, FaArrowUp, FaPencilAlt, FaTrash } from 'react-icons/fa'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function BorrowedBooksList() {
  const [borrowedBooks, setBorrowedBooks] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortCriteria, setSortCriteria] = useState('id')
  const [sortOrder, setSortOrder] = useState('asc')
  const navigate = useNavigate()

  // Fetch borrowed books from the API
  const fetchBorrowedBooks = async () => {
    // Show loading SweetAlert before fetching data
    Swal.fire({
      title: 'Loading...',
      text: 'Fetching borrowed books...',
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading() // Show SweetAlert loading spinner
      },
    })

    try {
      const response = await axios.get(
        'http://127.0.0.1:8000/api/borrowed-books'
      )
      if (response.data && Array.isArray(response.data.data)) {
        setBorrowedBooks(response.data.data)
      } else {
        console.warn('Expected an array, but received:', response.data)
        setBorrowedBooks([])
      }
    } catch (error) {
      console.error('Error fetching borrowed books data:', error)
    } finally {
      Swal.close() // Close SweetAlert after data is fetched
    }
  }

  // Fetch borrowed books on component mount
  useEffect(() => {
    fetchBorrowedBooks()
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

  // Filter books based on search term
  const filteredBooks = borrowedBooks.filter(
    (book) =>
      book.book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.book.author.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Sort filtered books based on selected criteria
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortCriteria === 'id' || sortCriteria === 'library_id') {
      return sortOrder === 'asc'
        ? a[sortCriteria] - b[sortCriteria]
        : b[sortCriteria] - a[sortCriteria]
    } else if (
      sortCriteria === 'title' ||
      sortCriteria === 'author' ||
      sortCriteria === 'publication_year' ||
      sortCriteria === 'status'
    ) {
      return sortOrder === 'asc'
        ? a[sortCriteria].localeCompare(b[sortCriteria])
        : b[sortCriteria].localeCompare(a[sortCriteria])
    }
    return 0
  })

  // Handle book deletion
  const handleDelete = (bookId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will permanently delete the book!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `http://127.0.0.1:8000/api/books/${bookId}`
          )
          if (response.status === 200) {
            setBorrowedBooks((prevBooks) =>
              prevBooks.filter((book) => book.id !== bookId)
            )
            Swal.fire('Deleted!', 'The book has been deleted.', 'success')
          } else {
            Swal.fire(
              'Failed',
              'There was an issue deleting the book.',
              'error'
            )
          }
        } catch (error) {
          Swal.fire('Error', 'Something went wrong!', 'error')
          console.error('Error deleting book:', error)
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
              <h4>Borrowed Books</h4>
            </div>
          </div>
          <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex align-items-center">
            <button
              onClick={() =>
                navigate('/dashboard/borrowedBooks/addBorrowedBook')
              }
              className="btn btn-success ml-auto"
            >
              Borrow a new book
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
                    placeholder="Search by Title or Author"
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
                            onClick={() => handleSort('title')}
                          >
                            Title
                            {sortCriteria === 'title' &&
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
                            onClick={() => handleSort('author')}
                          >
                            Author
                            {sortCriteria === 'author' &&
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
                            onClick={() => handleSort('publication_year')}
                          >
                            Pub Year
                            {sortCriteria === 'publication_year' &&
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
                            onClick={() => handleSort('status')}
                          >
                            Status
                            {sortCriteria === 'status' &&
                              (sortOrder === 'asc' ? (
                                <FaArrowUp />
                              ) : (
                                <FaArrowDown />
                              ))}
                          </button>
                        </th>
                        <th>Student Name</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedBooks.map((borrowedBook) => (
                        <tr key={borrowedBook.id}>
                          <td>{borrowedBook.id}</td>
                          <td>{borrowedBook.book.title}</td>
                          <td>{borrowedBook.book.author}</td>
                          <td>{borrowedBook.book.publication_year}</td>
                          <td>{borrowedBook.status}</td>
                          <td>
                            {borrowedBook.student
                              ? `${borrowedBook.student.name} ${borrowedBook.student.last_name}`
                              : 'N/A'}
                          </td>
                          <td>
                            <button
                              onClick={() =>
                                navigate(
                                  `/dashboard/borrowed-books/${borrowedBook.id}`
                                )
                              }
                              className="btn btn-primary shadow btn-xs sharp me-1"
                            >
                              <FaPencilAlt />
                            </button>
                            <button
                              onClick={() => handleDelete(borrowedBook.id)}
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

export default BorrowedBooksList
