import React from 'react'
import { SideBar } from '../dashboard/Dashboard'
import NewSupport from './NewSupport'

function AddSupport() {
  return (
    <div className="room-main-container">
      <div className="room-sidebar-container">
        <SideBar />
      </div>
      <div className="room-content-area">
        <NewSupport />
      </div>
    </div>
  )
}

export default AddSupport
