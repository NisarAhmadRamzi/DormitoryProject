import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'

import FeesRow from './FeesRow'
import { FiSearch } from 'react-icons/fi'
import Spinner from '../../ui/Spinner'
import { getFees } from '../../services/apiFees'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'

// Styled components similar to StudentTable (add Search, Pagination wrappers etc.)

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
  grid-template-columns: 0.6fr 2fr 2fr 2fr 2fr 2fr 0.5fr;
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

function FeesTable() {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1
  const sortParam = searchParams.get('sortBy') || 'id-asc'
  const [sortByCol, sortOrder] = sortParam.split('-')

  // Add local searchText and rowsPerPage state
  const [searchText, setSearchText] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const { isLoading, data, error } = useQuery({
    queryKey: ['fees'],
    queryFn: getFees,
  })

  function handleSort(fieldName) {
    const newDirection =
      sortByCol === fieldName && sortOrder === 'asc' ? 'desc' : 'asc'
    searchParams.set('sortBy', `${fieldName}-${newDirection}`)
    searchParams.set('page', '1')
    setSearchParams(searchParams)
  }

  const renderSortIcon = (column) => {
    if (sortByCol === column) {
      return sortOrder === 'asc' ? '↑' : '↓'
    }
    return '↑↓'
  }

  if (isLoading) return <Spinner />
  if (error) return <div>Error loading fees!</div>

  // Filter based on local searchText state (like StudentTable)
  let filteredFees = data?.data || []
  if (searchText.trim() !== '') {
    filteredFees = filteredFees.filter((fee) => {
      const searchString =
        `${fee.id} ${fee.student?.name} ${fee.student?.last_name}`.toLowerCase()
      return searchString.includes(searchText.toLowerCase())
    })
  }

  // Sort before pagination
  filteredFees = [...filteredFees].sort((a, b) => {
    let aVal = a[sortByCol]
    let bVal = b[sortByCol]

    if (sortByCol === 'student') {
      aVal = `${a.student?.name} ${a.student?.last_name}`.toLowerCase() || ''
      bVal = `${b.student?.name} ${b.student?.last_name}`.toLowerCase() || ''
    }

    if (typeof aVal === 'string') aVal = aVal.toLowerCase()
    if (typeof bVal === 'string') bVal = bVal.toLowerCase()

    if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1
    if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1
    return 0
  })

  // Pagination using rowsPerPage state (not fixed PAGE_SIZE)
  const totalItems = filteredFees.length
  const totalPages = Math.ceil(totalItems / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const paginatedFees = filteredFees.slice(startIndex, endIndex)

  function handlePageChange(newPage) {
    setSearchParams({
      page: newPage,
      sortBy: searchParams.get('sortBy') || 'id-asc',
    })
  }

  function handleRowsPerPageChange(e) {
    const newSize = Number(e.target.value)
    setRowsPerPage(newSize)
    // Reset page to 1 on rows per page change
    setSearchParams({ page: 1, sortBy: searchParams.get('sortBy') || 'id-asc' })
  }

  return (
    <>
      <TopBarWrapper>
        <SearchWrapper>
          <SearchInputContainer>
            <FiSearch />
            <input
              type="text"
              placeholder="Search fees..."
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
            className={sortByCol === 'id' ? 'active' : ''}
          >
            ID <span className="icon">{renderSortIcon('id')}</span>
          </SortableHeader>

          <SortableHeader
            onClick={() => handleSort('student')}
            className={sortByCol === 'student' ? 'active' : ''}
          >
            Student Name{' '}
            <span className="icon">{renderSortIcon('student')}</span>
          </SortableHeader>

          <SortableHeader
            onClick={() => handleSort('office_pay')}
            className={sortByCol === 'office_pay' ? 'active' : ''}
          >
            Office Pay{' '}
            <span className="icon">{renderSortIcon('office_pay')}</span>
          </SortableHeader>

          <SortableHeader
            onClick={() => handleSort('office_paid')}
            className={sortByCol === 'office_paid' ? 'active' : ''}
          >
            Office Paid{' '}
            <span className="icon">{renderSortIcon('office_paid')}</span>
          </SortableHeader>

          <SortableHeader
            onClick={() => handleSort('warranty_pay')}
            className={sortByCol === 'warranty_pay' ? 'active' : ''}
          >
            Warranty Pay{' '}
            <span className="icon">{renderSortIcon('warranty_pay')}</span>
          </SortableHeader>

          <SortableHeader
            onClick={() => handleSort('total_fee')}
            className={sortByCol === 'total_fee' ? 'active' : ''}
          >
            Total Fee{' '}
            <span className="icon">{renderSortIcon('total_fee')}</span>
          </SortableHeader>

          <div>Action</div>
        </TableHeader>

        {paginatedFees.map((fee) => (
          <FeesRow key={fee.id} fee={fee} />
        ))}

        {filteredFees.length === 0 && (
          <div style={{ padding: '1.6rem' }}>No matching fees found.</div>
        )}

        <PaginationWrapper>
          <PageInfo>
            Page {currentPage} of {totalPages || 1}
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
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <RxCaretRight />
            </button>
          </NavButtons>
        </PaginationWrapper>
      </Table>
    </>
  )
}

export default FeesTable
