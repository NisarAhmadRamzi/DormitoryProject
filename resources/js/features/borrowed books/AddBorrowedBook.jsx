import { useTranslation } from 'react-i18next'
import { useUser } from '../../context/UserContext'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import CreateBorrowedBookForm from './CreateBorrowedBookForm'

const AddBorrowedBook = () => {
  const { user } = useUser()
  const role = user?.role
  const { t } = useTranslation()

  if (role === 'student') return null

  return (
    <Modal.Provider>
      <Modal.Open opensWindowName="borrowed-book-form">
        <Button>{t('borrowBooks.addNew')}</Button>
      </Modal.Open>

      <Modal.Window name="borrowed-book-form">
        <CreateBorrowedBookForm />
      </Modal.Window>
    </Modal.Provider>
  )
}

export default AddBorrowedBook
