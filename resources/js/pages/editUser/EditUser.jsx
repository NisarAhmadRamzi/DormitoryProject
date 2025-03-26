import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./EditUser.css";
import {
    FaTachometerAlt,
    FaFileAlt,
    FaUsers,
    FaInfoCircle,
    FaCog,
    FaLock,
} from "react-icons/fa";

function EditUser() {
    const { userId } = useParams(); // Get userId from the route
    const navigate = useNavigate(); // For navigation after successful update

    // State variables for user data
    const [username, setUserName] = useState("");
    const [useremail, setUserEmail] = useState("");
    const [userpassword, setUserPassword] = useState("");
    const [confirmuserpassword, setConfirmUserPassword] = useState("");
    const [userrole, setUserRole] = useState("");
    const [userimage, setUserImage] = useState(null); // Use null if no image
    const [loading, setLoading] = useState(true); // To show a loading state

    // Fetch user data when the component mounts
    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/users/${userId}`)
            .then((response) => {
                const user = response.data.data;
                setUserName(user.name);
                setUserEmail(user.email);
                setUserRole(user.user_role);

                // Set the user image (or use a default if none exists)
                if (user.profile_pic) {
                    setUserImage(user.profile_pic);
                } else {
                    setUserImage("/images/default-image.jpg"); // Fallback to default image
                }

                setLoading(false); // Data fetched, set loading to false
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
                Swal.fire({
                    title: "Error!",
                    text: "There was an issue fetching user data.",
                    icon: "error",
                    confirmButtonText: "Close",
                });
                setLoading(false); // Stop loading if there's an error
            });
    }, [userId]); // Re-fetch data if userId changes

    const userNameHandler = (e) => setUserName(e.target.value);
    const userEmailHandler = (e) => setUserEmail(e.target.value);
    const userPasswordHandler = (e) => setUserPassword(e.target.value);
    const confirmUserPasswordHandler = (e) =>
        setConfirmUserPassword(e.target.value);
    const userRoledHandler = (e) => setUserRole(e.target.value);

    const resetForm = () => {
        setUserName("");
        setUserEmail("");
        setUserPassword("");
        setConfirmUserPassword("");
        setUserRole("");
    };
    const updateUserHandler = () => {
        // Validate that the password and confirm password match
        if (userpassword !== confirmuserpassword) {
            Swal.fire({
                title: "Error!",
                text: "Passwords do not match.",
                icon: "error",
                confirmButtonText: "Close",
            });
            return;
        }

        // Validate required fields
        if (!username || !useremail || !userrole) {
            Swal.fire({
                title: "Error!",
                text: "All fields are required.",
                icon: "error",
                confirmButtonText: "Close",
            });
            return;
        }

        // Prepare data to be updated
        const updatedData = {
            name: username,
            email: useremail,
            role: userrole,
            password: userpassword ? userpassword : undefined, // Only include password if provided
            profile_pic:
                userimage && userimage !== "/images/default-image.jpg"
                    ? userimage
                    : undefined,
        };

        // PUT request to update user data
        axios
            .put(`http://127.0.0.1:8000/api/users/${userId}`, updatedData, {
                headers: {
                    "Content-Type": "application/json", // Using JSON instead of FormData
                },
            })
            .then((response) => {
                console.log("User updated successfully:", response);
                Swal.fire({
                    title: "Success!",
                    text: "User updated successfully.",
                    icon: "success",
                    confirmButtonText: "Close",
                });
                navigate("/adminPanel"); // Redirect after successful update
            })
            .catch((error) => {
                console.error(
                    "Error updating user:",
                    error.response || error.message
                );
                Swal.fire({
                    title: "Error!",
                    text: "There was an issue updating the user.",
                    icon: "error",
                    confirmButtonText: "Close",
                });
            });
    };

    if (loading) {
        return <div>Loading user data...</div>; // Show loading message until data is fetched
    }

    return (
        <div className="d-flex">
            {/* Sidebar (same as previous code) */}
            <div
                className="sidebar"
                style={{
                    width: "25%",
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
                            style={{
                                color: "#00ff0d",
                                textDecoration: "none",
                            }}
                        >
                            <FaTachometerAlt /> Dashboard
                        </a>
                    </li>
                    <li className="li-margin">
                        <a
                            href="#"
                            style={{
                                color: "#00ff0d",
                                textDecoration: "none",
                            }}
                        >
                            <FaFileAlt /> Posts
                        </a>
                    </li>
                    <li className="li-margin">
                        <a
                            href="#"
                            style={{
                                color: "#00ff0d",
                                textDecoration: "none",
                            }}
                        >
                            <FaUsers /> Users
                        </a>
                    </li>
                    <li className="li-margin">
                        <a
                            href="#"
                            style={{
                                color: "#00ff0d",
                                textDecoration: "none",
                            }}
                        >
                            <FaInfoCircle /> About
                        </a>
                    </li>
                    <li className="li-margin">
                        <a
                            href="#"
                            style={{
                                color: "#00ff0d",
                                textDecoration: "none",
                            }}
                        >
                            <FaCog /> Settings
                        </a>
                    </li>
                    <li className="li-margin">
                        <a
                            href="#"
                            style={{
                                color: "#00ff0d",
                                textDecoration: "none",
                            }}
                        >
                            <FaLock /> Roles
                        </a>
                    </li>
                </ul>
            </div>

            {/* Form Section */}
            <div className="container mt-4" style={{ width: "50%" }}>
                <h1 className="mb-4">Edit User</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="formUserName">
                        <Form.Label>User Name:</Form.Label>
                        <Form.Control
                            value={username}
                            onChange={userNameHandler}
                            type="text"
                            placeholder="Enter user's name"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formUserEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            value={useremail}
                            onChange={userEmailHandler}
                            type="email"
                            placeholder="Enter email"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formUserPassword">
                        <Form.Label>
                            Password (Leave empty to keep current password):
                        </Form.Label>
                        <Form.Control
                            value={userpassword}
                            onChange={userPasswordHandler}
                            type="password"
                            placeholder="Enter new password (if any)"
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="formConfirmPassword"
                    >
                        <Form.Label>Confirm Password:</Form.Label>
                        <Form.Control
                            value={confirmuserpassword}
                            onChange={confirmUserPasswordHandler}
                            type="password"
                            placeholder="Confirm password"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formUserRole">
                        <Form.Label>User Role:</Form.Label>
                        <Form.Control
                            value={userrole}
                            onChange={userRoledHandler}
                            type="number"
                            placeholder="Enter user's role!"
                            min="1"
                            max="3"
                            required
                        />
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="button"
                        onClick={updateUserHandler}
                        className="mt-3"
                    >
                        Update User
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default EditUser;
