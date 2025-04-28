import React from 'react'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal' // Now using the default export
import CreateExpenseForm from './CreateExpesesForm'

const AddExpenses = () => {
  return (
    <Modal.Provider>
      <Modal.Open opensWindowName="room-form">
        <Button>Add new AddExpenses</Button>
      </Modal.Open>

      <Modal.Window name="room-form">
        <CreateExpenseForm />
      </Modal.Window>
    </Modal.Provider>
  )
}

export default AddExpenses
