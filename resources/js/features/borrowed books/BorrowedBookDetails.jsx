import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import dayjs from '../../locales/dayjsConfig'
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

function formatTimeAgo(dateString, locale = 'en') {
  try {
    return dayjs(dateString).locale(locale).fromNow()
  } catch {
    return 'Invalid date'
  }
}

function BorrowedBookDetails({ borrowedBook }) {
  const { t, i18n } = useTranslation()
  const locale = i18n.language || 'en'

  if (!borrowedBook) return <p>{t('borrowedBook.noData')}</p>

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
      <Heading as="h3">{t('borrowedBook.details.title')}</Heading>

      <DetailsGrid>
        <DetailItem>
          <Label>{t('borrowedBook.fields.student')}</Label>
          <Value>
            {student?.name || library_student?.name || t('borrowedBook.na')}
          </Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('borrowedBook.fields.id')}</Label>
          <Value>{id ?? t('borrowedBook.na')}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('borrowedBook.fields.bookTitle')}</Label>
          <Value>{book?.title || t('borrowedBook.na')}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('borrowedBook.fields.borrowDate')}</Label>
          <Value>{borrow_date || t('borrowedBook.na')}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('borrowedBook.fields.returnDate')}</Label>
          <Value>{return_date || t('borrowedBook.na')}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('borrowedBook.fields.status')}</Label>
          <Value>{status || t('borrowedBook.na')}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('borrowedBook.fields.totalBefore')}</Label>
          <Value>{books_total_count ?? t('borrowedBook.na')}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('borrowedBook.fields.totalAfter')}</Label>
          <Value>
            {books_total_count_after_borrowed ?? t('borrowedBook.na')}
          </Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('borrowedBook.fields.totalBorrowed')}</Label>
          <Value>{borrowed_books_total_count ?? t('borrowedBook.na')}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('borrowedBook.fields.createdAt')}</Label>
          <Value>
            {created_at
              ? formatTimeAgo(created_at, locale)
              : t('borrowedBook.na')}
          </Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('borrowedBook.fields.updatedAt')}</Label>
          <Value>
            {updated_at
              ? formatTimeAgo(updated_at, locale)
              : t('borrowedBook.na')}
          </Value>
        </DetailItem>
      </DetailsGrid>
    </StyledDetails>
  )
}

export default BorrowedBookDetails
