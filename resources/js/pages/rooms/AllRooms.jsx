import React, { useState, useEffect } from "react";
import { SideBar } from "../dashboard/Dashboard";
import "./AllRooms.css";
import RoomsList from "./RoomsList";

// Preloader (Loader) Component
export const Preloader = () => {
    return (
        <div className="lds-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

function AllRooms() {
    const [loading, setLoading] = useState(true);

    // Simulate data fetching
    useEffect(() => {
        setTimeout(() => {
            setLoading(false); // After 1 second, set loading to false
        }, 1000);
    }, []);

    return (
        <div className="room-main-container">
            <div className="room-sidebar-container">
                <SideBar />
            </div>
            <div className="room-content-area">
                {loading ? <Preloader /> : <RoomsList />}
            </div>
        </div>
    );
}

export default AllRooms;
