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

function LibraryDetails({ library }) {
  if (!library) return <p>No library data available.</p>

  const { name, location, contact_info, created_at, updated_at } = library

  return (
    <StyledDetails>
      <Heading as="h3">Library Details</Heading>

      <DetailRow>
        <Label>Name</Label>
        <Value>{name}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Location</Label>
        <Value>{location}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Contact Info</Label>
        <Value>{contact_info || 'N/A'}</Value>
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

export default LibraryDetails
