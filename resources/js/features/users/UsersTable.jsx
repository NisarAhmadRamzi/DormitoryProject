import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'

import { FiSearch } from 'react-icons/fi'
import Spinner from '../../ui/Spinner'
import UsersRow from './UsersRow'
import { getUsers } from '../../services/apiUser'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'

// Styled Components (same as yours, omitted here for brevity)
const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
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

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 2fr 2.5fr 2.5fr 0.5fr;
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
  justify-content: center;
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

const PaginationWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
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

function UsersTable() {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')
  const [searchText, setSearchText] = useState('')

  const { isLoading, data, error } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })

  if (isLoading) return <Spinner />
  if (error) return <div>Error loading users!</div>

  // data?.data is assumed array of user objects
  let filteredUsers = data?.data || []

  if (searchText.trim() !== '') {
    filteredUsers = filteredUsers.filter((user) => {
      // Prepare a searchable string with relevant user fields
      const searchString = `
        ${user.id} 
        ${user.name || ''} 
        ${user.email || ''} 
        ${user.role?.name || ''} 
        ${user.studentInfo?.name || ''}
      `.toLowerCase()
      return searchString.includes(searchText.toLowerCase())
    })
  }

  if (sortBy) {
    filteredUsers = [...filteredUsers].sort((a, b) => {
      let aVal, bVal

      switch (sortBy) {
        case 'id':
          aVal = a.id
          bVal = b.id
          break
        case 'name':
          aVal = a.name || ''
          bVal = b.name || ''
          break
        case 'email':
          aVal = a.email || ''
          bVal = b.email || ''
          break
        case 'role':
          aVal = a.role?.name || ''
          bVal = b.role?.name || ''
          break
        case 'studentInfo':
          aVal = a.studentInfo?.name || ''
          bVal = b.studentInfo?.name || ''
          break
        default:
          aVal = ''
          bVal = ''
      }

      if (typeof aVal === 'string') aVal = aVal.toLowerCase()
      if (typeof bVal === 'string') bVal = bVal.toLowerCase()

      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1
      return 0
    })
  }

  const totalItems = filteredUsers.length
  const totalPages = Math.ceil(totalItems / rowsPerPage)
  const start = (currentPage - 1) * rowsPerPage
  const end = start + rowsPerPage
  const paginatedUsers = filteredUsers.slice(start, end)

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
    setSearchParams({ page: newPage })
  }

  function handleRowsPerPageChange(e) {
    const newSize = Number(e.target.value)
    setRowsPerPage(newSize)
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
              placeholder="Search users..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </SearchInputContainer>
        </SearchWrapper>
      </TopBarWrapper>

      <Table role="table">
        <TableHeader role="row">
          {/* <SortableHeader
            onClick={() => handleSort('id')}
            className={sortBy === 'id' ? 'active' : ''}
          >
            ID <span className="icon">{renderSortIcon('id')}</span>
          </SortableHeader> */}
          <SortableHeader
            onClick={() => handleSort('name')}
            className={sortBy === 'name' ? 'active' : ''}
            style={{ marginLeft: '120%' }}
          >
            Name <span className="icon">{renderSortIcon('name')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('email')}
            className={sortBy === 'email' ? 'active' : ''}
            style={{ marginLeft: '95%' }}
          >
            Email <span className="icon">{renderSortIcon('email')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('role')}
            className={sortBy === 'role' ? 'active' : ''}
            style={{ marginLeft: '45%' }}
          >
            Role <span className="icon">{renderSortIcon('role')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('studentInfo')}
            className={sortBy === 'studentInfo' ? 'active' : ''}
          >
            Student Info{' '}
            <span className="icon">{renderSortIcon('studentInfo')}</span>
          </SortableHeader>
          <div>Action</div>
        </TableHeader>

        {paginatedUsers.map((user) => (
          <UsersRow key={user.id} user={user} />
        ))}

        {filteredUsers.length === 0 && (
          <div style={{ padding: '1.6rem' }}>No matching users found.</div>
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

export default UsersTable
