// import LibraryStudentRow from './LibraryStudentRow'
// import Table from '../../ui/Table'

// function LibraryStudentsTable({ students }) {
//   if (!Array.isArray(students)) {
//     console.error('students is not an array:', students)
//     return <p>Invalid data</p>
//   }

//   return (
//     <Table.Table>
//       <Table.Header columns="0.6fr 2fr 2.5fr 3fr 2fr 2fr 0.5fr">
//         <div>ID</div>
//         <div>Name</div>
//         <div>Email</div>
//         <div>Address</div>
//         <div>Phone</div>
//         <div>Gender</div>
//         <div>Actions</div>
//       </Table.Header>

//       <Table.Body>
//         {students.length === 0 ? (
//           <Table.Empty>No library students found.</Table.Empty>
//         ) : (
//           students.map((student) => (
//             <LibraryStudentRow key={student.id} student={student} />
//           ))
//         )}
//       </Table.Body>

//       <Table.Footer>{/* Optional: pagination */}</Table.Footer>
//     </Table.Table>
//   )
// }

// export default LibraryStudentsTable

// import LibraryStudentRow from './LibraryStudentRow'
// import { apiLibraryStudents } from '../../services/apiLibraryStudents'
// import { useQuery } from '@tanstack/react-query'

// export default function LibraryStudentsTable() {
//   const { data, isLoading, error } = useQuery(
//     ['libraryStudents'],
//     apiLibraryStudents.getAll
//   )

//   if (isLoading) return <div>Loading...</div>
//   if (error) return <div>Error loading library students.</div>

//   return (
//     <table className="table-auto border-collapse border border-gray-300 w-full">
//       <thead>
//         <tr>
//           <th className="border border-gray-300 px-4 py-2">ID</th>
//           <th className="border border-gray-300 px-4 py-2">Name</th>
//           <th className="border border-gray-300 px-4 py-2">Email</th>
//           <th className="border border-gray-300 px-4 py-2">Phone</th>
//           <th className="border border-gray-300 px-4 py-2">Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((student) => (
//           <LibraryStudentRow key={student.id} student={student} />
//         ))}
//       </tbody>
//     </table>
//   )
// }

// import LibraryStudentRow from './LibraryStudentRow'
// import { getAllLibraryStudents } from '../../services/apiLibraryStudents'
// import { useQuery } from '@tanstack/react-query'

// function LibraryStudentsTable() {
//   const {
//     data: students = [],
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ['library-students'],
//     queryFn: getAllLibraryStudents,
//   })

//   if (isLoading) return <p>Loading...</p>
//   if (error) return <p>Error loading students</p>

//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Name</th>
//           <th>Email</th>
//           <th>Library ID</th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {students.map((student) => (
//           <LibraryStudentRow key={student.id} student={student} />
//         ))}
//       </tbody>
//     </table>
//   )
// }

// export default LibraryStudentsTable

import LibraryStudentRow from './LibraryStudentRow'
import { getAllLibraryStudents } from '../../services/apiLibraryStudents'
import { useQuery } from '@tanstack/react-query'

function LibraryStudentsTable() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['library-students'],
    queryFn: getAllLibraryStudents,
  })

  const students = data?.data || [] // ✅ Extract array correctly

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading students</p>

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Library ID</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <LibraryStudentRow key={student.id} student={student} />
        ))}
      </tbody>
    </table>
  )
}

export default LibraryStudentsTable
