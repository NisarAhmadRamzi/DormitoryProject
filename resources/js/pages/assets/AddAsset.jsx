import React from 'react'
import { SideBar } from '../dashboard/Dashboard'
import NewAsset from './NewAsset'

function AddAsset() {
  return (
    <div className="room-main-container">
      <div className="room-sidebar-container">
        <SideBar />
      </div>
      <div className="room-content-area">
        <NewAsset />
      </div>
    </div>
  )
}

export default AddAsset
