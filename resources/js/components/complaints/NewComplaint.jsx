import React, { useState } from "react";
import axios from "axios";
// import { SideBar } from "../../pages/dashboard/Dashboard";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2

function NewComplaint() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        student_name: "",
        student_email: "",
        status: "Pending", // Default status
    });

    const navigate = useNavigate();

    // Handle input change for the form fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/complaints",
                formData
            );

            if (response.status === 201) {
                // Show SweetAlert2 success message
                Swal.fire({
                    title: "Complaint Submitted!",
                    text: "Your complaint has been successfully submitted.",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    // After closing the alert, navigate to the complaints list
                    navigate("/dashboard/complaints");
                });
            }
        } catch (error) {
            console.error("Error adding complaint:", error);
            Swal.fire(
                "Error",
                "There was an issue submitting your complaint.",
                "error"
            );
        }
    };

    // Handle Cancel button (reset form)
    const handleCancel = () => {
        setFormData({
            title: "",
            description: "",
            student_name: "",
            student_email: "",
            status: "Pending",
        });
    };

    // Handle Back button
    const handleBack = () => {
        navigate("/dashboard/complaints");
    };

    return (
        <>
            {/* <Header /> */}
            {/* <SideBar /> */}
            <div className="content-body">
                <div className="container-fluid">
                    <div className="row page-titles mx-0">
                        <div className="col-sm-6 p-md-0">
                            <div className="welcome-text">
                                <h4>Add Complaint</h4>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xl-12 col-xxl-12 col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title">
                                        Complaint Details
                                    </h5>
                                </div>
                                <div className="card-body">
                                    <Form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                <Form.Group
                                                    controlId="title"
                                                    className="form-group"
                                                >
                                                    <Form.Label className="form-label">
                                                        Title
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="title"
                                                        value={formData.title}
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        required
                                                    />
                                                </Form.Group>
                                            </div>

                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                <Form.Group
                                                    controlId="description"
                                                    className="form-group"
                                                >
                                                    <Form.Label className="form-label">
                                                        Description
                                                    </Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows="5"
                                                        name="description"
                                                        value={
                                                            formData.description
                                                        }
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        required
                                                    />
                                                </Form.Group>
                                            </div>

                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                <Form.Group
                                                    controlId="student_name"
                                                    className="form-group"
                                                >
                                                    <Form.Label className="form-label">
                                                        Student Name
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="student_name"
                                                        value={
                                                            formData.student_name
                                                        }
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        required
                                                    />
                                                </Form.Group>
                                            </div>

                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                <Form.Group
                                                    controlId="student_email"
                                                    className="form-group"
                                                >
                                                    <Form.Label className="form-label">
                                                        Student Email
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        name="student_email"
                                                        value={
                                                            formData.student_email
                                                        }
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        required
                                                    />
                                                </Form.Group>
                                            </div>

                                            <div className="col-lg-12 col-md-12 col-sm-12">
                                                <Form.Group
                                                    controlId="status"
                                                    className="form-group"
                                                >
                                                    <Form.Label className="form-label">
                                                        Status
                                                    </Form.Label>
                                                    <Form.Control
                                                        as="select"
                                                        name="status"
                                                        value={formData.status}
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        required
                                                    >
                                                        <option value="Pending">
                                                            Pending
                                                        </option>
                                                        <option value="Resolved">
                                                            Resolved
                                                        </option>
                                                        <option value="In Progress">
                                                            In Progress
                                                        </option>
                                                    </Form.Control>
                                                </Form.Group>
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
                                                    className="btn btn-light"
                                                    onClick={handleCancel}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary ml-2"
                                                    onClick={handleBack}
                                                >
                                                    Back
                                                </button>
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewComplaint;
