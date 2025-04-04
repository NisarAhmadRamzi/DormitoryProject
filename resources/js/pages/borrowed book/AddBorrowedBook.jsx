import '../allUsers/AllUsers.css'

import React from 'react'
import { SideBar } from '../dashboard/Dashboard'
import NewBorrowedBook from './NewBorrowedBook'

function AddBorrowedBook() {
  return (
    <div className="main-container">
      <div className="sidebar-container">
        <SideBar />
      </div>
      <div className="content-area">
        {/* <h1 style={{ textAlign: 'center' }}>Add a boorowed book</h1> */}
        <NewBorrowedBook />
      </div>
    </div>
  )
}

export default AddBorrowedBook
