import { useTranslation } from 'react-i18next'
import ExpenseTable from '../features/expenses/ExpensesTable'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

function Expenses() {
  const { t } = useTranslation()

  return (
    <Row>
      <Heading as="h1" style={{ textAlign: 'center' }}>
        {t('expenses')}
      </Heading>
      <ExpenseTable />
    </Row>
  )
}

export default Expenses
