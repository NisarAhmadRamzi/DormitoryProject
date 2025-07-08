import Button from '../../ui/Button'
import Modal from '../../ui/Modal' // Now using the default export
import CreateAssetsForm from './CreateAssetsForm'

const AddAssets = () => {
  return (
    <Modal.Provider>
      <Modal.Open opensWindowName="room-form">
        <Button>Add new Assets</Button>
      </Modal.Open>

      <Modal.Window name="room-form">
        <CreateAssetsForm />
      </Modal.Window>
    </Modal.Provider>
  )
}

export default AddAssets
