import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'

import BorrowedBooksRow from './BorrowedBooksRow'
import { FiSearch } from 'react-icons/fi'
import Spinner from '../../ui/Spinner'
import { getBorrowedBooks } from '../../services/apiBorrowedBooks'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'

// Styled components
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

const TopBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.6rem 2.4rem 0 0rem;
  gap: 2rem;
  flex-wrap: wrap;
`

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
`

const SearchInputContainer = styled.div`
  position: relative;
  width: 300px;

  svg {
    position: absolute;
    top: 50%;
    left: 90%;
    transform: translateY(-50%);
    color: var(--color-grey-900);
    font-size: 1.4rem;
    pointer-events: none;
  }

  input {
    font-size: 1.4rem;
    padding: 0.6rem 1rem 0.6rem 2.8rem;
    border: 1px solid var(--color-grey-300);
    border-radius: 4px;
    width: 100%;
  }
`

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.6rem;
  border-top: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  font-size: 1.4rem;
  gap: 2rem;
`

const PageInfo = styled.div`
  font-weight: 500;
`

const RowsPerPage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  select {
    padding: 0.4rem 0.8rem;
    font-size: 1.4rem;
    border: 1px solid var(--color-grey-300);
    border-radius: 6px;
    background-color: white;
  }
`

const NavButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  button {
    padding: 0.4rem 0.8rem;
    font-size: 2rem;
    background-color: white;
    border: 1px solid var(--color-grey-300);
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover:not(:disabled) {
      background-color: var(--color-grey-100);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`

function BorrowedBooksTable() {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1
  const limitFromParams = Number(searchParams.get('limit'))
  const [rowsPerPage, setRowsPerPage] = useState(limitFromParams || 10)
  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')
  const [searchText, setSearchText] = useState('')

  const { isLoading, data, error } = useQuery({
    queryKey: ['borrowed-books'],
    queryFn: getBorrowedBooks,
  })

  if (isLoading) return <Spinner />
  if (error) return <div>Error loading borrowed books!</div>

  let borrowedBooks = data?.data || []

  // Filter
  if (searchText.trim()) {
    borrowedBooks = borrowedBooks.filter((entry) => {
      const studentName =
        entry.student?.name || entry.library_student?.name || ''
      const bookTitle = entry.book?.title || ''
      const searchString = `${studentName} ${bookTitle}`.toLowerCase()
      return searchString.includes(searchText.toLowerCase())
    })
  }

  // Sort
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

  const totalItems = borrowedBooks.length
  const totalPages = Math.ceil(totalItems / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const paginatedData = borrowedBooks.slice(
    startIndex,
    startIndex + rowsPerPage
  )

  function handleSort(column) {
    if (sortBy === column) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  function renderSortIcon(column) {
    if (sortBy === column) return sortOrder === 'asc' ? '↑' : '↓'
    return '↑↓'
  }

  function handlePageChange(newPage) {
    const params = new URLSearchParams(searchParams)
    params.set('page', newPage)
    params.set('limit', rowsPerPage)
    setSearchParams(params)
  }

  function handleRowsPerPageChange(e) {
    const newRowsPerPage = Number(e.target.value)
    setRowsPerPage(newRowsPerPage)

    const params = new URLSearchParams(searchParams)
    params.set('page', 1)
    params.set('limit', newRowsPerPage)
    setSearchParams(params)
  }

  return (
    <>
      <TopBarWrapper>
        <SearchWrapper>
          <SearchInputContainer>
            <FiSearch />
            <input
              type="text"
              placeholder="Search borrowed books..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </SearchInputContainer>
        </SearchWrapper>
      </TopBarWrapper>

      <Table role="table">
        <TableHeader role="row">
          <SortableHeader
            onClick={() => handleSort('student')}
            className={sortBy === 'student' ? 'active' : ''}
          >
            Student <span className="icon">{renderSortIcon('student')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('book')}
            className={sortBy === 'book' ? 'active' : ''}
          >
            Book <span className="icon">{renderSortIcon('book')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('borrow_date')}
            className={sortBy === 'borrow_date' ? 'active' : ''}
          >
            Borrow Date{' '}
            <span className="icon">{renderSortIcon('borrow_date')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('return_date')}
            className={sortBy === 'return_date' ? 'active' : ''}
          >
            Return Date{' '}
            <span className="icon">{renderSortIcon('return_date')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('books_count')}
            className={sortBy === 'books_count' ? 'active' : ''}
          >
            Books Count{' '}
            <span className="icon">{renderSortIcon('books_count')}</span>
          </SortableHeader>
          <div>Action</div>
        </TableHeader>

        {paginatedData.map((entry) => (
          <BorrowedBooksRow key={entry.id} borrowedBook={entry} />
        ))}

        {borrowedBooks.length === 0 && (
          <div style={{ padding: '1.6rem' }}>No matching records found.</div>
        )}

        <PaginationWrapper>
          <PageInfo>
            Page {currentPage} of {totalPages}
          </PageInfo>

          <RowsPerPage>
            Rows per page:
            <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </RowsPerPage>

          <NavButtons>
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <RxCaretLeft />
            </button>
            <button
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
            >
              <RxCaretRight />
            </button>
          </NavButtons>
        </PaginationWrapper>
      </Table>
    </>
  )
}

export default BorrowedBooksTable
