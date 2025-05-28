import styled from 'styled-components'
import Heading from '../../ui/Heading'

const StyledDetails = styled.div`
  background-color: var(--color-grey-0);
  padding: 2.4rem;
  border-radius: 8px;
  box-shadow: var(--shadow-md);
  max-height: 80vh; /* Optional: limit height */
  overflow-y: auto; /* Optional: scroll if content too long */
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

function ExpensesDetails({ expense }) {
  if (!expense) return <p>No expense data available.</p>

  const {
    id,
    type,
    expense_cash,
    goods_quantity,
    description,
    expense_date,
    total_expense,
    total_quantity,
    total_amount_of_donations,
    total_amount_of_cash_before_expense,
    total_amount_of_cash_before_last_expense,
    total_amount_of_cash_after_last_expense,
    created_at,
    updated_at,
  } = expense

  return (
    <StyledDetails>
      <Heading as="h3">Expense Details</Heading>

      <DetailsGrid>
        <DetailItem>
          <Label>ID</Label>
          <Value>{id}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Type</Label>
          <Value>{type}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Expense Cash</Label>
          <Value>{expense_cash}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Goods Quantity</Label>
          <Value>{goods_quantity}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Description</Label>
          <Value>{description}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Expense Date</Label>
          <Value>{expense_date}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Total Expense</Label>
          <Value>{total_expense}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Total Quantity</Label>
          <Value>{total_quantity}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Total Donations</Label>
          <Value>{total_amount_of_donations}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Cash Before Expense</Label>
          <Value>{total_amount_of_cash_before_expense}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Cash Before Last Expense</Label>
          <Value>{total_amount_of_cash_before_last_expense}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Cash After Last Expense</Label>
          <Value>{total_amount_of_cash_after_last_expense}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Created At</Label>
          <Value>{created_at}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Updated At</Label>
          <Value>{updated_at}</Value>
        </DetailItem>
      </DetailsGrid>
    </StyledDetails>
  )
}

export default ExpensesDetails
