import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import axios from 'axios'
import Swal from 'sweetalert2'

function LibraryStudentEditing() {
  const [student, setStudent] = useState({
    library_id: '',
    name: '',
    last_name: '',
    email: '',
    address: '',
    phone: '',
    gender: '',
    password: '',
    membership_status: 'Active',
    registration_date: '',
    registration_deadline: '',
  })

  const [loading, setLoading] = useState(false)
  const { libraryStudentId } = useParams() // Get the studentId from the URL
  const navigate = useNavigate()

  // Fetch student details when the component mounts
  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/library-students/${libraryStudentId}`
        )
        setStudent(response.data.data) // Set student data in state
      } catch (error) {
        console.error('Error fetching student details:', error)
        Swal.fire('Error', 'Could not fetch student details', 'error')
      }
    }
    fetchStudentDetails()
  }, [libraryStudentId])

  // Handle form submission for editing the student
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/library-students/${libraryStudentId}`,
        student
      )
      if (response.status === 200) {
        Swal.fire('Success', 'Student updated successfully', 'success').then(
          () => {
            navigate(-1) // Navigate back to the previous page
          }
        )
      }
    } catch (error) {
      Swal.fire('Error', 'There was an issue updating the student', 'error')
      console.error('Error updating student:', error)
      // Log the error response for debugging
      if (error.response) {
        console.error('Response data:', error.response.data)
      }
    } finally {
      setLoading(false)
    }
  }

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }))
  }

  return (
    <div className="content-body">
      <div className="container-fluid">
        <div className="row page-titles mx-0">
          <div className="col-sm-6 p-md-0">
            <div className="welcome-text">
              <h4>Edit Library Student</h4>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h4>Edit Student Details</h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={student.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="last_name"
                      value={student.last_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={student.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={student.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Address</label>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      value={student.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={student.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Gender</label>
                    <select
                      className="form-control"
                      name="gender"
                      value={student.gender}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Membership Status</label>
                    <select
                      className="form-control"
                      name="membership_status"
                      value={student.membership_status}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Registration Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="registration_date"
                      value={student.registration_date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Registration Deadline</label>
                    <input
                      type="date"
                      className="form-control"
                      name="registration_deadline"
                      value={student.registration_deadline}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : 'Update Student'}
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

export default LibraryStudentEditing
