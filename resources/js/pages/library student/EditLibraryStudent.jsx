import "../../pages/allUsers/AllUsers.css";

import LibraryStudentEditing from "./LibraryStudentEditing";
import { SideBar } from "../../pages/dashboard/Dashboard";

function EditLibraryStudent() {
    return (
        <div className="main-container">
            <div className="sidebar-container">
                <SideBar />
            </div>
            <div className="content-area">
                <LibraryStudentEditing/>

            </div>
        </div>
    );
}

export default EditLibraryStudent;
