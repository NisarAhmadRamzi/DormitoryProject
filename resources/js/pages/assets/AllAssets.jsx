import React from 'react'
import { SideBar } from '../dashboard/Dashboard'
import AssetsList from './AssetsList'

function AllAssets() {
  return (
    <div className="room-main-container">
      <div className="room-sidebar-container">
        <SideBar />
      </div>
      <div className="room-content-area">
        <AssetsList />
      </div>
    </div>
  )
}

export default AllAssets
