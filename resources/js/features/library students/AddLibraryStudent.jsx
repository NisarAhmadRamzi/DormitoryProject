import { useTranslation } from 'react-i18next'
import { HiPlus } from 'react-icons/hi2'
import styled from 'styled-components'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import CreateLibraryStudentForm from './CreateLibraryStudentForm'
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
const AddLibraryStudent = () => {
  const { t } = useTranslation()

  return (
    <Modal.Provider>
      <Modal.Open opensWindowName="room-form">
        <StyledButton>
          <HiPlus style={{ fontSize: '20px', color: 'white' }} />
          {t('addLibraryStudent.addButton')}
        </StyledButton>
      </Modal.Open>
      <Modal.Window name="room-form">
        <CreateLibraryStudentForm />
      </Modal.Window>
    </Modal.Provider>
  )
}

export default AddLibraryStudent
