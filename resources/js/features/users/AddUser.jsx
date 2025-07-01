import { useTranslation } from 'react-i18next'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import CreateUserForm from './CreateUserForm'

const AddUser = () => {
  const { t } = useTranslation()

  return (
    <Modal.Provider>
      <Modal.Open opensWindowName="user-form">
        <Button>{t('addUser.buttonText', 'Add new User')}</Button>
      </Modal.Open>

      <Modal.Window name="user-form">
        <CreateUserForm />
      </Modal.Window>
    </Modal.Provider>
  )
}

export default AddUser
