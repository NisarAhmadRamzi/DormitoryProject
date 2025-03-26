import React, { useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2 for notifications
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import axios from "axios";

function StudentForm() {
    const navigate = useNavigate(); // Initialize navigate hook

    // State to hold the form data
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        room_id: "",
        dob: "",
        gender: "Male", // Default gender
        phone: "",
        academic_info: "",
        f_name: "",
        last_name: "",
        from: "",
        registration_date: "",
        registration_deadline: "",
        id_number: "",
    });

    // State to manage loading and error messages
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Handle change in form inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submit behavior
        setSuccess(false); // Reset success message
        setError(null); // Reset error message

        // Validate for missing fields
        const missingFields = Object.keys(formData).filter(
            (key) => formData[key] === ""
        );

        if (missingFields.length > 0) {
            setError(`Missing required fields: ${missingFields.join(", ")}`);
            return;
        }

        // Prepare student data to be sent
        const studentData = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            room_id: formData.room_id,
            dob: formData.dob,
            gender: formData.gender,
            phone: formData.phone,
            academic_info: formData.academic_info,
            f_name: formData.f_name,
            last_name: formData.last_name,
            from: formData.from,
            registration_date: formData.registration_date,
            registration_deadline: formData.registration_deadline,
            id_number: formData.id_number,
        };

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/students", // Your API URL
                studentData // Send studentData directly
            );

            if (response.status === 201) {
                // Check for successful creation (201)
                setSuccess(true); // Success handling
                Swal.fire({
                    icon: "success",
                    title: "Student Added!",
                    text: "The student has been successfully added.",
                    confirmButtonText: "OK",
                });
                console.log("Student added:", response.data);
            } else {
                throw new Error(
                    response.data.message || "Error adding student"
                );
            }
        } catch (error) {
            // Log the error response to see what went wrong
            console.error(
                "Error adding student:",
                error.response ? error.response.data : error.message
            );
            setError(
                error.response ? error.response.data.message : error.message
            );
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response
                    ? error.response.data.message
                    : error.message,
                confirmButtonText: "Try Again",
            });
        }
    };

    // Handle cancel action (reset form)
    const handleCancel = () => {
        setFormData({
            name: "",
            email: "",
            password: "",
            room_id: "",
            dob: "",
            gender: "Male",
            phone: "",
            academic_info: "",
            f_name: "",
            last_name: "",
            from: "",
            registration_date: "",
            registration_deadline: "",
            id_number: "",
        });
        setError(null);
        setSuccess(false);
    };

    // Handle back button click to go to the previous route
    const handleBack = () => {
        navigate(-1); // This will take the user back to the previous page
    };

    return (
        // <div className="container">
        //     <h2>Add New Student</h2>
        //     <form onSubmit={handleSubmit}>
        //         <div className="row">
        //             {/* Name */}
        //             <div className="col-md-6 form-group">
        //                 <label>Full Name</label>
        //                 <input
        //                     type="text"
        //                     name="name"
        //                     value={formData.name}
        //                     onChange={handleChange}
        //                     required
        //                     className="form-control"
        //                 />
        //             </div>

        //             {/* Email */}
        //             <div className="col-md-6 form-group">
        //                 <label>Email</label>
        //                 <input
        //                     type="email"
        //                     name="email"
        //                     value={formData.email}
        //                     onChange={handleChange}
        //                     required
        //                     className="form-control"
        //                 />
        //             </div>

        //             {/* Password */}
        //             <div className="col-md-6 form-group">
        //                 <label>Password</label>
        //                 <input
        //                     type="password"
        //                     name="password"
        //                     value={formData.password}
        //                     onChange={handleChange}
        //                     required
        //                     className="form-control"
        //                 />
        //             </div>

        //             {/* Room ID */}
        //             <div className="col-md-6 form-group">
        //                 <label>Room ID</label>
        //                 <input
        //                     type="text"
        //                     name="room_id"
        //                     value={formData.room_id}
        //                     onChange={handleChange}
        //                     required
        //                     className="form-control"
        //                 />
        //             </div>

        //             {/* Date of Birth */}
        //             <div className="col-md-6 form-group">
        //                 <label>Date of Birth</label>
        //                 <input
        //                     type="date"
        //                     name="dob"
        //                     value={formData.dob}
        //                     onChange={handleChange}
        //                     required
        //                     className="form-control"
        //                 />
        //             </div>

        //             {/* Gender */}
        //             <div className="col-md-6 form-group">
        //                 <label>Gender</label>
        //                 <select
        //                     name="gender"
        //                     value={formData.gender}
        //                     onChange={handleChange}
        //                     required
        //                     className="form-control"
        //                 >
        //                     <option value="Male">Male</option>
        //                     <option value="Female">Female</option>
        //                 </select>
        //             </div>

        //             {/* Phone */}
        //             <div className="col-md-6 form-group">
        //                 <label>Phone</label>
        //                 <input
        //                     type="text"
        //                     name="phone"
        //                     value={formData.phone}
        //                     onChange={handleChange}
        //                     required
        //                     className="form-control"
        //                 />
        //             </div>

        //             {/* Academic Information */}
        //             <div className="col-md-6 form-group">
        //                 <label>Academic Information</label>
        //                 <input
        //                     type="text"
        //                     name="academic_info"
        //                     value={formData.academic_info}
        //                     onChange={handleChange}
        //                     required
        //                     className="form-control"
        //                 />
        //             </div>

        //             {/* Father's Name */}
        //             <div className="col-md-6 form-group">
        //                 <label>Father's Name</label>
        //                 <input
        //                     type="text"
        //                     name="f_name"
        //                     value={formData.f_name}
        //                     onChange={handleChange}
        //                     required
        //                     className="form-control"
        //                 />
        //             </div>

        //             {/* Last Name */}
        //             <div className="col-md-6 form-group">
        //                 <label>Last Name</label>
        //                 <input
        //                     type="text"
        //                     name="last_name"
        //                     value={formData.last_name}
        //                     onChange={handleChange}
        //                     required
        //                     className="form-control"
        //                 />
        //             </div>

        //             {/* From */}
        //             <div className="col-md-6 form-group">
        //                 <label>From</label>
        //                 <input
        //                     type="text"
        //                     name="from"
        //                     value={formData.from}
        //                     onChange={handleChange}
        //                     required
        //                     className="form-control"
        //                 />
        //             </div>

        //             {/* Registration Date */}
        //             <div className="col-md-6 form-group">
        //                 <label>Registration Date</label>
        //                 <input
        //                     type="date"
        //                     name="registration_date"
        //                     value={formData.registration_date}
        //                     onChange={handleChange}
        //                     required
        //                     className="form-control"
        //                 />
        //             </div>

        //             {/* Registration Deadline */}
        //             <div className="col-md-6 form-group">
        //                 <label>Registration Deadline</label>
        //                 <input
        //                     type="date"
        //                     name="registration_deadline"
        //                     value={formData.registration_deadline}
        //                     onChange={handleChange}
        //                     required
        //                     className="form-control"
        //                 />
        //             </div>

        //             {/* ID Number */}
        //             <div className="col-md-6 form-group">
        //                 <label>ID Number</label>
        //                 <input
        //                     type="text"
        //                     name="id_number"
        //                     value={formData.id_number}
        //                     onChange={handleChange}
        //                     required
        //                     className="form-control"
        //                 />
        //             </div>
        //         </div>

        //         <div className="mt-4">
        //             <button type="submit" className="btn btn-primary">
        //                 Submit
        //             </button>
        //             <button
        //                 type="button"
        //                 onClick={handleCancel}
        //                 className="btn btn-secondary ml-2"
        //             >
        //                 Cancel
        //             </button>
        //         </div>
        //     </form>

        //     {error && <p className="text-danger">{error}</p>}
        //     {success && (
        //         <p className="text-success">Student added successfully!</p>
        //     )}
        // </div>
        <div className="content-body">
            <div className="container-fluid">
                <div className="row page-titles mx-0">
                    <div className="col-sm-6 p-md-0">
                        <div className="welcome-text">
                            <h4>Add New Student</h4>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">
                                    Student Information
                                </h4>
                            </div>

                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        {/* Full Name */}
                                        <div className="col-md-6 form-group">
                                            <label>Full Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="form-control"
                                            />
                                        </div>

                                        {/* Email */}
                                        <div className="col-md-6 form-group">
                                            <label>Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="form-control"
                                            />
                                        </div>

                                        {/* Password */}
                                        <div className="col-md-6 form-group">
                                            <label>Password</label>
                                            <input
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                                className="form-control"
                                            />
                                        </div>

                                        {/* Room ID */}
                                        <div className="col-md-6 form-group">
                                            <label>Room ID</label>
                                            <input
                                                type="text"
                                                name="room_id"
                                                value={formData.room_id}
                                                onChange={handleChange}
                                                required
                                                className="form-control"
                                            />
                                        </div>

                                        {/* Date of Birth */}
                                        <div className="col-md-6 form-group">
                                            <label>Date of Birth</label>
                                            <input
                                                type="date"
                                                name="dob"
                                                value={formData.dob}
                                                onChange={handleChange}
                                                required
                                                className="form-control"
                                            />
                                        </div>

                                        {/* Gender */}
                                        <div className="col-md-6 form-group">
                                            <label>Gender</label>
                                            <select
                                                name="gender"
                                                value={formData.gender}
                                                onChange={handleChange}
                                                required
                                                className="form-control"
                                            >
                                                <option value="Male">
                                                    Male
                                                </option>
                                                <option value="Female">
                                                    Female
                                                </option>
                                            </select>
                                        </div>

                                        {/* Phone */}
                                        <div className="col-md-6 form-group">
                                            <label>Phone</label>
                                            <input
                                                type="text"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                className="form-control"
                                            />
                                        </div>

                                        {/* Academic Information */}
                                        <div className="col-md-6 form-group">
                                            <label>Academic Information</label>
                                            <input
                                                type="text"
                                                name="academic_info"
                                                value={formData.academic_info}
                                                onChange={handleChange}
                                                required
                                                className="form-control"
                                            />
                                        </div>

                                        {/* Father's Name */}
                                        <div className="col-md-6 form-group">
                                            <label>Father's Name</label>
                                            <input
                                                type="text"
                                                name="f_name"
                                                value={formData.f_name}
                                                onChange={handleChange}
                                                required
                                                className="form-control"
                                            />
                                        </div>

                                        {/* Last Name */}
                                        <div className="col-md-6 form-group">
                                            <label>Last Name</label>
                                            <input
                                                type="text"
                                                name="last_name"
                                                value={formData.last_name}
                                                onChange={handleChange}
                                                required
                                                className="form-control"
                                            />
                                        </div>

                                        {/* From */}
                                        <div className="col-md-6 form-group">
                                            <label>From</label>
                                            <input
                                                type="text"
                                                name="from"
                                                value={formData.from}
                                                onChange={handleChange}
                                                required
                                                className="form-control"
                                            />
                                        </div>

                                        {/* Registration Date */}
                                        <div className="col-md-6 form-group">
                                            <label>Registration Date</label>
                                            <input
                                                type="date"
                                                name="registration_date"
                                                value={
                                                    formData.registration_date
                                                }
                                                onChange={handleChange}
                                                required
                                                className="form-control"
                                            />
                                        </div>

                                        {/* Registration Deadline */}
                                        <div className="col-md-6 form-group">
                                            <label>Registration Deadline</label>
                                            <input
                                                type="date"
                                                name="registration_deadline"
                                                value={
                                                    formData.registration_deadline
                                                }
                                                onChange={handleChange}
                                                required
                                                className="form-control"
                                            />
                                        </div>

                                        {/* ID Number */}
                                        <div className="col-md-6 form-group">
                                            <label>ID Number</label>
                                            <input
                                                type="text"
                                                name="id_number"
                                                value={formData.id_number}
                                                onChange={handleChange}
                                                required
                                                className="form-control"
                                            />
                                        </div>
                                    </div>

                                    {/* Buttons */}
                                    <div
                                        className="form-buttons"
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center", // Align buttons vertically
                                            gap: "10px", // Space between buttons
                                        }}
                                    >
                                        <button
                                            type="submit"
                                            className="btn btn-success"
                                        >
                                            Submit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleCancel}
                                            className="btn btn-secondary"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>

                                {/* Error or Success message */}
                                {error && (
                                    <p className="text-danger">{error}</p>
                                )}
                                {success && (
                                    <p className="text-success">
                                        Student added successfully!
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentForm;
