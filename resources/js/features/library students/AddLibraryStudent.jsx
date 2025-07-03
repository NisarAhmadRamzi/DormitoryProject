import { useTranslation } from 'react-i18next'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import CreateLibraryStudentForm from './CreateLibraryStudentForm'

const AddLibraryStudent = () => {
  const { t } = useTranslation()

  return (
    <Modal.Provider>
      <Modal.Open opensWindowName="room-form">
        <Button>{t('addLibraryStudent.addButton')}</Button>
      </Modal.Open>
      <Modal.Window name="room-form">
        <CreateLibraryStudentForm />
      </Modal.Window>
    </Modal.Provider>
  )
}

export default AddLibraryStudent
