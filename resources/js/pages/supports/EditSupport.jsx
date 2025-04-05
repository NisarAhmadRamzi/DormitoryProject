import React from 'react'
import { SideBar } from '../dashboard/Dashboard'
import SupportEditing from './SupportEditing'

function EditSupport() {
  return (
    <div className="room-main-container">
      <div className="room-sidebar-container">
        <SideBar />
      </div>
      <div className="room-content-area">
        <SupportEditing />
      </div>
    </div>
  )
}

export default EditSupport
