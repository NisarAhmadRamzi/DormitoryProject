import React from "react";
import "./App.css";
import ReactDOM from "react-dom/client";
import Admin from "../pages/admin/Admin";
import Home from "../pages/home/Home";
import { BrowserRouter, useRoutes } from "react-router-dom";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import View_Dorm from "../pages/view-dorm/View_Dorm";
import Member from "../pages/member/Member";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminPanel from "../pages/adminPanel/AdminPanel";
import AddUser from "../pages/addUser/AddUser";
import EditUser from "../pages/editUser/EditUser";
import MyNavbar from "./navbar/Navbar";
import { allRoutes } from "../routes";
export default function App() {
    const routes = useRoutes(allRoutes);
    return routes;
}

const container = document.getElementById("app");
const root = ReactDOM.createRoot(container); // Note the lowercase `root` here (variable name shouldn't conflict with imported modules)
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <MyNavbar />
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
