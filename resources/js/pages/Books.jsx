import { useTranslation } from 'react-i18next'
import AddBook from '../features/books/AddBook'
import BooksTable from '../features/books/BooksTable'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

function Books() {
  const { t } = useTranslation()

  return (
    <>
      <Row>
        <Heading as="h1" style={{ textAlign: 'center' }}>
          {t('books')}
        </Heading>
        <BooksTable />
        <AddBook />
      </Row>
    </>
  )
}

export default Books
