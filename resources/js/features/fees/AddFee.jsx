import { useTranslation } from 'react-i18next'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import CreateFeeForm from './CreateFeeForm'

const AddFees = () => {
  const { t } = useTranslation()

  return (
    <Modal.Provider>
      <Modal.Open opensWindowName="room-form">
        <Button>{t('AddFees.addNew')}</Button>
      </Modal.Open>

      <Modal.Window name="room-form">
        <CreateFeeForm />
      </Modal.Window>
    </Modal.Provider>
  )
}

export default AddFees
