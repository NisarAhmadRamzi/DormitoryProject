import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import axios from 'axios'
import Swal from 'sweetalert2'

function EditSupport() {
  const { supportId } = useParams() // Getting the support ID from the URL
  const [type, setType] = useState('')
  const [helperFullname, setHelperFullname] = useState('')
  const [helperNumber, setHelperNumber] = useState('')
  const [helperEmail, setHelperEmail] = useState('')
  const [helpDate, setHelpDate] = useState('')
  const [details, setDetails] = useState('')
  const [goodsQuantity, setGoodsQuantity] = useState('')
  const [cashQuantity, setCashQuantity] = useState('')
  const [totalCashDonated, setTotalCashDonated] = useState('')
  const navigate = useNavigate()

  // Fetch the support data by ID
  useEffect(() => {
    const fetchSupportData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/supports/${supportId}`
        )
        const supportData = response.data.data // Assuming this is the correct path to your data
        setType(supportData.type)
        setHelperFullname(supportData.helper_fullname)
        setHelperNumber(supportData.helper_number)
        setHelperEmail(supportData.helper_email)
        setHelpDate(supportData.help_date)
        setDetails(supportData.details)
        setGoodsQuantity(supportData.goods_quantity)
        setCashQuantity(supportData.cash_quantity)
        setTotalCashDonated(supportData.total_cash_donated)
      } catch (error) {
        Swal.fire('Error', 'Failed to fetch support data', 'error')
        console.error('Error fetching support:', error)
      }
    }

    fetchSupportData()
  }, [supportId])

  // Handle form submission to update the support
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Prepare the updated support object
    const updatedSupport = {
      type,
      helper_fullname: helperFullname,
      helper_number: helperNumber,
      helper_email: helperEmail,
      help_date: helpDate,
      details,
      goods_quantity: goodsQuantity,
      cash_quantity: cashQuantity,
      total_cash_donated: totalCashDonated,
    }

    try {
      // Show loading SweetAlert while waiting for the request
      Swal.fire({
        title: 'Updating Support...',
        text: 'Please wait while we update the support information.',
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading()
        },
      })

      // Send the PUT request to update the support
      const response = await axios.put(
        `http://127.0.0.1:8000/api/supports/${supportId}`,
        updatedSupport
      )

      // If successful, show success alert and navigate back to the supports list
      if (response.status === 200) {
        Swal.fire('Success', 'Support updated successfully!', 'success')
        navigate('/dashboard/supports')
      } else {
        Swal.fire('Failed', 'There was an issue updating the support.', 'error')
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to update the support.', 'error')
      console.error('Error updating support:', error)
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
              <h4>Edit Support</h4>
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
                    <label htmlFor="goodsQuantity">Goods Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      id="goodsQuantity"
                      value={goodsQuantity}
                      onChange={(e) => setGoodsQuantity(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="cashQuantity">Cash Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      id="cashQuantity"
                      value={cashQuantity}
                      onChange={(e) => setCashQuantity(e.target.value)}
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
                    Update Support
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

export default EditSupport
