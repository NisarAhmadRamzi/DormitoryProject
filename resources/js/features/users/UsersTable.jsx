import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiSearch } from 'react-icons/fi'
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'

import { getUsers } from '../../services/apiUser'
import Spinner from '../../ui/Spinner'
import UsersRow from './UsersRow'

// 🔻 Styled components
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

// 🔻 Component
export default function UsersTable() {
  const { t, i18n } = useTranslation()
  const dir = i18n.dir() // 'ltr' or 'rtl'

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
  if (error) return <div>{t('userTable.loadError')}</div>

  let filteredUsers = data?.data || []
  if (searchText.trim() !== '') {
    const lower = searchText.toLowerCase()
    filteredUsers = filteredUsers.filter((u) =>
      `${u.id} ${u.name || ''} ${u.email || ''} ${u.role?.name || ''}`
        .toLowerCase()
        .includes(lower)
    )
  }

  if (sortBy) {
    filteredUsers = [...filteredUsers].sort((a, b) => {
      let aVal, bVal
      switch (sortBy) {
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
        default:
          aVal = ''
          bVal = ''
      }
      aVal = typeof aVal === 'string' ? aVal.toLowerCase() : aVal
      bVal = typeof bVal === 'string' ? bVal.toLowerCase() : bVal
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1
      return 0
    })
  }

  const totalItems = filteredUsers.length
  const totalPages = Math.ceil(totalItems / rowsPerPage)
  const start = (currentPage - 1) * rowsPerPage
  const paginatedUsers = filteredUsers.slice(start, start + rowsPerPage)

  const handleSort = (col) => {
    if (sortBy === col) setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'))
    else {
      setSortBy(col)
      setSortOrder('asc')
    }
  }

  const renderIcon = (col) =>
    sortBy === col ? (sortOrder === 'asc' ? '↑' : '↓') : '↑↓'

  // Swap caret icons for RTL so arrows visually point correctly
  const PrevIcon = dir === 'rtl' ? RxCaretRight : RxCaretLeft
  const NextIcon = dir === 'rtl' ? RxCaretLeft : RxCaretRight

  const changePage = (newPage) => setSearchParams({ page: newPage })

  const changeRows = (e) => {
    setRowsPerPage(Number(e.target.value))
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
              placeholder={t('userTable.searchPlaceholder')}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </SearchInputContainer>
        </SearchWrapper>
      </TopBarWrapper>

      <Table role="table">
        <TableHeader role="row">
          <SortableHeader
            onClick={() => handleSort('name')}
            className={sortBy === 'name' ? 'active' : ''}
          >
            {t('userTable.name')}{' '}
            <span className="icon">{renderIcon('name')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('email')}
            className={sortBy === 'email' ? 'active' : ''}
          >
            {t('userTable.email')}{' '}
            <span className="icon">{renderIcon('email')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('role')}
            className={sortBy === 'role' ? 'active' : ''}
          >
            {t('userTable.role')}{' '}
            <span className="icon">{renderIcon('role')}</span>
          </SortableHeader>
          <div>{t('userTable.action')}</div>
        </TableHeader>

        {paginatedUsers.map((user) => (
          <UsersRow key={user.id} user={user} />
        ))}

        {filteredUsers.length === 0 && (
          <div style={{ padding: '1.6rem' }}>{t('userTable.noUsers')}</div>
        )}

        <PaginationWrapper>
          <PageInfo>
            {t('userTable.page')} {currentPage} {t('userTable.of')} {totalPages}
          </PageInfo>

          <RowsPerPage>
            {t('userTable.rowsPerPage')}:
            <select value={rowsPerPage} onChange={changeRows}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </RowsPerPage>

          <NavButtons>
            <button
              onClick={() => changePage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              aria-label={t('userTable.previousPage')}
            >
              <PrevIcon />
            </button>
            <button
              onClick={() => changePage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              aria-label={t('userTable.nextPage')}
            >
              <NextIcon />
            </button>
          </NavButtons>
        </PaginationWrapper>
      </Table>
    </>
  )
}
