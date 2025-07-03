import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiSearch } from 'react-icons/fi'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { getComplaints } from '../../services/apiComplaints'
import Spinner from '../../ui/Spinner'
import ComplaintsRow from './ComplaintsRow'

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  overflow: hidden;
`

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 2fr 3fr 1.5fr 2fr 0.5fr;
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

export default function ComplaintsTable() {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1
  const [search, setSearch] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')

  const { isLoading, data, error } = useQuery({
    queryKey: ['complaints'],
    queryFn: getComplaints,
  })

  if (isLoading) return <Spinner />
  if (error) return <div>{t('errorLoading', 'Error loading complaints!')}</div>

  let complaints = data?.data || []

  // Search
  if (search.trim() !== '') {
    const lower = search.toLowerCase()
    complaints = complaints.filter((c) => {
      const str = `
        ${c.id}
        ${c.title}
        ${c.description}
        ${c.status}
        ${c.student?.name}
      `.toLowerCase()
      return str.includes(lower)
    })
  }

  // Sort
  if (sortBy) {
    complaints = [...complaints].sort((a, b) => {
      let aVal, bVal
      switch (sortBy) {
        case 'id':
          aVal = a.id
          bVal = b.id
          break
        case 'student':
          aVal = (a.student?.name || '').toLowerCase()
          bVal = (b.student?.name || '').toLowerCase()
          break
        case 'title':
          aVal = (a.title || '').toLowerCase()
          bVal = (b.title || '').toLowerCase()
          break
        case 'status':
          aVal = (a.status || '').toLowerCase()
          bVal = (b.status || '').toLowerCase()
          break
        case 'created_at':
          aVal = new Date(a.created_at).getTime()
          bVal = new Date(b.created_at).getTime()
          break
        default:
          aVal = ''
          bVal = ''
      }
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1
      return 0
    })
  }

  // Pagination
  const totalItems = complaints.length
  const totalPages = Math.ceil(totalItems / rowsPerPage)
  const start = (currentPage - 1) * rowsPerPage
  const paginated = complaints.slice(start, start + rowsPerPage)

  const handleSort = (col) => {
    if (sortBy === col) setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'))
    else {
      setSortBy(col)
      setSortOrder('asc')
    }
  }

  const renderIcon = (col) =>
    sortBy === col ? (sortOrder === 'asc' ? '↑' : '↓') : '↑↓'

  const changePage = (p) => setSearchParams({ page: p })

  const changeRows = (e) => {
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
            placeholder={t('complaintsTable.searchPlaceholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchInputContainer>
      </TopBarWrapper>

      <Table role="table">
        <TableHeader role="row">
          <SortableHeader
            onClick={() => handleSort('id')}
            className={sortBy === 'id' ? 'active' : ''}
          >
            <div>{t('complaintsTable.headers.id')}</div>{' '}
            <span className="icon">{renderIcon('id')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('student')}
            className={sortBy === 'student' ? 'active' : ''}
          >
            <div>{t('complaintsTable.headers.student')}</div>{' '}
            <span className="icon">{renderIcon('student')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('title')}
            className={sortBy === 'title' ? 'active' : ''}
          >
            <div>{t('complaintsTable.headers.title')}</div>{' '}
            <span className="icon">{renderIcon('title')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('status')}
            className={sortBy === 'status' ? 'active' : ''}
          >
            <div>{t('complaintsTable.headers.status')}</div>{' '}
            <span className="icon">{renderIcon('status')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('created_at')}
            className={sortBy === 'created_at' ? 'active' : ''}
          >
            <div>{t('complaintsTable.headers.createdAt')}</div>{' '}
            <span className="icon">{renderIcon('created_at')}</span>
          </SortableHeader>
          <div>{t('complaintsTable.headers.action')}</div>
        </TableHeader>

        {paginated.map((c) => (
          <ComplaintsRow key={c.id} complaint={c} />
        ))}
        {complaints.length === 0 && (
          <div style={{ padding: '1.6rem' }}>
            {t('complaintsTable.noMatching')}
          </div>
        )}

        <PaginationWrapper>
          <PageInfo>
            {t('complaintsTable.pagination.pageInfo', {
              current: currentPage,
              total: totalPages,
            })}
          </PageInfo>
          <RowsPerPage>
            {t('complaintsTable.pagination.rowsPerPage')}
            <select value={rowsPerPage} onChange={changeRows}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </RowsPerPage>
          <NavButtons>
            <NavButtons>
              <button
                onClick={() => changePage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                &lt;
              </button>
              <button
                onClick={() =>
                  changePage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
              >
                &gt;
              </button>
            </NavButtons>
          </NavButtons>
        </PaginationWrapper>
      </Table>
    </>
  )
}
