import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function FeeEditing() {
    const [fee, setFee] = useState(null);
    const { feeId } = useParams(); // Get feeId from the URL
    const navigate = useNavigate();

    // Fetch the fee data from the API
    const fetchFee = async () => {
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/api/fees/${feeId}`
            );
            setFee(response.data.data); // Store fee data in state
        } catch (error) {
            console.error("Error fetching fee data:", error);
        }
    };

    // Fetch fee data when the component mounts
    useEffect(() => {
        fetchFee();
    }, [feeId]);

    // Handle form submission to update fee
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/api/fees/${feeId}`,
                fee
            );
            if (response.status === 200) {
                Swal.fire("Success", "Fee has been updated.", "success");
                navigate("/dashboard/fees"); // Redirect to Fees List page
            }
        } catch (error) {
            Swal.fire("Error", "Failed to update fee.", "error");
            console.error("Error updating fee:", error);
        }
    };

    // Handle input change
    const handleChange = (e) => {
        setFee({
            ...fee,
            [e.target.name]: e.target.value,
        });
    };

    if (!fee) return <div>Loading...</div>;

    return (
        <div className="container">
            <h3>Edit Fee</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Student Name</label>
                    {/* Make Student Name editable */}
                    <input
                        type="text"
                        className="form-control"
                        name="student_name"
                        value={`${fee.student.name}`}
                        onChange={(e) =>
                            setFee({
                                ...fee,
                                student: {
                                    ...fee.student,
                                    name: e.target.value,
                                },
                            })
                        }
                    />
                </div>

                <div className="form-group">
                    <label>Student Last Name</label>
                    {/* Make Student Last Name editable */}
                    <input
                        type="text"
                        className="form-control"
                        name="student_last_name"
                        value={`${fee.student.last_name}`}
                        onChange={(e) =>
                            setFee({
                                ...fee,
                                student: {
                                    ...fee.student,
                                    last_name: e.target.value,
                                },
                            })
                        }
                    />
                </div>

                <div className="form-group">
                    <label>Office Pay</label>
                    <input
                        type="number"
                        className="form-control"
                        name="office_pay"
                        value={fee.office_pay}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Office Paid</label>
                    <input
                        type="text"
                        className="form-control"
                        name="office_paid"
                        value={fee.office_paid}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Total Fee</label>
                    <input
                        type="number"
                        className="form-control"
                        name="total_fee"
                        value={fee.total_fee}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Due Date</label>
                    <input
                        type="date"
                        className="form-control"
                        name="due_date"
                        value={fee.due_date}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Update Fee
                </button>
            </form>
        </div>
    );
}

export default FeeEditing;
