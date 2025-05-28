import { formatDistanceToNow, parseISO } from 'date-fns'

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

function formatTimeAgo(dateString) {
  try {
    const isoString = dateString.replace(' ', 'T')
    const date = parseISO(isoString)
    return formatDistanceToNow(date, { addSuffix: true })
  } catch {
    return 'Invalid date'
  }
}

function BorrowedBookDetails({ borrowedBook }) {
  if (!borrowedBook) return <p>No borrowed book data available.</p>

  const {
    id,
    student,
    library_student,
    book,
    borrow_date,
    return_date,
    status,
    books_total_count,
    borrowed_books_total_count,
    books_total_count_after_borrowed,
    created_at,
    updated_at,
  } = borrowedBook

  return (
    <StyledDetails>
      <Heading as="h3">Borrowed Book Details</Heading>

      <DetailsGrid>
        <DetailItem>
          <Label>Student</Label>
          <Value>{student?.name || library_student?.name || 'N/A'}</Value>
        </DetailItem>

        <DetailItem>
          <Label>ID</Label>
          <Value>{id ?? 'N/A'}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Book Title</Label>
          <Value>{book?.title || 'N/A'}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Borrow Date</Label>
          <Value>{borrow_date || 'N/A'}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Return Date</Label>
          <Value>{return_date || 'N/A'}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Status</Label>
          <Value>{status || 'N/A'}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Total Books Available Before Borrowing</Label>
          <Value>{books_total_count ?? 'N/A'}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Total Books Available After Borrowing</Label>
          <Value>{books_total_count_after_borrowed ?? 'N/A'}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Total Borrowed Books</Label>
          <Value>{borrowed_books_total_count ?? 'N/A'}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Created At</Label>
          <Value>{created_at ? formatTimeAgo(created_at) : 'N/A'}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Updated At</Label>
          <Value>{updated_at ? formatTimeAgo(updated_at) : 'N/A'}</Value>
        </DetailItem>
      </DetailsGrid>
    </StyledDetails>
  )
}

export default BorrowedBookDetails
