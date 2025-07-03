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

function ComplaintDetails({ complaint }) {
  const { t, i18n } = useTranslation()
  if (!complaint) return <p>{t('complaintDetails.noData')}</p>

  const {
    id,
    title,
    description,
    status,
    student,
    created_at,
    updated_at,
    resolved_at,
  } = complaint

  // Set the dayjs locale dynamically based on selected language
  dayjs.locale(i18n.language || 'en')

  return (
    <StyledDetails>
      <Heading as="h3">{t('complaintDetails.heading')}</Heading>

      <DetailRow>
        <Label>{t('complaintDetails.id')}</Label>
        <Value>{id}</Value>
      </DetailRow>

      <DetailRow>
        <Label>{t('complaintDetails.title')}</Label>
        <Value>{title}</Value>
      </DetailRow>

      <DetailRow>
        <Label>{t('complaintDetails.description')}</Label>
        <Value>{description}</Value>
      </DetailRow>

      <DetailRow>
        <Label>{t('complaintDetails.status')}</Label>
        <Value>{status}</Value>
      </DetailRow>

      <DetailRow>
        <Label>{t('complaintDetails.student')}</Label>
        <Value>{student?.name || t('complaintDetails.unknown')}</Value>
      </DetailRow>

      <DetailRow>
        <Label>{t('complaintDetails.createdAt')}</Label>
        <Value>{created_at ? dayjs(created_at).fromNow() : 'N/A'}</Value>
      </DetailRow>

      <DetailRow>
        <Label>{t('complaintDetails.updatedAt')}</Label>
        <Value>{updated_at ? dayjs(updated_at).fromNow() : 'N/A'}</Value>
      </DetailRow>

      {resolved_at && (
        <DetailRow>
          <Label>{t('complaintDetails.resolvedAt')}</Label>
          <Value>{dayjs(resolved_at).fromNow()}</Value>
        </DetailRow>
      )}
    </StyledDetails>
  )
}

export default ComplaintDetails
