import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function AddFee() {
    const [feeData, setFeeData] = useState({
        student_id: "",
        office_pay: "",
        office_paid: "",
        total_fee: "",
        due_date: "",
        registration_date: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFeeData({ ...feeData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/fees",
                feeData
            );
            if (response.status === 201) {
                Swal.fire(
                    "Success!",
                    "The fee has been added successfully.",
                    "success"
                );
                navigate("/dashboard/fees");
            }
        } catch (error) {
            Swal.fire(
                "Error",
                "Something went wrong while adding the fee!",
                "error"
            );
            console.error("Error adding fee:", error);
        }
    };

    // Handle cancel (navigate back to the fees dashboard)
    const handleCancel = () => {
        navigate("/dashboard/fees"); // Navigate to the fees dashboard or appropriate page
    };

    return (
        <div className="content-body">
            <div className="container-fluid">
                <div className="row page-titles mx-0">
                    <div className="col-sm-6 p-md-0">
                        <div className="welcome-text">
                            <h4>Add New Fee</h4>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">Fee Details</div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label>Student ID</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="student_id"
                                            value={feeData.student_id}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Office Pay</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="office_pay"
                                            value={feeData.office_pay}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Office Paid</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="office_paid"
                                            value={feeData.office_paid}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Total Fee</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="total_fee"
                                            value={feeData.total_fee}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Due Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="due_date"
                                            value={feeData.due_date}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Registration Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="registration_date"
                                            value={feeData.registration_date}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div
                                        className="form-buttons"
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between", // Spread the buttons out
                                            alignItems: "center",
                                        }}
                                    >
                                        <button
                                            type="submit"
                                            className="btn btn-success"
                                        >
                                            Add Fee
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={handleCancel}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddFee;
