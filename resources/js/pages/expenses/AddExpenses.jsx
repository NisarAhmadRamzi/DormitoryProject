import React from 'react'
import { SideBar } from '../dashboard/Dashboard'
import NewExpenses from './NewExpenses'

function AddExpenses() {
  return (
    <div className="room-main-container">
      <div className="room-sidebar-container">
        <SideBar />
      </div>
      <div className="room-content-area">
        <NewExpenses />
        {/* <NewExpenses /> */}
      </div>
    </div>
  )
}

export default AddExpenses
