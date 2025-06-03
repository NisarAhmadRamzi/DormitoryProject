import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { getBooks } from '../../services/apiBooks'
import Pagination from '../../ui/Pagination'
import Spinner from '../../ui/Spinner'
import { PAGE_SIZE } from '../../utils/constants'
import BooksRow from './BooksRow'

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
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
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.4rem 2.4rem;
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

function BooksTable({ search = '' }) {
  const [searchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const { isLoading, data, error } = useQuery({
    queryKey: ['books'],
    queryFn: getBooks,
  })

  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')

  if (isLoading) return <Spinner />
  if (error) return <div>Error loading books!</div>

  let filteredBooks = data?.data || []

  // 1) FILTER by search string:
  if (search.trim() !== '') {
    filteredBooks = filteredBooks.filter((book) => {
      const searchString =
        `${book.title} ${book.author} ${book.publication_year}`.toLowerCase()
      return searchString.includes(search.toLowerCase())
    })
  }

  // 2) SORT if needed:
  if (sortBy) {
    filteredBooks = [...filteredBooks].sort((a, b) => {
      let aVal = a[sortBy]
      let bVal = b[sortBy]

      // "publication_year" is a number; title/author are strings
      if (typeof aVal === 'string') aVal = aVal.toLowerCase()
      if (typeof bVal === 'string') bVal = bVal.toLowerCase()

      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1
      return 0
    })
  }

  // 3) PAGINATE:
  const totalItems = filteredBooks.length
  const start = (currentPage - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE
  const paginatedBooks = filteredBooks.slice(start, end)

  // Toggle sort column/direction
  function handleSort(column) {
    if (sortBy === column) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  // Show ↑ when ascending, ↓ when descending, else ↑↓
  const renderSortIcon = (column) => {
    if (sortBy === column) {
      return sortOrder === 'asc' ? '↑' : '↓'
    }
    return '↑↓'
  }

  return (
    <Table role="table">
      <TableHeader role="row">
        {/* ID */}
        <SortableHeader
          onClick={() => handleSort('id')}
          className={sortBy === 'id' ? 'active' : ''}
        >
          <div style={{ textAlign: 'center' }}>ID</div>
          <span className="icon">{renderSortIcon('id')}</span>
        </SortableHeader>

        {/* Title */}
        <SortableHeader
          onClick={() => handleSort('title')}
          className={sortBy === 'title' ? 'active' : ''}
        >
          <div>Title</div>
          <span className="icon">{renderSortIcon('title')}</span>
        </SortableHeader>

        {/* Author */}
        <SortableHeader
          onClick={() => handleSort('author')}
          className={sortBy === 'author' ? 'active' : ''}
        >
          <div>Author</div>
          <span className="icon">{renderSortIcon('author')}</span>
        </SortableHeader>

        {/* Year (publication_year) */}
        <SortableHeader
          onClick={() => handleSort('publication_year')}
          className={sortBy === 'publication_year' ? 'active' : ''}
        >
          <div>Year</div>
          <span className="icon">{renderSortIcon('publication_year')}</span>
        </SortableHeader>

        {/* Status */}
        <SortableHeader
          onClick={() => handleSort('status')}
          className={sortBy === 'status' ? 'active' : ''}
        >
          <div>Status</div>
          <span className="icon">{renderSortIcon('status')}</span>
        </SortableHeader>

        {/* "Action" column is not sortable */}
        <div>Action</div>
        <div></div>
      </TableHeader>

      {paginatedBooks.map((book) => (
        <BooksRow key={book.id} book={book} />
      ))}

      {filteredBooks.length === 0 && (
        <div style={{ padding: '1.6rem' }}>No matching books found.</div>
      )}

      <Pagination count={totalItems} />
    </Table>
  )
}

export default BooksTable
