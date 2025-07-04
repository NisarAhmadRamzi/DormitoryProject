import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiSearch } from 'react-icons/fi'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { getBooks } from '../../services/apiBooks'
import Spinner from '../../ui/Spinner'
import BooksRow from './BooksRow'

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  overflow: hidden;
`

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 2.5fr 2.5fr 2fr 1.5fr 1fr 1fr;
  column-gap: 0.5rem;
  align-items: center;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.4rem 2.4rem;
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
    font-size: 1.4rem;
    padding: 0.6rem 1rem 0.6rem 3rem;
    border: 1px solid var(--color-grey-300);
    border-radius: var(--border-radius-sm);
    width: 100%;
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
export default function BooksTable() {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1
  const [searchText, setSearchText] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')

  const { isLoading, data, error } = useQuery({
    queryKey: ['books'],
    queryFn: getBooks,
  })

  if (isLoading) return <Spinner />
  if (error) return <div>{t('BookError')}</div>

  let filteredBooks = data?.data || []

  if (searchText.trim()) {
    const lower = searchText.toLowerCase()
    filteredBooks = filteredBooks.filter((book) =>
      `${book.id} ${book.title || ''} ${book.author || ''} ${
        book.publication_year || ''
      }`
        .toLowerCase()
        .includes(lower)
    )
  }

  if (sortBy) {
    filteredBooks = [...filteredBooks].sort((a, b) => {
      let aVal = a[sortBy]
      let bVal = b[sortBy]
      if (typeof aVal === 'string') aVal = aVal.toLowerCase()
      if (typeof bVal === 'string') bVal = bVal.toLowerCase()
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1
      return 0
    })
  }

  const totalItems = filteredBooks.length
  const totalPages = Math.ceil(totalItems / rowsPerPage)
  const start = (currentPage - 1) * rowsPerPage
  const paginatedBooks = filteredBooks.slice(start, start + rowsPerPage)

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

  const handlePageChange = (newPage) => setSearchParams({ page: newPage })
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value))
    setSearchParams({ page: 1 })
  }

  return (
    <>
      <TopBarWrapper>
        <SearchWrapper>
          <SearchInputContainer>
            <FiSearch />
            <input
              type="text"
              placeholder={t('booksTable.searchPlaceholder')}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </SearchInputContainer>
        </SearchWrapper>
      </TopBarWrapper>

      <Table role="table">
        <TableHeader role="row">
          <SortableHeader
            onClick={() => handleSort('id')}
            className={sortBy === 'id' ? 'active' : ''}
          >
            {t('booksTable.headers.id')}{' '}
            <span className="icon">{renderSortIcon('id')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('title')}
            className={sortBy === 'title' ? 'active' : ''}
          >
            {t('booksTable.headers.title')}{' '}
            <span className="icon">{renderSortIcon('title')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('author')}
            className={sortBy === 'author' ? 'active' : ''}
          >
            {t('booksTable.headers.author')}{' '}
            <span className="icon">{renderSortIcon('author')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('publication_year')}
            className={sortBy === 'publication_year' ? 'active' : ''}
          >
            {t('booksTable.headers.year')}{' '}
            <span className="icon">{renderSortIcon('publication_year')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('status')}
            className={sortBy === 'status' ? 'active' : ''}
          >
            {t('booksTable.headers.status')}{' '}
            <span className="icon">{renderSortIcon('status')}</span>
          </SortableHeader>
          <div>{t('booksTable.headers.action')}</div>
          <div></div>
        </TableHeader>

        {paginatedBooks.map((book) => (
          <BooksRow key={book.id} book={book} />
        ))}

        {filteredBooks.length === 0 && (
          <div style={{ padding: '1.6rem' }}>{t('booksTable.noMatch')}</div>
        )}

        <PaginationWrapper>
          <PageInfo>
            {t('booksTable.pageInfo', {
              currentPage,
              totalPages,
            })}
          </PageInfo>
          <RowsPerPage>
            {t('booksTable.rowsPerPage')}
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
