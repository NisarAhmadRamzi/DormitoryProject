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

function AssetsDetails({ asset }) {
  const { t, i18n } = useTranslation()

  if (!asset) return <p>{t('assetD.noData')}</p>

  const {
    id,
    quantity,
    description,
    total_quantity,
    total_amount_of_donations,
    total_amount_of_cash_before_expense,
    total_amount_of_cash_after_expense,
    created_at,
    updated_at,
  } = asset

  const lang = i18n.language
  dayjs.locale(lang)

  return (
    <StyledDetails>
      <Heading as="h3">{t('assetD.assetDetails')}</Heading>

      <DetailsGrid>
        <DetailItem>
          <Label>{t('assetD.id')}</Label>
          <Value>{id}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('assetD.quantity')}</Label>
          <Value>{quantity}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('assetD.description')}</Label>
          <Value>{description || 'N/A'}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('assetD.totalQuantity')}</Label>
          <Value>{total_quantity}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('assetD.totalDonations')}</Label>
          <Value>{total_amount_of_donations}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('assetD.totalCashBeforeExpense')}</Label>
          <Value>{total_amount_of_cash_before_expense}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('assetD.totalCashAfterExpense')}</Label>
          <Value>{total_amount_of_cash_after_expense}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('assetD.createdAt')}</Label>
          <Value>{created_at ? dayjs(created_at).fromNow() : 'N/A'}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('assetD.updatedAt')}</Label>
          <Value>{updated_at ? dayjs(updated_at).fromNow() : 'N/A'}</Value>
        </DetailItem>
      </DetailsGrid>
    </StyledDetails>
  )
}

export default AssetsDetails
