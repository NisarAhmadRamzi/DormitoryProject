import { useTranslation } from 'react-i18next'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import CreateLibraryForm from './CreateLibraryForm'

const AddLibrary = () => {
  const { t } = useTranslation()

  return (
    <Modal.Provider>
      <Modal.Open opensWindowName="library-form">
        <Button>{t('AddLibraries.addNew')}</Button>
      </Modal.Open>

      <Modal.Window name="library-form">
        <CreateLibraryForm />
      </Modal.Window>
    </Modal.Provider>
  )
}

export default AddLibrary
