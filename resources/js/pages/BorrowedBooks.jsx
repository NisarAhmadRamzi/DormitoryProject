import { useTranslation } from 'react-i18next'
import AddBorrowedBook from '../features/borrowed books/AddBorrowedBook'
import BorrowedBooksTable from '../features/borrowed books/BorrowedBooksTable'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

function BorrowedBooks() {
  const { t } = useTranslation()

  return (
    <>
      <Row>
        <Heading as="h1" style={{ textAlign: 'center' }}>
          {t('borrowedBooks')}
        </Heading>
        <BorrowedBooksTable />
        <AddBorrowedBook />
      </Row>
    </>
  )
}

export default BorrowedBooks
