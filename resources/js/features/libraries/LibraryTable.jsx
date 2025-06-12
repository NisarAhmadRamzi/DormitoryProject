import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { getLibraries } from '../../services/apiLibraries'
import Spinner from '../../ui/Spinner'
import LibraryRow from './LibraryRow'

// Styled Components
const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`

const TopBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.6rem 2.4rem 0 0rem;
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
    left: 90%;
    transform: translateY(-50%);
    color: var(--color-grey-900);
    font-size: 1.4rem;
    pointer-events: none;
  }

  input {
    font-size: 1.4rem;
    padding: 0.6rem 1rem 0.6rem 2.8rem;
    border: 1px solid var(--color-grey-300);
    border-radius: 4px;
    width: 100%;
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
<<<<<<< HEAD
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
=======
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 2.4rem;
  border-top: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  font-size: 1.4rem;
`

const PageInfo = styled.div`
  flex: 1;
  text-align: left;
`

const RowsPerPage = styled.div`
  flex: 1;
  text-align: center;
>>>>>>> fffccedc1909da34b379a33916755cec06894013

  select {
    padding: 0.4rem 0.8rem;
    font-size: 1.4rem;
    border: 1px solid var(--color-grey-300);
<<<<<<< HEAD
    border-radius: 6px;
    background-color: white;
=======
    border-radius: 4px;
>>>>>>> fffccedc1909da34b379a33916755cec06894013
  }
`

const NavButtons = styled.div`
<<<<<<< HEAD
  display: flex;
  align-items: center;
  gap: 1rem;

  button {
    padding: 0.4rem 0.8rem;
    font-size: 2rem;
    background-color: white;
    border: 1px solid var(--color-grey-300);
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover:not(:disabled) {
      background-color: var(--color-grey-100);
    }
=======
  flex: 1;
  text-align: right;

  button {
    margin-left: 0.8rem;
    padding: 0.4rem 1rem;
    font-size: 3rem;
    border: none;
    background-color: white;
    border-radius: 4px;
    cursor: pointer;
>>>>>>> fffccedc1909da34b379a33916755cec06894013

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`

<<<<<<< HEAD
=======
const SearchWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 1.2rem 2.4rem;
`

const SearchInputContainer = styled.div`
  position: relative;
  width: 300px;

  svg {
    position: absolute;
    top: 50%;
    left: 90%;
    transform: translateY(-50%);
    color: var(--color-grey-900);
    font-size: 1.4rem;
    pointer-events: none;
  }

  input {
    font-size: 1.4rem;
    padding: 0.6rem 1rem 0.6rem 2.8rem; /* padding left for icon */
    border: 1px solid var(--color-grey-300);
    border-radius: 4px;
    width: 100%;
  }
`

>>>>>>> fffccedc1909da34b379a33916755cec06894013
// Component
function LibraryTable() {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')
  const [searchText, setSearchText] = useState('')

  const { isLoading, data, error } = useQuery({
    queryKey: ['libraries'],
    queryFn: getLibraries,
  })

  if (isLoading) return <Spinner />
  if (error) return <div>Error loading libraries!</div>

  let filteredLibraries = data?.data || []

  if (searchText.trim() !== '') {
    filteredLibraries = filteredLibraries.filter((library) => {
      const searchString =
        `${library.id} ${library.name} ${library.location} ${library.contact_info}`.toLowerCase()
      return searchString.includes(searchText.toLowerCase())
    })
  }

  if (sortBy) {
    filteredLibraries = [...filteredLibraries].sort((a, b) => {
      let aVal = a[sortBy]
      let bVal = b[sortBy]
      if (typeof aVal === 'string') aVal = aVal.toLowerCase()
      if (typeof bVal === 'string') bVal = bVal.toLowerCase()

      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1
      return 0
    })
  }

  const totalItems = filteredLibraries.length
  const totalPages = Math.ceil(totalItems / rowsPerPage)
  const start = (currentPage - 1) * rowsPerPage
  const end = start + rowsPerPage
  const paginatedLibraries = filteredLibraries.slice(start, end)

  function handleSort(column) {
    if (sortBy === column) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  function renderSortIcon(column) {
    if (sortBy === column) return sortOrder === 'asc' ? '↑' : '↓'
    return '↑↓'
  }

  function handlePageChange(newPage) {
    setSearchParams({ page: newPage })
  }

  function handleRowsPerPageChange(e) {
    const newSize = Number(e.target.value)
    setRowsPerPage(newSize)
<<<<<<< HEAD
    setSearchParams({ page: 1 })
=======
    setSearchParams({ page: 1 }) // reset to page 1
>>>>>>> fffccedc1909da34b379a33916755cec06894013
  }

  return (
    <>
<<<<<<< HEAD
      <TopBarWrapper>
        <SearchWrapper>
          <SearchInputContainer>
            <FiSearch />
            <input
              type="text"
              placeholder="Search libraries..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </SearchInputContainer>
        </SearchWrapper>
      </TopBarWrapper>
=======
      <SearchWrapper>
        <SearchInputContainer>
          <FiSearch />
          <input
            type="text"
            placeholder="Search libraries..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </SearchInputContainer>
      </SearchWrapper>
>>>>>>> fffccedc1909da34b379a33916755cec06894013

      <Table role="table">
        <TableHeader role="row">
          <div></div>
          <SortableHeader
            onClick={() => handleSort('name')}
            className={sortBy === 'name' ? 'active' : ''}
          >
            Name <span className="icon">{renderSortIcon('name')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('location')}
            className={sortBy === 'location' ? 'active' : ''}
          >
            Location <span className="icon">{renderSortIcon('location')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('contact_info')}
            className={sortBy === 'contact_info' ? 'active' : ''}
          >
            Contact{' '}
            <span className="icon">{renderSortIcon('contact_info')}</span>
          </SortableHeader>
          <div>Action</div>
        </TableHeader>

        {paginatedLibraries.map((library) => (
          <LibraryRow key={library.id} library={library} />
        ))}

        {filteredLibraries.length === 0 && (
          <div style={{ padding: '1.6rem' }}>No matching libraries found.</div>
        )}

        <PaginationWrapper>
          <PageInfo>
            Page {currentPage} of {totalPages}
          </PageInfo>

          <RowsPerPage>
            Rows per page:{' '}
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

export default LibraryTable

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
