import "../allUsers/AllUsers.css";

import NewStudentLibrary from "./NewStudentLibrary";
import React from "react";
import { SideBar } from "../dashboard/Dashboard";

function AddStudentLibrary() {
    return (
        <div className="main-container">
            <div className="sidebar-container">
                <SideBar />
            </div>
            <div className="content-area">
                <NewStudentLibrary/>
            </div>
        </div>
    );
}

export default AddStudentLibrary;
