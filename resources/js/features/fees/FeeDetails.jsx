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

function FeeDetails({ fee }) {
  if (!fee) return <p>No fee data available.</p>

  const {
    student,
    office_pay,
    office_paid,
    warranty_pay,
    total_fee,
    created_at,
    updated_at,
  } = fee

  return (
    <StyledDetails>
      <Heading as="h3">Fee Details</Heading>

      <DetailRow>
        <Label>Student Name</Label>
        <Value>
          {student?.name} {student?.last_name}
        </Value>
      </DetailRow>

      <DetailRow>
        <Label>Office Pay</Label>
        <Value>{office_pay}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Office Paid</Label>
        <Value>{office_paid}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Warranty Pay</Label>
        <Value>{warranty_pay}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Total Fee</Label>
        <Value>{total_fee}</Value>
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

export default FeeDetails
