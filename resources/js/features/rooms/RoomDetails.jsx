import styled from 'styled-components'

const DetailsContainer = styled.div`
  padding: 3rem;
  background-color: var(
    --color-grey-0
  ); /* Uses light/dark mode adaptive color */
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  max-width: 800px;
  margin: 0 auto;
  color: var(--color-grey-800); /* Fallback text color for the container */

  /* Optional: smooth transition between light and dark mode */
  transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
`

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: var(--color-grey-900); /* Title color adapts to mode */
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
  color: var(--color-grey-700); /* Text adapts to mode */

  strong {
    display: inline-block;
    min-width: 120px;
    color: var(--color-grey-900); /* Strong text adapts to mode */
  }
`

const RoomDetails = ({ room }) => {
  return (
    <DetailsContainer>
      <Title>Room Details</Title>
      <Grid>
        <DetailItem>
          <strong>ID:</strong> {room.id}
        </DetailItem>
        <DetailItem>
          <strong>Room Number:</strong> {room.room_number}
        </DetailItem>
        <DetailItem>
          <strong>Type:</strong> {room.type}
        </DetailItem>
        <DetailItem>
          <strong>Capacity:</strong> {room.capacity}
        </DetailItem>
        <DetailItem>
          <strong>Occupancy:</strong> {room.current_occupancy}
        </DetailItem>
        <DetailItem>
          <strong>Status:</strong> {room.status}
        </DetailItem>
        <DetailItem>
          <strong>Floor:</strong> {room.floor}
        </DetailItem>
        <DetailItem>
          <strong>Price:</strong> ${room.price}
        </DetailItem>
        <DetailItem>
          <strong>Created:</strong> {room.created_at}
        </DetailItem>
        <DetailItem>
          <strong>Updated:</strong> {room.updated_at}
        </DetailItem>
      </Grid>
    </DetailsContainer>
  )
}

export default RoomDetails
