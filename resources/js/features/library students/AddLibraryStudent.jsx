import Button from '../../ui/Button'
import CreateLibraryStudentForm from './CreateLibraryStudentForm'
import Modal from '../../ui/Modal' // Now using the default export
import React from 'react'

const AddLibraryStudent = () => {
  return (
    <Modal.Provider>
      <Modal.Open opensWindowName="room-form">
        <Button>Add new nAddLibraryStudent</Button>
      </Modal.Open>
      <Modal.Window name="room-form">
        <CreateLibraryStudentForm />
      </Modal.Window>
    </Modal.Provider>
  )
}

export default AddLibraryStudent
