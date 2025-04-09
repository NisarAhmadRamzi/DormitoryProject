import React from 'react'
import styled from 'styled-components'
import Logo from './Logo'
import MainNav from './MainNav'

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  /* padding: 3.2rem 1.5rem; */
  padding: 3.2rem 1.5rem 2rem 0;
  border-right: 1px solid var(--color-gray-100);
  grid-row: 1 /-1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  width: 270px;
`

const Sidebar = () => {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
    </StyledSidebar>
  )
}

export default Sidebar
