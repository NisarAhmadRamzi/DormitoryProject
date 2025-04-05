import React from 'react'
import { SideBar } from '../dashboard/Dashboard'
import ExpensesList from './ExpensesList'

function AllExpenses() {
  return (
    <div className="room-main-container">
      <div className="room-sidebar-container">
        <SideBar />
      </div>
      <div className="room-content-area">
        <ExpensesList />
      </div>
    </div>
  )
}

export default AllExpenses
