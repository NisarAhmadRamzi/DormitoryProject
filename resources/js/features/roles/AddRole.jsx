import { useTranslation } from 'react-i18next'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import EditRoleForm from './EditRoleForm'

const AddRole = () => {
  const { t } = useTranslation()

  return (
    <Modal.Provider>
      <Modal.Open opensWindowName="create-role-form">
        <Button>{t('addRole.buttonText')}</Button>
      </Modal.Open>

      <Modal.Window name="create-role-form">
        <EditRoleForm />
      </Modal.Window>
    </Modal.Provider>
  )
}

export default AddRole
