import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import Heading from '../../ui/Heading'

// Only import Persian locale (used as fallback for Pashto too)
import 'dayjs/locale/fa'

dayjs.extend(localizedFormat)
dayjs.extend(relativeTime)

const ModalFrame = styled.div`
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  display: flex;
  flex-direction: column;
  max-width: 80rem;
  max-height: 80vh;
  overflow-y: auto;
  align-items: center;
  padding: 1rem;
  position: relative;
  direction: ${(props) => (props.isRtl ? 'rtl' : 'ltr')};
`

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  ${(props) => (props.isRtl ? 'left' : 'right')}: 1rem;
  background: none;
  border: none;
  font-size: 2rem;
  color: var(--color-grey-600);
  cursor: pointer;
`

const ProfileSection = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: flex-start;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--color-grey-100);

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`

const ProfileImg = styled.img`
  width: 200px;
  height: 190px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid var(--color-grey-200);
  box-shadow: var(--shadow-sm);
`

const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`

const InfoRow = styled.div`
  display: flex;
  flex-direction: column;
`

const Label = styled.span`
  font-weight: 600;
  color: var(--color-grey-600);
  font-size: 1.5rem;
`

const Value = styled.span`
  color: var(--color-grey-900);
  font-size: 1.6rem;
`

const DetailRow = styled.div`
  display: grid;
  grid-template-columns: 20rem 1fr;
  align-items: start;
  gap: 1.6rem;
  padding: 1.2rem 0;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

function UserDetails({ user, onClose }) {
  const { t, i18n } = useTranslation()
  const currentLang = i18n.language
  const isRtl = ['fa', 'ps'].includes(currentLang)

  // Use Persian for both fa and ps
  dayjs.locale(currentLang === 'ps' ? 'fa' : currentLang)

  if (!user) return <p>{t('noUserData')}</p>

  const {
    id,
    name,
    email,
    role_name,
    role_id,
    profile,
    student,
    created_at,
    updated_at,
  } = user

  const gender = student?.gender?.toLowerCase()
  const pronoun =
    gender === 'male' ? t('he') : gender === 'female' ? t('she') : t('they')

  return (
    <ModalFrame isRtl={isRtl}>
      <CloseButton isRtl={isRtl} onClick={onClose}>
        &times;
      </CloseButton>

      <Heading as="h3">{t('userProfile')}</Heading>

      <ProfileSection>
        <ProfileImg src={`/uploads/${profile}`} alt={`${name}'s profile`} />
        <InfoBlock>
          <InfoRow>
            <Label>{t('id')}</Label>
            <Value>{id}</Value>
          </InfoRow>

          <InfoRow>
            <Label>{t('name')}</Label>
            <Value>{name}</Value>
          </InfoRow>

          <InfoRow>
            <Label>{t('email')}</Label>
            <Value>{email}</Value>
          </InfoRow>

          <InfoRow>
            <Label>{t('role')}</Label>
            <Value>
              {t(`roles.${role_name}`)} <small>(ID: {role_id})</small>
            </Value>
          </InfoRow>
        </InfoBlock>
      </ProfileSection>

      {student ? (
        <>
          <DetailRow>
            <Label>{t('studentId')}</Label>
            <Value>{student.id_number}</Value>
          </DetailRow>
          <DetailRow>
            <Label>{t('origin')}</Label>
            <Value>{student.from}</Value>
          </DetailRow>
          <DetailRow>
            <Label>{t('gender')}</Label>
            <Value>{student.gender ?? t('unknown')}</Value>
          </DetailRow>
        </>
      ) : (
        <DetailRow>
          <Label>{t('studentInfo')}</Label>
          <Value>{`${pronoun} ${t('notStudent')}`}</Value>
        </DetailRow>
      )}

      <DetailRow>
        <Label>{t('accountCreated')}</Label>
        <Value>{dayjs(created_at).fromNow()}</Value>
      </DetailRow>

      <DetailRow>
        <Label>{t('lastUpdated')}</Label>
        <Value>{dayjs(updated_at).fromNow()}</Value>
      </DetailRow>
    </ModalFrame>
  )
}

export default UserDetails
