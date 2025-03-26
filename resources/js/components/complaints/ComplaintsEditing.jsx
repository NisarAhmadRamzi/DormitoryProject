import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
// import { SideBar } from "../../pages/dashboard/Dashboard";
import { Form } from "react-bootstrap";

function ComplaintsEditing() {
    const { complaintId } = useParams(); // Get the complaint ID from the URL
    const [complaint, setComplaint] = useState({});
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "Pending",
    });
    console.log(formData);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchComplaint = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/complaints/${complaintId}`
                );
                console.log("Fetched complaint data:", response.data); // Check API response

                if (response.data && response.data.data) {
                    const complaintData = response.data.data;

                    setComplaint(complaintData); // Set the fetched complaint data
                    setFormData({
                        title: complaintData.title || "", // Ensure title is set
                        description: complaintData.description || "", // Ensure description is set
                        status: complaintData.status || "Pending", // Ensure status is set
                    });
                }
            } catch (error) {
                console.error("Error fetching complaint:", error);
            }
        };
        fetchComplaint();
    }, [complaintId]);

    // Handle input change for form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        console.log(formData);
        e.preventDefault();

        try {
            // Make sure we are sending the full form data (title, description, status)
            const response = await axios.put(
                `http://127.0.0.1:8000/api/complaints/${complaintId}`,
                formData
            );

            if (response.status === 200) {
                Swal.fire({
                    title: "Updated!",
                    text: "Complaint has been updated successfully.",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    navigate("/dashboard/complaints");
                });
            }
        } catch (error) {
            Swal.fire(
                "Error",
                "There was an issue updating the complaint.",
                "error"
            );
            console.error("Error updating complaint:", error);
        }
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
                                <h4>Edit Complaint</h4>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xl-12 col-xxl-12 col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title">
                                        Complaint Info
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
                                                        rows={3}
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
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-primary mt-3"
                                        >
                                            Update Complaint
                                        </button>
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

export default ComplaintsEditing;
