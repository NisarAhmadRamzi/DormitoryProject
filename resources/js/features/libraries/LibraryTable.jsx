import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { getLibraries } from '../../services/apiLibraries'
import Spinner from '../../ui/Spinner'
import LibraryRow from './LibraryRow'

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

export default function LibraryTable() {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1
  const [searchText, setSearchText] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')

  const { isLoading, data, error } = useQuery({
    queryKey: ['libraries'],
    queryFn: getLibraries,
  })

  if (isLoading) return <Spinner />
  if (error) return <div>Error loading libraries!</div>

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
  const pageItems = items.slice(
    (currentPage - 1) * rowsPerPage,
    (currentPage - 1) * rowsPerPage + rowsPerPage
  )

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
              placeholder="Search libraries..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </SearchInputContainer>
        </SearchWrapper>
      </TopBarWrapper>
      <Table role="table">
        <TableHeader role="row">
          <div />
          <SortableHeader
            onClick={() => handleSort('name')}
            className={sortBy === 'name' ? 'active' : ''}
          >
            Name <span className="icon">{renderIcon('name')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('location')}
            className={sortBy === 'location' ? 'active' : ''}
          >
            Location <span className="icon">{renderIcon('location')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('contact_info')}
            className={sortBy === 'contact_info' ? 'active' : ''}
          >
            Contact <span className="icon">{renderIcon('contact_info')}</span>
          </SortableHeader>
          <div>Action</div>
        </TableHeader>
        {pageItems.map((lib) => (
          <LibraryRow key={lib.id} library={lib} />
        ))}
        {items.length === 0 && (
          <div style={{ padding: '1.6rem' }}>No matching libraries found.</div>
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

// root version

// import { Box, Stack } from '@mui/material'
// import {
//   MRT_GlobalFilterTextField,
//   MRT_ToggleFiltersButton,
//   MaterialReactTable,
//   useMaterialReactTable,
// } from 'material-react-table'

// import ActionsCell from './LibraryRow'
// import Spinner from '../../ui/Spinner'
// import { getLibraries } from '../../services/apiLibraries'
// import { useMemo } from 'react'
// import { useQuery } from '@tanstack/react-query'

// function LibraryTable({ search }) {
//   const { isLoading, data, error } = useQuery({
//     queryKey: ['libraries'],
//     queryFn: getLibraries,
//   })

//   const libraries = data?.data || []

//   // Define table columns
//   const columns = useMemo(
//     () => [
//       {
//         accessorKey: 'id',
//         header: 'ID',
//         size: 50,
//       },
//       {
//         accessorKey: 'name',
//         header: 'Name',
//       },
//       {
//         accessorKey: 'location',
//         header: 'Location',
//       },
//       {
//         accessorKey: 'contact_info',
//         header: 'Contact Info',
//         Cell: ({ cell }) => cell.getValue() || '—',
//       },
//       {
//         id: 'actions',
//         header: 'Actions',
//         Cell: ({ row }) => <ActionsCell library={row.original} />,
//         enableSorting: false,
//         enableColumnFilter: false,
//       },
//     ],
//     []
//   )

//   // Set up table instance
//   const table = useMaterialReactTable({
//     columns,
//     data: libraries,
//     initialState: {
//       pagination: { pageSize: 10, pageIndex: 0 },
//       sorting: [{ id: 'name', desc: false }],
//     },
//     enableSorting: true,
//     enableColumnFilters: true,
//     enableGlobalFilter: true,
//     globalFilterFn: 'contains',
//   })

//   if (isLoading) return <Spinner />
//   if (error) return <div>Error loading libraries!</div>

//   // Optional: filter libraries by `search` prop
//   const filteredData = search
//     ? libraries.filter((library) =>
//         `${library.id} ${library.name} ${library.location} ${library.contact_info}`
//           .toLowerCase()
//           .includes(search.toLowerCase())
//       )
//     : libraries

//   return (
//     <Box>
//       <Stack direction="row" spacing={2} mb={2}>
//         <MRT_GlobalFilterTextField table={table} />
//         <MRT_ToggleFiltersButton table={table} />
//       </Stack>

//       <MaterialReactTable table={table} data={filteredData} />
//     </Box>
//   )
// }

// export default LibraryTable
