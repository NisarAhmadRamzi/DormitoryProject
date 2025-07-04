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

function FeeDetails({ fee }) {
  const { t, i18n } = useTranslation()

  if (!fee) return <p>{t('fee.noFeeData')}</p>

  const {
    student,
    office_pay,
    office_paid,
    warranty_pay,
    total_fee,
    created_at,
    updated_at,
  } = fee

  // ✅ Set locale based on current language
  dayjs.locale(i18n.language)

  return (
    <StyledDetails>
      <Heading as="h3">{t('fee.feeDetails')}</Heading>

      <DetailRow>
        <Label>{t('fee.studentName')}</Label>
        <Value>
          {student?.name} {student?.last_name}
        </Value>
      </DetailRow>

      <DetailRow>
        <Label>{t('fee.studentId')}</Label>
        <Value>{student?.id}</Value>
      </DetailRow>

      <DetailRow>
        <Label>{t('fee.officePay')}</Label>
        <Value>{office_pay}</Value>
      </DetailRow>

      <DetailRow>
        <Label>{t('fee.officePaid')}</Label>
        <Value>{office_paid}</Value>
      </DetailRow>

      <DetailRow>
        <Label>{t('fee.warrantyPay')}</Label>
        <Value>{warranty_pay}</Value>
      </DetailRow>

      <DetailRow>
        <Label>{t('fee.totalFee')}</Label>
        <Value>{total_fee}</Value>
      </DetailRow>

      <DetailRow>
        <Label>{t('fee.createdAt')}</Label>
        <Value>{dayjs(created_at).fromNow()}</Value>
      </DetailRow>

      <DetailRow>
        <Label>{t('fee.updatedAt')}</Label>
        <Value>{dayjs(updated_at).fromNow()}</Value>
      </DetailRow>
    </StyledDetails>
  )
}

export default FeeDetails
