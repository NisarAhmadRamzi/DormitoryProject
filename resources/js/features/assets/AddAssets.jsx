import Button from '../../ui/Button'
import Modal from '../../ui/Modal' // Now using the default export

const AddAssets = () => {
  return (
    <Modal.Provider>
      <Modal.Open opensWindowName="room-form">
        <Button>Add new Assets</Button>
      </Modal.Open>

      <Modal.Window name="room-form">
        {/* <CreateLibraryForm /> */}
      </Modal.Window>
    </Modal.Provider>
  )
}

export default AddAssets
