import React from 'react'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal' // Now using the default export
import CreateUserForm from './CreateUserForm'

const AddUser = () => {
  return (
    <Modal.Provider>
      <Modal.Open opensWindowName="room-form">
        <Button>Add new User</Button>
      </Modal.Open>

      <Modal.Window name="room-form">
        <CreateUserForm />
      </Modal.Window>
    </Modal.Provider>
  )
}

export default AddUser
