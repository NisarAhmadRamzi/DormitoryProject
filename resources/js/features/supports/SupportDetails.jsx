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
  max-height: 80vh;
  overflow-y: auto;
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

function SupportDetails({ support }) {
  if (!support) return <p>No support data available.</p>

  const {
    id,
    type,
    details,
    goods_quantity,
    cash_quantity,
    helper_fullname,
    helper_number,
    helper_email,
    helper_date,
    total_cash_donated,
    created_at,
    updated_at,
  } = support

  return (
    <StyledDetails>
      <Heading as="h3">Support Details</Heading>

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
          <Label>Details</Label>
          <Value>{details}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Goods Quantity</Label>
          <Value>{goods_quantity}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Cash Quantity</Label>
          <Value>{cash_quantity}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Helper Fullname</Label>
          <Value>{helper_fullname || 'N/A'}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Helper Number</Label>
          <Value>{helper_number || 'N/A'}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Helper Email</Label>
          <Value>{helper_email || 'N/A'}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Helper Date</Label>
          <Value>{helper_date || 'N/A'}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Total Cash Donated</Label>
          <Value>{total_cash_donated || 'N/A'}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Created At</Label>
          <Value>{created_at}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Updated At</Label>
          <Value>{updated_at || 'N/A'}</Value>
        </DetailItem>
      </DetailsGrid>
    </StyledDetails>
  )
}

export default SupportDetails
