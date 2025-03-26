import React, { useState, useEffect } from "react";
import { SideBar } from "../../pages/dashboard/Dashboard";
import "../../pages/allUsers/AllUsers.css";
import RoomEditing from "./RoomEditing";
function EditRoom() {
    return (
        <div className="main-container">
            <div className="sidebar-container">
                <SideBar />
            </div>
            <div className="content-area">
                <RoomEditing />
            </div>
        </div>
    );
}

export default EditRoom;
