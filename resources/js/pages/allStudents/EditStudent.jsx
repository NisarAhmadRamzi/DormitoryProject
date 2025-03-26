import React, { useState, useEffect } from "react";
import { SideBar } from "../../pages/dashboard/Dashboard";
import "../../pages/allUsers/AllUsers.css";
import StudentEditing from "./StudentEditing";
function EditStudent() {
    return (
        <div className="main-container">
            <div className="sidebar-container">
                <SideBar />
            </div>
            <div className="content-area">
                <StudentEditing />
            </div>
        </div>
    );
}

export default EditStudent;
