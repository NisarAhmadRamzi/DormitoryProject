import "../allUsers/AllUsers.css";

import NewLibrary from "./NewLibrary";
import React from "react";
import { SideBar } from "../dashboard/Dashboard";

function AddLibrary() {
    return (
        <div className="main-container">
            <div className="sidebar-container">
                <SideBar />
            </div>
            <div className="content-area">
                <NewLibrary />
            </div>
        </div>
    );
}

export default AddLibrary;
