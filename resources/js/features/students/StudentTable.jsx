import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiSearch } from 'react-icons/fi'
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { getStudents } from '../../services/apiStudents'
import Spinner from '../../ui/Spinner'
import StudentRow from './StudentRow'

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
  grid-template-columns: 0.6fr 2fr 2.5fr 2.5fr 2.5fr 0.5fr;
  column-gap: 0.5rem;
  align-items: center;
  background-color: var(--color-grey-50);
  padding: 1.6rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--color-grey-600);
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

export default function StudentTable() {
  const { t, i18n } = useTranslation()
  const dir = i18n.dir() // 'ltr' or 'rtl'

  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')
  const [searchText, setSearchText] = useState('')

  const { data, isLoading, isError, error } = useQuery(
    ['students'],
    getStudents
  )

  if (isLoading) return <Spinner />
  if (isError)
    return (
      <p>
        {t('error')}: {error.message}
      </p>
    )

  let filteredStudents = data?.data || []

  if (searchText.trim() !== '') {
    const lower = searchText.toLowerCase()
    filteredStudents = filteredStudents.filter((student) => {
      const searchString = `
        ${student.name || ''}
        ${student.email || ''}
        ${student.id_number || ''}
        ${student.phone || ''}
      `.toLowerCase()
      return searchString.includes(lower)
    })
  }

  if (sortBy) {
    filteredStudents = [...filteredStudents].sort((a, b) => {
      let aVal = a[sortBy]
      let bVal = b[sortBy]
      if (typeof aVal === 'string') aVal = aVal.toLowerCase()
      if (typeof bVal === 'string') bVal = bVal.toLowerCase()
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1
      return 0
    })
  }

  const totalItems = filteredStudents.length
  const totalPages = Math.ceil(totalItems / rowsPerPage)
  const start = (currentPage - 1) * rowsPerPage
  const paginatedStudents = filteredStudents.slice(start, start + rowsPerPage)

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  const renderSortIcon = (column) =>
    sortBy === column ? (sortOrder === 'asc' ? '↑' : '↓') : '↑↓'

  // Flip icons based on text direction
  const PrevIcon = dir === 'rtl' ? RxCaretRight : RxCaretLeft
  const NextIcon = dir === 'rtl' ? RxCaretLeft : RxCaretRight

  const handlePageChange = (newPage) => setSearchParams({ page: newPage })

  const handleRowsPerPageChange = (e) => {
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
              placeholder={t('studentTable.searchPlaceholder')}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </SearchInputContainer>
        </SearchWrapper>
      </TopBarWrapper>

      <Table role="table">
        <TableHeader role="row">
          <div>{t('studentTable.id')}</div>
          <SortableHeader
            onClick={() => handleSort('name')}
            className={sortBy === 'name' ? 'active' : ''}
          >
            {t('studentTable.name')}{' '}
            <span className="icon">{renderSortIcon('name')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('email')}
            className={sortBy === 'email' ? 'active' : ''}
          >
            {t('studentTable.email')}{' '}
            <span className="icon">{renderSortIcon('email')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('id_number')}
            className={sortBy === 'id_number' ? 'active' : ''}
          >
            {t('studentTable.idNumber')}{' '}
            <span className="icon">{renderSortIcon('id_number')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('phone')}
            className={sortBy === 'phone' ? 'active' : ''}
          >
            {t('studentTable.phone')}{' '}
            <span className="icon">{renderSortIcon('phone')}</span>
          </SortableHeader>
          <div>{t('studentTable.action')}</div>
        </TableHeader>

        {paginatedStudents.map((student) => (
          <StudentRow key={student.id} student={student} />
        ))}

        {filteredStudents.length === 0 && (
          <div style={{ padding: '1.6rem' }}>{t('studentTable.noResults')}</div>
        )}

        <PaginationWrapper>
          <PageInfo>
            {t('studentTable.pageInfo', { currentPage, totalPages })}
          </PageInfo>

          <RowsPerPage>
            {t('studentTable.rowsPerPage')}
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
              aria-label={t('studentTable.previousPage')}
            >
              <PrevIcon />
            </button>
            <button
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              aria-label={t('studentTable.nextPage')}
            >
              <NextIcon />
            </button>
          </NavButtons>
        </PaginationWrapper>
      </Table>
    </>
  )
}
