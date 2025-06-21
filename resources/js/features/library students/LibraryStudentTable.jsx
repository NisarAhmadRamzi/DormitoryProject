import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'

import { FiSearch } from 'react-icons/fi'
import LibraryStudentRow from './LibraryStudentRow'
import Spinner from '../../ui/Spinner'
import { getAllLibraryStudents } from '../../services/apiLibraryStudents'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'

// --- Constants ---
const PAGE_SIZE_OPTIONS = [5, 10, 25, 50]

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
  grid-template-columns: 0.6fr 2fr 2.5fr 2fr 2.5fr 0.5fr;
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

const TableBody = styled.div`
  max-height: 420px;
  overflow-y: auto;
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

// --- Component ---
function LibraryStudentsTable() {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const { data, isLoading, error } = useQuery({
    queryKey: ['library-students'],
    queryFn: getAllLibraryStudents,
  })

  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')
  const [search, setSearch] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)

  if (isLoading) return <Spinner />
  if (error) return <p>Error loading students</p>

  let students = data?.data || []

  // --- Filter by Search ---
  if (search.trim() !== '') {
    students = students.filter((student) => {
      const str = `
        ${student.id}
        ${student.name}
        ${student.email}
        ${student.phone}
        ${student.address}
      `.toLowerCase()
      return str.includes(search.toLowerCase())
    })
  }

  // --- Sort ---
  if (sortBy) {
    students = [...students].sort((a, b) => {
      let aVal = a[sortBy]
      let bVal = b[sortBy]
      if (typeof aVal === 'string') aVal = aVal.toLowerCase()
      if (typeof bVal === 'string') bVal = bVal.toLowerCase()

      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1
      return 0
    })
  }

  // --- Pagination ---
  const totalItems = students.length
  const totalPages = Math.ceil(totalItems / rowsPerPage)
  const start = (currentPage - 1) * rowsPerPage
  const end = start + rowsPerPage
  const paginatedStudents = students.slice(start, end)

  function handleSort(column) {
    if (sortBy === column) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  const handlePageChange = (page) => {
    setSearchParams({ page })
  }

  const handleRowsPerPageChange = (e) => {
    const size = Number(e.target.value)
    setRowsPerPage(size)
    setSearchParams({ page: 1 })
  }

  const renderSortIcon = (column) => {
    if (sortBy === column) return sortOrder === 'asc' ? '↑' : '↓'
    return '↑↓'
  }

  return (
    <>
      <TopBarWrapper>
        <SearchInputContainer>
          <FiSearch />
          <input
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchInputContainer>
      </TopBarWrapper>

      <Table>
        <TableHeader>
          <div>ID</div>
          <SortableHeader
            onClick={() => handleSort('name')}
            className={sortBy === 'name' ? 'active' : ''}
          >
            Name <span className="icon">{renderSortIcon('name')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('email')}
            className={sortBy === 'email' ? 'active' : ''}
          >
            Email <span className="icon">{renderSortIcon('email')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('phone')}
            className={sortBy === 'phone' ? 'active' : ''}
          >
            Phone <span className="icon">{renderSortIcon('phone')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('address')}
            className={sortBy === 'address' ? 'active' : ''}
          >
            Address <span className="icon">{renderSortIcon('address')}</span>
          </SortableHeader>
          <div>Actions</div>
        </TableHeader>

        <TableBody>
          {paginatedStudents.map((student) => (
            <LibraryStudentRow key={student.id} student={student} />
          ))}
        </TableBody>
        <PaginationWrapper>
          <PageInfo>
            Page {currentPage} of {totalPages}
          </PageInfo>

          <RowsPerPage>
            Rows per page:{' '}
            <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
              {PAGE_SIZE_OPTIONS.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
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

export default LibraryStudentsTable
