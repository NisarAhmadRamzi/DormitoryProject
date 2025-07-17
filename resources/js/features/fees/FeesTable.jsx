import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiSearch } from 'react-icons/fi'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { hasPermission } from '../../components/permissions'
import { useUser } from '../../context/UserContext'
import { getFees } from '../../services/apiFees'
import Spinner from '../../ui/Spinner'
import AddFees from './AddFee'
import FeesRow from './FeesRow'
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
  grid-template-columns: 0.6fr 2fr 2fr 2fr 2fr 2fr 0.5fr;
  gap: 0.5rem;
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

export default function FeesTable() {
  const { user } = useUser()
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1
  const sortParam = searchParams.get('sortBy') || 'id-asc'
  const [sortByCol, sortOrder] = sortParam.split('-')

  const [searchText, setSearchText] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const { isLoading, data, error } = useQuery({
    queryKey: ['fees'],
    queryFn: getFees,
  })

  if (isLoading) return <Spinner />
  if (error) return <div>{t('FeesHeaders.messages.loadError')}</div>

  let filteredFees = data?.data || []

  if (searchText.trim()) {
    const lower = searchText.toLowerCase()
    filteredFees = filteredFees.filter((fee) =>
      `${fee.id} ${fee.student?.name} ${fee.student?.last_name}`
        .toLowerCase()
        .includes(lower)
    )
  }

  filteredFees = [...filteredFees].sort((a, b) => {
    let aVal, bVal
    if (sortByCol === 'student') {
      aVal = `${a.student?.name} ${a.student?.last_name}`.toLowerCase() || ''
      bVal = `${b.student?.name} ${b.student?.last_name}`.toLowerCase() || ''
    } else {
      aVal = a[sortByCol] ?? ''
      bVal = b[sortByCol] ?? ''
      if (typeof aVal === 'string') aVal = aVal.toLowerCase()
      if (typeof bVal === 'string') bVal = bVal.toLowerCase()
    }
    if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1
    if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1
    return 0
  })

  const totalItems = filteredFees.length
  const totalPages = Math.ceil(totalItems / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const paginatedFees = filteredFees.slice(startIndex, startIndex + rowsPerPage)

  const handleSort = (fieldName) => {
    const newDirection =
      sortByCol === fieldName && sortOrder === 'asc' ? 'desc' : 'asc'
    searchParams.set('sortBy', `${fieldName}-${newDirection}`)
    searchParams.set('page', '1')
    setSearchParams(searchParams)
  }

  const renderSortIcon = (column) =>
    sortByCol === column ? (sortOrder === 'asc' ? '↑' : '↓') : '↑↓'

  const handlePageChange = (newPage) => {
    setSearchParams({
      page: newPage,
      sortBy: searchParams.get('sortBy') || 'id-asc',
    })
  }

  const handleRowsPerPageChange = (e) => {
    const newSize = Number(e.target.value)
    setRowsPerPage(newSize)
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
              placeholder={t('FeesHeaders.searchPlaceholder')}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </SearchInputContainer>
        </SearchWrapper>
        {/* <AddFees /> */}
        {hasPermission(user, 'create fee') && <AddFees />}
      </TopBarWrapper>

      <Table role="table">
        <TableHeader role="row">
          <SortableHeader
            onClick={() => handleSort('id')}
            className={sortByCol === 'id' ? 'active' : ''}
          >
            {t('FeesHeaders.columns.id')}{' '}
            <span className="icon">{renderSortIcon('id')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('student')}
            className={sortByCol === 'student' ? 'active' : ''}
          >
            {t('FeesHeaders.columns.student')}{' '}
            <span className="icon">{renderSortIcon('student')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('office_pay')}
            className={sortByCol === 'office_pay' ? 'active' : ''}
          >
            {t('FeesHeaders.columns.officePay')}{' '}
            <span className="icon">{renderSortIcon('office_pay')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('office_paid')}
            className={sortByCol === 'office_paid' ? 'active' : ''}
          >
            {t('FeesHeaders.columns.officePaid')}{' '}
            <span className="icon">{renderSortIcon('office_paid')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('warranty_pay')}
            className={sortByCol === 'warranty_pay' ? 'active' : ''}
          >
            {t('FeesHeaders.columns.warrantyPay')}{' '}
            <span className="icon">{renderSortIcon('warranty_pay')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('total_fee')}
            className={sortByCol === 'total_fee' ? 'active' : ''}
          >
            {t('FeesHeaders.columns.totalFee')}{' '}
            <span className="icon">{renderSortIcon('total_fee')}</span>
          </SortableHeader>
          <div>{t('FeesHeaders.columns.actions')}</div>
        </TableHeader>

        {paginatedFees.map((fee) => (
          <FeesRow key={fee.id} fee={fee} />
        ))}

        {filteredFees.length === 0 && (
          <div style={{ padding: '1.6rem' }}>
            {t('FeesHeaders.messages.noMatch')}
          </div>
        )}

        <PaginationWrapper>
          <PageInfo>
            {t('FeesHeaders.pagination.pageInfo', { currentPage, totalPages })}
          </PageInfo>
          <RowsPerPage>
            {t('FeesHeaders.pagination.rowsPerPage')}
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
