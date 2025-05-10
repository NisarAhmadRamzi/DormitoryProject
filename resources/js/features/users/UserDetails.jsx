import Heading from '../../ui/Heading'
import styled from 'styled-components'

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

const ProfileImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--color-grey-200);
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

  const profileUrl = `http://127.0.0.1:8000/${user.profile}`

  // Function to safely parse date
  const parseDate = (dateString) => {
    const date = new Date(dateString)
    return isNaN(date) ? 'Invalid Date' : date.toLocaleString()
  }

  return (
    <StyledDetails>
      <Heading as="h3">User Details</Heading>

      <DetailRow>
        <Label>Profile Image</Label>
        <Value>
          <img src={`/uploads/${user.profile}`} alt="Profile" />
        </Value>
      </DetailRow>

      <DetailRow>
        <Label>Name</Label>
        <Value>{name}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Email</Label>
        <Value>{email}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Role</Label>
        <Value>
          {role_name} (ID: {role_id})
        </Value>
      </DetailRow>

      {student ? (
        <>
          <DetailRow>
            <Label>Student ID</Label>
            <Value>{student.id_number}</Value>
          </DetailRow>
          <DetailRow>
            <Label>From</Label>
            <Value>{student.from}</Value>
          </DetailRow>
        </>
      ) : (
        <DetailRow>
          <Label>Student Info</Label>
          <Value>—</Value>
        </DetailRow>
      )}
      {/* 
      <DetailRow>
        <Label>Created At</Label>
        <Value>{parseDate(created_at)}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Updated At</Label>
        <Value>{parseDate(updated_at)}</Value>
      </DetailRow> */}

      <DetailRow>
        <Label>Created At</Label>
        <Value>{formatDate(created_at)}</Value>
      </DetailRow>

      <DetailRow>
        <Label>Updated At</Label>
        <Value>{formatDate(updated_at)}</Value>
      </DetailRow>
    </StyledDetails>
  )
}

export default UserDetails
