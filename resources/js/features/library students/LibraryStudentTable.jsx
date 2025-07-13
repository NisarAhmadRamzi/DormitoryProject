import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiSearch } from 'react-icons/fi'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { getAllLibraryStudents } from '../../services/apiLibraryStudents'
import Spinner from '../../ui/Spinner'
import AddLibraryStudent from './AddLibraryStudent'
import LibraryStudentRow from './LibraryStudentRow'
const PAGE_SIZE_OPTIONS = [5, 10, 25, 50]

// Styled Components with CSS variables
const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  overflow: hidden;
`

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 2fr 2.5fr 2fr 2.5fr 0.5fr;
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

const TableBody = styled.div`
  max-height: 420px;
  overflow-y: auto;
  background-color: var(--color-grey-0);
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

export default function LibraryStudentsTable() {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1
  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')
  const [search, setSearch] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const { t } = useTranslation()

  const { data, isLoading, error } = useQuery({
    queryKey: ['library-students'],
    queryFn: getAllLibraryStudents,
  })
  console.log(data)
  if (isLoading) return <Spinner />
  if (error) return <p>{t('libraryStudentsTable.error')}</p>

  let students = data?.data || []

  // Filter
  if (search.trim()) {
    const lower = search.toLowerCase()
    students = students.filter((s) =>
      `${s.id} ${s.name} ${s.email} ${s.phone} ${s.address}`
        .toLowerCase()
        .includes(lower)
    )
  }

  // Sort
  if (sortBy) {
    students = [...students].sort((a, b) => {
      let aVal = a[sortBy],
        bVal = b[sortBy]
      if (typeof aVal === 'string') aVal = aVal.toLowerCase()
      if (typeof bVal === 'string') bVal = bVal.toLowerCase()
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1
      return 0
    })
  }

  const totalItems = students.length
  const totalPages = Math.ceil(totalItems / rowsPerPage)
  const start = (currentPage - 1) * rowsPerPage
  const paginated = students.slice(start, start + rowsPerPage)

  const handleSort = (col) => {
    if (sortBy === col) setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'))
    else {
      setSortBy(col)
      setSortOrder('asc')
    }
  }

  const changePage = (p) => setSearchParams({ page: p })
  const changeRows = (e) => {
    setRowsPerPage(+e.target.value)
    setSearchParams({ page: 1 })
  }
  const renderIcon = (col) =>
    sortBy === col ? (sortOrder === 'asc' ? '↑' : '↓') : '↑↓'

  return (
    <>
      <TopBarWrapper>
        <SearchInputContainer>
          <FiSearch />
          <input
            type="text"
            placeholder={t('libraryStudentsTable.searchPlaceholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchInputContainer>
        <AddLibraryStudent />
      </TopBarWrapper>

      <Table>
        <TableHeader>
          <div>{t('libraryStudentsTable.id')}</div>
          <SortableHeader
            onClick={() => handleSort('name')}
            className={sortBy === 'name' ? 'active' : ''}
          >
            {t('libraryStudentsTable.name')}{' '}
            <span className="icon">{renderIcon('name')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('email')}
            className={sortBy === 'email' ? 'active' : ''}
          >
            {t('libraryStudentsTable.email')}{' '}
            <span className="icon">{renderIcon('email')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('phone')}
            className={sortBy === 'phone' ? 'active' : ''}
          >
            {t('libraryStudentsTable.phone')}{' '}
            <span className="icon">{renderIcon('phone')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('address')}
            className={sortBy === 'address' ? 'active' : ''}
          >
            {t('libraryStudentsTable.address')}{' '}
            <span className="icon">{renderIcon('address')}</span>
          </SortableHeader>
          <div>{t('libraryStudentsTable.actions')}</div>
        </TableHeader>

        <TableBody>
          {paginated.map((s) => (
            <LibraryStudentRow key={s.id} student={s} />
          ))}
        </TableBody>

        <PaginationWrapper>
          <PageInfo>
            {t('libraryStudentsTable.pageInfo', {
              currentPage,
              totalPages,
            })}
          </PageInfo>
          <RowsPerPage>
            {t('libraryStudentsTable.rowsPerPage')}
            <select value={rowsPerPage} onChange={changeRows}>
              {PAGE_SIZE_OPTIONS.map((size) => (
                <option key={size} value={size}>
                  {size}
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
