import React, { useState, useEffect } from "react";
import { SideBar } from "../../pages/dashboard/Dashboard";
import "../../pages/allUsers/AllUsers.css";
import UserEditing from "./UserEditing";
function EditUser() {
    return (
        <div className="main-container">
            <div className="sidebar-container">
                <SideBar />
            </div>
            <div className="content-area">
                <UserEditing />
            </div>
        </div>
    );
}

export default EditUser;
