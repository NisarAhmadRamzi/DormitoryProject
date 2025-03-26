import React from "react";
import { SideBar } from "../../pages/dashboard/Dashboard";
import "../../pages/allUsers/AllUsers.css";
import NewComplaint from "./NewComplaint";

function ComplaintsForm() {
    return (
        <div className="main-container">
            <div className="sidebar-container">
                <SideBar />
            </div>
            <div className="content-area">
                <NewComplaint />
            </div>
        </div>
    );
}

export default ComplaintsForm;
