import React from 'react'
import { SideBar } from '../dashboard/Dashboard'
import ExpensesEditing from './ExpensesEditing'

function EditExpense() {
  return (
    <div className="room-main-container">
      <div className="room-sidebar-container">
        <SideBar />
      </div>
      <div className="room-content-area">
        <ExpensesEditing />
      </div>
    </div>
  )
}

export default EditExpense
