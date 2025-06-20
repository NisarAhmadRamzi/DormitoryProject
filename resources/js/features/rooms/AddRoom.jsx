import Button from '../../ui/Button'
import CreateRoomForm from './CreateRoomForm'
import Modal from '../../ui/Modal'
import { useUser } from '../../context/UserContext'
const AddRoom = () => {
  const { user } = useUser()
  const role = user?.role
  if (role === 'student') return null
  return (
    <Modal.Provider>
      <Modal.Open opensWindowName="room-form">
        <Button>Add new room</Button>
      </Modal.Open>

      <Modal.Window name="room-form">
        <CreateRoomForm />
      </Modal.Window>
    </Modal.Provider>
  )
}

export default AddRoom

