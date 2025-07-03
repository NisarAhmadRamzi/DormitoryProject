import { useTranslation } from 'react-i18next'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import CreateComplaintForm from './CreateComplaintForm'

const AddComplaints = () => {
  const { t } = useTranslation()

  return (
    <Modal.Provider>
      <Modal.Open opensWindowName="complaint-form">
        <Button>{t('AddComplaints.addNew')}</Button>
      </Modal.Open>

      <Modal.Window name="complaint-form">
        <CreateComplaintForm />
      </Modal.Window>
    </Modal.Provider>
  )
}

export default AddComplaints
