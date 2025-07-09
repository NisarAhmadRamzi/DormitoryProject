import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiSearch } from 'react-icons/fi'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { getExpenses } from '../../services/apiExpenses'
import Spinner from '../../ui/Spinner'
import ExpenseRow from './ExpensesRow'

const PAGE_SIZE_OPTIONS = [5, 10, 25, 50]

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  overflow: hidden;
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
const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 2fr 2fr 2fr 2fr 0.5fr;
  column-gap: 2.4rem;
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

export default function ExpenseTable() {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1
  const [searchText, setSearchText] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')

  const { isLoading, data, error } = useQuery({
    queryKey: ['expenses'],
    queryFn: getExpenses,
  })

  if (isLoading) return <Spinner />
  if (error) return <div>{t('ExpensesHeader.errorLoading')}</div>

  let filteredExpenses = data?.data || []

  if (searchText.trim()) {
    const lower = searchText.toLowerCase()
    filteredExpenses = filteredExpenses.filter((expense) =>
      `${expense.type} ${expense.description}`.toLowerCase().includes(lower)
    )
  }

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

  const totalItems = filteredExpenses.length
  const totalPages = Math.ceil(totalItems / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const paginatedExpenses = filteredExpenses.slice(
    startIndex,
    startIndex + rowsPerPage
  )

  function handleSort(column) {
    if (sortBy === column)
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  function renderSortIcon(column) {
    return sortBy === column ? (sortOrder === 'asc' ? '↑' : '↓') : '↑↓'
  }

  function handlePageChange(newPage) {
    setSearchParams({ page: newPage })
  }

  function handleRowsPerPageChange(e) {
    const size = Number(e.target.value)
    setRowsPerPage(size)
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
              placeholder={t('ExpensesHeader.searchPlaceholder')}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              aria-label={t('ExpensesHeader.searchPlaceholder')}
            />
          </SearchInputContainer>
        </SearchWrapper>
      </TopBarWrapper>

      <Table role="table">
        <TableHeader role="row">
          <SortableHeader
            onClick={() => handleSort('type')}
            className={sortBy === 'type' ? 'active' : ''}
            role="columnheader"
            tabIndex={0}
            aria-sort={
              sortBy === 'type'
                ? sortOrder === 'asc'
                  ? 'ascending'
                  : 'descending'
                : 'none'
            }
          >
            {t('ExpensesHeader.type')}{' '}
            <span className="icon">{renderSortIcon('type')}</span>
          </SortableHeader>

          <SortableHeader
            onClick={() => handleSort('expense_cash')}
            className={sortBy === 'expense_cash' ? 'active' : ''}
            role="columnheader"
            tabIndex={0}
            aria-sort={
              sortBy === 'expense_cash'
                ? sortOrder === 'asc'
                  ? 'ascending'
                  : 'descending'
                : 'none'
            }
          >
            {t('ExpensesHeader.expenseCash')}{' '}
            <span className="icon">{renderSortIcon('expense_cash')}</span>
          </SortableHeader>

          <SortableHeader
            onClick={() => handleSort('description')}
            className={sortBy === 'description' ? 'active' : ''}
            role="columnheader"
            tabIndex={0}
            aria-sort={
              sortBy === 'description'
                ? sortOrder === 'asc'
                  ? 'ascending'
                  : 'descending'
                : 'none'
            }
          >
            {t('ExpensesHeader.description')}{' '}
            <span className="icon">{renderSortIcon('description')}</span>
          </SortableHeader>

          <SortableHeader
            onClick={() => handleSort('expense_date')}
            className={sortBy === 'expense_date' ? 'active' : ''}
            role="columnheader"
            tabIndex={0}
            aria-sort={
              sortBy === 'expense_date'
                ? sortOrder === 'asc'
                  ? 'ascending'
                  : 'descending'
                : 'none'
            }
          >
            {t('ExpensesHeader.expenseDate')}{' '}
            <span className="icon">{renderSortIcon('expense_date')}</span>
          </SortableHeader>
          <div>{t('ExpensesHeader.action')}</div>
        </TableHeader>

        {paginatedExpenses.map((expense) => (
          <ExpenseRow key={expense.id} expense={expense} />
        ))}

        {filteredExpenses.length === 0 && (
          <div style={{ padding: '1.6rem' }}>{t('ExpensesHeader.noMatch')}</div>
        )}

        <PaginationWrapper>
          <PageInfo>
            {t('ExpensesHeader.page')} {currentPage} {t('ExpensesHeader.of')}{' '}
            {totalPages || 1}
          </PageInfo>
          <RowsPerPage>
            {t('ExpensesHeader.rowsPerPage')}
            <select
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              aria-label={t('ExpensesHeader.rowsPerPage')}
            >
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
              aria-label={t('ExpensesHeader.previousPage')}
            >
              &lt;
            </button>
            <button
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages || totalPages === 0}
              aria-label={t('ExpensesHeader.nextPage')}
            >
              &gt;
            </button>
          </NavButtons>
        </PaginationWrapper>
      </Table>
    </>
  )
}
