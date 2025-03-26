import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap"; // Import Row and Col for grid system
import axios from "axios";
import "./AddUser.css";
import {
    FaTachometerAlt,
    FaFileAlt,
    FaUsers,
    FaInfoCircle,
    FaCog,
    FaLock,
} from "react-icons/fa";
import Swal from "sweetalert2";

function AddUser() {
    const [username, setUserName] = useState("");
    const [useremail, setUserEmail] = useState("");
    const [userpassword, setUserPassword] = useState("");
    const [confirmuserpassword, setConfirmUserPassword] = useState("");
    const [userrole, setUserRole] = useState("");
    const [userimage, setUserImage] = useState("");

    const userNameHandler = (e) => setUserName(e.target.value);
    const userEmailHandler = (e) => setUserEmail(e.target.value);
    const userPasswordHandler = (e) => setUserPassword(e.target.value);
    const confirmUserPasswordHandler = (e) =>
        setConfirmUserPassword(e.target.value);
    const userRoledHandler = (e) => setUserRole(e.target.value);
    const userImageHandler = (e) => setUserImage(e.target.files[0]); // Handle file input

    // Function to reset all form fields
    const resetForm = () => {
        setUserName("");
        setUserEmail("");
        setUserPassword("");
        setConfirmUserPassword("");
        setUserRole("");
        setUserImage("");
    };

    const addNewUserHandler = () => {
        // Validate that the password and confirm password match
        if (userpassword !== confirmuserpassword) {
            console.error("Passwords do not match");
            Swal.fire({
                title: "Error!",
                text: "Passwords do not match.",
                icon: "error",
                confirmButtonText: "Close",
            });
            return;
        }

        // Validate required fields
        if (
            !username ||
            !useremail ||
            !userpassword ||
            !confirmuserpassword ||
            !userrole
        ) {
            Swal.fire({
                title: "Error!",
                text: "All fields are required.",
                icon: "error",
                confirmButtonText: "Close",
            });
            return;
        }

        // Create a FormData object for the file upload
        const formData = new FormData();
        formData.append("name", username);
        formData.append("email", useremail);
        formData.append("password", userpassword);
        formData.append("profile_pic", userimage);
        formData.append("cpassword", confirmuserpassword); // Fixed field name to match the backend
        formData.append("role", userrole); // Ensure 'role' is the correct name expected by the backend

        if (userimage) {
            formData.append("profile_pic", userimage);
        }

        // Post request to backend with the form data
        axios
            .post("http://127.0.0.1:8000/api/users", formData, {
                headers: {
                    "Content-Type": "multipart/form-data", // Important for file uploads
                },
            })
            .then((response) => {
                console.log("New user added successfully:", response);
                // Success alert
                Swal.fire({
                    title: "Success!",
                    text: "New user added successfully.",
                    icon: "success",
                    confirmButtonText: "Close",
                });
                // Reset form fields after successful submission
                resetForm();
            })
            .catch((error) => {
                console.error(
                    "Error adding new user:",
                    error.response || error.message
                );
                // Log the full error response to understand what went wrong
                if (error.response) {
                    console.log("Error Response Data: ", error.response.data);
                }

                // Error alert
                Swal.fire({
                    title: "Error!",
                    text: "There was an issue adding the new user.",
                    icon: "error",
                    confirmButtonText: "Close",
                });
            });
    };

    return (
        <div className="d-flex">
            {/* Sidebar */}
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
                <h1 className="mb-4">Add a new admin!</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>User Name:</Form.Label>
                        <Form.Control
                            value={username}
                            onChange={userNameHandler}
                            type="text"
                            placeholder="Enter new user's name!"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            value={useremail}
                            onChange={userEmailHandler}
                            type="email"
                            placeholder="Enter email"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            value={userpassword}
                            onChange={userPasswordHandler}
                            type="password"
                            placeholder="Enter new user's password!"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Confirmation Password:</Form.Label>
                        <Form.Control
                            value={confirmuserpassword}
                            onChange={confirmUserPasswordHandler}
                            type="password"
                            placeholder="Confirm your password!"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicRole">
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
                    <Form.Group className="mb-3" controlId="formBasicImage">
                        <Form.Label>Profile Picture:</Form.Label>
                        <Form.Control
                            onChange={userImageHandler}
                            type="file"
                            placeholder="Select user's profile picture!"
                            required
                        />
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="button"
                        onClick={addNewUserHandler}
                        className="mt-3"
                    >
                        Add New User
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default AddUser;
