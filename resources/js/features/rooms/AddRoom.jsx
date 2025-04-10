import { ModalContext, ModalProvider } from '../../ui/Modal'

import React from 'react'
import Button from '../../ui/Button'
import CreateRoomForm from './CreateRoomForm'
import CabinsTable from './RoomTable'

const AddRoom = () => {
  return (
    <ModalProvider>
      <ModalContext.Consumer>
        {({ open, close, openName }) => (
          <>
            {/* Modal Open/Window for Add Room */}
            <ModalProvider.Open opensWindowName="room-form">
              <Button>Add new room</Button>
            </ModalProvider.Open>
            <ModalProvider.Window name="room-form">
              <CreateRoomForm />
            </ModalProvider.Window>

            {/* Modal Open/Window for Show Table */}
            <ModalProvider.Open opensWindowName="table">
              <Button>Show table</Button>
            </ModalProvider.Open>
            <ModalProvider.Window name="table">
              <CabinsTable />
            </ModalProvider.Window>
          </>
        )}
      </ModalContext.Consumer>
    </ModalProvider>
  )
}

export default AddRoom
