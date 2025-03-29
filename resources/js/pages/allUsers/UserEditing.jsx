import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Swal from "sweetalert2";
import axios from "axios";

function UserEditing() {
    const [userData, setUserData] = useState({
        id: "",
        name: "",
        email: "",
        role: "library_student",
        profile: null
    });
    const userId = useParams().userId; // Get userId from URL
    const navigate = useNavigate(); // Use navigate for redirection

    useEffect(() => {
        // Fetch the user data by userId when the component mounts
        axios
            .get(`http://127.0.0.1:8000/api/users/${userId}`)
            .then((response) => setUserData(response.data.user))
            .catch((error) => {
                console.error("Error fetching user data:", error);
                // Handle error if needed
            });
    }, [userId]);

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
            password: 12345678, // Retain the password field if required
        });
    };

    const handleFileChange = (e) => {
        setUserData({
            ...userData,
            profile: e.target.files[0], // Store the file object
        });
    };

    const updateHandler = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Prepare FormData to send the profile image and other data
        const formData = new FormData();
        formData.append("name", userData.name);
        formData.append("email", userData.email);
        formData.append("role", userData.role);
        formData.append("password", 12345678); // Set password as needed
        formData.append("cpassword", 12345678); // Confirm password

        if (userData.profile) {
            formData.append("profile", userData.profile); // Append the profile image if present
        }

        // Send the FormData to the API
        axios
            .post(`http://127.0.0.1:8000/api/users/updateUsers/${userId}`, formData)
            .then((response) => {
                console.log("User updated:", response.data);
                Swal.fire({
                    title: "Success!",
                    text: "User has been updated.",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    // Redirect to the user list page
                    navigate("/dashboard/allUsers");
                });
            })
            .catch((error) => {
                console.error("Error updating user:", error);
                Swal.fire({
                    title: "Error!",
                    text: "There was an issue updating the user.",
                    icon: "error",
                    confirmButtonText: "Try Again",
                });
            });
    };

    return (
        <div>
            <div className="container">
                <h2>Edit User</h2>
                <form onSubmit={updateHandler}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={userData.name}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Role</label>
                        <select
                            name="role"
                            value={userData.role}
                            onChange={handleChange}
                            className="form-control"
                        >
                            <option value="admin">Admin</option>
                            {/* <option value="second_admin">Second Admin</option> */}
                            <option value="student">Student</option>
                            {/* <option value="library_student">Library Student</option> */}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Profile Image</label>
                        <input
                            type="file"
                            name="profile"
                            onChange={handleFileChange}
                            className="form-control"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UserEditing;
