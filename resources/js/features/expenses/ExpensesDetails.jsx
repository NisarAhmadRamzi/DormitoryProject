import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import dayjs from '../../locales/dayjsConfig'
import Heading from '../../ui/Heading'

const StyledDetails = styled.div`
  background-color: var(--color-grey-0);
  padding: 2.4rem;
  border-radius: 8px;
  box-shadow: var(--shadow-md);
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

function ExpensesDetails({ expense }) {
  const { t, i18n } = useTranslation()

  if (!expense) return <p>{t('expense.noData')}</p>

  const {
    id,
    type,
    expense_cash,
    goods_quantity,
    description,
    expense_date,
    total_expense,
    total_quantity,
    total_amount_of_donations,
    total_amount_of_cash_before_expense,
    total_amount_of_cash_before_last_expense,
    total_amount_of_cash_after_last_expense,
    created_at,
    updated_at,
  } = expense

  dayjs.locale(i18n.language)

  return (
    <StyledDetails>
      <Heading as="h3">{t('expense.expenseDetails')}</Heading>

      <DetailsGrid>
        <DetailItem>
          <Label>{t('expense.id')}</Label>
          <Value>{id}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('expense.type')}</Label>
          <Value>{type}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('expense.expenseCash')}</Label>
          <Value>{expense_cash}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('expense.goodsQuantity')}</Label>
          <Value>{goods_quantity}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('expense.description')}</Label>
          <Value>{description}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('expense.expenseDate')}</Label>
          <Value>{expense_date}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('expense.totalExpense')}</Label>
          <Value>{total_expense}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('expense.totalQuantity')}</Label>
          <Value>{total_quantity}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('expense.totalDonations')}</Label>
          <Value>{total_amount_of_donations}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('expense.cashBeforeExpense')}</Label>
          <Value>{total_amount_of_cash_before_expense}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('expense.cashBeforeLastExpense')}</Label>
          <Value>{total_amount_of_cash_before_last_expense}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('expense.cashAfterLastExpense')}</Label>
          <Value>{total_amount_of_cash_after_last_expense}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('expense.createdAt')}</Label>
          <Value>{dayjs(created_at).fromNow()}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('expense.updatedAt')}</Label>
          <Value>{dayjs(updated_at).fromNow()}</Value>
        </DetailItem>
      </DetailsGrid>
    </StyledDetails>
  )
}

export default ExpensesDetails
