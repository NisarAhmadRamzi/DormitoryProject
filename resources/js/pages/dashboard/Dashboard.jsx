import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";
import "./FeeCollection.css";

import { Link } from "react-router-dom";
import React from "react";

function Dashboard() {
    return (
        <div className="main-container">
            <div className="sidebar-container">
                <SideBar />
            </div>
            <div className="content-area">
                <Content />
            </div>
        </div>
    );
}

export default Dashboard;

export function SideBar() {
    return (
        <div className="dlabnav">
            <div
                className="dlabnav-scroll"
                style={{ maxHeight: "100vh", overflowY: "auto" }}
            >
                <ul className="metismenu list-unstyled" id="menu">
                    <li>
                        <a
                            className="d-flex align-items-center has-arrow"
                            href="javascript:void()"
                            aria-expanded="false"
                        >
                            <i className="la la-home fs-3 me-3"></i>{" "}
                            {/* fs-3 increases icon size */}
                            <Link to="/dashboard">
                                <span className="nav-text fs-5">Dashboard</span>
                            </Link>
                            {/* fs-5 increases text size */}
                        </a>
                    </li>

                    <li>
                        <a
                            className="d-flex align-items-center has-arrow"
                            href="javascript:void()"
                            aria-expanded="false"
                        >
                            <i className="la la-user fs-3 me-3"></i>
                            <span className="nav-text fs-5">Users</span>
                        </a>
                        <ul aria-expanded="false">
                            <li>
                                <Link to="/dashboard/allUsers">All Users</Link>
                            </li>
                            <li>
                                <a href="professor-profile.html">
                                    User Profile
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a
                            className="d-flex align-items-center has-arrow"
                            href="javascript:void()"
                            aria-expanded="false"
                        >
                            <i className="la la-users fs-3 me-3"></i>
                            <span className="nav-text fs-5">Students</span>
                        </a>
                        <ul aria-expanded="false">
                            <li>
                                <Link to="/allStudents">All Students</Link>
                            </li>
                            <li>
                                <a href="about-student.html">About Students</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a
                            className="d-flex align-items-center has-arrow"
                            href="javascript:void()"
                            aria-expanded="false"
                        >
                            {/* <i className="la la-graduation-cap fs-3 me-3"></i>
                            <span className="nav-text fs-5">Complaints</span> */}
                            <i className="la la-exclamation-triangle fs-3 me-3"></i>
                            <span className="nav-text fs-5">Complaints</span>
                        </a>
                        <ul aria-expanded="false">
                            <li>
                                <Link to="/dashboard/complaints">
                                    All Complaints
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/addComplaints">
                                    Add Complaints
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a
                            className="d-flex align-items-center has-arrow"
                            href="javascript:void()"
                            aria-expanded="false"
                        >
                            <i className="la la-building fs-3 me-3"></i>
                            <span className="nav-text fs-6">
                                Rooms Available
                            </span>
                        </a>
                        <ul aria-expanded="false">
                            <li>
                                <Link to="/dashboard/rooms">All Rooms</Link>
                            </li>
                            <li>
                                <Link to="/dashboard/addRoom">Add Room</Link>
                            </li>
                            <li>
                                <a href="edit-departments.html">Edit Room</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a
                            className="d-flex align-items-center has-arrow"
                            href="javascript:void()"
                            aria-expanded="false"
                        >
                            <i className="fa fa-dollar-sign fs-3 me-3"></i>{" "}
                            {/* Fee Icon */}
                            <span className="nav-text fs-6">Fees</span>
                        </a>

                        <ul aria-expanded="false">
                            <li>
                                <Link to="/dashboard/fees">All Fees</Link>
                            </li>
                            <li>
                                <Link to="/dashboard/addFee">Add Fee</Link>
                            </li>
                            <li>
                                <a href="edit-departments.html">Edit Fee</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a
                            className="d-flex align-items-center has-arrow"
                            href="javascript:void()"
                            aria-expanded="false"
                        >
                            <i className="la la-book fs-3 me-3"></i>
                            <span className="nav-text fs-5">Library</span>
                        </a>
                        <ul aria-expanded="false">
                            <li>
                                <Link to="/dashboard/library">All Library</Link>
                            </li>
                            <li>
                                <a href="add-library.html">Add Library</a>
                            </li>
                            <li>
                                <a href="edit-library.html">Edit Library</a>
                            </li>
                        </ul>
                    </li>
                                        <li>
                        <a
                            className="d-flex align-items-center has-arrow"
                            href="javascript:void()"
                            aria-expanded="false"
                        >
                            <i className="la la-book fs-3 me-3"></i>
                            <span className="nav-text fs-5">Library</span>
                        </a>
                        <ul aria-expanded="false">
                            <li>
                                <Link to="/dashboard/libraryStudent">All Library Students</Link>
                            </li>
                            <li>
                                <a href="add-library.html">Add Library</a>
                            </li>
                            <li>
                                <a href="edit-library.html">Edit Library</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a
                            className="d-flex align-items-center has-arrow"
                            href="javascript:void()"
                            aria-expanded="false"
                        >
                            <i className="la la-users fs-3 me-3"></i>
                            <span className="nav-text fs-5">Staff</span>
                        </a>
                        <ul aria-expanded="false">
                            <li>
                                <a href="all-staff.html">All Staff</a>
                            </li>
                            <li>
                                <a href="add-staff.html">Add Staff</a>
                            </li>
                            <li>
                                <a href="edit-staff.html">Edit Staff</a>
                            </li>
                            <li>
                                <a href="staff-profile.html">Staff Profile</a>
                            </li>
                        </ul>
                    </li>
                    {/* The rest of the sidebar items can follow the same pattern */}
                </ul>
            </div>
        </div>
    );
}

export function Content() {
    return (
        <div className="content-body">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-3 col-xxl-3 col-sm-6">
                        <div className="widget-stat card bg-primary overflow-hidden">
                            <div className="card-header">
                                <h3 className="card-title text-white">
                                    Total Students
                                </h3>
                                <h5 className="text-white mb-0">
                                    <i className="fa fa-caret-up"></i> 422
                                </h5>
                            </div>
                            <div className="card-body text-center mt-3">
                                <div className="ico-sparkline">
                                    <div id="sparkline12"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-xxl-3 col-sm-6">
                        <div className="widget-stat card bg-success overflow-hidden">
                            <div className="card-header">
                                <h3 className="card-title text-white">
                                    New Students
                                </h3>
                                <h5 className="text-white mb-0">
                                    <i className="fa fa-caret-up"></i> 357
                                </h5>
                            </div>
                            <div className="card-body text-center mt-4 p-0">
                                <div className="ico-sparkline">
                                    <div id="spark-bar-2"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-xxl-3 col-sm-6">
                        <div className="widget-stat card bg-secondary overflow-hidden">
                            <div className="card-header pb-3">
                                <h3 className="card-title text-white">
                                    Total Course
                                </h3>
                                <h5 className="text-white mb-0">
                                    <i className="fa fa-caret-up"></i> 547
                                </h5>
                            </div>
                            <div className="card-body p-0 mt-2">
                                <div className="px-4">
                                    <span
                                        className="bar1"
                                        data-peity='{ "fill": ["rgb(0, 0, 128)", "rgb(7, 135, 234)"]}'
                                    >
                                        6,2,8,4,-3,8,1,-3,6,-5,9,2,-8,1,4,8,9,8,2,1
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-xxl-3 col-sm-6">
                        <div className="widget-stat card bg-danger overflow-hidden">
                            <div className="card-header pb-3">
                                <h3 className="card-title text-white">
                                    Fees Collection
                                </h3>
                                <h5 className="text-white mb-0">
                                    <i className="fa fa-caret-up"></i> 3280$
                                </h5>
                            </div>
                            <div className="card-body p-0 mt-1">
                                <span
                                    className="peity-line-2"
                                    data-width="100%"
                                >
                                    7,6,8,7,3,8,3,3,6,5,9,2,8
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-xxl-6 col-sm-6">
                        <div className="card shadow1">
                            <div className="card-header">
                                <h3 className="card-title">
                                    Income/Expense Report
                                </h3>
                            </div>
                            <div className="card-body">
                                <canvas id="barChart_2"></canvas>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-xxl-6 col-sm-6">
                        <div className="card shadow1">
                            <div className="card-header">
                                <h3 className="card-title">
                                    Income/Expense Report
                                </h3>
                            </div>
                            <div className="card-body">
                                <canvas id="areaChart_1"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
