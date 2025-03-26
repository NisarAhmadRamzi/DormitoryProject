import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./AddRoom.css";

function NewRoom() {
    const [room, setRoom] = useState({
        room_number: "",
        type: "",
        capacity: "",
        current_occupancy: "",
        price: "",
        status: "Available", // Default value for status
        floor: "",
    });
    const navigate = useNavigate();

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRoom({
            ...room,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure the data is formatted correctly (strings for numbers like capacity and price)
        const formattedRoom = {
            ...room,
            capacity: String(room.capacity),
            current_occupancy: String(room.current_occupancy),
            price: String(room.price),
            students: [], // The API expects an empty array if no students are assigned
        };

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/rooms",
                formattedRoom
            );

            if (response.status === 201) {
                Swal.fire(
                    "Room Added!",
                    "The room has been added successfully.",
                    "success"
                );
                navigate("/dashboard/rooms"); // Redirect to the Rooms List page
            }
        } catch (error) {
            if (error.response) {
                console.error("Validation error:", error.response.data); // API validation errors
            }
            Swal.fire(
                "Error",
                "Something went wrong while adding the room.",
                "error"
            );
            console.error("Error adding room:", error);
        }
    };

    // Handle cancel
    const handleCancel = () => {
        navigate("/dashboard/rooms"); // Redirect to the Rooms List page or wherever appropriate
    };

    return (
        <>
            <div className="content-body">
                <div className="container-fluid">
                    <div className="row page-titles mx-0">
                        <div className="col-sm-6 p-md-0">
                            <div className="welcome-text">
                                <h4>Add New Room</h4>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">
                                        Room Information
                                    </h4>
                                </div>

                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="room_number">
                                                        Room Number
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="room_number"
                                                        name="room_number"
                                                        className="form-control"
                                                        value={room.room_number}
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        required
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="capacity">
                                                        Capacity
                                                    </label>
                                                    <input
                                                        type="number"
                                                        id="capacity"
                                                        name="capacity"
                                                        className="form-control"
                                                        value={room.capacity}
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        required
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="price">
                                                        Price
                                                    </label>
                                                    <input
                                                        type="number"
                                                        id="price"
                                                        name="price"
                                                        className="form-control"
                                                        value={room.price}
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        required
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="floor">
                                                        Floor
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="floor"
                                                        name="floor"
                                                        className="form-control"
                                                        value={room.floor}
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="type">
                                                        Type
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="type"
                                                        name="type"
                                                        className="form-control"
                                                        value={room.type}
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        required
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="current_occupancy">
                                                        Current Occupancy
                                                    </label>
                                                    <input
                                                        type="number"
                                                        id="current_occupancy"
                                                        name="current_occupancy"
                                                        className="form-control"
                                                        value={
                                                            room.current_occupancy
                                                        }
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        required
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="status">
                                                        Status
                                                    </label>
                                                    <select
                                                        id="status"
                                                        name="status"
                                                        className="form-control"
                                                        value={room.status}
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                    >
                                                        <option value="Available">
                                                            Available
                                                        </option>
                                                        <option value="Occupied">
                                                            Occupied
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            className="form-buttons"
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center", // Align both buttons vertically
                                                gap: "10px", // Space between buttons
                                            }}
                                        >
                                            <button
                                                type="submit"
                                                className="btn btn-success"
                                            >
                                                Add Room
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={handleCancel}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewRoom;
