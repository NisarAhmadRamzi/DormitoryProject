import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { FiSearch } from 'react-icons/fi'
import SupportRow from './SupportRow'
import Spinner from '../../ui/Spinner'
import { getSupports } from '../../services/apiSupports'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'

const PAGE_SIZE_OPTIONS = [5, 10, 25, 50]

// Styled Components with CSS variables for light/dark mode support
const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
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
  grid-template-columns: 0.6fr 2fr 2.5fr 2.5fr 2.5fr 0.5fr;
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

export default function SupportTable() {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1
  const [searchText, setSearchText] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')

  const { isLoading, data, error } = useQuery({
    queryKey: ['supports'],
    queryFn: getSupports,
  })

  if (isLoading) return <Spinner />
  if (error) return <div>Error loading supports!</div>

  let items = data?.data || []
  if (searchText.trim()) {
    const lower = searchText.toLowerCase()
    items = items.filter((s) =>
      [
        `${s.type}`,
        `${s.details}`,
        `${s.helper_fullname}`,
        `${s.helper_number}`,
        `${s.helper_email}`,
      ]
        .join(' ')
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
  const start = (currentPage - 1) * rowsPerPage
  const pageItems = items.slice(start, start + rowsPerPage)

  const handleSort = (col) => {
    if (sortBy === col) setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'))
    else {
      setSortBy(col)
      setSortOrder('asc')
    }
  }
  const renderIcon = (col) =>
    sortBy === col ? (sortOrder === 'asc' ? '↑' : '↓') : '↑↓'
  const goto = (p) => setSearchParams({ page: p })
  const changeSize = (e) => {
    setRowsPerPage(+e.target.value)
    goto(1)
  }

  return (
    <>
      <TopBarWrapper>
        <SearchWrapper>
          <SearchInputContainer>
            <FiSearch />
            <input
              placeholder="Search supports..."
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
            Type <span className="icon">{renderIcon('type')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('details')}
            className={sortBy === 'details' ? 'active' : ''}
          >
            Details <span className="icon">{renderIcon('details')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('helper_fullname')}
            className={sortBy === 'helper_fullname' ? 'active' : ''}
          >
            Helper <span className="icon">{renderIcon('helper_fullname')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('helper_number')}
            className={sortBy === 'helper_number' ? 'active' : ''}
          >
            Number <span className="icon">{renderIcon('helper_number')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('helper_email')}
            className={sortBy === 'helper_email' ? 'active' : ''}
          >
            Email <span className="icon">{renderIcon('helper_email')}</span>
          </SortableHeader>
          <div>Action</div>
        </TableHeader>
        {pageItems.map((s) => (
          <SupportRow key={s.id} support={s} />
        ))}
        {items.length === 0 && (
          <div style={{ padding: '1.6rem' }}>No matching records.</div>
        )}
        <PaginationWrapper>
          <PageInfo>
            Page {currentPage} of {totalPages || 1}
          </PageInfo>
          <RowsPerPage>
            Rows per page:
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
              onClick={() => goto(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <RxCaretLeft />
            </button>
            <button
              onClick={() => goto(Math.min(totalPages, currentPage + 1))}
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
