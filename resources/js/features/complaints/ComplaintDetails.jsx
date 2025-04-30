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

function ComplaintDetails({ complaint }) {
  if (!complaint) return <p>No complaint data available.</p>

  const {
    title,
    description,
    status,
    student,
    created_at,
    updated_at,
    resolved_at,
  } = complaint

  return (
    <StyledDetails>
      <Heading as="h3">Complaint Details</Heading>

      <DetailRow>
        <Label>Title</Label>
        <Value>{title}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Description</Label>
        <Value>{description}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Status</Label>
        <Value>{status}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Student</Label>
        <Value>{student?.name || 'Unknown'}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Created At</Label>
        <Value>{created_at || 'N/A'}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Updated At</Label>
        <Value>{updated_at || 'N/A'}</Value>
      </DetailRow>

      {resolved_at && (
        <DetailRow>
          <Label>Resolved At</Label>
          <Value>{resolved_at}</Value>
        </DetailRow>
      )}
    </StyledDetails>
  )
}

export default ComplaintDetails
