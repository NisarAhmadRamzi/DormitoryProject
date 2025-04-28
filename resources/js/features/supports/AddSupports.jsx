import React from 'react'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal' // Now using the default export
import CreateSupportForm from './CreateSupportForm'

const AddSupports = () => {
  return (
    <Modal.Provider>
      <Modal.Open opensWindowName="room-form">
        <Button>Add new support</Button>
      </Modal.Open>

      <Modal.Window name="room-form">
        <CreateSupportForm />
      </Modal.Window>
    </Modal.Provider>
  )
}

export default AddSupports
