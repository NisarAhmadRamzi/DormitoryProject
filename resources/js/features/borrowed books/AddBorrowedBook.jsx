import { useTranslation } from 'react-i18next'
import { HiPlus } from 'react-icons/hi2'
import styled from 'styled-components'
import { useUser } from '../../context/UserContext'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import CreateBorrowedBookForm from './CreateBorrowedBookForm'
const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.4rem;
  padding: 0.6rem 1.2rem;
  height: 36px; /* Same height as search input */
  line-height: 1;

  svg {
    font-size: 1.6rem;
  }
`
const AddBorrowedBook = () => {
  const { user } = useUser()
  const role = user?.role
  const { t } = useTranslation()

  if (role === 'student') return null

  return (
    <Modal.Provider>
      <Modal.Open opensWindowName="borrowed-book-form">
        <StyledButton>
          <HiPlus style={{ fontSize: '20px', color: 'white' }} />
          {t('borrowBooks.addNew')}
        </StyledButton>
      </Modal.Open>

      <Modal.Window name="borrowed-book-form">
        <CreateBorrowedBookForm />
      </Modal.Window>
    </Modal.Provider>
  )
}

export default AddBorrowedBook
