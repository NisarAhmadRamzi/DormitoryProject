import { useTranslation } from 'react-i18next'
import { useUser } from '../../context/UserContext'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import CreateRoomForm from './CreateRoomForm'

const AddRoom = () => {
  const { user } = useUser()
  const role = user?.role
  const { t } = useTranslation()

  if (role === 'student') return null

  return (
    <Modal.Provider>
      <Modal.Open opensWindowName="room-form">
        <Button>{t('Addrooms.addNewRoom')}</Button>
      </Modal.Open>

      <Modal.Window name="room-form">
        <CreateRoomForm />
      </Modal.Window>
    </Modal.Provider>
  )
}

export default AddRoom
