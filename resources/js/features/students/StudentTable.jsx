import Spinner from '../../ui/Spinner'
import StudentRow from './StudentRow'
import { getStudents } from '../../services/apiStudents'
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
  padding: 1.6rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--color-grey-600);
`

function StudentTable({ search = '' }) {
  const { data, isLoading, isError, error } = useQuery(
    ['students'],
    getStudents
  )

  // Fix: Ensure students is an array
  const students = Array.isArray(data) ? data : data?.data ?? []

  if (isLoading) return <Spinner />
  if (isError) return <p>Error: {error.message}</p>

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
