import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { FiSearch } from 'react-icons/fi'
import ComplaintsRow from './ComplaintsRow'
import Spinner from '../../ui/Spinner'
import { getComplaints } from '../../services/apiComplaints'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'

// --- Styled Components ---
const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 2fr 3fr 1.5fr 2fr 0.5fr;
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

// --- Main Component ---
function ComplaintsTable() {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const { isLoading, data, error } = useQuery({
    queryKey: ['complaints'],
    queryFn: getComplaints,
  })

  const [search, setSearch] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')

  if (isLoading) return <Spinner />
  if (error) return <div>Error loading complaints!</div>

  let complaints = data?.data || []

  // --- Search Filter ---
  if (search.trim() !== '') {
    complaints = complaints.filter((c) => {
      const str = `
        ${c.id}
        ${c.title}
        ${c.description}
        ${c.status}
        ${c.student?.name}
      `.toLowerCase()
      return str.includes(search.toLowerCase())
    })
  }

  // --- Sorting ---
  if (sortBy) {
    complaints = [...complaints].sort((a, b) => {
      let aVal, bVal
      switch (sortBy) {
        case 'id':
          aVal = a.id
          bVal = b.id
          break
        case 'student':
          aVal = (a.student?.name || '').toLowerCase()
          bVal = (b.student?.name || '').toLowerCase()
          break
        case 'title':
          aVal = (a.title || '').toLowerCase()
          bVal = (b.title || '').toLowerCase()
          break
        case 'status':
          aVal = (a.status || '').toLowerCase()
          bVal = (b.status || '').toLowerCase()
          break
        case 'created_at':
          aVal = new Date(a.created_at).getTime()
          bVal = new Date(b.created_at).getTime()
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

  // --- Pagination ---
  const totalItems = complaints.length
  const totalPages = Math.ceil(totalItems / rowsPerPage)
  const start = (currentPage - 1) * rowsPerPage
  const end = start + rowsPerPage
  const paginatedComplaints = complaints.slice(start, end)

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  const renderSortIcon = (column) => {
    if (sortBy === column) return sortOrder === 'asc' ? '↑' : '↓'
    return '↑↓'
  }

  const handlePageChange = (page) => {
    setSearchParams({ page })
  }

  const handleRowsPerPageChange = (e) => {
    const newSize = Number(e.target.value)
    setRowsPerPage(newSize)
    setSearchParams({ page: 1 })
  }

  return (
    <>
      <TopBarWrapper>
        <SearchInputContainer>
          <FiSearch />
          <input
            type="text"
            placeholder="Search complaints..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchInputContainer>
      </TopBarWrapper>

      <Table role="table">
        <TableHeader role="row">
          <SortableHeader
            onClick={() => handleSort('id')}
            className={sortBy === 'id' ? 'active' : ''}
          >
            <div>ID</div>
            <span className="icon">{renderSortIcon('id')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('student')}
            className={sortBy === 'student' ? 'active' : ''}
          >
            <div>Student Name</div>
            <span className="icon">{renderSortIcon('student')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('title')}
            className={sortBy === 'title' ? 'active' : ''}
          >
            <div>Title</div>
            <span className="icon">{renderSortIcon('title')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('status')}
            className={sortBy === 'status' ? 'active' : ''}
          >
            <div>Status</div>
            <span className="icon">{renderSortIcon('status')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('created_at')}
            className={sortBy === 'created_at' ? 'active' : ''}
          >
            <div>Created At</div>
            <span className="icon">{renderSortIcon('created_at')}</span>
          </SortableHeader>
          <div>Action</div>
        </TableHeader>

        {paginatedComplaints.map((complaint) => (
          <ComplaintsRow key={complaint.id} complaint={complaint} />
        ))}

        {complaints.length === 0 && (
          <div style={{ padding: '1.6rem' }}>No matching complaints found.</div>
        )}

        <PaginationWrapper>
          <PageInfo>
            Page {currentPage} of {totalPages}
          </PageInfo>

          <RowsPerPage>
            Rows per page:{' '}
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

export default ComplaintsTable
