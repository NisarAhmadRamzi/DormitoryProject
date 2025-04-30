import Heading from '../../ui/Heading'
import styled from 'styled-components'

const StyledDetails = styled.div`
  background-color: var(--color-grey-0);
  padding: 2.4rem;
  border-radius: 8px;
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`

const DetailRow = styled.div`
  display: grid;
  grid-template-columns: 24rem 1fr;
  align-items: start;
  gap: 1.6rem;

  &:not(:last-child) {
    padding-bottom: 1.6rem;
    border-bottom: 1px solid var(--color-grey-100);
  }
`

const Label = styled.span`
  font-weight: 500;
  color: var(--color-grey-600);
`

const Value = styled.span`
  color: var(--color-grey-800);
  font-size: 1.6rem;
`

function LibraryStudentDetails({ student }) {
  if (!student) return <p>No student data available.</p>

  return (
    <StyledDetails>
      <Heading as="h3">Library Student Details</Heading>
      <DetailRow>
        <Label>Full Name</Label>
        <Value>
          {student.name} {student.last_name}
        </Value>
      </DetailRow>
      <DetailRow>
        <Label>Email</Label>
        <Value>{student.email}</Value>
      </DetailRow>
      <DetailRow>
        <Label>Phone</Label>
        <Value>{student.phone}</Value>
      </DetailRow>
      <DetailRow>
        <Label>Address</Label>
        <Value>{student.address}</Value>
      </DetailRow>
      <DetailRow>
        <Label>Gender</Label>
        <Value>{student.gender}</Value>
      </DetailRow>
      <DetailRow>
        <Label>Membership Status</Label>
        <Value>{student.membership_status}</Value>
      </DetailRow>
      <DetailRow>
        <Label>Registration Date</Label>
        <Value>
          {new Date(student.registration_date).toLocaleDateString()}
        </Value>
      </DetailRow>
      <DetailRow>
        <Label>Registration Deadline</Label>
        <Value>
          {new Date(student.registration_deadline).toLocaleDateString()}
        </Value>
      </DetailRow>
      <DetailRow>
        <Label>Created At</Label>
        <Value>{new Date(student.created_at).toLocaleString()}</Value>
      </DetailRow>
      <DetailRow>
        <Label>Updated At</Label>
        <Value>{new Date(student.updated_at).toLocaleString()}</Value>
      </DetailRow>
    </StyledDetails>
  )
}

export default LibraryStudentDetails
