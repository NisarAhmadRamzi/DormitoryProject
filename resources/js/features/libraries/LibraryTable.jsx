import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { getLibraries } from '../../services/apiLibraries'
import Pagination from '../../ui/Pagination'
import Spinner from '../../ui/Spinner'
import { PAGE_SIZE } from '../../utils/constants'
import LibraryRow from './LibraryRow'

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
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

function LibraryTable({ search = '' }) {
  const [searchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const { isLoading, data, error } = useQuery({
    queryKey: ['libraries'],
    queryFn: getLibraries,
  })

  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')

  if (isLoading) return <Spinner />
  if (error) return <div>Error loading libraries!</div>

  let filteredLibraries = data?.data || []

  if (typeof search === 'string' && search.trim() !== '') {
    filteredLibraries = filteredLibraries.filter((library) => {
      const searchString =
        `${library.id} ${library.name} ${library.location} ${library.contact_info}`.toLowerCase()
      return searchString.includes(search.toLowerCase())
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
  const start = (currentPage - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE
  const paginatedLibraries = filteredLibraries.slice(start, end)

  function handleSort(column) {
    if (sortBy === column) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  const renderSortIcon = (column) => {
    if (sortBy === column) return sortOrder === 'asc' ? '↑' : '↓'
    return '↑↓'
  }

  return (
    <>
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

        <Pagination count={totalItems} />
      </Table>
    </>
  )
}

export default LibraryTable

//v2

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
