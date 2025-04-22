// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import React, { useEffect, useRef, useState } from 'react'
// import { HiEllipsisVertical, HiEye, HiPencil, HiTrash } from 'react-icons/hi2'

// import toast from 'react-hot-toast'
// import styled from 'styled-components'
// import { deleteLibrary } from '../../services/apiLibraries'
// import ConfirmDelete from '../../ui/ConfirmDelete'
// import Modal from '../../ui/Modal'
// import CreateLibraryForm from './CreateLibraryForm'
// import LibraryDetails from './LibraryDetails'

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 2fr 2.5fr 2.5fr 0.5fr;
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

// function LibraryRow({ library }) {
//   const queryClient = useQueryClient()
//   const [isOpen, setIsOpen] = useState(false)
//   const [dropdownPosition, setDropdownPosition] = useState(null)
//   const dropdownRef = useRef()

//   const { isLoading: isDeleting, mutate } = useMutation({
//     mutationFn: deleteLibrary,
//     onSuccess: () => {
//       toast.success('Library deleted successfully')
//       queryClient.invalidateQueries({ queryKey: ['libraries'] })
//     },
//     onError: (err) => toast.error(err.message || 'Failed to delete library'),
//   })

//   function handleDeleteConfirm() {
//     mutate(library.id)
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
//       <Id>{library.id}</Id>
//       <Cell>{library.name}</Cell>
//       <Cell>{library.location}</Cell>
//       <Cell>{library.contact_info || '—'}</Cell>

//       <DropdownWrapper ref={dropdownRef}>
//         <IconButton onClick={toggleDropdown}>
//           <HiEllipsisVertical />
//         </IconButton>

//         <DropdownMenu show={isOpen} position={dropdownPosition}>
//           <Modal.Open opensWindowName={`view-${library.id}`}>
//             <DropdownItem onClick={closeDropdown}>
//               <HiEye /> View
//             </DropdownItem>
//           </Modal.Open>

//           <Modal.Open opensWindowName={`edit-${library.id}`}>
//             <DropdownItem onClick={closeDropdown}>
//               <HiPencil /> Edit
//             </DropdownItem>
//           </Modal.Open>

//           <Modal.Open opensWindowName={`delete-${library.id}`}>
//             <DropdownItem onClick={closeDropdown} disabled={isDeleting}>
//               <HiTrash /> Delete
//             </DropdownItem>
//           </Modal.Open>
//         </DropdownMenu>
//       </DropdownWrapper>

//       <Modal.Window name={`view-${library.id}`}>
//         <LibraryDetails library={library} />
//       </Modal.Window>

//       <Modal.Window name={`edit-${library.id}`}>
//         <CreateLibraryForm libraryToEdit={library} />
//       </Modal.Window>

//       <Modal.Window name={`delete-${library.id}`}>
//         <ConfirmDelete onConfirm={handleDeleteConfirm} />
//       </Modal.Window>
//     </TableRow>
//   )
// }

// export default LibraryRow

// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import React, { useEffect, useRef, useState } from 'react'
// import { HiEllipsisVertical, HiEye, HiPencil, HiTrash } from 'react-icons/hi2'

// import toast from 'react-hot-toast'
// import styled from 'styled-components'
// import { deleteLibrary } from '../../services/apiLibraries'
// import ConfirmDelete from '../../ui/ConfirmDelete'
// import Modal from '../../ui/Modal'
// import CreateLibraryForm from './CreateLibraryForm'
// import LibraryDetails from './LibraryDetails'

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 2fr 2.5fr 2.5fr 0.5fr;
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

// function LibraryRow({ library }) {
//   const queryClient = useQueryClient()
//   const [isOpen, setIsOpen] = useState(false)
//   const [dropdownPosition, setDropdownPosition] = useState(null)
//   const dropdownRef = useRef()

//   // Mutation to delete library
//   const { mutate, isLoading: isDeleting } = useMutation({
//     mutationFn: deleteLibrary,
//     onSuccess: () => {
//       toast.success('Library deleted successfully')

//       // Optimistically update the cache
//       queryClient.setQueryData(['libraries'], (oldData) => {
//         // Filter out the deleted library from the cached list
//         return oldData.filter((lib) => lib.id !== library.id)
//       })

//       // Invalidate queries to refetch the data
//       queryClient.invalidateQueries(['libraries'])
//     },
//     onError: (err) => toast.error(err.message || 'Failed to delete library'),
//   })

//   // Confirm delete handler
//   function handleDeleteConfirm() {
//     mutate(library.id)
//   }

//   // Dropdown menu toggle
//   function toggleDropdown(e) {
//     e.stopPropagation()
//     const rect = e.currentTarget.getBoundingClientRect()
//     setDropdownPosition({
//       x: window.innerWidth - rect.right,
//       y: rect.bottom + 8,
//     })
//     setIsOpen((open) => !open)
//   }

//   // Close dropdown when clicked outside
//   function closeDropdown() {
//     setIsOpen(false)
//   }

//   // Add click listener to close dropdown
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
//       <Id>{library.id}</Id>
//       <Cell>{library.name}</Cell>
//       <Cell>{library.location}</Cell>
//       <Cell>{library.contact_info || '—'}</Cell>

//       <DropdownWrapper ref={dropdownRef}>
//         <IconButton onClick={toggleDropdown}>
//           <HiEllipsisVertical />
//         </IconButton>

//         <DropdownMenu show={isOpen} position={dropdownPosition}>
//           <Modal.Open opensWindowName={`view-${library.id}`}>
//             <DropdownItem onClick={closeDropdown}>
//               <HiEye /> View
//             </DropdownItem>
//           </Modal.Open>

//           <Modal.Open opensWindowName={`edit-${library.id}`}>
//             <DropdownItem onClick={closeDropdown}>
//               <HiPencil /> Edit
//             </DropdownItem>
//           </Modal.Open>

//           <Modal.Open opensWindowName={`delete-${library.id}`}>
//             <DropdownItem onClick={closeDropdown} disabled={isDeleting}>
//               <HiTrash /> Delete
//             </DropdownItem>
//           </Modal.Open>
//         </DropdownMenu>
//       </DropdownWrapper>

//       <Modal.Window name={`view-${library.id}`}>
//         <LibraryDetails library={library} />
//       </Modal.Window>

//       <Modal.Window name={`edit-${library.id}`}>
//         <CreateLibraryForm libraryToEdit={library} />
//       </Modal.Window>

//       <Modal.Window name={`delete-${library.id}`}>
//         <ConfirmDelete onConfirm={handleDeleteConfirm} />
//       </Modal.Window>
//     </TableRow>
//   )
// }

// export default LibraryRow

import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useRef, useState } from 'react'
import { HiEllipsisVertical, HiEye, HiPencil, HiTrash } from 'react-icons/hi2'

import toast from 'react-hot-toast'
import styled from 'styled-components'
import { deleteLibrary } from '../../services/apiLibraries'
import ConfirmDelete from '../../ui/ConfirmDelete'
import Modal from '../../ui/Modal'
import CreateLibraryForm from './CreateLibraryForm'
import LibraryDetails from './LibraryDetails'

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 2fr 2.5fr 2.5fr 0.5fr;
  column-gap: 0.5rem;
  align-items: center;
  padding: 1.4rem 1rem;
  position: relative;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`

const Id = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`

const Cell = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-700);
`

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`

const DropdownMenu = styled.ul`
  position: fixed;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  padding: 0.4rem 0;
  z-index: 100;
  right: ${({ position }) => position?.x}px;
  top: ${({ position }) => position?.y}px;
  display: ${({ show }) => (show ? 'block' : 'none')};
  min-width: 180px;
`

const DropdownItem = styled.button`
  width: 100%;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  text-align: left;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  gap: 1.6rem;
  color: var(--color-grey-700);
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: color 0.3s;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`

function LibraryRow({ library }) {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState(null)
  const dropdownRef = useRef()

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteLibrary,
    onSuccess: () => {
      // Immediately remove deleted item from cache
      queryClient.invalidateQueries({ queryKey: ['libraries'] })
      toast.success('Library deleted successfully')
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to delete library')
    },
  })

  function handleDeleteConfirm() {
    mutate(library.id)
  }

  function toggleDropdown(e) {
    e.stopPropagation()
    const rect = e.currentTarget.getBoundingClientRect()
    setDropdownPosition({
      x: window.innerWidth - rect.right,
      y: rect.bottom + 8,
    })
    setIsOpen((open) => !open)
  }

  function closeDropdown() {
    setIsOpen(false)
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        closeDropdown()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <TableRow role="row">
      <Id>{library.id}</Id>
      <Cell>{library.name}</Cell>
      <Cell>{library.location}</Cell>
      <Cell>{library.contact_info || '—'}</Cell>

      <DropdownWrapper ref={dropdownRef}>
        <IconButton onClick={toggleDropdown}>
          <HiEllipsisVertical />
        </IconButton>

        <DropdownMenu show={isOpen} position={dropdownPosition}>
          <Modal.Open opensWindowName={`view-${library.id}`}>
            <DropdownItem onClick={closeDropdown}>
              <HiEye /> View
            </DropdownItem>
          </Modal.Open>

          <Modal.Open opensWindowName={`edit-${library.id}`}>
            <DropdownItem onClick={closeDropdown}>
              <HiPencil /> Edit
            </DropdownItem>
          </Modal.Open>

          <Modal.Open opensWindowName={`delete-${library.id}`}>
            <DropdownItem onClick={closeDropdown} disabled={isDeleting}>
              <HiTrash /> Delete
            </DropdownItem>
          </Modal.Open>
        </DropdownMenu>
      </DropdownWrapper>

      <Modal.Window name={`view-${library.id}`}>
        <LibraryDetails library={library} />
      </Modal.Window>

      <Modal.Window name={`edit-${library.id}`}>
        <CreateLibraryForm libraryToEdit={library} />
      </Modal.Window>

      <Modal.Window name={`delete-${library.id}`}>
        <ConfirmDelete onConfirm={handleDeleteConfirm} />
      </Modal.Window>
    </TableRow>
  )
}

export default LibraryRow
