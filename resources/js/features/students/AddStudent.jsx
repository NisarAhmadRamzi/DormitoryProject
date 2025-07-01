import { useTranslation } from 'react-i18next'
import { useUser } from '../../context/UserContext'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import CreateStudentForm from './CreateStudentForm'

const AddStudent = () => {
  const { t } = useTranslation()
  const { user } = useUser()
  const role = user?.role

  // Do not render the button for students
  if (role === 'student') return null

  return (
    <Modal.Provider>
      <Modal.Open opensWindowName="room-form">
        <Button>{t('addStudent.buttonText')}</Button>
      </Modal.Open>

      <Modal.Window name="room-form">
        <CreateStudentForm />
      </Modal.Window>
    </Modal.Provider>
  )
}

export default AddStudent
