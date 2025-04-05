import React from 'react'
import { SideBar } from '../dashboard/Dashboard'

function AddAsset() {
  return (
    <div className="room-main-container">
      <div className="room-sidebar-container">
        <SideBar />
      </div>
      <div className="room-content-area">{/* <AssetsList /> */}</div>
    </div>
  )
}

export default AddAsset
