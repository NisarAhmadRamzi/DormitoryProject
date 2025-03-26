import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function UserEditing() {
    const [userData, setUserData] = useState({ id: "", name: "", email: "" });
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
            password: 12345678,
        });
    };

    const updateHandler = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        axios
            .post(`http://127.0.0.1:8000/api/users/updateUsers/${userId}`, {
                ...userData,
                password: 12345678,
                cpassword: 12345678,
            }) // Pass userData to the POST request
            .then((response) => {
                console.log("User updated:", response.data);

                // SweetAlert confirmation
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
    console.log(userData);

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
                    <button type="submit" className="btn btn-primary">
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UserEditing;
