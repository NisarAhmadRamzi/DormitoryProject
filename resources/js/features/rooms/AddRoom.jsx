import React, { useState } from 'react'

import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import CreateRoomForm from './CreateRoomForm'

const AddRoom = () => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  return (
    <>
      <Button onClick={() => setIsOpenModal((show) => !show)}>
        Add new cabin
      </Button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateRoomForm
            onCloseModal={() => setIsOpenModal(false)}
          ></CreateRoomForm>
        </Modal>
      )}
    </>
  )
}

export default AddRoom
