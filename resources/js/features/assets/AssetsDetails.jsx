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

function AssetsDetails({ asset }) {
  if (!asset) return <p>No asset data available.</p>

  const {
    quantity,
    description,
    total_quantity,
    total_amount_of_donations,
    total_amount_of_cash_before_expense,
    total_amount_of_cash_after_expense,
  } = asset

  return (
    <StyledDetails>
      <Heading as="h3">Asset Details</Heading>

      <DetailRow>
        <Label>Quantity</Label>
        <Value>{quantity}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Description</Label>
        <Value>{description || 'N/A'}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Total Quantity</Label>
        <Value>{total_quantity}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Total Donations</Label>
        <Value>{total_amount_of_donations}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Total Cash Before Expense</Label>
        <Value>{total_amount_of_cash_before_expense}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Total Cash After Expense</Label>
        <Value>{total_amount_of_cash_after_expense}</Value>
      </DetailRow>
    </StyledDetails>
  )
}

export default AssetsDetails
