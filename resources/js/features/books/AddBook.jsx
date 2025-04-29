import React from 'react'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal' // Now using the default export
import CreateBookForm from './CreateBookForm'

const AddBook = () => {
  return (
    <Modal.Provider>
      <Modal.Open opensWindowName="room-form">
        <Button>Add new Book</Button>
      </Modal.Open>

      <Modal.Window name="room-form">
        <CreateBookForm />
      </Modal.Window>
    </Modal.Provider>
  )
}

export default AddBook
