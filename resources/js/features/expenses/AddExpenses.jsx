import { useTranslation } from 'react-i18next'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import CreateExpenseForm from './CreateExpesesForm'

const AddExpenses = () => {
  const { t } = useTranslation()

  return (
    <Modal.Provider>
      <Modal.Open opensWindowName="expense-form">
        <Button>{t('AddExpenses.addNew')}</Button>
      </Modal.Open>

      <Modal.Window name="expense-form">
        <CreateExpenseForm />
      </Modal.Window>
    </Modal.Provider>
  )
}

export default AddExpenses
