import React, { useState, useEffect } from "react";
import { SideBar } from "../dashboard/Dashboard";
import "../allUsers/AllUsers.css";
import StudentTable from "./StudentTable";

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

function AllStudents() {
    const [loading, setLoading] = useState(true);

    // Simulate data fetching
    useEffect(() => {
        setTimeout(() => {
            setLoading(false); // After 3 seconds, set loading to false
        }, 500);
    }, []);

    return (
        <div className="main-container">
            <div className="sidebar-container">
                <SideBar />
            </div>
            <div className="content-area">
                {loading ? <Preloader /> : <StudentTable />}
            </div>
        </div>
    );
}

export default AllStudents;
