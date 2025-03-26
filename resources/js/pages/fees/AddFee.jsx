import React from "react";
import { SideBar } from "../dashboard/Dashboard";
import "../allUsers/AllUsers.css";
import NewFee from "./NewFee";
function AddFee() {
    return (
        <div className="main-container">
            <div className="sidebar-container">
                <SideBar />
            </div>
            <div className="content-area">
                <NewFee />
            </div>
        </div>
    );
}

export default AddFee;
