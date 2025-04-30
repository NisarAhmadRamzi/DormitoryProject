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

function SupportDetails({ support }) {
  if (!support) return <p>No support data available.</p>

  const {
    type,
    details,
    helper_fullname,
    helper_number,
    helper_email,
    created_at,
    updated_at,
  } = support

  return (
    <StyledDetails>
      <Heading as="h3">Support Details</Heading>

      <DetailRow>
        <Label>Type</Label>
        <Value>{type}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Details</Label>
        <Value>{details}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Helper Fullname</Label>
        <Value>{helper_fullname || 'N/A'}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Helper Number</Label>
        <Value>{helper_number || 'N/A'}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Helper Email</Label>
        <Value>{helper_email || 'N/A'}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Created At</Label>
        <Value>{created_at}</Value>
      </DetailRow>

      {/* <DetailRow>
        <Label>Updated At</Label>
        <Value>{updated_at}</Value>
      </DetailRow> */}
      <DetailRow>
        <Label>Updated At</Label>
        <Value>{updated_at || 'N/A'}</Value>
      </DetailRow>
    </StyledDetails>
  )
}

export default SupportDetails
