import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiSearch } from 'react-icons/fi'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'

import { getLibraries } from '../../services/apiLibraries'
import Spinner from '../../ui/Spinner'
import AddLibrary from './AddLibrary'
import LibraryRow from './LibraryRow'

const PAGE_SIZE_OPTIONS = [5, 10, 25, 50]

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  background-color: var(--color-grey-0);
  border-radius: var(--color-grey-sm);
  overflow: hidden;
  font-size: 1.4rem;
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
    padding: 0.6rem 1rem 0.6rem 3rem;
    font-size: 1.4rem;
    border: 1px solid var(--color-grey-300);
    border-radius: var(--border-radius-sm);
    background-color: var(--color-grey-0);
    color: var(--color-grey-900);

    &:focus {
      outline: none;
      border-color: var(--color-blue-700);
      box-shadow: 0 0 0 3px var(--backdrop-color);
    }
  }
`

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 2fr 2.5fr 2.5fr 0.5fr;
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
    border-radius: var(--color-grey-sm);
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
    border-radius: var(--color-grey-sm);
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

export default function LibraryTable() {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1
  const [searchText, setSearchText] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')

  const { isLoading, data, error } = useQuery(['libraries'], getLibraries)

  if (isLoading) return <Spinner />
  if (error) return <div>{t('libraryTable.errorLoading')}</div>

  let items = data?.data || []
  if (searchText.trim()) {
    const lower = searchText.toLowerCase()
    items = items.filter((lib) =>
      `${lib.id} ${lib.name} ${lib.location} ${lib.contact_info}`
        .toLowerCase()
        .includes(lower)
    )
  }

  if (sortBy) {
    items = [...items].sort((a, b) => {
      let x = a[sortBy],
        y = b[sortBy]
      if (typeof x === 'string') x = x.toLowerCase()
      if (typeof y === 'string') y = y.toLowerCase()
      return x === y
        ? 0
        : sortOrder === 'asc'
        ? x < y
          ? -1
          : 1
        : x < y
        ? 1
        : -1
    })
  }

  const total = items.length
  const totalPages = Math.ceil(total / rowsPerPage)
  const paginated = items.slice(
    (currentPage - 1) * rowsPerPage,
    (currentPage - 1) * rowsPerPage + rowsPerPage
  )

  const toggleSort = (col) => {
    if (sortBy === col) setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'))
    else {
      setSortBy(col)
      setSortOrder('asc')
    }
  }
  const renderIcon = (col) =>
    sortBy === col ? (sortOrder === 'asc' ? '↑' : '↓') : '↑↓'

  // actually change pages
  const changePage = (newPage) => {
    setSearchParams({ page: newPage })
  }

  const changeSize = (e) => {
    setRowsPerPage(+e.target.value)
    changePage(1)
  }

  return (
    <>
      <TopBarWrapper>
        <SearchWrapper>
          <SearchInputContainer>
            <FiSearch />
            <input
              type="text"
              placeholder={t('libraryTable.searchPlaceholder')}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </SearchInputContainer>
        </SearchWrapper>
        <AddLibrary />
      </TopBarWrapper>
      <Table role="table">
        <TableHeader role="row">
          <div />
          <SortableHeader
            onClick={() => toggleSort('name')}
            className={sortBy === 'name' ? 'active' : ''}
          >
            {t('libraryTable.name')}
            <span className="icon">{renderIcon('name')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => toggleSort('location')}
            className={sortBy === 'location' ? 'active' : ''}
          >
            {t('libraryTable.location')}
            <span className="icon">{renderIcon('location')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => toggleSort('contact_info')}
            className={sortBy === 'contact_info' ? 'active' : ''}
          >
            {t('libraryTable.contactInfo')}
            <span className="icon">{renderIcon('contact_info')}</span>
          </SortableHeader>
          <div>{t('libraryTable.action')}</div>
        </TableHeader>

        {paginated.map((lib) => (
          <LibraryRow key={lib.id} library={lib} />
        ))}

        {items.length === 0 && (
          <div style={{ padding: '1.6rem' }}>
            {t('libraryTable.noMatching')}
          </div>
        )}

        <PaginationWrapper>
          <PageInfo>
            {t('libraryTable.pageInfo', {
              currentPage,
              totalPages: totalPages || 1,
            })}
          </PageInfo>
          <RowsPerPage>
            {t('libraryTable.rowsPerPage')}:
            <select value={rowsPerPage} onChange={changeSize}>
              {PAGE_SIZE_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </RowsPerPage>
          <NavButtons>
            <button
              onClick={() => changePage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              aria-label={t('libraryTable.previousPage')}
            >
              &lt;
            </button>
            <button
              onClick={() => changePage(Math.min(totalPages, currentPage + 1))}
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
