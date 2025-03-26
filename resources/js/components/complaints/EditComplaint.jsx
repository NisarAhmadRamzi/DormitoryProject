import React, { useState, useEffect } from "react";
import { SideBar } from "../../pages/dashboard/Dashboard";
import "../../pages/allUsers/AllUsers.css";
import ComplaintsEditing from "./ComplaintsEditing";
function EditComplaint() {
    return (
        <div className="main-container">
            <div className="sidebar-container">
                <SideBar />
            </div>
            <div className="content-area">
                <ComplaintsEditing />
            </div>
        </div>
    );
}

export default EditComplaint;
