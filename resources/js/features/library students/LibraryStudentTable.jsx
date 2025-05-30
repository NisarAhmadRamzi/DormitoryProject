import LibraryStudentRow from './LibraryStudentRow'
import Spinner from '../../ui/Spinner'
import { getAllLibraryStudents } from '../../services/apiLibraryStudents'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'

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
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`

const TableBody = styled.div`
  max-height: 400px; /* Optional for scrolling */
  overflow-y: auto;
`

function LibraryStudentsTable() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['library-students'],
    queryFn: getAllLibraryStudents,
  })

  const students = data?.data || []

  if (isLoading) return <Spinner/>
  if (error) return <p>Error loading students</p>

  return (
    <Table>
      <TableHeader>
        <div>ID</div>
        <div>Name</div>
        <div>Email</div>
        <div>Phone</div>
        <div>Address</div>
        <div>Actions</div>
      </TableHeader>
      <TableBody>
        {students.map((student) => (
          <LibraryStudentRow key={student.id} student={student} />
        ))}
      </TableBody>
    </Table>
  )
}

export default LibraryStudentsTable
