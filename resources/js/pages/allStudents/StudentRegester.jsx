import React from "react";
import { SideBar } from "../dashboard/Dashboard";
import AddStudent from "./AddStudent";
function StudentRegester() {
    return (
        <div>
            {/* <Header /> */}
            <SideBar />
            <AddStudent />
        </div>
    );
}

export default StudentRegester;
