import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import EditRoleForm from './EditRoleForm' 

const AddRole = () => {
  return (
    <Modal.Provider>
      <Modal.Open opensWindowName="create-role-form">
        <Button>Add new role</Button>
      </Modal.Open>

      <Modal.Window name="create-role-form">
        <EditRoleForm />
      </Modal.Window>
    </Modal.Provider>
  )
}

export default AddRole
