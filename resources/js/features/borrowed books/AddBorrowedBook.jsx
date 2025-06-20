import Button from '../../ui/Button'
import CreateBorrowedBookForm from './CreateBorrowedBookForm'
import Modal from '../../ui/Modal' // Now using the default export
import React from 'react'
import { useUser } from '../../context/UserContext'

const AddBorroedBook = () => {
    const { user } = useUser()
    const role = user?.role
    if (role === 'student') return null
  return (
    <Modal.Provider>
      <Modal.Open opensWindowName="room-form">
        <Button>Add new BorroedBook</Button>
      </Modal.Open>

      <Modal.Window name="room-form">
        <CreateBorrowedBookForm />
      </Modal.Window>
    </Modal.Provider>
  )
}

export default AddBorroedBook
