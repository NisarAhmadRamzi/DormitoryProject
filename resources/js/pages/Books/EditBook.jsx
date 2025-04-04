import '../../pages/allUsers/AllUsers.css'

import { SideBar } from '../../pages/dashboard/Dashboard'
import BookEditing from './BookEditing'

function EditBook() {
  return (
    <div className="main-container">
      <div className="sidebar-container">
        <SideBar />
      </div>
      <div className="content-area">
        {/* <h1 style={{ textAlign: 'center' }}>Book editing</h1> */}
        <BookEditing />
      </div>
    </div>
  )
}

export default EditBook
