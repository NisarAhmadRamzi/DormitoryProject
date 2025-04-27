// import { useQuery } from '@tanstack/react-query'
// import { useState } from 'react'
// import { useSearchParams } from 'react-router-dom'
// import styled from 'styled-components'
// import { getStudents } from '../../services/apiStudents'
// import Pagination from '../../ui/Pagination'
// import Spinner from '../../ui/Spinner'
// import { PAGE_SIZE } from '../../utils/constants'
// import StudentRow from './StudentRow'

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);
//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 2fr 2.5fr 2.5fr 2fr 0.5fr;
//   column-gap: 0.5rem;
//   align-items: center;
//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `

// const SortableHeader = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.4rem;
//   cursor: pointer;
//   user-select: none;

//   .icon {
//     font-size: 1.2rem;
//     color: var(--color-grey-500);
//   }

//   &.active .icon {
//     color: var(--color-grey-900);
//     font-weight: bold;
//   }
// `

// function StudentTable({ search }) {
//   const [searchParams] = useSearchParams()
//   const currentPage = Number(searchParams.get('page')) || 1

//   const { isLoading, data, error } = useQuery({
//     queryKey: ['students'],
//     queryFn: getStudents,
//   })

//   const [sortBy, setSortBy] = useState(null)
//   const [sortOrder, setSortOrder] = useState('asc')

//   if (isLoading) return <Spinner />
//   if (error) return <div>Error loading students!</div>

//   let filteredStudents = data?.data || []

//   // Search functionality
//   if (search.trim() !== '') {
//     filteredStudents = filteredStudents.filter((student) => {
//       const searchString =
//         `${student.name} ${student.email} ${student.phone} ${student.id_number}`.toLowerCase()
//       return searchString.includes(search.toLowerCase())
//     })
//   }

//   // Sort functionality
//   if (sortBy) {
//     filteredStudents = [...filteredStudents].sort((a, b) => {
//       let aVal = a[sortBy]
//       let bVal = b[sortBy]

//       if (typeof aVal === 'string') aVal = aVal.toLowerCase()
//       if (typeof bVal === 'string') bVal = bVal.toLowerCase()

//       if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1
//       if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1
//       return 0
//     })
//   }

//   // Pagination logic
//   const totalItems = filteredStudents.length
//   const start = (currentPage - 1) * PAGE_SIZE
//   const end = start + PAGE_SIZE
//   const paginatedStudents = filteredStudents.slice(start, end)

//   function handleSort(column) {
//     if (sortBy === column) {
//       setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
//     } else {
//       setSortBy(column)
//       setSortOrder('asc')
//     }
//   }

//   const renderSortIcon = (column) => {
//     if (sortBy === column) {
//       return sortOrder === 'asc' ? '↑' : '↓'
//     }
//     return '↑↓'
//   }

//   return (
//     <>
//       <Table role="table">
//         <TableHeader role="row">
//           <div></div>
//           <SortableHeader
//             onClick={() => handleSort('name')}
//             className={sortBy === 'name' ? 'active' : ''}
//           >
//             Name <span className="icon">{renderSortIcon('name')}</span>
//           </SortableHeader>

//           <SortableHeader
//             onClick={() => handleSort('email')}
//             className={sortBy === 'email' ? 'active' : ''}
//           >
//             Email <span className="icon">{renderSortIcon('email')}</span>
//           </SortableHeader>

//           <SortableHeader
//             onClick={() => handleSort('phone')}
//             className={sortBy === 'phone' ? 'active' : ''}
//           >
//             Phone <span className="icon">{renderSortIcon('phone')}</span>
//           </SortableHeader>

//           <SortableHeader
//             onClick={() => handleSort('id_number')}
//             className={sortBy === 'id_number' ? 'active' : ''}
//           >
//             ID Number{' '}
//             <span className="icon">{renderSortIcon('id_number')}</span>
//           </SortableHeader>

//           <div>Action</div>
//         </TableHeader>

//         {paginatedStudents.map((student) => (
//           <StudentRow student={student} key={student.id} />
//         ))}

//         {filteredStudents.length === 0 && (
//           <div style={{ padding: '1.6rem' }}>No matching students found.</div>
//         )}

//         <Pagination count={totalItems} />
//       </Table>
//     </>
//   )
// }

// export default StudentTable

import styled from 'styled-components'
import Spinner from '../../ui/Spinner'
import StudentRow from './StudentRow'

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
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

function StudentTable({ students, search, loading }) {
  if (loading) return <Spinner />

  const filteredStudents = students.filter(
    (student) =>
      student.name?.toLowerCase().includes(search.toLowerCase()) ||
      student.email?.toLowerCase().includes(search.toLowerCase())
  )

  if (filteredStudents.length === 0) return <p>No matching students found.</p>

  return (
    <Table role="table">
      <TableHeader role="row">
        <div>ID</div>
        <div>Name</div>
        <div>Email</div>
        <div>ID Number</div>
        <div>Phone</div>
        <div>Actions</div>
      </TableHeader>

      {filteredStudents.map((student) => (
        <StudentRow key={student.id} student={student} />
      ))}
    </Table>
  )
}

export default StudentTable
