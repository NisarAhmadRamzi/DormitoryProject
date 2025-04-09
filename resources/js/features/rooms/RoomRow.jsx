import React from 'react'
import styled from 'styled-components'
import { formatCurrency } from '../../utils/helpers'

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;

  column-gap: 0.5rem;
  align-items: center;
  padding: 1.4rem 1rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`

// const Img = styled.img`
//   display: block;
//   width: 6.4rem;
//   aspect-ratio: 3 / 2;
//   object-fit: cover;
//   object-position: center;
//   transform: scale(1.5) translateX(-7px);
// `

// const Cabin = styled.div`
//   font-size: 1.6rem;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   font-family: 'Sono';
// `
const Id = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`

const RoomRow = ({ cabin }) => {
  const { id, room_number, type, capacity, current_occupancy, price, status } =
    cabin

  return (
    <TableRow role="row">
      <Id>{id}</Id>
      <Id>{room_number}</Id>
      <Id>{type}</Id>
      <Id>{capacity}</Id>
      <Discount>{formatCurrency(price)}</Discount>
      <button>Delete</button>
    </TableRow>
  )
}

export default RoomRow
