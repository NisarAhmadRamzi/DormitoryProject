import React from "react";
import { SideBar } from "../dashboard/Dashboard";
import "../allUsers/AllUsers.css";
import StudentForm from "./StudentForm";

function AddNewStudent() {
    return (
        <div className="main-container">
            <div className="sidebar-container">
                <SideBar />
            </div>
            <div className="content-area">
                {/* <UsersList /> */}
                <StudentForm />
            </div>
        </div>
    );
}

export default AddNewStudent;
