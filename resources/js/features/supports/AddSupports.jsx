import { useTranslation } from 'react-i18next'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import CreateSupportForm from './CreateSupportForm'

const AddSupports = () => {
  const { t } = useTranslation()

  return (
    <Modal.Provider>
      <Modal.Open opensWindowName="support-form">
        <Button>{t('AddSupports.addNewSupport')}</Button>
      </Modal.Open>

      <Modal.Window name="support-form">
        <CreateSupportForm />
      </Modal.Window>
    </Modal.Provider>
  )
}

export default AddSupports
