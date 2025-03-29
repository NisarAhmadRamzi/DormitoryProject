import { FaChevronDown, FaChevronUp, FaPencilAlt, FaTrash } from "react-icons/fa"; // For sorting and action icons
import React, { useEffect, useState } from "react";

import Swal from "sweetalert2";
import axios from "axios";
import img1 from "../../assets/images/profile/education/mohammad.jpg"; // Default profile image
import { useNavigate } from "react-router-dom";

function AllComplaints() {
    const [complaints, setComplaints] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // For search
    const [sortCriteria, setSortCriteria] = useState("id"); // Default sort by ID
    const [sortOrder, setSortOrder] = useState("asc"); // Default sort order
    const navigate = useNavigate();

    // Fetch complaints from the API
    const fetchComplaints = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/complaints"
            );
            setComplaints(response.data.data); // Store the complaint data in state
        } catch (error) {
            console.error("Error fetching complaint data:", error);
        }
    };

    useEffect(() => {
        fetchComplaints(); // Fetch complaints when the component is mounted
    }, []);

    // Handle editing a complaint - redirect to the Edit page
    const handleEdit = (complaintId) => {
        console.log("Edit complaint with ID:", complaintId);
        navigate(`/dashboard/editComplaints/${complaintId}`);
    };

    // Handle deleting a complaint with confirmation
    const handleDelete = (complaintId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(
                        `http://127.0.0.1:8000/api/complaints/${complaintId}`
                    );
                    if (response.status === 200) {
                        fetchComplaints(); // Re-fetch the complaints to update the UI
                        Swal.fire(
                            "Deleted!",
                            "The complaint has been deleted.",
                            "success"
                        );
                    } else {
                        Swal.fire(
                            "Failed",
                            "There was an issue deleting the complaint.",
                            "error"
                        );
                    }
                } catch (error) {
                    Swal.fire("Error", "Something went wrong!", "error");
                    console.error("Error deleting complaint:", error);
                }
            }
        });
    };

    // Handle sorting
    const handleSort = (criteria) => {
        if (sortCriteria === criteria) {
            setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
        } else {
            setSortCriteria(criteria);
            setSortOrder("asc");
        }
    };

    // Sorting complaints based on selected criteria and order
    const sortedComplaints = [...complaints].sort((a, b) => {
        const aValue = a[sortCriteria];
        const bValue = b[sortCriteria];

        if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
        if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
        return 0;
    });

    // Filter complaints based on the search term
    const filteredComplaints = sortedComplaints.filter((complaint) => {
        return (
            complaint.id.toString().includes(searchTerm.toLowerCase()) ||
            complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            complaint.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );
    });

    return (
        <>
            <div className="content-body">
                <div className="container-fluid">
                    <div className="row page-titles mx-0">
                        <div className="col-sm-6 p-md-0">
                            <div className="welcome-text">
                                <h4>Complaints List</h4>
                            </div>
                        </div>
                        <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex align-items-center">
                            <button
                                onClick={() =>
                                    navigate("/dashboard/addComplaints")
                                }
                                className="btn btn-success ml-auto"
                            >
                                Add New Complaint
                            </button>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">
                                        Complaints List
                                    </h4>
                                </div>

                                <div className="card-body">
                                    <input
                                        type="text"
                                        placeholder="Search by ID, Title, or Description"
                                        className="form-control mb-4"
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                    />
                                    <div className="table-responsive">
                                        <table
                                            id="complaintsTable"
                                            className="table table-striped table-bordered"
                                            style={{ width: "100%" }}
                                        >
                                            <thead>
                                                <tr>
                                                    <th
                                                        onClick={() =>
                                                            handleSort("id")
                                                        }
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        ID{" "}
                                                        {sortCriteria ===
                                                            "id" &&
                                                            (sortOrder ===
                                                            "asc" ? (
                                                                <FaChevronUp />
                                                            ) : (
                                                                <FaChevronDown />
                                                            ))}
                                                    </th>
                                                    <th>Image</th>
                                                    <th
                                                        onClick={() =>
                                                            handleSort("name")
                                                        }
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        Name{" "}
                                                        {sortCriteria ===
                                                            "name" &&
                                                            (sortOrder ===
                                                            "asc" ? (
                                                                <FaChevronUp />
                                                            ) : (
                                                                <FaChevronDown />
                                                            ))}
                                                    </th>
                                                    <th
                                                        onClick={() =>
                                                            handleSort("email")
                                                        }
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        Email{" "}
                                                        {sortCriteria ===
                                                            "email" &&
                                                            (sortOrder ===
                                                            "asc" ? (
                                                                <FaChevronUp />
                                                            ) : (
                                                                <FaChevronDown />
                                                            ))}
                                                    </th>
                                                    <th
                                                        onClick={() =>
                                                            handleSort("title")
                                                        }
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        Title{" "}
                                                        {sortCriteria ===
                                                            "title" &&
                                                            (sortOrder ===
                                                            "asc" ? (
                                                                <FaChevronUp />
                                                            ) : (
                                                                <FaChevronDown />
                                                            ))}
                                                    </th>
                                                    <th
                                                        onClick={() =>
                                                            handleSort(
                                                                "description"
                                                            )
                                                        }
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        Description{" "}
                                                        {sortCriteria ===
                                                            "description" &&
                                                            (sortOrder ===
                                                            "asc" ? (
                                                                <FaChevronUp />
                                                            ) : (
                                                                <FaChevronDown />
                                                            ))}
                                                    </th>
                                                    <th>Status</th>
                                                    <th
                                                        onClick={() =>
                                                            handleSort(
                                                                "created_at"
                                                            )
                                                        }
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        Created At{" "}
                                                        {sortCriteria ===
                                                            "created_at" &&
                                                            (sortOrder ===
                                                            "asc" ? (
                                                                <FaChevronUp />
                                                            ) : (
                                                                <FaChevronDown />
                                                            ))}
                                                    </th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredComplaints.map(
                                                    (complaint) => (
                                                        <tr key={complaint.id}>
                                                            <td>
                                                                {complaint.id}
                                                            </td>
                                                            <td>
                                                                <img
                                                                    className="rounded-circle"
                                                                    width="35"
                                                                    src={
                                                                        complaint
                                                                            .student
                                                                            .profile
                                                                            ? `http://127.0.0.1:8000/${complaint.student.profile}`
                                                                            : img1
                                                                    }
                                                                    alt="Student Profile"
                                                                />
                                                            </td>
                                                            <td>
                                                                {
                                                                    complaint
                                                                        .student
                                                                        .name
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    complaint
                                                                        .student
                                                                        .email
                                                                }
                                                            </td>
                                                            <td>
                                                                {complaint.title}
                                                            </td>
                                                            <td>
                                                                {complaint.description}
                                                            </td>
                                                            <td>
                                                                {complaint.status}
                                                            </td>
                                                            <td>
                                                                {
                                                                    complaint.created_at
                                                                }
                                                            </td>
                                                            <td>
                                                                <button
                                                                  onClick={() => handleEdit(complaint.id)}
                                                                  className="btn btn-primary shadow btn-xs sharp me-1"
                                                                >
                                                                  <FaPencilAlt />
                                                                </button>
                                                                <button
                                                                  onClick={() => handleDelete(complaint.id)}
                                                                  className="btn btn-danger shadow btn-xs sharp"
                                                                >
                                                                  <FaTrash />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AllComplaints;
