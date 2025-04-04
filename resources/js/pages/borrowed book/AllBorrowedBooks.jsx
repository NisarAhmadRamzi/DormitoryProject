import '../rooms/AllRooms.css'

import React from 'react'
import { SideBar } from '../dashboard/Dashboard'
import BorrowedBooksList from './BorrowedBooksList'

function AllBorrowedBooks() {
  return (
    <div className="room-main-container">
      <div className="room-sidebar-container">
        <SideBar />
      </div>
      <div className="room-content-area">
        <BorrowedBooksList />
      </div>
    </div>
  )
}

export default AllBorrowedBooks
