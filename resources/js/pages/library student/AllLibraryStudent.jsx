import "../rooms/AllRooms.css";

import React, { useEffect, useState } from "react";

import LibraryStudentList from "./LibraryStudentList";
import { SideBar } from "../dashboard/Dashboard";

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

function AllLibraryStudent() {
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
                {loading ? <Preloader /> : <LibraryStudentList/>}
            </div>
        </div>
    );
}

export default AllLibraryStudent;
