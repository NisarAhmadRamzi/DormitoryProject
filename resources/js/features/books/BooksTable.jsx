import BooksRow from './BooksRow'
import { PAGE_SIZE } from '../../utils/constants'
import Pagination from '../../ui/Pagination'
import Spinner from '../../ui/Spinner'
import { getBooks } from '../../services/apiBooks'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 2.5fr 2.5fr 2fr 1.5fr 1fr;
//   column-gap: 0.5rem;
//   align-items: center;
//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `
const TableHeader = styled.header`
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
  padding: 1.6rem 2.4rem;
`

function BooksTable({ search }) {
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

  if (search.trim() !== '') {
    filteredBooks = filteredBooks.filter((book) => {
      const searchString =
        `${book.title} ${book.author} ${book.publication_year}`.toLowerCase()
      return searchString.includes(search.toLowerCase())
    })
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
  const start = (currentPage - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE
  const paginatedBooks = filteredBooks.slice(start, end)

  return (
    <>
      <Table role="table">
        <TableHeader role="row">
          <div>ID</div>
          <div>Title</div>
          <div>Author</div>
          <div>Year</div>
          <div>Status</div>
          <div>Action</div>
          <div></div>{' '}
          {/* Empty header cell to align with the dropdown in BooksRow */}
        </TableHeader>

        {paginatedBooks.map((book) => (
          <BooksRow book={book} key={book.id} />
        ))}

        {filteredBooks.length === 0 && (
          <div style={{ padding: '1.6rem' }}>No matching books found.</div>
        )}

        <Pagination count={totalItems} />
      </Table>
    </>
  )
}

export default BooksTable
