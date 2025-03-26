import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import img1 from "../../assets/images/profile/education/mohammad.jpg"; // Default profile image
import { FaArrowUp, FaArrowDown } from "react-icons/fa"; // Importing icons for sorting

function UsersList() {
    const [users, setUsers] = useState([]); // Store the users data
    const [searchTerm, setSearchTerm] = useState(""); // Search term state
    const [sortCriteria, setSortCriteria] = useState("name"); // Default sorting by name
    const [sortOrder, setSortOrder] = useState("asc"); // Default ascending order
    const navigate = useNavigate(); // Initialize navigate for programmatic navigation

    // Fetch users from the API
    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/users");
            setUsers(response.data.data); // Store the users data in state
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    // Fetch users when the component is mounted
    useEffect(() => {
        fetchUsers();
    }, []);

    // Function to handle editing a user - redirect to the Edit page
    const handleEdit = (userId) => {
        navigate(`/dashboard/allUsers/editUser/${userId}`);
    };

    // Function to handle deleting a user with confirmation
    const handleDelete = (userId) => {
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
                        `http://127.0.0.1:8000/api/users/${userId}`
                    );
                    if (response.status === 200) {
                        fetchUsers(); // Re-fetch users after deletion
                        Swal.fire(
                            "Deleted!",
                            "The user has been deleted.",
                            "success"
                        );
                    } else {
                        Swal.fire(
                            "Failed",
                            "There was an issue deleting the user.",
                            "error"
                        );
                    }
                } catch (error) {
                    Swal.fire("Error", "Something went wrong!", "error");
                    console.error("Error deleting user:", error);
                }
            }
        });
    };

    // Handle sorting by name or ID
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

    // Filter users based on search term
    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.id.toString().includes(searchTerm)
    );

    // Sort filtered users
    const sortedUsers = [...filteredUsers].sort((a, b) => {
        if (sortCriteria === "name") {
            return sortOrder === "asc"
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
        } else if (sortCriteria === "id") {
            return sortOrder === "asc" ? a.id - b.id : b.id - a.id;
        }
        return 0;
    });

    return (
        <div className="content-body">
            <div className="container-fluid">
                <div className="row page-titles mx-0">
                    <div className="col-sm-6 p-md-0">
                        <div className="welcome-text">
                            <h4>Users List</h4>
                        </div>
                    </div>
                    <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex align-items-center">
                        <button
                            onClick={() =>
                                navigate("/dashboard/allUsers/addUser")
                            }
                            className="btn btn-success ml-auto"
                        >
                            Add New User
                        </button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Users List</h4>
                            </div>

                            <div className="card-body">
                                {/* Search Input */}
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search by Name or ID"
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="table-responsive">
                                    <table
                                        id="usersTable"
                                        className="table table-bordered table-striped"
                                    >
                                        <thead>
                                            <tr>
                                                <th className="p-3">
                                                    <button
                                                        className="btn btn-link d-flex align-items-center"
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
                                                <th className="p-3">Image</th>
                                                <th className="p-3">
                                                    <button
                                                        className="btn btn-link d-flex align-items-center"
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
                                                <th className="p-3">Email</th>
                                                <th className="p-3">Role ID</th>
                                                <th className="p-3">
                                                    Role Name
                                                </th>
                                                <th className="p-3">
                                                    Updated at
                                                </th>
                                                <th className="p-3">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sortedUsers.map((user) => (
                                                <tr key={user.id}>
                                                    <td className="p-3">
                                                        {user.id}
                                                    </td>
                                                    <td className="p-3">
                                                        <img
                                                            className="rounded-circle"
                                                            width="35"
                                                            src={
                                                                user.profile
                                                                    ? `http://127.0.0.1:8000/${user.profile}`
                                                                    : img1
                                                            }
                                                            alt="User Profile"
                                                        />
                                                    </td>
                                                    <td className="p-3">
                                                        {user.name}
                                                    </td>
                                                    <td className="p-3">
                                                        {user.email}
                                                    </td>
                                                    <td className="p-3">
                                                        {user.role_id}
                                                    </td>
                                                    <td className="p-3">
                                                        {user.role_name}
                                                    </td>
                                                    <td className="p-3">
                                                        {user.updated_at}
                                                    </td>
                                                    <td className="p-3">
                                                        <div className="d-flex">
                                                            <button
                                                                onClick={() =>
                                                                    handleEdit(
                                                                        user.id
                                                                    )
                                                                }
                                                                className="btn btn-primary shadow btn-xs sharp me-2"
                                                            >
                                                                <i className="fa fa-pencil-alt"></i>
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        user.id
                                                                    )
                                                                }
                                                                className="btn btn-danger shadow btn-xs sharp"
                                                            >
                                                                <i className="fa fa-trash"></i>
                                                            </button>
                                                        </div>
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
    );
}

export default UsersList;
