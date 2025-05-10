import Heading from '../../ui/Heading'
import styled from 'styled-components'

const StyledDetails = styled.div`
  background-color: var(--color-grey-0);
  padding: 3.2rem;
  border-radius: 12px;
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  max-width: 800px;
  margin: 0 auto;
`

const DetailRow = styled.div`
  display: grid;
  grid-template-columns: 20rem 1fr;
  align-items: center;
  gap: 1.6rem;

  &:not(:last-child) {
    padding-bottom: 2rem;
    border-bottom: 1px solid var(--color-grey-100);
  }
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

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;
`
const ProfileImg = styled.img`
  width: 200px;
  height: auto;
  object-fit: cover;
  border-radius: 8px; /* optional: soften corners without making it round */
  border: 2px solid var(--color-grey-200);
  box-shadow: var(--shadow-sm);
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
    <StyledDetails>
      <Heading as="h3">User Profile</Heading>
      <DetailRow>
        <Label>Profile</Label>
        <ProfileWrapper>
          <ProfileImg src={`/uploads/${profile}`} alt={`${name}'s profile`} />
        </ProfileWrapper>
      </DetailRow>

      <DetailRow>
        <Label>Email</Label>
        <Value>{email}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Role</Label>
        <Value>
          {role_name} <small>(ID: {role_id})</small>
        </Value>
      </DetailRow>

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
    </StyledDetails>
  )
}

export default UserDetails
