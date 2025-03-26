import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { Button } from "react-bootstrap";
import {
    FaTachometerAlt,
    FaFileAlt,
    FaUsers,
    FaInfoCircle,
    FaCog,
    FaLock,
} from "react-icons/fa"; // Import icons for the sidebar
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook for navigation
import Swal from "sweetalert2";
import Loading from "../../components/loading/Loading";

function AdminPanel() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate(); // Initialize the useNavigate hook

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("api/users"); // Fetch data from the API
                setData(response.data.data); // Update state with fetched data
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <Loading />;
    if (error)
        return (
            <div>
                <h1>Error: {error}</h1>
            </div>
        );

    return (
        <div className="d-flex justify-content-between">
            {/* Sidebar */}
            <Sidebar />
            {/* Main Content */}
            <div
                className="container"
                style={{ marginLeft: "250px", marginLeft: "20px" }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <h1>Admins Information!</h1>
                    <Button
                        variant="success"
                        onClick={() => navigate("/addUser")}
                    >
                        Add New Admin
                    </Button>
                </div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((user) => (
                            <tr key={user.user_id}>
                                <td>{user.user_id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.user_role}</td>
                                <td>
                                    <img
                                        src={
                                            (user.image =
                                                "https://img.freepik.com/premium-photo/picture-man-with-beard-blue-shirt-with-picture-man-with-beard_1057389-84775.jpg")
                                        }
                                        alt={user.name}
                                        width={50}
                                        height={50}
                                    />
                                </td>
                                <td style={{ padding: "5px" }}>
                                    <button
                                        onClick={() => handleEdit(user.user_id)}
                                        className="btn btn-sm"
                                        title="Edit"
                                    >
                                        <CiEdit
                                            style={{
                                                color: "blue",
                                                fontSize: "25px",
                                            }}
                                        />{" "}
                                        {/* Edit icon */}
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDelete(user.user_id)
                                        }
                                        className="btn btn-sm"
                                        title="Delete"
                                    >
                                        <FaTrash style={{ color: "red" }} />{" "}
                                        {/* Delete icon */}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    // Example handler functions for the buttons
    function handleEdit(userId) {
        console.log("Edit user with ID:", userId);
        // Navigate to the edit user page and pass the userId as a URL parameter
        navigate(`/editUser/${userId}`);
    }

    function handleDelete(userId) {
        // Use SweetAlert for the confirmation dialog
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                // Send DELETE request to the API
                axios
                    .delete(`http://127.0.0.1:8000/api/users/${userId}`)
                    .then((response) => {
                        // If successful, remove the user from the state
                        setData((prevData) =>
                            prevData.filter((user) => user.user_id !== userId)
                        );
                        // SweetAlert for success message
                        Swal.fire(
                            "Deleted!",
                            "User has been deleted.",
                            "success"
                        );
                    })
                    .catch((error) => {
                        console.error(
                            "There was an error deleting the user:",
                            error
                        );
                        // SweetAlert for error message
                        Swal.fire(
                            "Error!",
                            "There was an error deleting the user. Please try again.",
                            "error"
                        );
                    });
            }
        });
    }
}

export default AdminPanel;

function Sidebar() {
    return (
        <div
            className="sidebar"
            style={{
                width: "30%",
                backgroundColor: "#333333",
                height: "100vh",
                color: "#00ff0d",
                padding: "20px",
            }}
        >
            <h3 className="text-center">Admin Panel</h3>
            <ul className="list-unstyled">
                <li className="li-margin">
                    <a
                        href="#"
                        style={{ color: "#00ff0d", textDecoration: "none" }}
                    >
                        <FaTachometerAlt /> Dashboard
                    </a>
                </li>
                <li className="li-margin">
                    <a
                        href="#"
                        style={{ color: "#00ff0d", textDecoration: "none" }}
                    >
                        <FaFileAlt /> Posts
                    </a>
                </li>
                <li className="li-margin">
                    <a
                        href="#"
                        style={{ color: "#00ff0d", textDecoration: "none" }}
                    >
                        <FaUsers /> Users
                    </a>
                </li>
                <li className="li-margin">
                    <a
                        href="#"
                        style={{ color: "#00ff0d", textDecoration: "none" }}
                    >
                        <FaInfoCircle /> About
                    </a>
                </li>
                <li className="li-margin">
                    <a
                        href="#"
                        style={{ color: "#00ff0d", textDecoration: "none" }}
                    >
                        <FaCog /> Settings
                    </a>
                </li>
                <li className="li-margin">
                    <a
                        href="#"
                        style={{ color: "#00ff0d", textDecoration: "none" }}
                    >
                        <FaLock /> Roles
                    </a>
                </li>
            </ul>
        </div>
    );
}
