import { formatDistanceToNow } from 'date-fns'
import { enUS, faIR } from 'date-fns/locale'
import { useTranslation } from 'react-i18next'
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

function LibraryDetails({ library }) {
  const { t, i18n } = useTranslation()

  if (!library) return <p>{t('libraryDetails.noData')}</p>

  const { id, name, location, contact_info, created_at, updated_at } = library

  const currentLang = i18n.language
  const locale = currentLang === 'fa' ? faIR : enUS // default fallback

  return (
    <StyledDetails>
      <Heading as="h3">{t('libraryDetails.heading')}</Heading>

      <DetailRow>
        <Label>{t('libraryDetails.id')}</Label>
        <Value>{id}</Value>
      </DetailRow>

      <DetailRow>
        <Label>{t('libraryDetails.name')}</Label>
        <Value>{name}</Value>
      </DetailRow>

      <DetailRow>
        <Label>{t('libraryDetails.location')}</Label>
        <Value>{location}</Value>
      </DetailRow>

      <DetailRow>
        <Label>{t('libraryDetails.contactInfo')}</Label>
        <Value>{contact_info || t('libraryDetails.notAvailable')}</Value>
      </DetailRow>

      <DetailRow>
        <Label>{t('libraryDetails.createdAt')}</Label>
        <Value>
          {formatDistanceToNow(new Date(created_at), {
            addSuffix: true,
            locale,
          })}
        </Value>
      </DetailRow>

      <DetailRow>
        <Label>{t('libraryDetails.updatedAt')}</Label>
        <Value>
          {formatDistanceToNow(new Date(updated_at), {
            addSuffix: true,
            locale,
          })}
        </Value>
      </DetailRow>
    </StyledDetails>
  )
}

export default LibraryDetails
