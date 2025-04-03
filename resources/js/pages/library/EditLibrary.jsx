import "../../pages/allUsers/AllUsers.css";

import LibraryEditing from "./LibraryEditing";
import React from "react";
import { SideBar } from "../../pages/dashboard/Dashboard";

function EditLibrary() {
    return (
        <div className="main-container">
            <div className="sidebar-container">
                <SideBar />
            </div>
            <div className="content-area">
                <LibraryEditing />
            </div>
        </div>
    );
}

export default EditLibrary;