import React from 'react'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal' // Now using the default export
import CreateLibraryForm from './CreateLibraryForm'

const AddLibrary = () => {
  return (
    <Modal.Provider>
      <Modal.Open opensWindowName="room-form">
        <Button>Add new Library</Button>
      </Modal.Open>

      <Modal.Window name="room-form">
        {/* <CreateRoomForm /> */}
        <CreateLibraryForm />
      </Modal.Window>
    </Modal.Provider>
  )
}

export default AddLibrary
