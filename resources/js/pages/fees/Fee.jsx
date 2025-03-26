import React, { useState, useEffect } from "react";
import { SideBar } from "../dashboard/Dashboard";
import "../allUsers/AllUsers.css";
import FeesList from "./FeesList";

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

function AllFees() {
    const [loading, setLoading] = useState(true);

    // Simulate data fetching
    useEffect(() => {
        setTimeout(() => {
            setLoading(false); // After 1 second, set loading to false
        }, 1000);
    }, []);

    return (
        <div className="main-container">
            <div className="sidebar-container">
                <SideBar />
            </div>
            <div className="content-area">
                {loading ? <Preloader /> : <FeesList />}
            </div>
        </div>
    );
}

export default AllFees;
