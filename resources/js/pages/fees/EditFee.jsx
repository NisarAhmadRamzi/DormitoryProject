import React, { useState, useEffect } from "react";
import { SideBar } from "../../pages/dashboard/Dashboard";
import "../../pages/allUsers/AllUsers.css";
import FeeEditing from "./FeeEditing";
function EditRoom() {
    return (
        <div className="main-container">
            <div className="sidebar-container">
                <SideBar />
            </div>
            <div className="content-area">
                <FeeEditing />
            </div>
        </div>
    );
}

export default EditRoom;
