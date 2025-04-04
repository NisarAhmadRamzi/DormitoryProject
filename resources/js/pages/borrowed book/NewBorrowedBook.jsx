import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function NewBorrowedBook() {
  const [borrowedBook, setBorrowedBook] = useState({
    book_id: '',
    student_id: '',
    borrow_date: '',
    return_date: '',
    status: 'Borrowed', // Default status
  })
  const [books, setBooks] = useState([]) // For fetching available books
  const [students, setStudents] = useState([]) // For fetching available students
  const [isLoading, setIsLoading] = useState(false) // To manage loading state
  const navigate = useNavigate()

  // Fetch available books and students on component mount
  useEffect(() => {
    const fetchBooksAndStudents = async () => {
      setIsLoading(true) // Set loading to true before API call
      Swal.fire({
        title: 'Loading...',
        text: 'Fetching data...',
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading() // Show SweetAlert loading
        },
      })

      try {
        const [booksRes, studentsRes] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/books'),
          axios.get('http://127.0.0.1:8000/api/students'),
        ])

        setBooks(booksRes.data.data) // Assuming books data is in data
        setStudents(studentsRes.data.data) // Assuming students data is in data
        Swal.close() // Close SweetAlert after data is fetched
      } catch (error) {
        Swal.fire('Error', 'Failed to fetch books or students.', 'error')
        console.error('Error fetching books and students:', error)
      } finally {
        setIsLoading(false) // Set loading to false after API call
      }
    }

    fetchBooksAndStudents()
  }, [])

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setBorrowedBook({
      ...borrowedBook,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate borrow and return dates
    if (!borrowedBook.borrow_date || !borrowedBook.return_date) {
      Swal.fire(
        'Error',
        'Please provide both borrow and return dates.',
        'error'
      )
      return
    }

    // Show loading spinner while sending the request
    setIsLoading(true)
    Swal.fire({
      title: 'Processing...',
      text: 'Adding borrowed book...',
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading() // Show SweetAlert loading
      },
    })

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/borrowed-books',
        borrowedBook
      )

      if (response.status === 201) {
        Swal.fire(
          'Book Borrowed!',
          'The borrowed book has been added successfully.',
          'success'
        )
        navigate(-1) // Go back to the previous route
      }
    } catch (error) {
      if (error.response) {
        console.error('Validation error:', error.response.data) // API validation errors
      }
      Swal.fire(
        'Error',
        'Something went wrong while adding the borrowed book.',
        'error'
      )
      console.error('Error adding borrowed book:', error)
    } finally {
      setIsLoading(false) // Hide loading after the request completes
      Swal.close() // Close SweetAlert loading
    }
  }

  // Handle cancel
  const handleCancel = () => {
    navigate(-1) // Go back to the previous route
  }

  return (
    <div className="content-body">
      <div className="container-fluid">
        <div className="row page-titles mx-0">
          <div className="col-sm-6 p-md-0">
            <div className="welcome-text">
              <h4>Add New Borrowed Book</h4>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Borrowed Book Information</h4>
              </div>

              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    {/* Left Column (3 Fields) */}
                    <div className="col-md-6">
                      {/* Book Selection */}
                      <div className="form-group">
                        <label htmlFor="book_id">Select Book</label>
                        <select
                          id="book_id"
                          name="book_id"
                          className="form-control"
                          value={borrowedBook.book_id}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select a book</option>
                          {books.map((book) => (
                            <option key={book.id} value={book.id}>
                              {book.title} by {book.author}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Student Selection */}
                      <div className="form-group">
                        <label htmlFor="student_id">Select Student</label>
                        <select
                          id="student_id"
                          name="student_id"
                          className="form-control"
                          value={borrowedBook.student_id}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select a student</option>
                          {students.map((student) => (
                            <option key={student.id} value={student.id}>
                              {student.name} {student.last_name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Borrow Date */}
                      <div className="form-group">
                        <label htmlFor="borrow_date">Borrow Date</label>
                        <input
                          type="date"
                          id="borrow_date"
                          name="borrow_date"
                          className="form-control"
                          value={borrowedBook.borrow_date}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Right Column (2 Fields) */}
                    <div className="col-md-6">
                      {/* Return Date */}
                      <div className="form-group">
                        <label htmlFor="return_date">Return Date</label>
                        <input
                          type="date"
                          id="return_date"
                          name="return_date"
                          className="form-control"
                          value={borrowedBook.return_date}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      {/* Status */}
                      <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <select
                          id="status"
                          name="status"
                          className="form-control"
                          value={borrowedBook.status}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="Borrowed">Borrowed</option>
                          <option value="Returned">Returned</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div
                    className="form-buttons"
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <button
                      type="submit"
                      className="btn btn-success"
                      disabled={isLoading}
                    >
                      Borrow Book
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewBorrowedBook
