import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import CreateRoleForm from './CreateRoleForm'

const AddRole = () => {
  return (
    <Modal.Provider>
      <Modal.Open opensWindowName="room-form">
        <Button>Add new role</Button>
      </Modal.Open>

      <Modal.Window name="room-form">
        {/* <CreateRoomForm /> */}
        <CreateRoleForm />
      </Modal.Window>
    </Modal.Provider>
  )
}

export default AddRole
