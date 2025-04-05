// import React, { useState } from 'react'

// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// import Swal from 'sweetalert2'

// function NewSupport() {
//   const [type, setType] = useState('')
//   const [helperFullname, setHelperFullname] = useState('')
//   const [helperNumber, setHelperNumber] = useState('')
//   const [helperEmail, setHelperEmail] = useState('')
//   const [helpDate, setHelpDate] = useState('')
//   const [details, setDetails] = useState('')
//   const [totalCashDonated, setTotalCashDonated] = useState('')
//   const navigate = useNavigate()

//   // Handle form submission to create a new support
//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     // Create a support object
//     const newSupport = {
//       type,
//       helper_fullname: helperFullname,
//       helper_number: helperNumber,
//       helper_email: helperEmail,
//       help_date: helpDate,
//       details: details,
//       total_cash_donated: totalCashDonated,
//     }

//     try {
//       // Show loading SweetAlert while waiting for the request
//       Swal.fire({
//         title: 'Creating Support...',
//         text: 'Please wait while we save the support information.',
//         showConfirmButton: false,
//         didOpen: () => {
//           Swal.showLoading()
//         },
//       })

//       // Send the POST request to the API
//       const response = await axios.post(
//         'http://127.0.0.1:8000/api/supports',
//         newSupport
//       )

//       // If successful, show success alert and navigate to the Supports list
//       if (response.status === 201) {
//         Swal.fire('Success', 'Support created successfully!', 'success')
//         navigate('/dashboard/supports')
//       } else {
//         Swal.fire('Failed', 'There was an issue creating the support.', 'error')
//       }
//     } catch (error) {
//       Swal.fire('Error', 'Failed to create the support.', 'error')
//       console.error('Error creating support:', error)
//     } finally {
//       Swal.close() // Close the loading spinner after the process completes
//     }
//   }

//   return (
//     <div className="content-body">
//       <div className="container-fluid">
//         <div className="row page-titles mx-0">
//           <div className="col-sm-6 p-md-0">
//             <div className="welcome-text">
//               <h4>Add New Support</h4>
//             </div>
//           </div>
//           <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex align-items-center">
//             <button
//               onClick={() => navigate('/dashboard/supports')}
//               className="btn btn-secondary ml-auto"
//             >
//               Back to Supports
//             </button>
//           </div>
//         </div>

//         <div className="row">
//           <div className="col-lg-12">
//             <div className="card">
//               <div className="card-body">
//                 <form onSubmit={handleSubmit}>
//                   <div className="form-group">
//                     <label htmlFor="type">Support Type</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="type"
//                       value={type}
//                       onChange={(e) => setType(e.target.value)}
//                       required
//                     />
//                   </div>

//                   <div className="form-group">
//                     <label htmlFor="helperFullname">Helper Full Name</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="helperFullname"
//                       value={helperFullname}
//                       onChange={(e) => setHelperFullname(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label htmlFor="helperFullname">Details</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="details"
//                       value={helperFullname}
//                       onChange={(e) => setDetails(e.target.value)}
//                       required
//                     />
//                   </div>

//                   <div className="form-group">
//                     <label htmlFor="helperNumber">Helper Phone Number</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="helperNumber"
//                       value={helperNumber}
//                       onChange={(e) => setHelperNumber(e.target.value)}
//                       required
//                     />
//                   </div>

//                   <div className="form-group">
//                     <label htmlFor="helperEmail">Helper Email</label>
//                     <input
//                       type="email"
//                       className="form-control"
//                       id="helperEmail"
//                       value={helperEmail}
//                       onChange={(e) => setHelperEmail(e.target.value)}
//                       required
//                     />
//                   </div>

//                   <div className="form-group">
//                     <label htmlFor="helpDate">Help Date</label>
//                     <input
//                       type="date"
//                       className="form-control"
//                       id="helpDate"
//                       value={helpDate}
//                       onChange={(e) => setHelpDate(e.target.value)}
//                       required
//                     />
//                   </div>

//                   <div className="form-group">
//                     <label htmlFor="totalCashDonated">Total Cash Donated</label>
//                     <input
//                       type="number"
//                       className="form-control"
//                       id="totalCashDonated"
//                       value={totalCashDonated}
//                       onChange={(e) => setTotalCashDonated(e.target.value)}
//                       required
//                     />
//                   </div>

//                   <button type="submit" className="btn btn-primary mt-3">
//                     Save Support
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default NewSupport

import React, { useState } from 'react'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function NewSupport() {
  const [type, setType] = useState('')
  const [helperFullname, setHelperFullname] = useState('')
  const [helperNumber, setHelperNumber] = useState('')
  const [helperEmail, setHelperEmail] = useState('')
  const [helpDate, setHelpDate] = useState('')
  const [details, setDetails] = useState('') // Make sure to track "details"
  const [totalCashDonated, setTotalCashDonated] = useState('')
  const navigate = useNavigate()

  // Handle form submission to create a new support
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Create a support object
    const newSupport = {
      type,
      helper_fullname: helperFullname,
      helper_number: helperNumber,
      helper_email: helperEmail,
      help_date: helpDate,
      details: details, // Add details in the payload
      total_cash_donated: totalCashDonated,
    }

    try {
      // Show loading SweetAlert while waiting for the request
      Swal.fire({
        title: 'Creating Support...',
        text: 'Please wait while we save the support information.',
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading()
        },
      })

      // Send the POST request to the API
      const response = await axios.post(
        'http://127.0.0.1:8000/api/supports',
        newSupport
      )

      // If successful, show success alert and navigate to the Supports list
      if (response.status === 201) {
        Swal.fire('Success', 'Support created successfully!', 'success')
        navigate('/dashboard/supports')
      } else {
        Swal.fire('Failed', 'There was an issue creating the support.', 'error')
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to create the support.', 'error')
      console.error('Error creating support:', error)
    } finally {
      Swal.close() // Close the loading spinner after the process completes
    }
  }

  return (
    <div className="content-body">
      <div className="container-fluid">
        <div className="row page-titles mx-0">
          <div className="col-sm-6 p-md-0">
            <div className="welcome-text">
              <h4>Add New Support</h4>
            </div>
          </div>
          <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex align-items-center">
            <button
              onClick={() => navigate('/dashboard/supports')}
              className="btn btn-secondary ml-auto"
            >
              Back to Supports
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="type">Support Type</label>
                    <input
                      type="text"
                      className="form-control"
                      id="type"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="helperFullname">Helper Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="helperFullname"
                      value={helperFullname}
                      onChange={(e) => setHelperFullname(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="details">Details</label>
                    <input
                      type="text"
                      className="form-control"
                      id="details"
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="helperNumber">Helper Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      id="helperNumber"
                      value={helperNumber}
                      onChange={(e) => setHelperNumber(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="helperEmail">Helper Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="helperEmail"
                      value={helperEmail}
                      onChange={(e) => setHelperEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="helpDate">Help Date</label>
                    <input
                      type="date"
                      className="form-control"
                      id="helpDate"
                      value={helpDate}
                      onChange={(e) => setHelpDate(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="totalCashDonated">Total Cash Donated</label>
                    <input
                      type="number"
                      className="form-control"
                      id="totalCashDonated"
                      value={totalCashDonated}
                      onChange={(e) => setTotalCashDonated(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary mt-3">
                    Save Support
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

export default NewSupport
