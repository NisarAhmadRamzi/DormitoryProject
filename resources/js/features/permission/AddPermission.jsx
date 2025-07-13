import { useTranslation } from 'react-i18next'
import { HiPlus } from 'react-icons/hi2'
import styled from 'styled-components'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import CreatePermissionForm from './CreatePermissionForm'
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
const AddPermission = () => {
  const { t } = useTranslation()

  return (
    <Modal.Provider>
      <Modal.Open opensWindowName="permission-form">
        <StyledButton>
          <HiPlus style={{ fontSize: '20px', color: 'white' }} />
          {t('permissions3.addNew')}
        </StyledButton>
      </Modal.Open>

      <Modal.Window name="permission-form">
        <CreatePermissionForm />
      </Modal.Window>
    </Modal.Provider>
  )
}

export default AddPermission
