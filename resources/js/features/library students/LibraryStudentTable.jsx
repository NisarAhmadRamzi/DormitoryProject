// import { HiPencil, HiTrash } from 'react-icons/hi2'

// import Menus from '../../ui/Menus' // Correctly imported
// import Table from '../../ui/Table' // Correctly imported
// import { useState } from 'react'

// function LibraryStudentsTable({ students }) {
//   const [menuOpenId, setMenuOpenId] = useState(null)

//   if (!Array.isArray(students)) {
//     console.error('students is not an array:', students)
//     return <p>Invalid data</p>
//   }

//   function handleEdit(studentId) {
//     console.log('Edit student:', studentId)
//     // TODO: implement edit logic
//   }

//   function handleDelete(studentId) {
//     console.log('Delete student:', studentId)
//     // TODO: implement delete logic
//   }

//   return (
//     <Table.Table>
//       {' '}
//       {/* Correct way to use Table */}
//       <Table.Header columns="1fr 2fr 1fr">
//         <div>Name</div>
//         <div>Library</div>
//         <div>Actions</div>
//       </Table.Header>
//       <Table.Body>
//         {students.length === 0 ? (
//           <Table.Empty>No students found.</Table.Empty>
//         ) : (
//           students.map((student) => (
//             <Table.Row key={student.id} columns="1fr 2fr 1fr">
//               <div>{student.name}</div>
//               <div>{student.libraryName}</div>
//               <div>
//                 <Menus.Menu>
//                   <Menus.Toggle
//                     onClick={() =>
//                       setMenuOpenId(
//                         menuOpenId === student.id ? null : student.id
//                       )
//                     }
//                   />
//                   {menuOpenId === student.id && (
//                     <Menus.List position={{ x: 0, y: 0 }}>
//                       <Menus.Button onClick={() => handleEdit(student.id)}>
//                         <HiPencil /> Edit
//                       </Menus.Button>
//                       <Menus.Button onClick={() => handleDelete(student.id)}>
//                         <HiTrash /> Delete
//                       </Menus.Button>
//                     </Menus.List>
//                   )}
//                 </Menus.Menu>
//               </div>
//             </Table.Row>
//           ))
//         )}
//       </Table.Body>
//       <Table.Footer>{/* Pagination buttons etc can go here */}</Table.Footer>
//     </Table.Table>
//   )
// }

// export default LibraryStudentsTable

import LibraryStudentRow from './LibraryStudentRow'
import Table from '../../ui/Table'

function LibraryStudentsTable({ students }) {
  if (!Array.isArray(students)) {
    console.error('students is not an array:', students)
    return <p>Invalid data</p>
  }

  return (
    <Table.Table>
      <Table.Header columns="0.6fr 2fr 2.5fr 3fr 2fr 2fr 0.5fr">
        <div>ID</div>
        <div>Name</div>
        <div>Email</div>
        <div>Address</div>
        <div>Phone</div>
        <div>Gender</div>
        <div>Actions</div>
      </Table.Header>

      <Table.Body>
        {students.length === 0 ? (
          <Table.Empty>No library students found.</Table.Empty>
        ) : (
          students.map((student) => (
            <LibraryStudentRow key={student.id} student={student} />
          ))
        )}
      </Table.Body>

      <Table.Footer>{/* Optional: pagination */}</Table.Footer>
    </Table.Table>
  )
}

export default LibraryStudentsTable
