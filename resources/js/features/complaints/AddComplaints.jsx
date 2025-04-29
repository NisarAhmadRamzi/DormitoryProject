import React from 'react'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal' // Now using the default export
import CreateComplaintForm from './CreateComplaintForm'

const AddComplaints = () => {
  return (
    <Modal.Provider>
      <Modal.Open opensWindowName="room-form">
        <Button>Add new Complaints</Button>
      </Modal.Open>

      <Modal.Window name="room-form">
        <CreateComplaintForm />
      </Modal.Window>
    </Modal.Provider>
  )
}

export default AddComplaints
