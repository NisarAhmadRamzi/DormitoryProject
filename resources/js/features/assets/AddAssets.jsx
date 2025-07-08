import { useTranslation } from 'react-i18next'

import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import CreateAssetsForm from './CreateAssetsForm'

const AddAssets = () => {
  const { t } = useTranslation()

  return (
    <Modal.Provider>
      <Modal.Open opensWindowName="asset-form">
        <Button>{t('AddAssets.addNew')}</Button>
      </Modal.Open>

      <Modal.Window name="asset-form">
        <CreateAssetsForm />
      </Modal.Window>
    </Modal.Provider>
  )
}

export default AddAssets
