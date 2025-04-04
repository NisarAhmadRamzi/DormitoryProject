import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import axios from 'axios'
import Swal from 'sweetalert2'

function BookEditing() {
  const [book, setBook] = useState({
    title: '',
    author: '',
    publication_year: '',
    status: '',
    books_total_count: '',
    borrowed_books_total_count: '',
    books_total_count_after_borrowed: '',
  })

  const [loading, setLoading] = useState(false)
  const { bookId } = useParams() // Get the bookId from the URL
  const navigate = useNavigate()

  // Fetch book details when the component mounts
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/books/${bookId}` // Corrected URL
        )
        setBook(response.data.data) // Set book data in state
      } catch (error) {
        console.error('Error fetching book details:', error)
        Swal.fire('Error', 'Could not fetch book details', 'error')
      }
    }
    fetchBookDetails()
  }, [bookId]) // Corrected dependency

  // Handle form submission for editing the book
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Convert values to numbers if necessary (for fields like count)
    const updatedBook = {
      ...book,
      books_total_count: parseInt(book.books_total_count, 10), // Ensure it's a number
      borrowed_books_total_count: parseInt(book.borrowed_books_total_count, 10), // Ensure it's a number
      books_total_count_after_borrowed: parseInt(
        book.books_total_count_after_borrowed,
        10
      ), // Ensure it's a number
    }

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/books/${bookId}`,
        updatedBook
      )
      if (response.status === 200) {
        Swal.fire('Success', 'Book updated successfully', 'success').then(
          () => {
            navigate(-1) // Navigate back to the previous route
          }
        )
      }
    } catch (error) {
      Swal.fire('Error', 'There was an issue updating the book', 'error')
      console.error('Error updating book:', error)
      // Log the error response for debugging
      if (error.response) {
        console.error('Response data:', error.response.data) // Log the detailed response from the API
      }
    } finally {
      setLoading(false)
    }
  }

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }))
  }

  return (
    <div className="content-body">
      <div className="container-fluid">
        <div className="row page-titles mx-0">
          <div className="col-sm-6 p-md-0">
            <div className="welcome-text">
              <h4>Edit Book</h4>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h4>Edit Book Details</h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={book.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Author</label>
                    <input
                      type="text"
                      className="form-control"
                      name="author"
                      value={book.author}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Publication Year</label>
                    <input
                      type="text"
                      className="form-control"
                      name="publication_year"
                      value={book.publication_year}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Status</label>
                    <input
                      type="text"
                      className="form-control"
                      name="status"
                      value={book.status}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Total Books</label>
                    <input
                      type="number"
                      className="form-control"
                      name="books_total_count"
                      value={book.books_total_count}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Borrowed Books</label>
                    <input
                      type="number"
                      className="form-control"
                      name="borrowed_books_total_count"
                      value={book.borrowed_books_total_count}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Books After Borrowing</label>
                    <input
                      type="number"
                      className="form-control"
                      name="books_total_count_after_borrowed"
                      value={book.books_total_count_after_borrowed}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : 'Update Book'}
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

export default BookEditing
