import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function RoomEditing() {
    const [room, setRoom] = useState({
        room_number: "",
        type: "",
        capacity: "",
        current_occupancy: "",
        price: "",
        status: "",
        floor: "",
    });
    const [loading, setLoading] = useState(false);
    const { roomId } = useParams(); // Get the roomId from the URL
    const navigate = useNavigate();

    // Fetch room details when the component mounts
    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/rooms/${roomId}`
                );
                setRoom(response.data.data); // Set room data in state
            } catch (error) {
                console.error("Error fetching room details:", error);
            }
        };
        fetchRoomDetails();
    }, [roomId]);

    // Handle form submission for editing the room
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/api/rooms/${roomId}`,
                room
            );
            if (response.status === 200) {
                Swal.fire("Success", "Room updated successfully", "success");
                navigate("/dashboard/rooms"); // Navigate back to the rooms list
            }
        } catch (error) {
            Swal.fire("Error", "There was an issue updating the room", "error");
            console.error("Error updating room:", error);
        } finally {
            setLoading(false);
        }
    };

    // Handle input changes in the form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRoom((prevRoom) => ({
            ...prevRoom,
            [name]: value,
        }));
    };

    return (
        <div className="content-body">
            <div className="container-fluid">
                <div className="row page-titles mx-0">
                    <div className="col-sm-6 p-md-0">
                        <div className="welcome-text">
                            <h4>Edit Room</h4>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Edit Room Details</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label>Room Number</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="room_number"
                                            value={room.room_number}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Type</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="type"
                                            value={room.type}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Capacity</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="capacity"
                                            value={room.capacity}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Current Occupancy</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="current_occupancy"
                                            value={room.current_occupancy}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Price</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="price"
                                            value={room.price}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    {/* Status Dropdown */}
                                    <div className="form-group">
                                        <label>Status</label>
                                        <select
                                            className="form-control"
                                            name="status"
                                            value={room.status}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="Available">
                                                Available
                                            </option>
                                            <option value="Occupied">
                                                Occupied
                                            </option>
                                        </select>
                                    </div>

                                    {/* Floor Dropdown */}
                                    <div className="form-group">
                                        <label>Floor</label>
                                        <select
                                            className="form-control"
                                            name="floor"
                                            value={room.floor}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="Third Floor">
                                                Third Floor
                                            </option>
                                            <option value="Fourth Floor">
                                                Fourth Floor
                                            </option>
                                        </select>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={loading}
                                    >
                                        {loading
                                            ? "Updating..."
                                            : "Update Room"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoomEditing;
