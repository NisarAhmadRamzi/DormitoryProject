import { useTranslation } from 'react-i18next'
import { useUser } from '../../context/UserContext'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import CreateBookForm from './CreateBookForm'

const AddBook = () => {
  const { t } = useTranslation()
  const { user } = useUser()
  const role = user?.role
  if (role === 'student') return null

  return (
    <Modal.Provider>
      <Modal.Open opensWindowName="room-form">
        <Button>{t('AddBooks.addBookButton')}</Button>
      </Modal.Open>

      <Modal.Window name="room-form">
        <CreateBookForm />
      </Modal.Window>
    </Modal.Provider>
  )
}

export default AddBook
