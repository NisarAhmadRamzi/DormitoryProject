import Button from '../../ui/Button'
import CreateBookForm from './CreateBookForm'
import Modal from '../../ui/Modal' // Now using the default export
import { useUser } from '../../context/UserContext'

const AddBook = () => {
  const { user } = useUser()
  const role = user?.role
  if (role === 'student') return null
  return (
    <Modal.Provider>
      <Modal.Open opensWindowName="room-form">
        <Button>Add new Book</Button>
      </Modal.Open>

      <Modal.Window name="room-form">
        <CreateBookForm />
      </Modal.Window>
    </Modal.Provider>
  )
}

export default AddBook
