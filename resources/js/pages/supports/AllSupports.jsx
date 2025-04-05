import React from 'react'
import { SideBar } from '../dashboard/Dashboard'
import SupportsList from './SupportsList'

function AllSupports() {
  return (
    <div className="room-main-container">
      <div className="room-sidebar-container">
        <SideBar />
      </div>
      <div className="room-content-area">
        <SupportsList />
      </div>
    </div>
  )
}

export default AllSupports
