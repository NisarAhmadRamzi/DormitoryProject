import About from "./pages/about/About";
import AddFee from "./pages/fees/AddFee";
import AddLibrary from "./pages/library/AddLibrary";
import AddNewStudent from "./pages/allStudents/AddNewStudent";
import AddRoom from "./pages/rooms/AddRoom";
import Admin from "./pages/admin/Admin";
import AllLibraries from "./pages/library/AllLibraries";
import AllRooms from "./pages/rooms/AllRooms";
import AllStudents from "./pages/allStudents/AllStudents";
import AllUsers from "./pages/allUsers/AllUsers";
import ComplaintsForm from "./components/complaints/ComplaintsForm";
import ComplaintsList from "./components/complaints/ComplaintsList";
import Contact from "./pages/contact/Contact";
import Dashboard from "./pages/dashboard/Dashboard";
import EditComplaint from "./components/complaints/EditComplaint";
import EditFee from "./pages/fees/EditFee";
import EditLibrary from "./pages/library/EditLibrary";
import EditRoom from "./pages/rooms/EditRoom";
import EditStudent from "./pages/allStudents/EditStudent";
import EditUser from "./pages/allUsers/EditUser";
import Fee from "./pages/fees/Fee";
import Home from "./pages/home/Home";
import LibraryList from "./pages/library/LibraryList";
import Member from "./pages/member/Member";
import UserForm from "./pages/allUsers/UserForm";
import View_Dorm from "./pages/view-dorm/View_Dorm";

export const allRoutes = [
    { path: "/", element: <Home /> },
    { path: "/admin", element: <Admin /> },
    { path: "/about", element: <About /> },
    { path: "/contact", element: <Contact /> },
    { path: "/view-dorm", element: <View_Dorm /> },
    { path: "/member", element: <Member /> },
    { path: "/dashboard", element: <Dashboard /> },

    // Users Routes
    { path: "/dashboard/allUsers", element: <AllUsers /> },
    { path: "/dashboard/allUsers/addUser", element: <UserForm /> }, // New user creation
    { path: "/dashboard/allUsers/editUser/:userId", element: <EditUser /> }, // Edit user

    // Student Routes
    { path: "/allStudents", element: <AllStudents /> },
    {
        path: "/dashboard/allStudents/addNewStudent",
        element: <AddNewStudent />,
    }, // New student creation
    { path: "/editStudent/:studentId", element: <EditStudent /> }, // Edit student

    // Complaints Routes
    { path: "/dashboard/complaints", element: <ComplaintsList /> },
    { path: "/dashboard/addComplaints", element: <ComplaintsForm /> },
    {
        path: "/dashboard/editComplaints/:complaintId",
        element: <EditComplaint />,
    },

    // Rooms Routes
    { path: "/dashboard/rooms", element: <AllRooms /> },
    { path: "/dashboard/addRoom", element: <AddRoom /> },
    { path: "/dashboard/editRoom/:roomId", element: <EditRoom /> },
    // Fees Routes
    { path: "/dashboard/fees", element: <Fee /> },
    { path: "/dashboard/addFee", element: <AddFee /> },
    { path: "/dashboard/editFee/:feeId", element: <EditFee /> },
        // Library Routes
    { path: "/dashboard/library", element: <AllLibraries/> },
    { path: "/dashboard/addLibrary", element: <AddLibrary /> },
    { path: "/dashboard/editLibrary/:libraryId", element: <EditLibrary /> },
    
];
