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

function ExpensesDetails({ expense }) {
  if (!expense) return <p>No expense data available.</p>

  const {
    type,
    expense_cash,
    goods_quantity,
    description,
    expense_date,
    created_at,
    updated_at,
    total_expense,
    total_quantity,
    total_amount_of_donations,
    total_amount_of_cash_before_expense,
    total_amount_of_cash_before_last_expense,
    total_amount_of_cash_after_last_expense,
  } = expense

  return (
    <StyledDetails>
      <Heading as="h3">Expense Details</Heading>

      <DetailRow>
        <Label>Type</Label>
        <Value>{type}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Expense Cash</Label>
        <Value>{expense_cash}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Goods Quantity</Label>
        <Value>{goods_quantity}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Description</Label>
        <Value>{description}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Expense Date</Label>
        <Value>{expense_date}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Total Expense</Label>
        <Value>{total_expense}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Total Quantity</Label>
        <Value>{total_quantity}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Total Amount of Donations</Label>
        <Value>{total_amount_of_donations}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Total Cash Before Expense</Label>
        <Value>{total_amount_of_cash_before_expense}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Total Cash Before Last Expense</Label>
        <Value>{total_amount_of_cash_before_last_expense}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Total Cash After Last Expense</Label>
        <Value>{total_amount_of_cash_after_last_expense}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Created At</Label>
        <Value>{created_at}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Updated At</Label>
        <Value>{updated_at}</Value>
      </DetailRow>
    </StyledDetails>
  )
}

export default ExpensesDetails
