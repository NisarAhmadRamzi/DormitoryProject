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

function SupportDetails({ support }) {
  const { t, i18n } = useTranslation()

  if (!support) return <p>{t('support.noData')}</p>

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

  const lang = i18n.language
  dayjs.locale(lang)

  return (
    <StyledDetails>
      <Heading as="h3">{t('support.supportDetails')}</Heading>

      <DetailsGrid>
        <DetailItem>
          <Label>{t('support.id')}</Label>
          <Value>{id}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('support.type')}</Label>
          <Value>{type}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('support.details')}</Label>
          <Value>{details}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('support.goodsQuantity')}</Label>
          <Value>{goods_quantity}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('support.cashQuantity')}</Label>
          <Value>{cash_quantity}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('support.helperFullname')}</Label>
          <Value>{helper_fullname || 'N/A'}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('support.helperNumber')}</Label>
          <Value>{helper_number || 'N/A'}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('support.helperEmail')}</Label>
          <Value>{helper_email || 'N/A'}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('support.helperDate')}</Label>
          <Value>{helper_date || 'N/A'}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('support.totalCashDonated')}</Label>
          <Value>{total_cash_donated || 'N/A'}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('support.createdAt')}</Label>
          <Value>{dayjs(created_at).fromNow()}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('support.updatedAt')}</Label>
          <Value>{dayjs(updated_at).fromNow()}</Value>
        </DetailItem>
      </DetailsGrid>
    </StyledDetails>
  )
}

export default SupportDetails
