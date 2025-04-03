import { FaArrowDown, FaArrowUp, FaPencilAlt, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";

import { SideBar } from "../../pages/dashboard/Dashboard";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LibraryList() {
    const [libraries, setLibraries] = useState([]); // State for library data
    const [searchTerm, setSearchTerm] = useState(""); // State for search term
    const [sortCriteria, setSortCriteria] = useState("id"); // Default sorting by ID
    const [sortOrder, setSortOrder] = useState("asc"); // Default ascending order
    const navigate = useNavigate();

    // Fetch libraries from the API
    const fetchLibraries = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/libraries");
            setLibraries(response.data.data || []); // Store library data
        } catch (error) {
            console.error("Error fetching library data:", error);
        }
    };

    useEffect(() => {
        fetchLibraries();
    }, []);

    // Handle deleting a library
    const handleDelete = (libraryId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action will permanently delete the library!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Making the API call to delete the library
                    const response = await axios.delete(
                        `http://127.0.0.1:8000/api/libraries/${libraryId}`
                    );

                    // Ensure the API response was successful
                    if (response.status === 200 && response.data && response.data.success) {
                        // Update the state to reflect the deletion
                        setLibraries((prevLibraries) =>
                            prevLibraries.filter((library) => library.id !== libraryId)
                        );
                        // Success message
                        Swal.fire("Deleted!", "The library has been deleted.", "success");
                    } else {
                        // If the API response was unsuccessful, show an error
                        Swal.fire("Failed", "There was an issue deleting the library.", "error");
                    }
                } catch (error) {
                    // Handle any errors from the API
                    Swal.fire("Error", "Something went wrong!", "error");
                    console.error("Error deleting library:", error);
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

    // Filter libraries based on search term
    const filteredLibraries = libraries.filter(
        (library) =>
            library.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            library.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            library.contact_info.toLowerCase().includes(searchTerm.toLowerCase()) // Include contact_info in search
    );

    // Sort the filtered libraries based on the selected criteria and order
    const sortedLibraries = [...filteredLibraries].sort((a, b) => {
        if (sortCriteria === "id" || sortCriteria === "contact_info") {
            return sortOrder === "asc" ? a[sortCriteria] - b[sortCriteria] : b[sortCriteria] - a[sortCriteria];
        } else if (sortCriteria === "name" || sortCriteria === "location") {
            return sortOrder === "asc" ? a[sortCriteria].localeCompare(b[sortCriteria]) : b[sortCriteria].localeCompare(a[sortCriteria]);
        } else if (sortCriteria === "created_at" || sortCriteria === "updated_at") {
            return sortOrder === "asc"
                ? new Date(a[sortCriteria]) - new Date(b[sortCriteria])
                : new Date(b[sortCriteria]) - new Date(a[sortCriteria]);
        }
        return 0;
    });

    // Function to format the date
    const formatDate = (date) => {
        return new Date(date).toLocaleString(); // Converts the date to a readable string
    };

    return (
        <>
            <SideBar />
            <div className="content-body">
                <div className="container-fluid">
                    <div className="row page-titles mx-0">
                        <div className="col-sm-6 p-md-0">
                            <div className="welcome-text">
                                <h4>Library List</h4>
                            </div>
                        </div>
                        <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex align-items-center">
                            <button
                                onClick={() => navigate("/dashboard/addLibrary")}
                                className="btn btn-success ml-auto"
                            >
                                Add New Library
                            </button>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    {/* Search input */}
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search by Name, Location or Contact Info"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>

                                    <div className="table-responsive">
                                        <table
                                            id="librariesTable"
                                            className="table table-striped table-bordered"
                                            style={{ width: "100%" }}
                                        >
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <button
                                                            className="btn btn-link text-decoration-none"
                                                            onClick={() => handleSort("id")}
                                                        >
                                                            ID
                                                            {sortCriteria === "id" && (sortOrder === "asc" ? <FaArrowUp /> : <FaArrowDown />)}
                                                        </button>
                                                    </th>
                                                    <th>
                                                        <button
                                                            className="btn btn-link text-decoration-none"
                                                            onClick={() => handleSort("name")}
                                                        >
                                                            Name
                                                            {sortCriteria === "name" && (sortOrder === "asc" ? <FaArrowUp /> : <FaArrowDown />)}
                                                        </button>
                                                    </th>
                                                    <th>
                                                        <button
                                                            className="btn btn-link text-decoration-none"
                                                            onClick={() => handleSort("location")}
                                                        >
                                                            Location
                                                            {sortCriteria === "location" && (sortOrder === "asc" ? <FaArrowUp /> : <FaArrowDown />)}
                                                        </button>
                                                    </th>
                                                    <th>
                                                        <button
                                                            className="btn btn-link text-decoration-none"
                                                            onClick={() => handleSort("contact_info")}
                                                        >
                                                            Contact Info
                                                            {sortCriteria === "contact_info" && (sortOrder === "asc" ? <FaArrowUp /> : <FaArrowDown />)}
                                                        </button>
                                                    </th>
                                                    <th>
                                                        <button
                                                            className="btn btn-link text-decoration-none"
                                                            onClick={() => handleSort("created_at")}
                                                        >
                                                            Created At
                                                            {sortCriteria === "created_at" && (sortOrder === "asc" ? <FaArrowUp /> : <FaArrowDown />)}
                                                        </button>
                                                    </th>
                                                    <th>
                                                        <button
                                                            className="btn btn-link text-decoration-none"
                                                            onClick={() => handleSort("updated_at")}
                                                        >
                                                            Updated At
                                                            {sortCriteria === "updated_at" && (sortOrder === "asc" ? <FaArrowUp /> : <FaArrowDown />)}
                                                        </button>
                                                    </th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {sortedLibraries.map((library) => (
                                                    <tr key={library.id}>
                                                        <td>{library.id}</td>
                                                        <td>{library.name}</td>
                                                        <td>{library.location}</td>
                                                        <td>{library.contact_info}</td>
                                                        <td>{formatDate(library.created_at)}</td>
                                                        <td>{formatDate(library.updated_at)}</td>
                                                        <td>
                                                            <button
                                                                onClick={() => navigate(`/dashboard/editLibrary/${library.id}`)}
                                                                className="btn btn-primary shadow btn-xs sharp me-1"
                                                            >
                                                                <FaPencilAlt />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(library.id)}
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

export default LibraryList;
