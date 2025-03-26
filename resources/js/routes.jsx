import Home from "./pages/home/Home";
import Admin from "./pages/admin/Admin";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import View_Dorm from "./pages/view-dorm/View_Dorm";
import Member from "./pages/member/Member";
import Dashboard from "./pages/dashboard/Dashboard";
import AllStudents from "./pages/allStudents/AllStudents";
import EditStudent from "./pages/allStudents/EditStudent";
import AllUsers from "./pages/allUsers/AllUsers";
import UserForm from "./pages/allUsers/UserForm";
import AddNewStudent from "./pages/allStudents/AddNewStudent";
import EditUser from "./pages/allUsers/EditUser";
import ComplaintsForm from "./components/complaints/ComplaintsForm";
import ComplaintsList from "./components/complaints/ComplaintsList";
import EditComplaint from "./components/complaints/EditComplaint";
import AllRooms from "./pages/rooms/AllRooms";
import AddRoom from "./pages/rooms/AddRoom";
import Fee from "./pages/fees/Fee";
import AddFee from "./pages/fees/AddFee";
import EditRoom from "./pages/rooms/EditRoom";
import EditFee from "./pages/fees/EditFee";

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
];
