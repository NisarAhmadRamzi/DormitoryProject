import Button from '../../ui/Button'
import CreatePermissionForm from './CreatePermissionForm'
import Modal from '../../ui/Modal'

const AddPermission = () => {
  return (
    <Modal.Provider>
      <Modal.Open opensWindowName="room-form">
        <Button>Add new Permission</Button>
      </Modal.Open>

      <Modal.Window name="room-form">
        <CreatePermissionForm />
      </Modal.Window>
    </Modal.Provider>
  )
}

export default AddPermission
