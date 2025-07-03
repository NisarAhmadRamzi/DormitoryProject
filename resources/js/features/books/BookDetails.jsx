import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import dayjs from '../../locales/dayjsConfig' // import your configured dayjs
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

function formatTimeAgo(dateString, locale) {
  try {
    return dayjs(dateString).locale(locale).fromNow()
  } catch {
    return 'ناسم نېټه' // Pashto for "Invalid date"
  }
}

function BookDetails({ book }) {
  const { t, i18n } = useTranslation()
  const locale = i18n.language || 'ps' // fallback to Pashto

  if (!book) return <p>{t('bookTable.noData')}</p>

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
      <Heading as="h3">{t('bookTable.details.title')}</Heading>

      <DetailsGrid>
        <DetailItem>
          <Label>{t('bookTable.headers.id')}</Label>
          <Value>{id}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('bookTable.headers.title')}</Label>
          <Value>{title}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('bookTable.headers.author')}</Label>
          <Value>{author}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('bookTable.headers.year')}</Label>
          <Value>{publication_year}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('bookTable.headers.status')}</Label>
          <Value>{status}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('bookTable.details.totalCopies')}</Label>
          <Value>{books_total_count}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('bookTable.details.totalBorrowed')}</Label>
          <Value>
            {borrowed_book_total_count ?? t('bookTable.details.na')}
          </Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('bookTable.details.libraryId')}</Label>
          <Value>{library_id}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('bookTable.details.createdAt')}</Label>
          <Value>{formatTimeAgo(created_at, locale)}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('bookTable.details.updatedAt')}</Label>
          <Value>{formatTimeAgo(updated_at, locale)}</Value>
        </DetailItem>
      </DetailsGrid>
    </StyledDetails>
  )
}

export default BookDetails
