import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiSearch } from 'react-icons/fi'
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { useSearchParams } from 'react-router-dom'

import styled from 'styled-components'
import { getAssets } from '../../services/apiAssets'
import Spinner from '../../ui/Spinner'
import AssetsRow from './AssetsRow'
const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  overflow: hidden;
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
  padding: 1.6rem 2.4rem 0;
  gap: 2rem;
  flex-wrap: wrap;
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
    font-size: 1.4rem;
    padding: 0.6rem 1rem 0.6rem 3rem;
    border: 1px solid var(--color-grey-300);
    border-radius: var(--border-radius-sm);
    width: 100%;
    background-color: var(--color-grey-0);
    color: var(--color-grey-900);

    &:focus {
      border-color: var(--color-blue-700);
      outline: none;
      box-shadow: 0 0 0 3px var(--backdrop-color);
    }
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
// (not repeated here for brevity)

export default function AssetsTable() {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')
  const [searchText, setSearchText] = useState('')

  const { isLoading, data, error } = useQuery({
    queryKey: ['assets'],
    queryFn: getAssets,
  })

  if (isLoading) return <Spinner />
  if (error) return <div>{t('asset.errorLoading')}</div>

  let assets = data?.data || []

  if (searchText.trim() !== '') {
    const lower = searchText.toLowerCase()
    assets = assets.filter((asset) => {
      const searchStr = `
        ${asset.id || ''}
        ${asset.quantity || ''}
        ${asset.description || ''}
        ${asset.total_quantity || ''}
      `.toLowerCase()
      return searchStr.includes(lower)
    })
  }

  if (sortBy) {
    assets = [...assets].sort((a, b) => {
      let aVal = a[sortBy]
      let bVal = b[sortBy]
      if (typeof aVal === 'string') aVal = aVal.toLowerCase()
      if (typeof bVal === 'string') bVal = bVal.toLowerCase()
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1
      return 0
    })
  }

  const totalItems = assets.length
  const totalPages = Math.ceil(totalItems / rowsPerPage)
  const start = (currentPage - 1) * rowsPerPage
  const paginatedAssets = assets.slice(start, start + rowsPerPage)

  const handleSort = (column) => {
    if (sortBy === column)
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  const renderSortIcon = (column) =>
    sortBy === column ? (sortOrder === 'asc' ? '↑' : '↓') : '↑↓'

  const handlePageChange = (newPage) => setSearchParams({ page: newPage })

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value))
    setSearchParams({ page: 1 })
  }

  return (
    <>
      <TopBarWrapper>
        <SearchInputContainer>
          <FiSearch />
          <input
            type="text"
            placeholder={t('asset.searchPlaceholder')}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </SearchInputContainer>
      </TopBarWrapper>

      <Table role="table">
        <TableHeader role="row">
          <div></div>
          <SortableHeader
            onClick={() => handleSort('quantity')}
            className={sortBy === 'quantity' ? 'active' : ''}
          >
            {t('asset.quantity')}{' '}
            <span className="icon">{renderSortIcon('quantity')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('description')}
            className={sortBy === 'description' ? 'active' : ''}
          >
            {t('asset.description')}{' '}
            <span className="icon">{renderSortIcon('description')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('total_quantity')}
            className={sortBy === 'total_quantity' ? 'active' : ''}
          >
            {t('asset.totalQuantity')}{' '}
            <span className="icon">{renderSortIcon('total_quantity')}</span>
          </SortableHeader>
          <div>{t('Action.action')}</div>
        </TableHeader>

        {paginatedAssets.map((asset) => (
          <AssetsRow asset={asset} key={asset.id} />
        ))}

        {assets.length === 0 && (
          <div style={{ padding: '1.6rem' }}>{t('asset.noMatch')}</div>
        )}

        <PaginationWrapper>
          <PageInfo>
            {t('asset.page')} {currentPage} {t('asset.of')} {totalPages}
          </PageInfo>

          <RowsPerPage>
            {t('asset.rowsPerPage')}:
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
