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

function BookDetails({ book }) {
  if (!book) return <p>No book data available.</p>

  const {
    title,
    author,
    publication_year,
    status,
    books_total_count,
    library_id,
    created_at,
    updated_at,
  } = book

  return (
    <StyledDetails>
      <Heading as="h3">Book Details</Heading>

      <DetailRow>
        <Label>Title</Label>
        <Value>{title}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Author</Label>
        <Value>{author}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Publication Year</Label>
        <Value>{publication_year}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Status</Label>
        <Value>{status}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Total Copies</Label>
        <Value>{books_total_count}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Library ID</Label>
        <Value>{library_id}</Value>
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

export default BookDetails
