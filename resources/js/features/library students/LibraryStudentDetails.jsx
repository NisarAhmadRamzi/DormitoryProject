import styled from 'styled-components'
import Heading from '../../ui/Heading'

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

  const { name, email, phone, libraryId, created_at, updated_at } = student

  return (
    <StyledDetails>
      <Heading as="h3">Student Details</Heading>

      <DetailRow>
        <Label>Name</Label>
        <Value>{name}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Email</Label>
        <Value>{email}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Phone</Label>
        <Value>{phone || 'N/A'}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Library ID</Label>
        <Value>{libraryId}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Created At</Label>
        <Value>{new Date(created_at).toLocaleString()}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Updated At</Label>
        <Value>{new Date(updated_at).toLocaleString()}</Value>
      </DetailRow>
    </StyledDetails>
  )
}

export default LibraryStudentDetails
