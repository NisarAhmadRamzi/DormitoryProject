import React, { useEffect, useState } from "react";
import "./RoomsList.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { SideBar } from "../../pages/dashboard/Dashboard";
import { FaArrowUp, FaArrowDown } from "react-icons/fa"; // Importing icons for sorting

function RoomsList() {
    const [rooms, setRooms] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // State for search term
    const [sortCriteria, setSortCriteria] = useState("id"); // Default sorting by ID
    const [sortOrder, setSortOrder] = useState("asc"); // Default ascending order
    const navigate = useNavigate();

    // Fetch rooms from the API
    const fetchRooms = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/rooms");
            setRooms(response.data.data); // Store room data
        } catch (error) {
            console.error("Error fetching room data:", error);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    // Handle deleting a room
    const handleDelete = (roomId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action will permanently delete the room!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(
                        `http://127.0.0.1:8000/api/rooms/${roomId}`
                    );
                    if (response.status === 200) {
                        setRooms((prevRooms) =>
                            prevRooms.filter((room) => room.id !== roomId)
                        );
                        Swal.fire(
                            "Deleted!",
                            "The room has been deleted.",
                            "success"
                        );
                    } else {
                        Swal.fire(
                            "Failed",
                            "There was an issue deleting the room.",
                            "error"
                        );
                    }
                } catch (error) {
                    Swal.fire("Error", "Something went wrong!", "error");
                    console.error("Error deleting room:", error);
                }
            }
        });
    };

    // Handle sorting for each column
    const handleSort = (criteria) => {
        if (sortCriteria === criteria) {
            // Toggle the sort order if the same column is clicked
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            // Set the new criteria and default to ascending order
            setSortCriteria(criteria);
            setSortOrder("asc");
        }
    };

    // Filter rooms based on search term
    const filteredRooms = rooms.filter(
        (room) =>
            room.room_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
            room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            room.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort the filtered rooms based on the selected criteria and order
    const sortedRooms = [...filteredRooms].sort((a, b) => {
        if (
            sortCriteria === "id" ||
            sortCriteria === "capacity" ||
            sortCriteria === "price" ||
            sortCriteria === "floor"
        ) {
            return sortOrder === "asc"
                ? a[sortCriteria] - b[sortCriteria]
                : b[sortCriteria] - a[sortCriteria];
        } else if (
            sortCriteria === "room_number" ||
            sortCriteria === "type" ||
            sortCriteria === "status"
        ) {
            return sortOrder === "asc"
                ? a[sortCriteria].localeCompare(b[sortCriteria])
                : b[sortCriteria].localeCompare(a[sortCriteria]);
        }
        return 0;
    });

    return (
        <>
            <SideBar />
            <div className="content-body">
                <div className="container-fluid">
                    <div className="row page-titles mx-0">
                        <div className="col-sm-6 p-md-0">
                            <div className="welcome-text">
                                <h4>Rooms List</h4>
                            </div>
                        </div>
                        <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex align-items-center">
                            <button
                                onClick={() => navigate("/dashboard/addRoom")}
                                className="btn btn-success ml-auto"
                            >
                                Add New Room
                            </button>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-header"></div>

                                <div className="card-body">
                                    {/* Search input */}
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search by Room Number, Type or Status"
                                            value={searchTerm}
                                            onChange={(e) =>
                                                setSearchTerm(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="table-responsive">
                                        <table
                                            id="roomsTable"
                                            className="table table-striped table-bordered"
                                            style={{ width: "100%" }}
                                        >
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <button
                                                            className="btn btn-link text-decoration-none"
                                                            onClick={() =>
                                                                handleSort("id")
                                                            }
                                                        >
                                                            ID
                                                            {sortCriteria ===
                                                                "id" &&
                                                                (sortOrder ===
                                                                "asc" ? (
                                                                    <FaArrowUp />
                                                                ) : (
                                                                    <FaArrowDown />
                                                                ))}
                                                        </button>
                                                    </th>
                                                    <th>
                                                        <button
                                                            className="btn btn-link text-decoration-none"
                                                            onClick={() =>
                                                                handleSort(
                                                                    "room_number"
                                                                )
                                                            }
                                                        >
                                                            Room Number
                                                            {sortCriteria ===
                                                                "room_number" &&
                                                                (sortOrder ===
                                                                "asc" ? (
                                                                    <FaArrowUp />
                                                                ) : (
                                                                    <FaArrowDown />
                                                                ))}
                                                        </button>
                                                    </th>
                                                    <th>
                                                        <button
                                                            className="btn btn-link text-decoration-none"
                                                            onClick={() =>
                                                                handleSort(
                                                                    "type"
                                                                )
                                                            }
                                                        >
                                                            Type
                                                            {sortCriteria ===
                                                                "type" &&
                                                                (sortOrder ===
                                                                "asc" ? (
                                                                    <FaArrowUp />
                                                                ) : (
                                                                    <FaArrowDown />
                                                                ))}
                                                        </button>
                                                    </th>
                                                    <th>
                                                        <button
                                                            className="btn btn-link text-decoration-none"
                                                            onClick={() =>
                                                                handleSort(
                                                                    "capacity"
                                                                )
                                                            }
                                                        >
                                                            Capacity
                                                            {sortCriteria ===
                                                                "capacity" &&
                                                                (sortOrder ===
                                                                "asc" ? (
                                                                    <FaArrowUp />
                                                                ) : (
                                                                    <FaArrowDown />
                                                                ))}
                                                        </button>
                                                    </th>
                                                    <th>
                                                        <button
                                                            className="btn btn-link text-decoration-none"
                                                            onClick={() =>
                                                                handleSort(
                                                                    "current_occupancy"
                                                                )
                                                            }
                                                        >
                                                            Current Occupancy
                                                            {sortCriteria ===
                                                                "current_occupancy" &&
                                                                (sortOrder ===
                                                                "asc" ? (
                                                                    <FaArrowUp />
                                                                ) : (
                                                                    <FaArrowDown />
                                                                ))}
                                                        </button>
                                                    </th>
                                                    <th>
                                                        <button
                                                            className="btn btn-link text-decoration-none"
                                                            onClick={() =>
                                                                handleSort(
                                                                    "price"
                                                                )
                                                            }
                                                        >
                                                            Price
                                                            {sortCriteria ===
                                                                "price" &&
                                                                (sortOrder ===
                                                                "asc" ? (
                                                                    <FaArrowUp />
                                                                ) : (
                                                                    <FaArrowDown />
                                                                ))}
                                                        </button>
                                                    </th>
                                                    <th>
                                                        <button
                                                            className="btn btn-link text-decoration-none"
                                                            onClick={() =>
                                                                handleSort(
                                                                    "status"
                                                                )
                                                            }
                                                        >
                                                            Status
                                                            {sortCriteria ===
                                                                "status" &&
                                                                (sortOrder ===
                                                                "asc" ? (
                                                                    <FaArrowUp />
                                                                ) : (
                                                                    <FaArrowDown />
                                                                ))}
                                                        </button>
                                                    </th>
                                                    <th>
                                                        <button
                                                            className="btn btn-link text-decoration-none"
                                                            onClick={() =>
                                                                handleSort(
                                                                    "floor"
                                                                )
                                                            }
                                                        >
                                                            Floor
                                                            {sortCriteria ===
                                                                "floor" &&
                                                                (sortOrder ===
                                                                "asc" ? (
                                                                    <FaArrowUp />
                                                                ) : (
                                                                    <FaArrowDown />
                                                                ))}
                                                        </button>
                                                    </th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {sortedRooms.map((room) => (
                                                    <tr key={room.id}>
                                                        <td>{room.id}</td>
                                                        <td>
                                                            {room.room_number}
                                                        </td>
                                                        <td>{room.type}</td>
                                                        <td>{room.capacity}</td>
                                                        <td>
                                                            {
                                                                room.current_occupancy
                                                            }
                                                        </td>
                                                        <td>{room.price}</td>
                                                        <td>{room.status}</td>
                                                        <td>{room.floor}</td>
                                                        <td>
                                                            <button
                                                                onClick={() =>
                                                                    navigate(
                                                                        `/dashboard/editRoom/${room.id}`
                                                                    )
                                                                }
                                                                className="btn btn-primary shadow btn-xs sharp me-1"
                                                            >
                                                                <i className="fa fa-pencil-alt"></i>
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        room.id
                                                                    )
                                                                }
                                                                className="btn btn-danger shadow btn-xs sharp"
                                                            >
                                                                <i className="fa fa-trash"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RoomsList;
