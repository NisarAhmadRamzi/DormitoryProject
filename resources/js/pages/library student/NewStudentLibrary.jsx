import React, { useState } from "react";

import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NewStudentLibrary() {
    const [student, setStudent] = useState({
        library_id: "",
        name: "",
        last_name: "",
        email: "",
        address: "",
        phone: "",
        gender: "", // Ensure this is not empty
        password: "", // Added password field
        membership_status: "Active", // Default value for membership status
        registration_date: "",
        registration_deadline: "",
    });
    const navigate = useNavigate();

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStudent({
            ...student,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure gender and password are provided
        if (!student.gender) {
            Swal.fire("Error", "Gender is required", "error");
            return;
        }

        if (!student.password) {
            Swal.fire("Error", "Password is required", "error");
            return;
        }

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/library-students",
                student
            );

            if (response.status === 201) {
                Swal.fire(
                    "Student Added!",
                    "The student has been added successfully.",
                    "success"
                );
                navigate(-1); // Go back to the previous route
            }
        } catch (error) {
            if (error.response) {
                console.error("Validation error:", error.response.data); // API validation errors
            }
            Swal.fire(
                "Error",
                "Something went wrong while adding the student.",
                "error"
            );
            console.error("Error adding student:", error);
        }
    };

    // Handle cancel
    const handleCancel = () => {
        navigate(-1); // Go back to the previous route
    };

    return (
        <>
            <div className="content-body">
                <div className="container-fluid">
                    <div className="row page-titles mx-0">
                        <div className="col-sm-6 p-md-0">
                            <div className="welcome-text">
                                <h4>Add New Student to Library</h4>
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
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="library_id">
                                                        Library ID
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="library_id"
                                                        name="library_id"
                                                        className="form-control"
                                                        value={student.library_id}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="name">
                                                        First Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        className="form-control"
                                                        value={student.name}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="email">
                                                        Email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        className="form-control"
                                                        value={student.email}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="phone">
                                                        Phone
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="phone"
                                                        name="phone"
                                                        className="form-control"
                                                        value={student.phone}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="password">
                                                        Password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        id="password"
                                                        name="password"
                                                        className="form-control"
                                                        value={student.password}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="last_name">
                                                        Last Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="last_name"
                                                        name="last_name"
                                                        className="form-control"
                                                        value={student.last_name}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="address">
                                                        Address
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="address"
                                                        name="address"
                                                        className="form-control"
                                                        value={student.address}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="gender">
                                                        Gender
                                                    </label>
                                                    <select
                                                        id="gender"
                                                        name="gender"
                                                        className="form-control"
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
                                                    <label htmlFor="membership_status">
                                                        Membership Status
                                                    </label>
                                                    <select
                                                        id="membership_status"
                                                        name="membership_status"
                                                        className="form-control"
                                                        value={student.membership_status}
                                                        onChange={handleInputChange}
                                                        required
                                                    >
                                                        <option value="Active">Active</option>
                                                        <option value="Inactive">Inactive</option>
                                                    </select>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="registration_date">
                                                        Registration Date
                                                    </label>
                                                    <input
                                                        type="date"
                                                        id="registration_date"
                                                        name="registration_date"
                                                        className="form-control"
                                                        value={student.registration_date}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="registration_deadline">
                                                        Registration Deadline
                                                    </label>
                                                    <input
                                                        type="date"
                                                        id="registration_deadline"
                                                        name="registration_deadline"
                                                        className="form-control"
                                                        value={student.registration_deadline}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            className="form-buttons"
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center", // Align both buttons vertically
                                                gap: "10px", // Space between buttons
                                            }}
                                        >
                                            <button
                                                type="submit"
                                                className="btn btn-success"
                                            >
                                                Add Student
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
        </>
    );
}

export default NewStudentLibrary;
