import React, { useState, useEffect } from "react";
import { SideBar } from "../../pages/dashboard/Dashboard";
import AllComplaints from "./AllComplaints";
import "../../pages/allUsers/AllUsers.css"; // Ensure this CSS is included

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

function ComplaintsList() {
    const [loading, setLoading] = useState(true);

    // Simulate data fetching
    useEffect(() => {
        setTimeout(() => {
            setLoading(false); // After 1 second, set loading to false
        }, 500);
    }, []);

    return (
        <div className="main-container">
            <SideBar />
            <div className="content-area">
                {loading ? <Preloader /> : <AllComplaints />}
            </div>
        </div>
    );
}

export default ComplaintsList;
