import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiSearch } from 'react-icons/fi'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { getBorrowedBooks } from '../../services/apiBorrowedBooks'
import Spinner from '../../ui/Spinner'
import BorrowedBooksRow from './BorrowedBooksRow'
import AddBorrowedBook from './AddBorrowedBook'

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  overflow: hidden;
`

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 2fr 2fr 2fr 2fr 0.5fr;
  gap: 0.5rem;
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
  padding: 1.6rem 2.4rem 0;
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
    left: 1rem;
    transform: translateY(-50%);
    color: var(--color-grey-600);
    font-size: 1.4rem;
    pointer-events: none;
  }

  input {
    width: 100%;
    font-size: 1.4rem;
    padding: 0.6rem 1rem 0.6rem 3rem;
    border: 1px solid var(--color-grey-300);
    border-radius: var(--border-radius-sm);
    background-color: var(--color-grey-0);
    color: var(--color-grey-900);

    &:focus {
      border-color: var(--color-blue-700);
      outline: none;
      box-shadow: 0 0 0 3px var(--backdrop-color);
    }
  }
`

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.6rem;
  border-top: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
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
    border-radius: var(--border-radius-sm);
    background-color: var(--color-grey-0);
    color: var(--color-grey-900);

    &:disabled {
      background-color: var(--color-grey-200);
      color: var(--color-grey-500);
    }
  }
`

const NavButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  button {
    padding: 0.4rem 0.8rem;
    font-size: 2rem;
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-300);
    border-radius: var(--border-radius-sm);
    color: var(--color-grey-900);
    cursor: pointer;
    transition: background-color 0.2s, border-color 0.2s;

    &:hover:not(:disabled) {
      background-color: var(--color-grey-50);
      border-color: var(--color-grey-400);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`

export default function BorrowedBooksTable() {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1
  const [rowsPerPage, setRowsPerPage] = useState(
    Number(searchParams.get('limit')) || 10
  )
  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')
  const [searchText, setSearchText] = useState('')

  const { isLoading, data, error } = useQuery({
    queryKey: ['borrowed-books'],
    queryFn: getBorrowedBooks,
  })

  if (isLoading) return <Spinner />
  if (error) return <div>{t('borrowedBooksTable.error')}</div>

  let borrowedBooks = data?.data || []

  if (searchText.trim()) {
    const lower = searchText.toLowerCase()
    borrowedBooks = borrowedBooks.filter((entry) => {
      const studentName = (
        entry.student?.name ||
        entry.library_student?.name ||
        ''
      ).toLowerCase()
      const bookTitle = (entry.book?.title || '').toLowerCase()
      return `${studentName} ${bookTitle}`.includes(lower)
    })
  }

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
      return aVal === bVal
        ? 0
        : sortOrder === 'asc'
        ? aVal < bVal
          ? -1
          : 1
        : aVal < bVal
        ? 1
        : -1
    })
  }

  const totalItems = borrowedBooks.length
  const totalPages = Math.ceil(totalItems / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const paginatedData = borrowedBooks.slice(
    startIndex,
    startIndex + rowsPerPage
  )

  const handleSort = (column) => {
    if (sortBy === column)
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  const renderSortIcon = (column) =>
    sortBy === column ? (sortOrder === 'asc' ? '↑' : '↓') : '↑↓'

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', newPage)
    params.set('limit', rowsPerPage)
    setSearchParams(params)
  }

  const handleRowsPerPageChange = (e) => {
    const limit = Number(e.target.value)
    setRowsPerPage(limit)
    const params = new URLSearchParams(searchParams)
    params.set('page', 1)
    params.set('limit', limit)
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
              placeholder={t('borrowedBooksTable.searchPlaceholder')}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </SearchInputContainer>
        </SearchWrapper>
        <AddBorrowedBook/>
      </TopBarWrapper>

      <Table role="table">
        <TableHeader role="row">
          <SortableHeader
            onClick={() => handleSort('student')}
            className={sortBy === 'student' ? 'active' : ''}
          >
            {t('borrowedBooksTable.student')}{' '}
            <span className="icon">{renderSortIcon('student')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('book')}
            className={sortBy === 'book' ? 'active' : ''}
          >
            {t('borrowedBooksTable.book')}{' '}
            <span className="icon">{renderSortIcon('book')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('borrow_date')}
            className={sortBy === 'borrow_date' ? 'active' : ''}
          >
            {t('borrowedBooksTable.borrowDate')}{' '}
            <span className="icon">{renderSortIcon('borrow_date')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('return_date')}
            className={sortBy === 'return_date' ? 'active' : ''}
          >
            {t('borrowedBooksTable.returnDate')}{' '}
            <span className="icon">{renderSortIcon('return_date')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('books_count')}
            className={sortBy === 'books_count' ? 'active' : ''}
          >
            {t('borrowedBooksTable.booksCount')}{' '}
            <span className="icon">{renderSortIcon('books_count')}</span>
          </SortableHeader>
          <div>{t('borrowedBooksTable.action')}</div>
        </TableHeader>

        {paginatedData.map((entry) => (
          <BorrowedBooksRow key={entry.id} borrowedBook={entry} />
        ))}

        {borrowedBooks.length === 0 && (
          <div style={{ padding: '1.6rem' }}>
            {t('borrowedBooksTable.noRecords')}
          </div>
        )}

        <PaginationWrapper>
          <PageInfo>
            {t('borrowedBooksTable.pageInfo', { currentPage, totalPages })}
          </PageInfo>
          <RowsPerPage>
            {t('borrowedBooksTable.rowsPerPage')}
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
              aria-label={t('libraryTable.previousPage')}
            >
              &lt;
            </button>
            <button
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              aria-label={t('libraryTable.nextPage')}
            >
              &gt;
            </button>
          </NavButtons>
        </PaginationWrapper>
      </Table>
    </>
  )
}
