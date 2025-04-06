import 'bootstrap/dist/css/bootstrap.min.css'
import './Dashboard.css'

import { BsCassette, BsCurrencyDollar } from 'react-icons/bs'
import { LuBookCheck, LuUsers } from 'react-icons/lu'
import {
  MdLibraryBooks,
  MdOutlineMeetingRoom,
  MdOutlineMoneyOff,
} from 'react-icons/md'
import { TfiBook, TfiSupport } from 'react-icons/tfi'

import { AiOutlineMoneyCollect } from 'react-icons/ai'
import { FaCoins } from 'react-icons/fa6'
import { IoWarningOutline } from 'react-icons/io5'
import { PiStudent } from 'react-icons/pi'
import { Link } from 'react-router-dom'
//v3
import React from 'react'

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
  )
}

export default Dashboard

export function SideBar() {
  return (
    <div className="dlabnav">
      <div
        className="dlabnav-scroll"
        style={{ maxHeight: '100vh', overflowY: 'auto' }}
      >
        <ul className="metismenu list-unstyled" id="menu">
          <li>
            <a
              className="d-flex align-items-center has-arrow"
              href="javascript:void()"
              aria-expanded="false"
            >
              <LuUsers size="3x" className="me-3" />
              <span className="nav-text fs-5">
                <Link to="/dashboard/allUsers">Users</Link>
              </span>
            </a>
          </li>
          <li>
            <a
              className="d-flex align-items-center has-arrow"
              href="javascript:void()"
              aria-expanded="false"
            >
              <PiStudent style={{ fontSize: '2.5rem' }} className="me-3 icon" />
              <span className="nav-text fs-5">
                <Link to="/allStudents">Students</Link>
              </span>
            </a>
          </li>
          <li>
            <a
              className="d-flex align-items-center has-arrow"
              href="javascript:void()"
              aria-expanded="false"
            >
              <BsCassette
                style={{ fontSize: '2.5rem' }}
                className="me-3 icon"
              />
              <span className="nav-text fs-5">
                <Link to="/dashboard/assets">Assets</Link>
              </span>
            </a>
          </li>
          <li>
            <a
              className="d-flex align-items-center has-arrow"
              href="javascript:void()"
              aria-expanded="false"
            >
              <AiOutlineMoneyCollect
                style={{ fontSize: '2.5rem' }}
                className="me-3 icon"
              />
              <span className="nav-text fs-5">
                <Link to="/dashboard/expenses">Expenses</Link>
              </span>
            </a>
          </li>
          <li>
            <a
              className="d-flex align-items-center has-arrow"
              href="javascript:void()"
              aria-expanded="false"
            >
              <IoWarningOutline
                style={{ fontSize: '2.5rem' }}
                className="me-3 icon"
              />
              <span className="nav-text fs-5">
                <Link to="/dashboard/complaints">Complaints</Link>
              </span>
            </a>
          </li>
          <li>
            <a
              className="d-flex align-items-center has-arrow"
              href="javascript:void()"
              aria-expanded="false"
            >
              <MdOutlineMeetingRoom
                style={{ fontSize: '2.5rem' }}
                className="me-3 icon"
              />
              <span className="nav-text fs-5">
                <Link to="/dashboard/rooms">Rooms</Link>
              </span>
            </a>
          </li>
          <li>
            <a
              className="d-flex align-items-center has-arrow"
              href="javascript:void()"
              aria-expanded="false"
            >
              <BsCurrencyDollar
                style={{ fontSize: '2.5rem' }}
                className="me-3 icon"
              />
              <span className="nav-text fs-5">
                <Link to="/dashboard/fees">Fees</Link>
              </span>
            </a>
          </li>
          <li>
            <a
              className="d-flex align-items-center has-arrow"
              href="javascript:void()"
              aria-expanded="false"
            >
              <MdLibraryBooks
                style={{ fontSize: '2.5rem' }}
                className="me-3 icon"
              />
              <span className="nav-text fs-5">
                <Link to="/dashboard/library">Library</Link>
              </span>
            </a>
          </li>
          <li>
            <a
              className="d-flex align-items-center has-arrow"
              href="javascript:void()"
              aria-expanded="false"
            >
              <TfiSupport
                style={{ fontSize: '2.5rem' }}
                className="me-3 icon"
              />
              <span className="nav-text fs-5">
                <Link to="/dashboard/libraryStudent">Library Students</Link>
              </span>
            </a>
          </li>
          <li>
            <a
              className="d-flex align-items-center has-arrow"
              href="javascript:void()"
              aria-expanded="false"
            >
              <TfiBook style={{ fontSize: '2.5rem' }} className="me-3 icon" />
              <span className="nav-text fs-5">
                <Link to="/dashboard/books">Books</Link>
              </span>
            </a>
          </li>
          <li>
            <a
              className="d-flex align-items-center has-arrow"
              href="javascript:void()"
              aria-expanded="false"
            >
              <LuBookCheck
                style={{ fontSize: '2.5rem' }}
                className="me-3 icon"
              />
              <span className="nav-text fs-5">
                <Link to="/dashboard/borrowedBooks">Borrowed Books</Link>
              </span>
            </a>
          </li>
          <li>
            <a
              className="d-flex align-items-center has-arrow"
              href="javascript:void()"
              aria-expanded="false"
            >
              <FaCoins style={{ fontSize: '2.5rem' }} className="me-3 icon" />
              <span className="nav-text fs-5">
                <Link to="/dashboard/supports">Supports</Link>
              </span>
            </a>
          </li>
          <li>
            <a
              className="d-flex align-items-center has-arrow"
              href="javascript:void()"
              aria-expanded="false"
            >
              <MdOutlineMoneyOff
                style={{ fontSize: '2.5rem' }}
                className="me-3 icon"
              />
              <span className="nav-text fs-5">
                <Link to="/dashboard/assets">Supports</Link>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export function Content() {
  return (
    <div className="content-body">
      <div className="container-fluid">{/* Your content goes here */}</div>
    </div>
  )
}
