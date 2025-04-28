import ExpenseRow from './ExpensesRow'
import { PAGE_SIZE } from '../../utils/constants'
import Pagination from '../../ui/Pagination'
import Spinner from '../../ui/Spinner'
import { getExpenses } from '../../services/apiExpenses'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'

// import ExpenseRow from './ExpenseRow'

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

function ExpenseTable({ search }) {
  const [searchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const { isLoading, data, error } = useQuery({
    queryKey: ['expenses'],
    queryFn: getExpenses,
  })

  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')

  if (isLoading) return <Spinner />
  if (error) return <div>Error loading expenses!</div>

  let filteredExpenses = data?.data || []

  // Search functionality
  if (search.trim() !== '') {
    filteredExpenses = filteredExpenses.filter((expense) => {
      const searchString =
        `${expense.type} ${expense.description}`.toLowerCase()
      return searchString.includes(search.toLowerCase())
    })
  }

  // Sort functionality
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

  // Pagination logic
  const totalItems = filteredExpenses.length
  const start = (currentPage - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE
  const paginatedExpenses = filteredExpenses.slice(start, end)

  function handleSort(column) {
    if (sortBy === column) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  const renderSortIcon = (column) => {
    if (sortBy === column) {
      return sortOrder === 'asc' ? '↑' : '↓'
    }
    return '↑↓'
  }

  return (
    <>
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

        <Pagination count={totalItems} />
      </Table>
    </>
  )
}

export default ExpenseTable
