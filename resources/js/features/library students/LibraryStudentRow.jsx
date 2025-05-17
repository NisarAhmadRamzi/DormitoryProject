// import { HiEllipsisVertical, HiEye, HiPencil, HiTrash } from 'react-icons/hi2'
// import React, { useEffect, useRef, useState } from 'react'
// import { useMutation, useQueryClient } from '@tanstack/react-query'

// import { deleteLibraryStudent } from '../../services/apiLibraryStudents'
// import styled from 'styled-components'
// import toast from 'react-hot-toast'

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 2fr 2.5fr 3fr 2fr 2fr 0.5fr;
//   column-gap: 0.5rem;
//   align-items: center;
//   padding: 1.4rem 1rem;
//   position: relative;
//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `

// const Id = styled.div`
//   font-size: 1.6rem;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   font-family: 'Sono';
// `

// const Cell = styled.div`
//   font-size: 1.4rem;
//   color: var(--color-grey-700);
// `

// const DropdownWrapper = styled.div`
//   position: relative;
//   display: inline-block;
// `

// const IconButton = styled.button`
//   background: none;
//   border: none;
//   cursor: pointer;
//   padding: 0.4rem;
//   border-radius: var(--border-radius-sm);
//   transform: translateX(0.8rem);
//   transition: all 0.2s;

//   &:hover {
//     background-color: var(--color-grey-100);
//   }

//   & svg {
//     width: 2.4rem;
//     height: 2.4rem;
//     color: var(--color-grey-700);
//   }
// `

// const DropdownMenu = styled.ul`
//   position: fixed;
//   background-color: var(--color-grey-0);
//   box-shadow: var(--shadow-md);
//   border-radius: var(--border-radius-md);
//   padding: 0.4rem 0;
//   z-index: 100;
//   right: ${({ position }) => position?.x}px;
//   top: ${({ position }) => position?.y}px;
//   display: ${({ show }) => (show ? 'block' : 'none')};
//   min-width: 180px;
// `

// const DropdownItem = styled.button`
//   width: 100%;
//   background: none;
//   border: none;
//   padding: 1.2rem 2.4rem;
//   text-align: left;
//   font-size: 1.4rem;
//   display: flex;
//   align-items: center;
//   gap: 1.6rem;
//   color: var(--color-grey-700);
//   cursor: pointer;
//   transition: background-color 0.2s;

//   &:hover {
//     background-color: var(--color-grey-50);
//   }

//   & svg {
//     width: 1.6rem;
//     height: 1.6rem;
//     color: var(--color-grey-400);
//     transition: color 0.3s;
//   }

//   &:disabled {
//     cursor: not-allowed;
//     opacity: 0.6;
//   }
// `

// function LibraryStudentRow({ student }) {
//   const queryClient = useQueryClient()
//   const [isOpen, setIsOpen] = useState(false)
//   const [dropdownPosition, setDropdownPosition] = useState(null)
//   const dropdownRef = useRef()

//   const { isLoading: isDeleting, mutate } = useMutation({
//     mutationFn: deleteLibraryStudent,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['library-students'] })
//       toast.success('Library student deleted successfully')
//     },
//     onError: (err) => {
//       console.error('Error during deletion:', err)
//       toast.error(err.message || 'Failed to delete student')
//     },
//   })

//   function handleDeleteConfirm() {
//     mutate(student.id)
//   }

//   function toggleDropdown(e) {
//     e.stopPropagation()
//     const rect = e.currentTarget.getBoundingClientRect()
//     setDropdownPosition({
//       x: window.innerWidth - rect.right,
//       y: rect.bottom + 8,
//     })
//     setIsOpen((open) => !open)
//   }

//   function closeDropdown() {
//     setIsOpen(false)
//   }

//   useEffect(() => {
//     function handleClickOutside(e) {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         closeDropdown()
//       }
//     }

//     if (isOpen) {
//       document.addEventListener('mousedown', handleClickOutside)
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside)
//     }
//   }, [isOpen])

//   return (
//     <TableRow role="row">
//       <Id>{student.id}</Id>
//       <Cell>{student.name}</Cell>
//       <Cell>{student.email}</Cell>
//       <Cell>{student.address}</Cell>
//       <Cell>{student.phone || '—'}</Cell>
//       <Cell>{student.gender || '—'}</Cell>

//       <DropdownWrapper ref={dropdownRef}>
//         <IconButton onClick={toggleDropdown}>
//           <HiEllipsisVertical />
//         </IconButton>

//         <DropdownMenu show={isOpen} position={dropdownPosition}>
//           <DropdownItem onClick={closeDropdown}>
//             <HiEye /> View
//           </DropdownItem>
//           <DropdownItem onClick={closeDropdown}>
//             <HiPencil /> Edit
//           </DropdownItem>
//           <DropdownItem onClick={handleDeleteConfirm} disabled={isDeleting}>
//             <HiTrash /> Delete
//           </DropdownItem>
//         </DropdownMenu>
//       </DropdownWrapper>
//     </TableRow>
//   )
// }

// export default LibraryStudentRow

// import { useMutation, useQueryClient } from '@tanstack/react-query'

// import { apiLibraryStudents } from '../../services/apiLibraryStudents'

// export default function LibraryStudentRow({ student }) {
//   const queryClient = useQueryClient()

//   const deleteMutation = useMutation(
//     () => apiLibraryStudents.delete(student.id),
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries(['libraryStudents'])
//       },
//     }
//   )

//   return (
//     <tr>
//       <td className="border border-gray-300 px-4 py-2">{student.id}</td>
//       <td className="border border-gray-300 px-4 py-2">{student.user?.name}</td>
//       <td className="border border-gray-300 px-4 py-2">
//         {student.user?.email}
//       </td>
//       <td className="border border-gray-300 px-4 py-2">{student.phone}</td>
//       <td className="border border-gray-300 px-4 py-2">
//         <button
//           onClick={() => {
//             if (confirm('Are you sure you want to delete this student?')) {
//               deleteMutation.mutate()
//             }
//           }}
//           className="bg-red-500 text-white px-2 py-1 rounded"
//         >
//           Delete
//         </button>
//       </td>
//     </tr>
//   )
// }

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteLibraryStudent } from '../../services/apiLibraryStudents'
import toast from 'react-hot-toast'

function LibraryStudentRow({ student }) {
  const queryClient = useQueryClient()

  const { mutate: deleteStudent } = useMutation({
    mutationFn: () => deleteLibraryStudent(student.id),
    onSuccess: () => {
      toast.success('Student deleted')
      queryClient.invalidateQueries({ queryKey: ['library-students'] })
    },
    onError: () => {
      toast.error('Failed to delete student')
    },
  })

  return (
    <tr>
      <td>
        {student.name} {student.last_name}
      </td>
      <td>{student.email}</td>
      <td>{student.library_id}</td>
      <td>
        <button onClick={deleteStudent}>Delete</button>
      </td>
    </tr>
  )
}

export default LibraryStudentRow
