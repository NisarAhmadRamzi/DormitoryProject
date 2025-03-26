import React, { useState } from "react";
import "./Admin.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../../components/footer/Footer";
function Admin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // Updated handleLogin to accept event e
    function handleLogin(e) {
        e.preventDefault(); // Prevents the form from being submitted
        console.log(email, password);

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
                    if (data.user) {
                        // Assuming a successful login will navigate
                        console.log("succed");
                        navigate("/adminPanel");
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
        <div>
            <div className="login-page">
                <div className="form">
                    <h3 className="text-center mb-4">Admin Login</h3>
                    <form className="login-form" onSubmit={handleLogin}>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            placeholder="Enter your email!"
                            value={email}
                        />
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                        />
                        {/* The onSubmit of the form triggers handleLogin */}
                        <button type="submit">Login</button>
                        <p className="message">
                            Not registered? <a href="#">Create an account</a>
                        </p>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Admin;
