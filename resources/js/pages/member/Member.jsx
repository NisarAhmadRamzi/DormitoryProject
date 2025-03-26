import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../../components/footer/Footer";
import "./Member.css";

function Admin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // Handle the login process
    function handleLogin(e) {
        e.preventDefault(); // Prevents the form from being submitted
        try {
            fetch("http://127.0.0.1:8000/api/admin-login", {
                method: "POST",
                body: JSON.stringify({ email: email, password: password }), // Convert body to JSON
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data) {
                        navigate("/adminPanel"); // Navigate on successful login
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: "Your information is incorrect.",
                            icon: "error",
                            confirmButtonText: "Close",
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="d-flex flex-column min-vh-100">
            {/* Login Section */}
            <div className="container d-flex justify-content-center align-items-center my-auto">
                <div
                    className="card shadow-sm w-100 "
                    style={{ maxWidth: "400px" }}
                >
                    <div className="card-body">
                        <h3 className="text-center mb-4">Member Login</h3>
                        <form className="login-form" onSubmit={handleLogin}>
                            <div className="mb-3">
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                    value={email}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter your password"
                                    value={password}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                            >
                                Login
                            </button>
                            <p className="message mt-3 text-center">
                                Not registered?{" "}
                                <a href="#">Create an account</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            {/* Footer Section */}
            <Footer />
        </div>
    );
}

export default Admin;
