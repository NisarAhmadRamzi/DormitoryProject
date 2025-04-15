import React from 'react'
import styled from 'styled-components'

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-gray-100);
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const BurgerButton = styled.button`
  background: none;
  border: none;
  font-size: 2.4rem;
  cursor: pointer;
  color: var(--color-grey-800);
`

const Header = ({ onToggleSidebar }) => {
  return (
    <StyledHeader>
      <BurgerButton onClick={onToggleSidebar}>☰</BurgerButton>

      {/* <h1>Header</h1> */}
    </StyledHeader>
  )
}

export default Header
