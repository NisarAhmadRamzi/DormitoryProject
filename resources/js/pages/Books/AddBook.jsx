import "../allUsers/AllUsers.css";

import NewBook from "./NewBook";
import React from "react";
import { SideBar } from "../dashboard/Dashboard";

function AddBook() {
    return (
        <div className="main-container">
            <div className="sidebar-container">
                <SideBar />
            </div>
            <div className="content-area">
                {/* <NewStudentLibrary/> */}
                {/* <h1 style={{textAlign : "center"}}>new book</h1> */}
                <NewBook/>
            </div>
        </div>
    );
}

export default AddBook;
