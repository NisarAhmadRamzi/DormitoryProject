import AddBook from '../features/books/AddBook'
import BooksTable from '../features/books/BooksTable'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

function Books() {
  return (
    <>
      <Row>
        <Heading as="h1" style={{ textAlign: 'center' }}>
          Books
        </Heading>
        <BooksTable />
        <AddBook />
      </Row>
    </>
  )
}

export default Books
