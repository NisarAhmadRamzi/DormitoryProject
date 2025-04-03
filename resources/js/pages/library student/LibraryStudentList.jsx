import { FaArrowDown, FaArrowUp, FaPencilAlt, FaTrash } from "react-icons/fa";
import React, { useEffect, useState } from "react";

import { SideBar } from "../../pages/dashboard/Dashboard";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LibraryStudentList() {
    const [libraryStudents, setLibraryStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // State for search term
    const [sortCriteria, setSortCriteria] = useState("id"); // Default sorting by ID
    const [sortOrder, setSortOrder] = useState("asc"); // Default ascending order
    const navigate = useNavigate();

    // Fetch library students from the API
    const fetchLibraryStudents = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/library-students");
            setLibraryStudents(response.data.data); // Store library student data
        } catch (error) {
            console.error("Error fetching library student data:", error);
        }
    };

    useEffect(() => {
        fetchLibraryStudents();
    }, []);

    // Handle deleting a library student
    const handleDelete = (studentId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action will permanently delete the student!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(
                        `http://127.0.0.1:8000/api/library-students/${studentId}`
                    );
                    if (response.status === 200) {
                        setLibraryStudents((prevStudents) =>
                            prevStudents.filter((student) => student.id !== studentId)
                        );
                        Swal.fire(
                            "Deleted!",
                            "The student has been deleted.",
                            "success"
                        );
                    } else {
                        Swal.fire(
                            "Failed",
                            "There was an issue deleting the student.",
                            "error"
                        );
                    }
                } catch (error) {
                    Swal.fire("Error", "Something went wrong!", "error");
                    console.error("Error deleting student:", error);
                }
            }
        });
    };

    // Handle sorting for each column
    const handleSort = (criteria) => {
        if (sortCriteria === criteria) {
            // Toggle the sort order if the same column is clicked
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            // Set the new criteria and default to ascending order
            setSortCriteria(criteria);
            setSortOrder("asc");
        }
    };

    // Filter library students based on search term
    const filteredStudents = libraryStudents.filter(
        (student) =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.gender.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort the filtered students based on the selected criteria and order
    const sortedStudents = [...filteredStudents].sort((a, b) => {
        if (
            sortCriteria === "id" ||
            sortCriteria === "library_id"
        ) {
            return sortOrder === "asc"
                ? a[sortCriteria] - b[sortCriteria]
                : b[sortCriteria] - a[sortCriteria];
        } else if (
            sortCriteria === "name" ||
            sortCriteria === "last_name" ||
            sortCriteria === "email" ||
            sortCriteria === "address" ||
            sortCriteria === "phone" ||
            sortCriteria === "gender" ||
            sortCriteria === "membership_status" ||
            sortCriteria === "registration_date" ||
            sortCriteria === "registration_deadline"
        ) {
            return sortOrder === "asc"
                ? a[sortCriteria].localeCompare(b[sortCriteria])
                : b[sortCriteria].localeCompare(a[sortCriteria]);
        }
        return 0;
    });

    return (
        <>
            <SideBar />
            <div className="content-body">
                <div className="container-fluid">
                    <div className="row page-titles mx-0">
                        <div className="col-sm-6 p-md-0">
                            <div className="welcome-text">
                                <h4>Library Students List</h4>
                            </div>
                        </div>
                        <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex align-items-center">
                            <button
                                onClick={() => navigate("/dashboard/libraryStudent/addLibraryStudent")}
                                className="btn btn-success ml-auto"
                            >
                                Add New Student
                            </button>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-header"></div>

                                <div className="card-body">
                                    {/* Search input */}
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search by Name, Email, or Gender"
                                            value={searchTerm}
                                            onChange={(e) =>
                                                setSearchTerm(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="table-responsive">
                                        <table
                                            id="libraryStudentsTable"
                                            className="table table-striped table-bordered"
                                            style={{ width: "100%" }}
                                        >
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <button
                                                            className="btn btn-link text-decoration-none"
                                                            onClick={() =>
                                                                handleSort("id")
                                                            }
                                                        >
                                                            ID
                                                            {sortCriteria ===
                                                                "id" &&
                                                                (sortOrder ===
                                                                "asc" ? (
                                                                    <FaArrowUp />
                                                                ) : (
                                                                    <FaArrowDown />
                                                                ))}
                                                        </button>
                                                    </th>
                                                    <th>
                                                        <button
                                                            className="btn btn-link text-decoration-none"
                                                            onClick={() =>
                                                                handleSort("library_id")
                                                            }
                                                        >
                                                            Library ID
                                                            {sortCriteria ===
                                                                "library_id" &&
                                                                (sortOrder ===
                                                                "asc" ? (
                                                                    <FaArrowUp />
                                                                ) : (
                                                                    <FaArrowDown />
                                                                ))}
                                                        </button>
                                                    </th>
                                                    <th>
                                                        <button
                                                            className="btn btn-link text-decoration-none"
                                                            onClick={() =>
                                                                handleSort("name")
                                                            }
                                                        >
                                                            Name
                                                            {sortCriteria ===
                                                                "name" &&
                                                                (sortOrder ===
                                                                "asc" ? (
                                                                    <FaArrowUp />
                                                                ) : (
                                                                    <FaArrowDown />
                                                                ))}
                                                        </button>
                                                    </th>
                                                    <th>
                                                        <button
                                                            className="btn btn-link text-decoration-none"
                                                            onClick={() =>
                                                                handleSort("last_name")
                                                            }
                                                        >
                                                            Last Name
                                                            {sortCriteria ===
                                                                "last_name" &&
                                                                (sortOrder ===
                                                                "asc" ? (
                                                                    <FaArrowUp />
                                                                ) : (
                                                                    <FaArrowDown />
                                                                ))}
                                                        </button>
                                                    </th>
                                                    <th>
                                                        <button
                                                            className="btn btn-link text-decoration-none"
                                                            onClick={() =>
                                                                handleSort("email")
                                                            }
                                                        >
                                                            Email
                                                            {sortCriteria ===
                                                                "email" &&
                                                                (sortOrder ===
                                                                "asc" ? (
                                                                    <FaArrowUp />
                                                                ) : (
                                                                    <FaArrowDown />
                                                                ))}
                                                        </button>
                                                    </th>
                                                    <th>
                                                        <button
                                                            className="btn btn-link text-decoration-none"
                                                            onClick={() =>
                                                                handleSort("address")
                                                            }
                                                        >
                                                            Address
                                                            {sortCriteria ===
                                                                "address" &&
                                                                (sortOrder ===
                                                                "asc" ? (
                                                                    <FaArrowUp />
                                                                ) : (
                                                                    <FaArrowDown />
                                                                ))}
                                                        </button>
                                                    </th>
                                                    <th>
                                                        <button
                                                            className="btn btn-link text-decoration-none"
                                                            onClick={() =>
                                                                handleSort("phone")
                                                            }
                                                        >
                                                            Phone
                                                            {sortCriteria ===
                                                                "phone" &&
                                                                (sortOrder ===
                                                                "asc" ? (
                                                                    <FaArrowUp />
                                                                ) : (
                                                                    <FaArrowDown />
                                                                ))}
                                                        </button>
                                                    </th>
                                                    <th>
                                                        <button
                                                            className="btn btn-link text-decoration-none"
                                                            onClick={() =>
                                                                handleSort("gender")
                                                            }
                                                        >
                                                            Gender
                                                            {sortCriteria ===
                                                                "gender" &&
                                                                (sortOrder ===
                                                                "asc" ? (
                                                                    <FaArrowUp />
                                                                ) : (
                                                                    <FaArrowDown />
                                                                ))}
                                                        </button>
                                                    </th>
                                                    <th>
                                                        <button
                                                            className="btn btn-link text-decoration-none"
                                                            onClick={() =>
                                                                handleSort("membership_status")
                                                            }
                                                        >
                                                            Membership Status
                                                            {sortCriteria ===
                                                                "membership_status" &&
                                                                (sortOrder ===
                                                                "asc" ? (
                                                                    <FaArrowUp />
                                                                ) : (
                                                                    <FaArrowDown />
                                                                ))}
                                                        </button>
                                                    </th>
                                                    <th>
                                                        <button
                                                            className="btn btn-link text-decoration-none"
                                                            onClick={() =>
                                                                handleSort("registration_date")
                                                            }
                                                        >
                                                            Registration Date
                                                            {sortCriteria ===
                                                                "registration_date" &&
                                                                (sortOrder ===
                                                                "asc" ? (
                                                                    <FaArrowUp />
                                                                ) : (
                                                                    <FaArrowDown />
                                                                ))}
                                                        </button>
                                                    </th>
                                                    <th>
                                                        <button
                                                            className="btn btn-link text-decoration-none"
                                                            onClick={() =>
                                                                handleSort("registration_deadline")
                                                            }
                                                        >
                                                            Registration Deadline
                                                            {sortCriteria ===
                                                                "registration_deadline" &&
                                                                (sortOrder ===
                                                                "asc" ? (
                                                                    <FaArrowUp />
                                                                ) : (
                                                                    <FaArrowDown />
                                                                ))}
                                                        </button>
                                                    </th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {sortedStudents.map((student) => (
                                                    <tr key={student.id}>
                                                        <td>{student.id}</td>
                                                        <td>{student.library_id}</td>
                                                        <td>{student.name}</td>
                                                        <td>{student.last_name}</td>
                                                        <td>{student.email}</td>
                                                        <td>{student.address}</td>
                                                        <td>{student.phone}</td>
                                                        <td>{student.gender}</td>
                                                        <td>{student.membership_status}</td>
                                                        <td>{student.registration_date}</td>
                                                        <td>{student.registration_deadline}</td>
                                                        <td>
                                                            <button
                                                                onClick={() =>
                                                                    navigate(
                                                                        `/dashboard/libraryStudent/${student.id}`
                                                                    )
                                                                }
                                                                className="btn btn-primary shadow btn-xs sharp me-1"
                                                            >
                                                                <FaPencilAlt />
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        student.id
                                                                    )
                                                                }
                                                                className="my-2 btn btn-danger shadow btn-xs sharp"
                                                            >
                                                                <FaTrash />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
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

export default LibraryStudentList;