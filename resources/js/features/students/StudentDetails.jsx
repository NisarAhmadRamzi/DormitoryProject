import styled from 'styled-components'
import Heading from '../../ui/Heading'

const StyledDetails = styled.div`
  background-color: var(--color-grey-0);
  padding: 2.4rem;
  border-radius: 8px;
  box-shadow: var(--shadow-md);
  max-height: 80vh; /* Limit height */
  overflow-y: auto; /* Scroll inside the modal if content is too long */
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

function StudentDetails({ student }) {
  if (!student) return <p>No student data available.</p>

  const {
    id,
    name,
    email,
    f_name,
    last_name,
    from,
    dob,
    id_number,
    academic_info,
    phone,
    gender,
    registration_date,
    registration_deadline,
    created_at,
    updated_at,
    room,
    fee,
  } = student

  return (
    <StyledDetails>
      <Heading as="h3">Student Details</Heading>

      <DetailsGrid>
        <DetailItem>
          <Label>ID</Label>
          <Value>{id}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Full Name</Label>
          <Value>{`${f_name} ${last_name}`}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Username</Label>
          <Value>{name}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Email</Label>
          <Value>{email}</Value>
        </DetailItem>

        <DetailItem>
          <Label>ID Number</Label>
          <Value>{id_number}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Phone</Label>
          <Value>{phone}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Gender</Label>
          <Value>{gender}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Date of Birth</Label>
          <Value>{dob}</Value>
        </DetailItem>

        <DetailItem>
          <Label>From</Label>
          <Value>{from}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Academic Info</Label>
          <Value>{academic_info}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Registration Date</Label>
          <Value>{registration_date}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Registration Deadline</Label>
          <Value>{registration_deadline}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Room Info</Label>
          <Value>
            {room
              ? `Room ${room.room_number} (${room.type}), Floor: ${room.floor}`
              : 'No room assigned'}
          </Value>
        </DetailItem>

        <DetailItem>
          <Label>Fee Info</Label>
          <Value>
            {fee
              ? `Total Fee: $${fee.total_fee}, Paid: $${
                  fee.office_paid
                }, Due: $${fee.total_fee - fee.office_paid}`
              : 'No fee data'}
          </Value>
        </DetailItem>

        <DetailItem>
          <Label>Created At</Label>
          <Value>{created_at}</Value>
        </DetailItem>

        <DetailItem>
          <Label>Updated At</Label>
          <Value>{updated_at}</Value>
        </DetailItem>
      </DetailsGrid>
    </StyledDetails>
  )
}

export default StudentDetails
