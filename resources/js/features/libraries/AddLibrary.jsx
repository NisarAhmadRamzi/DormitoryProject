import Button from '../../ui/Button'
import CreateLibraryForm from './CreateLibraryForm'
import Modal from '../../ui/Modal' // Now using the default export
import React from 'react'

const AddLibrary = () => {
  return (
    <Modal.Provider>
      <Modal.Open opensWindowName="room-form">
        <Button>Add new Library</Button>
      </Modal.Open>

      <Modal.Window name="room-form">
        <CreateLibraryForm />
      </Modal.Window>
    </Modal.Provider>
  )
}

export default AddLibrary
