import React from 'react'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal' // Now using the default export
import CreateBorrowedBookForm from './CreateBorrowedBookForm'

const AddBorroedBook = () => {
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
