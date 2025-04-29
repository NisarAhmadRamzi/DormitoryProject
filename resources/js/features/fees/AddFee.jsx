import React from 'react'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal' // Now using the default export
import CreateFeeForm from './CreateFeeForm'

const AddFees = () => {
  return (
    <Modal.Provider>
      <Modal.Open opensWindowName="room-form">
        <Button>Add new Fees</Button>
      </Modal.Open>

      <Modal.Window name="room-form">
        <CreateFeeForm />
      </Modal.Window>
    </Modal.Provider>
  )
}

export default AddFees
