import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Import sort icons
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import React, { useEffect, useState } from "react";

import { SideBar } from "../dashboard/Dashboard";
import Swal from "sweetalert2";
import img1 from "../../assets/images/profile/education/mohammad.jpg";
import { useNavigate } from "react-router-dom";

function StudentTable() {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // State for search term
    const [sortCriteria, setSortCriteria] = useState("id"); // State for sorting criteria
    const [sortOrder, setSortOrder] = useState("asc"); // State for sorting order
    const navigate = useNavigate();

    const fetchStudents = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/users");
            const data = await response.json();
            const studentData = data.data.filter((user) => user.student);
            setStudents(studentData);
        } catch (error) {
            console.error("Error fetching student data:", error);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleEdit = (studentId) => {
        console.log("Edit student with ID:", studentId);
        navigate(`/editStudent/${studentId}`);
    };

    const handleDelete = (studentId) => {
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
                    const response = await fetch(
                        `http://127.0.0.1:8000/api/students/${studentId}`,
                        {
                            method: "DELETE",
                        }
                    );
                    if (response.ok) {
                        fetchStudents();
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

    // Search and Filter Logic
    const filteredStudents = students.filter((student) => {
        return (
            student.student?.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            student.student?.last_name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            student.student?.id.toString().includes(searchTerm)
        );
    });

    // Sorting Logic
    const handleSort = (criteria) => {
        if (sortCriteria === criteria) {
            setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
        } else {
            setSortCriteria(criteria);
            setSortOrder("asc");
        }
    };

    const sortedStudents = [...filteredStudents].sort((a, b) => {
        const aValue = a.student[sortCriteria];
        const bValue = b.student[sortCriteria];

        if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
        if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
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
                                <h4>All Students</h4>
                            </div>
                        </div>
                        <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex align-items-center">
                            <button
                                onClick={() =>
                                    navigate(
                                        "/dashboard/allStudents/addNewStudent"
                                    )
                                }
                                className="btn btn-success ml-auto"
                            >
                                Add New Student
                            </button>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">
                                        All Students List
                                    </h4>
                                </div>

                                <div className="card-body">
                                    <input
                                        type="text"
                                        placeholder="Search by name, last name or ID"
                                        className="form-control mb-4"
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                    />
                                    <div className="table-responsive">
                                        <table className="table table-bordered table-striped">
                                            <thead>
                                                <tr>
                                                    <th
                                                        className={`p-3 ${sortCriteria ===
                                                                "id"
                                                                ? "text-primary"
                                                                : ""
                                                            }`}
                                                        onClick={() =>
                                                            handleSort("id")
                                                        }
                                                        style={{
                                                            cursor: "pointer",
                                                        }} // Add cursor pointer
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
                                                    <th className="p-3">
                                                        Image
                                                    </th>
                                                    <th
                                                        className={`p-3 ${sortCriteria ===
                                                                "name"
                                                                ? "text-primary"
                                                                : ""
                                                            }`}
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
                                                        className={`p-3 ${sortCriteria ===
                                                                "last_name"
                                                                ? "text-primary"
                                                                : ""
                                                            }`}
                                                        onClick={() =>
                                                            handleSort(
                                                                "last_name"
                                                            )
                                                        }
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        Last Name{" "}
                                                        {sortCriteria ===
                                                            "last_name" &&
                                                            (sortOrder ===
                                                                "asc" ? (
                                                                <FaChevronUp />
                                                            ) : (
                                                                <FaChevronDown />
                                                            ))}
                                                    </th>
                                                    <th className="p-3">
                                                        Address
                                                    </th>
                                                    <th
                                                        className={`p-3 ${sortCriteria ===
                                                                "id_number"
                                                                ? "text-primary"
                                                                : ""
                                                            }`}
                                                        onClick={() =>
                                                            handleSort(
                                                                "id_number"
                                                            )
                                                        }
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        ID Number{" "}
                                                        {sortCriteria ===
                                                            "id_number" &&
                                                            (sortOrder ===
                                                                "asc" ? (
                                                                <FaChevronUp />
                                                            ) : (
                                                                <FaChevronDown />
                                                            ))}
                                                    </th>
                                                    <th
                                                        className={`p-3 ${sortCriteria ===
                                                                "academic_info"
                                                                ? "text-primary"
                                                                : ""
                                                            }`}
                                                        onClick={() =>
                                                            handleSort(
                                                                "academic_info"
                                                            )
                                                        }
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        Academic Info{" "}
                                                        {sortCriteria ===
                                                            "academic_info" &&
                                                            (sortOrder ===
                                                                "asc" ? (
                                                                <FaChevronUp />
                                                            ) : (
                                                                <FaChevronDown />
                                                            ))}
                                                    </th>
                                                    <th className="p-3">
                                                        Phone
                                                    </th>
                                                    <th
                                                        className={`p-3 ${sortCriteria ===
                                                                "created_at"
                                                                ? "text-primary"
                                                                : ""
                                                            }`}
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
                                                    <th
                                                        className={`p-3 ${sortCriteria ===
                                                                "registration_date"
                                                                ? "text-primary"
                                                                : ""
                                                            }`}
                                                        onClick={() =>
                                                            handleSort(
                                                                "registration_date"
                                                            )
                                                        }
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        Registration Date{" "}
                                                        {sortCriteria ===
                                                            "registration_date" &&
                                                            (sortOrder ===
                                                                "asc" ? (
                                                                <FaChevronUp />
                                                            ) : (
                                                                <FaChevronDown />
                                                            ))}
                                                    </th>
                                                    <th className="p-3">
                                                        Registration Deadline
                                                    </th>
                                                    <th className="p-3">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {sortedStudents.map(
                                                    (student, index) => (
                                                        <tr key={index}>
                                                            <td className="p-3">
                                                                {
                                                                    student
                                                                        .student
                                                                        ?.id
                                                                }
                                                            </td>
                                                            <td className="p-3">
                                                                <img
                                                                    className="rounded-circle"
                                                                    width="35"
                                                                    src={
                                                                        student
                                                                            .student
                                                                            ?.profile
                                                                            ? `http://127.0.0.1:8000/${student.student.profile}`
                                                                            : img1
                                                                    }
                                                                    alt="Profile"
                                                                />
                                                            </td>
                                                            <td className="p-3">
                                                                {
                                                                    student
                                                                        .student
                                                                        ?.name
                                                                }
                                                            </td>
                                                            <td className="p-3">
                                                                {
                                                                    student
                                                                        .student
                                                                        ?.last_name
                                                                }
                                                            </td>
                                                            <td className="p-3">
                                                                {
                                                                    student
                                                                        .student
                                                                        ?.from
                                                                }
                                                            </td>
                                                            <td className="p-3">
                                                                {
                                                                    student
                                                                        .student
                                                                        ?.id_number
                                                                }
                                                            </td>
                                                            <td className="p-3">
                                                                {
                                                                    student
                                                                        .student
                                                                        ?.academic_info
                                                                }
                                                            </td>
                                                            <td className="p-3">
                                                                {
                                                                    student
                                                                        .student
                                                                        ?.phone
                                                                }
                                                            </td>
                                                            <td className="p-3">
                                                                {
                                                                    student
                                                                        .student
                                                                        ?.created_at
                                                                }
                                                            </td>
                                                            <td className="p-3">
                                                                {
                                                                    student
                                                                        .student
                                                                        ?.registration_date
                                                                }
                                                            </td>
                                                            <td className="p-3">
                                                                {student.student
                                                                    ?.registration_deadline ||
                                                                    "N/A"}
                                                            </td>
                                                            <td className="p-3">
                                                                <div className="d-flex">
                                                                    {/* <button
                                                                        onClick={() =>
                                                                            handleEdit(
                                                                                student
                                                                                    .student
                                                                                    ?.id
                                                                            )
                                                                        }
                                                                        className="btn btn-primary shadow btn-xs sharp me-2"
                                                                    >
                                                                        <i className="fa fa-pencil-alt"></i>
                                                                    </button>
                                                                    <button
                                                                        onClick={() =>
                                                                            handleDelete(
                                                                                student
                                                                                    .student
                                                                                    ?.id
                                                                            )
                                                                        }
                                                                        className="btn btn-danger shadow btn-xs sharp"
                                                                    >
                                                                        <i className="fa fa-trash"></i>
                                                                    </button> */}
                                                                                                                                <button
                                                                      onClick={() => handleEdit(complaint.id)}
                                                                      className="btn btn-primary shadow btn-xs sharp me-1"
                                                                    >
                                                                      <FaPencilAlt /> {/* Replace the pencil icon */}
                                                                    </button>
                                                                    <button
                                                                      onClick={() => handleDelete(complaint.id)}
                                                                      className="btn btn-danger shadow btn-xs sharp"
                                                                    >
                                                                      <FaTrash /> {/* Replace the trash icon */}
                                                                    </button>
                                                                </div>
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

export default StudentTable;
