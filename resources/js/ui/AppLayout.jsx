import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Header from './Header' // Correct import for Header
import Sidebar from './SideBar' // Correct import for Sidebar

// Main content styling
const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.5rem 6.4rem;
  position: sticky;
`

// Layout styling
const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`

const AppLayout = () => {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </StyledAppLayout>
  )
}

export default AppLayout
