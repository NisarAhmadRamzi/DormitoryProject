// import React from 'react'
// import styled from 'styled-components'

// const StyledHeader = styled.header`
//   background-color: var(--color-grey-0);
//   padding: 1.2rem 4.8rem;
//   border-bottom: 1px solid var(--color-gray-100);
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// `

// const BurgerButton = styled.button`
//   background: none;
//   border: none;
//   font-size: 2.4rem;
//   cursor: pointer;
//   color: var(--color-grey-800);
// `

// const Header = ({ onToggleSidebar }) => {
//   return (
//     <StyledHeader>
//       <BurgerButton onClick={onToggleSidebar}>☰</BurgerButton>
//     </StyledHeader>
//   )
// }

// export default Header
import React, { useState } from 'react'

import Logouts from '../features/authentication/Logouts'
import styled from 'styled-components'

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-gray-100);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 3;
`

const BurgerButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  width: 30px;
  height: 24px;
  position: relative;
  padding: 0;
  z-index: 10;

  span {
    position: absolute; /* Needed to overlap lines */
    left: 0;
    width: 100%;
    height: 3px;
    background-color: var(--color-grey-800);
    border-radius: 2px;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  /* Position the 3 lines */
  span:nth-child(1) {
    top: 0;
  }

  span:nth-child(2) {
    top: 10px;
  }

  span:nth-child(3) {
    top: 20px;
  }

  /* When open, rotate top and bottom to form X */
  &.open span:nth-child(1) {
    transform: rotate(45deg);
    top: 10px;
  }

  &.open span:nth-child(2) {
    opacity: 0;
  }

  &.open span:nth-child(3) {
    transform: rotate(-45deg);
    top: 10px;
  }
`

const Header = ({ onToggleSidebar }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen((prev) => !prev)
    onToggleSidebar()
  }

  return (
    <StyledHeader>
      {/* When isOpen is true, add the "open" class for X icon */}
      <BurgerButton onClick={handleClick} className={isOpen ? 'open' : ''}>
        <span></span>
        <span></span>
        <span></span>
      </BurgerButton>
      <Logouts/>
    </StyledHeader>
  )
}

export default Header
