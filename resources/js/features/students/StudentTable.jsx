// import styled from 'styled-components'
// import Spinner from '../../ui/Spinner'
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
//   grid-template-columns: 0.6fr 2fr 2.5fr 2.5fr 2.5fr 0.5fr;
//   column-gap: 0.5rem
//   align-items: center;
//   background-color: var(--color-grey-50);
//   padding: 1.6rem;
//   font-weight: 600;
//   text-transform: uppercase;
//   color: var(--color-grey-600);
// `

// function StudentTable({ students, search, loading }) {
//   if (loading) return <Spinner />

//   const filteredStudents = students.filter(
//     (student) =>
//       student.name?.toLowerCase().includes(search.toLowerCase()) ||
//       student.email?.toLowerCase().includes(search.toLowerCase())
//   )

//   if (filteredStudents.length === 0) return <p>No matching students found.</p>

//   return (
//     <Table role="table">
//       <TableHeader role="row">
//         <div>ID</div>
//         <div>Name</div>
//         <div>Email</div>
//         <div>ID Number</div>
//         <div>Phone</div>
//         <div>Actions</div>
//       </TableHeader>

//       {filteredStudents.map((student) => (
//         <StudentRow key={student.id} student={student} />
//       ))}
//     </Table>
//   )
// }

// export default StudentTable

import Spinner from '../../ui/Spinner'
import StudentRow from './StudentRow'
import styled from 'styled-components'

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

function StudentTable({ students, search = '', loading }) {
  if (loading) return <Spinner />

  // Ensure students is an array to avoid filter crash
  const safeStudents = Array.isArray(students) ? students : []

  const filteredStudents = safeStudents.filter(
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
