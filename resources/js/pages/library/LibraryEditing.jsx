import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Swal from "sweetalert2";
import axios from "axios";

function LibraryEditing() {
    const [library, setLibrary] = useState({
        name: "",
        location: "",
        contact_info: "",
    });
    const [loading, setLoading] = useState(false);
    const { libraryId } = useParams(); // Get the libraryId from the URL
    const navigate = useNavigate();

    // Fetch library details when the component mounts
    useEffect(() => {
        const fetchLibraryDetails = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/libraries/${libraryId}`
                );
                setLibrary(response.data.data); // Set library data in state
            } catch (error) {
                console.error("Error fetching library details:", error);
            }
        };
        fetchLibraryDetails();
    }, [libraryId]);

    // Handle form submission for editing the library
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/api/libraries/${libraryId}`,
                library
            );
            if (response.status === 200) {
                Swal.fire("Success", "Library updated successfully", "success");
                navigate("/dashboard/library"); // Navigate back to the libraries list
            }
        } catch (error) {
            Swal.fire("Error", "There was an issue updating the library", "error");
            console.error("Error updating library:", error);
        } finally {
            setLoading(false);
        }
    };

    // Handle input changes in the form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLibrary((prevLibrary) => ({
            ...prevLibrary,
            [name]: value,
        }));
    };

    return (
        <div className="content-body">
            <div className="container-fluid">
                <div className="row page-titles mx-0">
                    <div className="col-sm-6 p-md-0">
                        <div className="welcome-text">
                            <h4>Edit Library</h4>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Edit Library Details</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label>Library Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={library.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Location</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="location"
                                            value={library.location}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Contact Info</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="contact_info"
                                            value={library.contact_info}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={loading}
                                    >
                                        {loading ? "Updating..." : "Update Library"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LibraryEditing;
