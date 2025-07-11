import { useTranslation } from 'react-i18next'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import CreatePermissionForm from './CreatePermissionForm'

const AddPermission = () => {
  const { t } = useTranslation()

  return (
    <Modal.Provider>
      <Modal.Open opensWindowName="permission-form">
        <Button>{t('permissions3.addNew')}</Button>
      </Modal.Open>

      <Modal.Window name="permission-form">
        <CreatePermissionForm />
      </Modal.Window>
    </Modal.Provider>
  )
}

export default AddPermission
