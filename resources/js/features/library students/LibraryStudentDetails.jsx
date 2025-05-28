import Heading from '../../ui/Heading'
import { formatDistanceToNow } from 'date-fns'
import styled from 'styled-components'

const StyledDetails = styled.div`
  background-color: var(--color-grey-0);
  padding: 2.4rem;
  border-radius: 8px;
  box-shadow: var(--shadow-md);
  max-height: 80vh; /* Consistent with StudentDetails */
  overflow-y: auto; /* Scroll if content overflows */
`

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(28rem, 1fr));
  gap: 2.4rem;
`

const DetailItem = styled.div`
  background-color: var(--color-grey-50);
  padding: 1.2rem;
  border-radius: 6px;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`

const Label = styled.span`
  font-weight: 600;
  color: var(--color-grey-600);
  font-size: 1.4rem;
`

const Value = styled.span`
  color: var(--color-grey-800);
  font-size: 1.6rem;
  word-break: break-word;
`

function LibraryStudentDetails({ student }) {
  if (!student) return <p>No student data available.</p>

  return (
    <StyledDetails>
      <Heading as="h3">Library Student Details</Heading>
      <DetailsGrid>
        <DetailItem>
          <Label>ID</Label>
          <Value>{student.id}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Library ID</Label>
          <Value>{student.library_id}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Full Name</Label>
          <Value>
            {student.name} {student.last_name}
          </Value>
        </DetailItem>

        <DetailItem>
          <Label>Email</Label>
          <Value>{student.email}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Phone</Label>
          <Value>{student.phone}</Value>
        </DetailItem>

        <DetailItem>
          <Label>ID Number</Label>
          <Value>{student.id_number}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Address</Label>
          <Value>{student.address}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Academic Information</Label>
          <Value>{student.academic_info}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Gender</Label>
          <Value>{student.gender}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Membership Status</Label>
          <Value>{student.membership_status}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Registration Date</Label>
          <Value>
            {new Date(student.registration_date).toLocaleDateString()}
          </Value>
        </DetailItem>

        <DetailItem>
          <Label>Registration Deadline</Label>
          <Value>
            {new Date(student.registration_deadline).toLocaleDateString()}
          </Value>
        </DetailItem>

        <DetailItem>
          <Label>Created At</Label>
          <Value>
            {formatDistanceToNow(new Date(student.created_at), {
              addSuffix: true,
            })}
          </Value>
        </DetailItem>

        <DetailItem>
          <Label>Updated At</Label>
          <Value>
            {formatDistanceToNow(new Date(student.updated_at), {
              addSuffix: true,
            })}
          </Value>
        </DetailItem>
      </DetailsGrid>
    </StyledDetails>
  )
}

export default LibraryStudentDetails
