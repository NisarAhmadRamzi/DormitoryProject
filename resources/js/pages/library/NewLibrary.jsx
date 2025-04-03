import "./AddLibrary.css";

import React, { useState } from "react";

import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NewLibrary() {
    const [library, setLibrary] = useState({
        name: "",
        location: "",
        contact_info: "",
    });
    const navigate = useNavigate();

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLibrary({
            ...library,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/libraries",
                library
            );

            if (response.status === 201) {
                Swal.fire(
                    "Library Added!",
                    "The library has been added successfully.",
                    "success"
                );
                navigate("/dashboard/library"); // Redirect to the Libraries List page
            }
        } catch (error) {
            if (error.response) {
                console.error("Validation error:", error.response.data); // API validation errors
            }
            Swal.fire(
                "Error",
                "Something went wrong while adding the library.",
                "error"
            );
            console.error("Error adding library:", error);
        }
    };
    return (
        <>
            <div className="content-body">
                <div className="container-fluid">
                    <div className="row page-titles mx-0">
                        <div className="col-sm-6 p-md-0">
                            <div className="welcome-text">
                                <h4>Add New Library</h4>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">
                                        Library Information
                                    </h4>
                                </div>

                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="name">
                                                        Library Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        className="form-control"
                                                        value={library.name}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="location">
                                                        Location
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="location"
                                                        name="location"
                                                        className="form-control"
                                                        value={library.location}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="contact_info">
                                                        Contact Info
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="contact_info"
                                                        name="contact_info"
                                                        className="form-control"
                                                        value={library.contact_info}
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
                                                Add Library
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

export default NewLibrary;

