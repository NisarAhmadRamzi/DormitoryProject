import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { getBorrowedBooks } from '../../services/apiBorrowedBooks'
import Pagination from '../../ui/Pagination'
import Spinner from '../../ui/Spinner'
import { PAGE_SIZE } from '../../utils/constants'
import BorrowedBooksRow from './BorrowedBooksRow'

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 2fr 2fr 2fr 2fr 0.5fr;
  column-gap: 0.5rem;
  align-items: center;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`

function BorrowedBooksTable({ search = '' }) {
  const [searchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const { isLoading, data, error } = useQuery({
    queryKey: ['borrowed-books'],
    queryFn: getBorrowedBooks,
  })

  if (isLoading) return <Spinner />
  if (error) return <div>Error loading borrowed books!</div>

  let borrowedBooks = data?.data || []

  if (search.trim()) {
    borrowedBooks = borrowedBooks.filter((entry) => {
      const studentName =
        entry.student?.name || entry.library_student?.name || ''
      const bookTitle = entry.book?.title || ''
      const searchString = `${studentName} ${bookTitle}`.toLowerCase()
      return searchString.includes(search.toLowerCase())
    })
  }

  const totalItems = borrowedBooks.length
  const start = (currentPage - 1) * PAGE_SIZE
  const paginatedData = borrowedBooks.slice(start, start + PAGE_SIZE)

  return (
    <>
      <Table role="table">
        <TableHeader role="row">
          {/* <div>ID</div> */}
          <div>Student Name</div>
          <div>Book Title</div>
          <div>Borrow Date</div>
          <div>Return Date</div>
          <div>Books Count</div>
          <div>Action</div>
        </TableHeader>

        {paginatedData.map((entry) => (
          <BorrowedBooksRow key={entry.id} borrowedBook={entry} />
        ))}

        {borrowedBooks.length === 0 && (
          <div style={{ padding: '1.6rem' }}>No matching records found.</div>
        )}

        <Pagination count={totalItems} />
      </Table>
    </>
  )
}

export default BorrowedBooksTable
