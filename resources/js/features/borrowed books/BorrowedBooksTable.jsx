import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
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

const SortableHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  user-select: none;

  .icon {
    font-size: 1.2rem;
    color: var(--color-grey-500);
  }

  &.active .icon {
    color: var(--color-grey-900);
    font-weight: bold;
  }
`

function BorrowedBooksTable({ search = '' }) {
  const [searchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const { isLoading, data, error } = useQuery({
    queryKey: ['borrowed-books'],
    queryFn: getBorrowedBooks,
  })

  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')

  if (isLoading) return <Spinner />
  if (error) return <div>Error loading borrowed books!</div>

  let borrowedBooks = data?.data || []

  // 1) FILTER by search:
  if (search.trim()) {
    borrowedBooks = borrowedBooks.filter((entry) => {
      const studentName =
        entry.student?.name || entry.library_student?.name || ''
      const bookTitle = entry.book?.title || ''
      const searchString = `${studentName} ${bookTitle}`.toLowerCase()
      return searchString.includes(search.toLowerCase())
    })
  }

  // 2) SORT if sortBy is set:
  if (sortBy) {
    borrowedBooks = [...borrowedBooks].sort((a, b) => {
      let aVal, bVal

      switch (sortBy) {
        case 'student':
          aVal = (
            a.student?.name ||
            a.library_student?.name ||
            ''
          ).toLowerCase()
          bVal = (
            b.student?.name ||
            b.library_student?.name ||
            ''
          ).toLowerCase()
          break
        case 'book':
          aVal = (a.book?.title || '').toLowerCase()
          bVal = (b.book?.title || '').toLowerCase()
          break
        case 'borrow_date':
          aVal = new Date(a.borrow_date).getTime()
          bVal = new Date(b.borrow_date).getTime()
          break
        case 'return_date':
          aVal = a.return_date ? new Date(a.return_date).getTime() : 0
          bVal = b.return_date ? new Date(b.return_date).getTime() : 0
          break
        case 'books_count':
          aVal = a.books_count ?? 0
          bVal = b.books_count ?? 0
          break
        default:
          aVal = ''
          bVal = ''
      }

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1
      return 0
    })
  }

  // 3) PAGINATE:
  const totalItems = borrowedBooks.length
  const startIndex = (currentPage - 1) * PAGE_SIZE
  const paginatedData = borrowedBooks.slice(startIndex, startIndex + PAGE_SIZE)

  // Toggle sort column/direction
  function handleSort(column) {
    if (sortBy === column) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  // Render the arrow icon for each column
  const renderSortIcon = (column) => {
    if (sortBy === column) {
      return sortOrder === 'asc' ? '↑' : '↓'
    }
    return '↑↓'
  }

  return (
    <>
      <Table role="table">
        <TableHeader role="row">
          {/* Student Name */}
          <SortableHeader
            onClick={() => handleSort('student')}
            className={sortBy === 'student' ? 'active' : ''}
          >
            <div>Student Name</div>
            <span className="icon">{renderSortIcon('student')}</span>
          </SortableHeader>

          {/* Book Title */}
          <SortableHeader
            onClick={() => handleSort('book')}
            className={sortBy === 'book' ? 'active' : ''}
          >
            <div>Book Title</div>
            <span className="icon">{renderSortIcon('book')}</span>
          </SortableHeader>

          {/* Borrow Date */}
          <SortableHeader
            onClick={() => handleSort('borrow_date')}
            className={sortBy === 'borrow_date' ? 'active' : ''}
          >
            <div>Borrow Date</div>
            <span className="icon">{renderSortIcon('borrow_date')}</span>
          </SortableHeader>

          {/* Return Date */}
          <SortableHeader
            onClick={() => handleSort('return_date')}
            className={sortBy === 'return_date' ? 'active' : ''}
          >
            <div>Return Date</div>
            <span className="icon">{renderSortIcon('return_date')}</span>
          </SortableHeader>

          {/* Books Count */}
          <SortableHeader
            onClick={() => handleSort('books_count')}
            className={sortBy === 'books_count' ? 'active' : ''}
          >
            <div>Books Count</div>
            <span className="icon">{renderSortIcon('books_count')}</span>
          </SortableHeader>

          {/* Action (not sortable) */}
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
