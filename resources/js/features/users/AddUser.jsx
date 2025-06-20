import Button from '../../ui/Button'
import Modal from '../../ui/Modal' // Now using the default export
import CreateUserForm from './CreateUserForm'

const AddUser = () => {
  return (
    <Modal.Provider>
      <Modal.Open opensWindowName="user-form">
        <Button>Add new User</Button>
      </Modal.Open>

      <Modal.Window name="user-form">
        <CreateUserForm />
      </Modal.Window>
    </Modal.Provider>
  )
}

export default AddUser
