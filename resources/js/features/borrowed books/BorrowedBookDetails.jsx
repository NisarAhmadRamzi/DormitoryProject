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

function BorrowedBookDetails({ borrowedBook }) {
  if (!borrowedBook) return <p>No borrowed book data available.</p>

  const {
    student,
    library_student,
    book,
    borrow_date,
    return_date,
    status,
    created_at,
    updated_at,
  } = borrowedBook

  return (
    <StyledDetails>
      <Heading as="h3">Borrowed Book Details</Heading>

      <DetailRow>
        <Label>Student</Label>
        <Value>{student?.name || library_student?.name || 'N/A'}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Book</Label>
        <Value>{book?.title || 'N/A'}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Borrow Date</Label>
        <Value>{new Date(borrow_date).toLocaleDateString()}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Return Date</Label>
        <Value>
          {return_date ? new Date(return_date).toLocaleDateString() : 'N/A'}
        </Value>
      </DetailRow>

      <DetailRow>
        <Label>Status</Label>
        <Value>{status}</Value>
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

export default BorrowedBookDetails
