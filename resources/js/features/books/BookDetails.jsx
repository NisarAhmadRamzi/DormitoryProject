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

function BookDetails({ book }) {
  if (!book) return <p>No book data available.</p>

  const {
    id,
    title,
    author,
    publication_year,
    status,
    books_total_count,
    borrowed_book_total_count,
    library_id,
    created_at,
    updated_at,
  } = book

  return (
    <StyledDetails>
      <Heading as="h3">Book Details</Heading>

      <DetailsGrid>
        <DetailItem>
          <Label>ID</Label>
          <Value>{id}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Title</Label>
          <Value>{title}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Author</Label>
          <Value>{author}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Publication Year</Label>
          <Value>{publication_year}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Status</Label>
          <Value>{status}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Total Copies</Label>
          <Value>{books_total_count}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Total of Borrowed Book</Label>
          <Value>{borrowed_book_total_count ?? 'N/A'}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Library ID</Label>
          <Value>{library_id}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Created At</Label>
          <Value>{formatTimeAgo(created_at)}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Updated At</Label>
          <Value>{formatTimeAgo(updated_at)}</Value>
        </DetailItem>
      </DetailsGrid>
    </StyledDetails>
  )
}

export default BookDetails
