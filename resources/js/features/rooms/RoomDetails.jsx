import { formatDistanceToNow } from 'date-fns'
import { enUS, faIR } from 'date-fns/locale'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

const DetailsContainer = styled.div`
  padding: 3rem;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  max-width: 800px;
  margin: 0 auto;
  color: var(--color-grey-800);
  transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
`

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: var(--color-grey-900);
  text-align: center;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem 3rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

const DetailItem = styled.div`
  font-size: 1.5rem;
  line-height: 1.6;
  color: var(--color-grey-700);

  strong {
    display: inline-block;
    min-width: 120px;
    color: var(--color-grey-900);
  }
`

function RoomDetails({ room }) {
  const { t, i18n } = useTranslation()

  // Inline RTL detection for 'fa' and 'pa'
  const dir = ['fa', 'pa'].includes(i18n.language) ? 'rtl' : 'ltr'
  const locale = ['fa', 'pa'].includes(i18n.language) ? faIR : enUS

  const formatDate = (dateString) => {
    if (!dateString) return t('unknown')
    const d = new Date(dateString)
    if (isNaN(d)) return t('unknown')
    return formatDistanceToNow(d, { addSuffix: true, locale })
  }

  return (
    <DetailsContainer dir={dir}>
      <Title>{t('roomDetails.title')}</Title>
      <Grid>
        <DetailItem>
          <strong>{t('roomDetails.id')}:</strong> {room.id}
        </DetailItem>
        <DetailItem>
          <strong>{t('roomDetails.number')}:</strong> {room.room_number}
        </DetailItem>
        <DetailItem>
          <strong>{t('roomDetails.type')}:</strong> {room.type}
        </DetailItem>
        <DetailItem>
          <strong>{t('roomDetails.capacity')}:</strong> {room.capacity}
        </DetailItem>
        <DetailItem>
          <strong>{t('roomDetails.occupancy')}:</strong>{' '}
          {room.current_occupancy}
        </DetailItem>
        <DetailItem>
          <strong>{t('roomDetails.status')}:</strong> {room.status}
        </DetailItem>
        <DetailItem>
          <strong>{t('roomDetails.floor')}:</strong> {room.floor}
        </DetailItem>
        <DetailItem>
          <strong>{t('roomDetails.price')}:</strong> {room.price}
        </DetailItem>
        <DetailItem>
          <strong>{t('roomDetails.created')}:</strong>{' '}
          {formatDate(room.created_at)}
        </DetailItem>
        <DetailItem>
          <strong>{t('roomDetails.updated')}:</strong>{' '}
          {formatDate(room.updated_at)}
        </DetailItem>
      </Grid>
    </DetailsContainer>
  )
}

export default RoomDetails
