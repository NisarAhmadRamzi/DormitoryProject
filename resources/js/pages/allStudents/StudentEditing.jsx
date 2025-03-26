import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Updated to use useNavigate
import Swal from "sweetalert2";

const StudentEditing = () => {
    const { studentId } = useParams(); // Extract studentId from URL params
    const [student, setStudent] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await fetch(
                    `http://127.0.0.1:8000/api/students/${studentId}`
                );
                const data = await response.json();

                // Log fetched data to check the structure
                console.log("Fetched student data:", data); // Log the fetched data here to debug

                setStudent(data.data); // Assuming the data you want is inside data.data
            } catch (error) {
                console.error("Error fetching student data:", error);
            }
        };

        fetchStudent();
    }, [studentId]); // Fetch when studentId changes

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/students/${studentId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(student), // Update student data
                }
            );
            if (response.ok) {
                Swal.fire("Success", "Student updated successfully", "success");
                navigate("/allStudents"); // Redirect to the student list page after success
            } else {
                Swal.fire("Error", "Failed to update student", "error");
            }
        } catch (error) {
            Swal.fire("Error", "Something went wrong!", "error");
            console.error("Error updating student:", error);
        }
    };

    if (!student) return <div>Loading...</div>; // Show loading message while fetching data

    return (
        <div className="container">
            <h2>Edit Student</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={student.name}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input
                        type="text"
                        name="last_name"
                        value={student.last_name}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input
                        type="text"
                        name="from"
                        value={student.from}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={student.phone}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Academic Info</label>
                    <input
                        type="text"
                        name="academic_info"
                        value={student.academic_info}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Update
                </button>
            </form>
        </div>
    );
};

export default StudentEditing;
