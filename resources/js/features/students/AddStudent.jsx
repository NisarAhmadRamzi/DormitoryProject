import Button from '../../ui/Button'
import CreateStudentForm from './CreateStudentForm'
import Modal from '../../ui/Modal'
import { useUser } from '../../context/UserContext'

const AddStudent = () => {
  const { user } = useUser()
  const role = user?.role

  // Do not render the button for students
  if (role === 'student') return null

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
