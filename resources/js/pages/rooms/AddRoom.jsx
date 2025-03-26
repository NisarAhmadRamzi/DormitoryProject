import React from "react";
import { SideBar } from "../dashboard/Dashboard";
import "../allUsers/AllUsers.css";
import NewRoom from "./NewRoom";
function AddRoom() {
    return (
        <div className="main-container">
            <div className="sidebar-container">
                <SideBar />
            </div>
            <div className="content-area">
                <NewRoom />
            </div>
        </div>
    );
}

export default AddRoom;
