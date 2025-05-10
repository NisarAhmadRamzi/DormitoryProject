import Heading from '../../ui/Heading'
import styled from 'styled-components'

const ModalFrame = styled.div`
  background-color: var(--color-grey-0);
  /* padding: 3.2rem; */
  border-radius: var(--border-radius-md);
  /* box-shadow: var(--shadow-lg); */
  display: flex;
  flex-direction: column;
  /* gap: 2.4rem; */
  max-width: 40rem;
  max-height: 80vh;
  overflow-y: auto;
  /* margin: 2rem auto; */
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

function formatDate(dateStr) {
  const parsed = new Date(dateStr)
  return isNaN(parsed) ? dateStr : parsed.toLocaleString()
}

function UserDetails({ user }) {
  if (!user) return <p>No user data available.</p>

  const {
    name,
    email,
    role_name,
    role_id,
    profile,
    student,
    created_at,
    updated_at,
  } = user

  return (
    <ModalFrame>
      <Heading as="h3">User Profile</Heading>

      <ProfileSection>
        <ProfileImg src={`/uploads/${profile}`} alt={`${name}'s profile`} />
        <InfoBlock>
          <InfoRow>
            <Label>Name</Label>
            <Value>{name}</Value>
          </InfoRow>
          <InfoRow>
            <Label>Email</Label>
            <Value>{email}</Value>
          </InfoRow>
          <InfoRow>
            <Label>Role</Label>
            <Value>
              {role_name} <small>(ID: {role_id})</small>
            </Value>
          </InfoRow>
        </InfoBlock>
      </ProfileSection>

      {student ? (
        <>
          <DetailRow>
            <Label>Student ID</Label>
            <Value>{student.id_number}</Value>
          </DetailRow>
          <DetailRow>
            <Label>Origin</Label>
            <Value>{student.from}</Value>
          </DetailRow>
        </>
      ) : (
        <DetailRow>
          <Label>Student Info</Label>
          <Value>Not available</Value>
        </DetailRow>
      )}

      <DetailRow>
        <Label>Account Created</Label>
        <Value>{formatDate(created_at)}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Last Updated</Label>
        <Value>{formatDate(updated_at)}</Value>
      </DetailRow>
    </ModalFrame>
  )
}

export default UserDetails
