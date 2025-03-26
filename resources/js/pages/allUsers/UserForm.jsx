import React, { useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import { SideBar } from "../dashboard/Dashboard";

function UserForm() {
    const navigate = useNavigate(); // Initialize navigate hook

    // State to hold the form data
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        idNumber: "",
        academicInfo: "",
        phone: "",
        address: "",
        email: "", // Add email field
        password: "", // Add password field
        cpassword: "", // Add cpassword field
        roleId: 3, // Default role_id for student
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

        // Prepare student data to be sent
        const studentData = {
            name: formData.firstName + " " + formData.lastName, // Combine first name and last name
            email: formData.email, // Email field
            password: formData.password, // Password field
            cpassword: formData.cpassword, // Confirm password field
            id_number: formData.idNumber,
            academic_info: formData.academicInfo,
            phone: formData.phone,
            address: formData.address, // Add address if your API supports it
            role_id: formData.roleId, // Include role_id field
        };

        try {
            const response = await fetch("http://127.0.0.1:8000/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(studentData),
            });

            // Check if the response is valid JSON
            if (response.ok) {
                const data = await response.json();
                setSuccess(true); // Success handling
                Swal.fire({
                    icon: "success",
                    title: "User Added!",
                    text: "The new user has been successfully added.",
                    confirmButtonText: "OK",
                });
                console.log("Student added:", data);
            } else {
                // If response is not OK, handle error
                const errorData = await response.json(); // Attempt to parse error message from JSON
                throw new Error(errorData.message || "Error adding student");
            }
        } catch (error) {
            setError(error.message); // Error handling
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message,
                confirmButtonText: "Try Again",
            });
            console.error("Error adding student:", error);
        }
    };

    // Handle cancel action (reset form)
    const handleCancel = () => {
        setFormData({
            firstName: "",
            lastName: "",
            idNumber: "",
            academicInfo: "",
            phone: "",
            address: "",
            email: "",
            password: "",
            cpassword: "",
            roleId: 3,
        });
        setError(null);
        setSuccess(false);
    };

    // Handle back button click to go to the previous route
    const handleBack = () => {
        navigate(-1); // This will take the user back to the previous page
    };

    return (
        <>
            <SideBar />
            <div className="content-body">
                {/* row */}
                <div className="container-fluid">
                    <div className="row page-titles mx-0">
                        <div className="col-sm-6 p-md-0">
                            <div className="welcome-text">
                                <h4>Add New Student</h4>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xl-12 col-xxl-12 col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title">Basic Info</h5>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        First Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="firstName"
                                                        value={
                                                            formData.firstName
                                                        }
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            {/* <div className="col-lg-6 col-md-6 col-sm-12">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Last Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="lastName"
                                                        value={
                                                            formData.lastName
                                                        }
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                            </div> */}
                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        ID Number
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="idNumber"
                                                        value={
                                                            formData.idNumber
                                                        }
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Academic Information
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="academicInfo"
                                                        value={
                                                            formData.academicInfo
                                                        }
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Phone
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Address
                                                    </label>
                                                    <textarea
                                                        className="form-control"
                                                        rows="5"
                                                        name="address"
                                                        value={formData.address}
                                                        onChange={handleChange}
                                                        required
                                                    ></textarea>
                                                </div>
                                            </div>
                                            {/* Add Email, Password, and Confirm Password fields */}
                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        name="password"
                                                        value={
                                                            formData.password
                                                        }
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Confirm Password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        name="cpassword"
                                                        value={
                                                            formData.cpassword
                                                        }
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            {/* Add Role Selection Dropdown */}
                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Role
                                                    </label>
                                                    <select
                                                        className="form-control"
                                                        name="roleId"
                                                        value={formData.roleId}
                                                        onChange={handleChange}
                                                        required
                                                    >
                                                        <option value="1">
                                                            Admin
                                                        </option>
                                                        <option value="2">
                                                            Second Admin
                                                        </option>
                                                        <option value="3">
                                                            Student
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-lg-12 col-md-12 col-sm-12">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary"
                                                >
                                                    Submit
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={handleCancel}
                                                    className="btn btn-light"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={handleBack}
                                                    className="btn btn-secondary ml-2"
                                                >
                                                    Back
                                                </button>
                                            </div>
                                        </div>
                                    </form>
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
        </>
    );
}

export default UserForm;
