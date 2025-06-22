import AddBorroedBook from '../features/borrowed books/AddBorrowedBook'
import BorrowedBooksTable from '../features/borrowed books/BorrowedBooksTable'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

function BorrowedBooks() {
  return (
    <>
      <Row>
        <Heading as="h1" style={{ textAlign: 'center' }}>
          Borrowed Books
        </Heading>
        <BorrowedBooksTable />
        <AddBorroedBook />
      </Row>
    </>
  )
}

export default BorrowedBooks
