import React from 'react'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal' // Now using the default export
import CreateStudentForm from './CreateStudentForm'

const AddStudent = () => {
  return (
    <Modal.Provider>
      <Modal.Open opensWindowName="room-form">
        <Button>Add new student</Button>
      </Modal.Open>

      <Modal.Window name="room-form">
        <CreateStudentForm />
      </Modal.Window>
    </Modal.Provider>
  )
}

export default AddStudent
