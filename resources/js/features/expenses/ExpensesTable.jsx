import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'

import ExpenseRow from './ExpensesRow'
import { FiSearch } from 'react-icons/fi'
import Spinner from '../../ui/Spinner'
import { getExpenses } from '../../services/apiExpenses'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'

// Styled components (reuse from StudentTable/FeesTable style)
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
  grid-template-columns: 0.6fr 2fr 2fr 2fr 2fr 0.5fr;
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

function ExpenseTable() {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  // Local state for search and pagination
  const [searchText, setSearchText] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')

  const { isLoading, data, error } = useQuery({
    queryKey: ['expenses'],
    queryFn: getExpenses,
  })

  if (isLoading) return <Spinner />
  if (error) return <div>Error loading expenses!</div>

  let filteredExpenses = data?.data || []

  // Search filtering on local searchText state
  if (searchText.trim() !== '') {
    filteredExpenses = filteredExpenses.filter((expense) => {
      const searchString =
        `${expense.type} ${expense.description}`.toLowerCase()
      return searchString.includes(searchText.toLowerCase())
    })
  }

  // Sorting logic
  if (sortBy) {
    filteredExpenses = [...filteredExpenses].sort((a, b) => {
      let aVal = a[sortBy]
      let bVal = b[sortBy]

      if (typeof aVal === 'string') aVal = aVal.toLowerCase()
      if (typeof bVal === 'string') bVal = bVal.toLowerCase()

      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1
      return 0
    })
  }

  // Pagination calculations
  const totalItems = filteredExpenses.length
  const totalPages = Math.ceil(totalItems / rowsPerPage)
  const start = (currentPage - 1) * rowsPerPage
  const end = start + rowsPerPage
  const paginatedExpenses = filteredExpenses.slice(start, end)

  // Sorting header click handler
  function handleSort(column) {
    if (sortBy === column) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  // Render sort icon arrows
  const renderSortIcon = (column) => {
    if (sortBy === column) {
      return sortOrder === 'asc' ? '↑' : '↓'
    }
    return '↑↓'
  }

  // Handle page change and sync URL param
  function handlePageChange(newPage) {
    setSearchParams({ page: newPage })
  }

  // Handle rows per page change
  function handleRowsPerPageChange(e) {
    const newSize = Number(e.target.value)
    setRowsPerPage(newSize)
    // Reset page to 1 on rows per page change
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
              placeholder="Search expenses..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </SearchInputContainer>
        </SearchWrapper>
      </TopBarWrapper>

      <Table role="table">
        <TableHeader role="row">
          <SortableHeader
            onClick={() => handleSort('type')}
            className={sortBy === 'type' ? 'active' : ''}
          >
            Type <span className="icon">{renderSortIcon('type')}</span>
          </SortableHeader>

          <SortableHeader
            onClick={() => handleSort('expense_cash')}
            className={sortBy === 'expense_cash' ? 'active' : ''}
          >
            Expense Cash{' '}
            <span className="icon">{renderSortIcon('expense_cash')}</span>
          </SortableHeader>

          <SortableHeader
            onClick={() => handleSort('description')}
            className={sortBy === 'description' ? 'active' : ''}
          >
            Description{' '}
            <span className="icon">{renderSortIcon('description')}</span>
          </SortableHeader>

          <SortableHeader
            onClick={() => handleSort('expense_date')}
            className={sortBy === 'expense_date' ? 'active' : ''}
          >
            Expense Date{' '}
            <span className="icon">{renderSortIcon('expense_date')}</span>
          </SortableHeader>

          <SortableHeader
            onClick={() => handleSort('goods_quantity')}
            className={sortBy === 'goods_quantity' ? 'active' : ''}
          >
            Goods Quantity{' '}
            <span className="icon">{renderSortIcon('goods_quantity')}</span>
          </SortableHeader>

          <div>Action</div>
        </TableHeader>

        {paginatedExpenses.map((expense) => (
          <ExpenseRow expense={expense} key={expense.id} />
        ))}

        {filteredExpenses.length === 0 && (
          <div style={{ padding: '1.6rem' }}>No matching expenses found.</div>
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

export default ExpenseTable
