import Button from '../../ui/Button'
import CreateLibraryStudentForm from './CreateLibraryStudentForm'
import Modal from '../../ui/Modal'

const AddLibraryStudent = () => {
  return (
    <Modal.Provider>
      <Modal.Open opensWindowName="room-form">
        <Button>Add new student in library</Button>
      </Modal.Open>
      <Modal.Window name="room-form">
        <CreateLibraryStudentForm />
      </Modal.Window>
    </Modal.Provider>
  )
}

export default AddLibraryStudent
