// import React, { useState } from "react";
// import Swal from "sweetalert2";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function AddFee() {
//     const [feeData, setFeeData] = useState({
//         student_id: "",
//         office_pay: "",
//         office_paid: "",
//         total_fee: "",
//         due_date: "",
//         registration_date: "",
//     });

//     const [errors, setErrors] = useState({}); // To store errors

//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFeeData({ ...feeData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post(
//                 "http://127.0.0.1:8000/api/fees",
//                 feeData
//             );
//             if (response.status === 201) {
//                 Swal.fire(
//                     "Success!",
//                     "The fee has been added successfully.",
//                     "success"
//                 );
//                 navigate("/dashboard/fees");
//             }
//         } catch (error) {
//             if (error.response && error.response.data.errors) {
//                 setErrors(error.response.data.errors); // Set errors from response
//             } else {
//                 Swal.fire(
//                     "Error",
//                     "Something went wrong while adding the fee!",
//                     "error"
//                 );
//                 console.error("Error adding fee:", error);
//             }
//         }
//     };

//     // Handle cancel (navigate back to the fees dashboard)
//     const handleCancel = () => {
//         navigate("/dashboard/fees"); // Navigate to the fees dashboard or appropriate page
//     };

//     return (
//         <div className="content-body">
//             <div className="container-fluid">
//                 <div className="row page-titles mx-0">
//                     <div className="col-sm-6 p-md-0">
//                         <div className="welcome-text">
//                             <h4>Add New Fee</h4>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="row">
//                     <div className="col-lg-12">
//                         <div className="card">
//                             <div className="card-header">Fee Details</div>
//                             <div className="card-body">
//                                 <form onSubmit={handleSubmit}>
//                                     <div className="form-group">
//                                         <label>Student ID</label>
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             name="student_id"
//                                             value={feeData.student_id}
//                                             onChange={handleChange}
//                                             required
//                                         />
//                                         {errors.student_id && (
//                                             <p className="error-text">
//                                                 {errors.student_id[0]}
//                                             </p>
//                                         )}
//                                     </div>
//                                     <div className="form-group">
//                                         <label>Office Pay</label>
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             name="office_pay"
//                                             value={feeData.office_pay}
//                                             onChange={handleChange}
//                                             required
//                                         />
//                                         {errors.office_pay && (
//                                             <p className="error-text">
//                                                 {errors.office_pay[0]}
//                                             </p>
//                                         )}
//                                     </div>
//                                     <div className="form-group">
//                                         <label>Office Paid</label>
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             name="office_paid"
//                                             value={feeData.office_paid}
//                                             onChange={handleChange}
//                                             required
//                                         />
//                                         {errors.office_paid && (
//                                             <p className="error-text">
//                                                 {errors.office_paid[0]}
//                                             </p>
//                                         )}
//                                     </div>
//                                     <div className="form-group">
//                                         <label>Total Fee</label>
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             name="total_fee"
//                                             value={feeData.total_fee}
//                                             onChange={handleChange}
//                                             required
//                                         />
//                                         {errors.total_fee && (
//                                             <p className="error-text">
//                                                 {errors.total_fee[0]}
//                                             </p>
//                                         )}
//                                     </div>
//                                     <div className="form-group">
//                                         <label>Due Date</label>
//                                         <input
//                                             type="date"
//                                             className="form-control"
//                                             name="due_date"
//                                             value={feeData.due_date}
//                                             onChange={handleChange}
//                                             required
//                                         />
//                                         {errors.due_date && (
//                                             <p className="error-text">
//                                                 {errors.due_date[0]}
//                                             </p>
//                                         )}
//                                     </div>
//                                     <div className="form-group">
//                                         <label>Registration Date</label>
//                                         <input
//                                             type="date"
//                                             className="form-control"
//                                             name="registration_date"
//                                             value={feeData.registration_date}
//                                             onChange={handleChange}
//                                             required
//                                         />
//                                         {errors.registration_date && (
//                                             <p className="error-text">
//                                                 {errors.registration_date[0]}
//                                             </p>
//                                         )}
//                                     </div>

//                                     <div
//                                         className="form-buttons"
//                                         style={{
//                                             display: "flex",
//                                             justifyContent: "space-between",
//                                             alignItems: "center",
//                                         }}
//                                     >
//                                         <button
//                                             type="submit"
//                                             className="btn btn-success"
//                                         >
//                                             Add Fee
//                                         </button>
//                                         <button
//                                             type="button"
//                                             className="btn btn-danger"
//                                             onClick={handleCancel}
//                                         >
//                                             Cancel
//                                         </button>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default AddFee;

import React, { useState } from "react";

import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddFee() {
    const [feeData, setFeeData] = useState({
        student_id: "",
        office_pay: "",
        office_paid: "",
        total_fee: "",
        due_date: "",
        registration_date: "",
        warranty_pay: "",  // Added
        warranty_paid: "", // Added
    });

    const [errors, setErrors] = useState({}); // To store errors

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
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors); // Set errors from response
            } else {
                Swal.fire(
                    "Error",
                    "Something went wrong while adding the fee!",
                    "error"
                );
                console.error("Error adding fee:", error);
            }
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
                                    {/* Existing form fields */}
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
                                        {errors.student_id && (
                                            <p className="error-text">
                                                {errors.student_id[0]}
                                            </p>
                                        )}
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
                                        {errors.office_pay && (
                                            <p className="error-text">
                                                {errors.office_pay[0]}
                                            </p>
                                        )}
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
                                        {errors.office_paid && (
                                            <p className="error-text">
                                                {errors.office_paid[0]}
                                            </p>
                                        )}
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
                                        {errors.total_fee && (
                                            <p className="error-text">
                                                {errors.total_fee[0]}
                                            </p>
                                        )}
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
                                        {errors.due_date && (
                                            <p className="error-text">
                                                {errors.due_date[0]}
                                            </p>
                                        )}
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
                                        {errors.registration_date && (
                                            <p className="error-text">
                                                {errors.registration_date[0]}
                                            </p>
                                        )}
                                    </div>

                                    {/* Newly added fields */}
                                    <div className="form-group">
                                        <label>Warranty Pay</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="warranty_pay"
                                            value={feeData.warranty_pay}
                                            onChange={handleChange}
                                            required
                                        />
                                        {errors.warranty_pay && (
                                            <p className="error-text">
                                                {errors.warranty_pay[0]}
                                            </p>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label>Warranty Paid</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="warranty_paid"
                                            value={feeData.warranty_paid}
                                            onChange={handleChange}
                                            required
                                        />
                                        {errors.warranty_paid && (
                                            <p className="error-text">
                                                {errors.warranty_paid[0]}
                                            </p>
                                        )}
                                    </div>

                                    <div
                                        className="form-buttons"
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
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
