import React from 'react'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal' // Now using the default export
import CreateRoomForm from './CreateRoomForm'

const AddRoom = () => {
  return (
    <Modal.Provider>
      <Modal.Open opensWindowName="room-form">
        <Button>Add new room</Button>
      </Modal.Open>

      <Modal.Window name="room-form">
        <CreateRoomForm />
      </Modal.Window>
    </Modal.Provider>
  )
}

export default AddRoom
