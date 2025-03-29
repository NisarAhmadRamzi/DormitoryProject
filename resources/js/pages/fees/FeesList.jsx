import { FaArrowDown, FaArrowUp, FaPencilAlt, FaTrash } from "react-icons/fa"; // Importing icons for sorting, edit, and delete
import React, { useEffect, useState } from "react";

import { SideBar } from "../dashboard/Dashboard";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FeesList() {
    const [fees, setFees] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // State for search term
    const [sortCriteria, setSortCriteria] = useState("id"); // Default sorting by ID
    const [sortOrder, setSortOrder] = useState("asc"); // Default ascending order
    const navigate = useNavigate();

    // Fetch fees from the API
    // const fetchFees = async () => {
    //     try {
    //         const response = await axios.get("http://127.0.0.1:8000/api/fees");
    //         setFees(response.data.data); // Store fee data
    //     } catch (error) {
    //         console.error("Error fetching fee data:", error);
    //     }
    // };
    const fetchFees = async () => {
    try {
        const response = await axios.get("http://127.0.0.1:8000/api/fees");
        setFees(response.data.data); // Store fee data
        console.log(response.data.data);
        
    } catch (error) {
        console.error("Error fetching fee data:", error);
        if (error.response) {
            console.error("Error response:", error.response.data);
        }
    }
};


    useEffect(() => {
        fetchFees();
    }, []);

    // Handle fee deletion
    const handleDelete = (feeId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action will permanently delete the fee record!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(
                        `http://127.0.0.1:8000/api/fees/${feeId}`
                    );
                    if (response.status === 200) {
                        setFees((prevFees) =>
                            prevFees.filter((fee) => fee.id !== feeId)
                        );
                        Swal.fire(
                            "Deleted!",
                            "The fee has been deleted.",
                            "success"
                        );
                    } else {
                        Swal.fire(
                            "Failed",
                            "There was an issue deleting the fee.",
                            "error"
                        );
                    }
                } catch (error) {
                    Swal.fire("Error", "Something went wrong!", "error");
                    console.error("Error deleting fee:", error);
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

    // Filter fees based on search term
    const filteredFees = fees.filter(
        (fee) =>
            fee.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            fee.student.last_name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            fee.office_pay.toString().includes(searchTerm.toLowerCase()) ||
            fee.office_paid.toString().includes(searchTerm.toLowerCase()) ||
            fee.total_fee.toString().includes(searchTerm.toLowerCase()) ||
            fee.due_date.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort the filtered fees based on the selected criteria and order
    const sortedFees = [...filteredFees].sort((a, b) => {
        if (
            sortCriteria === "id" ||
            sortCriteria === "office_pay" ||
            sortCriteria === "office_paid" ||
            sortCriteria === "total_fee"
        ) {
            return sortOrder === "asc"
                ? a[sortCriteria] - b[sortCriteria]
                : b[sortCriteria] - a[sortCriteria];
        } else if (sortCriteria === "due_date") {
            return sortOrder === "asc"
                ? a[sortCriteria].localeCompare(b[sortCriteria])
                : b[sortCriteria].localeCompare(a[sortCriteria]);
        } else if (sortCriteria === "student_name") {
            const fullNameA =
                `${a.student.name} ${a.student.last_name}`.toLowerCase();
            const fullNameB =
                `${b.student.name} ${b.student.last_name}`.toLowerCase();
            return sortOrder === "asc"
                ? fullNameA.localeCompare(fullNameB)
                : fullNameB.localeCompare(fullNameA);
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
                                <h4>Fees List</h4>
                            </div>
                        </div>
                        <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex align-items-center">
                            <button
                                onClick={() => navigate("/dashboard/addFee")}
                                className="btn btn-success ml-auto"
                            >
                                Add New Fee
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
                                            placeholder="Search by Name, Fee, or Due Date"
                                            value={searchTerm}
                                            onChange={(e) =>
                                                setSearchTerm(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="table-responsive">
                                        <table
                                            id="feesTable"
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
                                                                handleSort(
                                                                    "student_name"
                                                                )
                                                            }
                                                        >
                                                            Student Name
                                                            {sortCriteria ===
                                                                "student_name" &&
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
                                                                handleSort(
                                                                    "office_pay"
                                                                )
                                                            }
                                                        >
                                                            Office Pay
                                                            {sortCriteria ===
                                                                "office_pay" &&
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
                                                                handleSort(
                                                                    "office_paid"
                                                                )
                                                            }
                                                        >
                                                            Office Paid
                                                            {sortCriteria ===
                                                                "office_paid" &&
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
                                                                handleSort(
                                                                    "total_fee"
                                                                )
                                                            }
                                                        >
                                                            Total Fee
                                                            {sortCriteria ===
                                                                "total_fee" &&
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
                                                                handleSort(
                                                                    "due_date"
                                                                )
                                                            }
                                                        >
                                                            Due Date
                                                            {sortCriteria ===
                                                                "due_date" &&
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
                                                {sortedFees.map((fee) => (
                                                    <tr key={fee.id}>
                                                        <td>{fee.id}</td>
                                                        <td>
                                                            {fee.student.name}{" "}
                                                            {fee.student.last_name}
                                                        </td>
                                                        <td>{fee.office_pay}</td>
                                                        <td>{fee.office_paid}</td>
                                                        <td>{fee.total_fee}</td>
                                                        <td>{fee.due_date}</td>
                                                        <td>
                                                            <button
                                                                onClick={() =>
                                                                    navigate(
                                                                        `/dashboard/editFee/${fee.id}`
                                                                    )
                                                                }
                                                                className="btn btn-primary shadow btn-xs sharp me-1"
                                                            >
                                                                <FaPencilAlt />
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        fee.id
                                                                    )
                                                                }
                                                                className="btn btn-danger shadow btn-xs sharp"
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

export default FeesList;
