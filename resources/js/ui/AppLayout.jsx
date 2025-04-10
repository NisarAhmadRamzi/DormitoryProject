// import { Outlet } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import Header from "./Header";
// import styled from "styled-components";

// import React from 'react'
// import { Outlet } from 'react-router-dom'
// import styled from 'styled-components'
// import Header from './Header'
// import Sidebar from './SideBar'

// const StyledAppLayout = styled.div`
//   display: grid;
//   grid-template-columns: 26rem 1fr;
//   grid-template-rows: auto 1fr;
//   height: 100vh;
// `

// const Main = styled.main`
//   background-color: var(--color-grey-50);
//   padding: 4rem 4.8rem 6.4rem;
//   overflow: scroll;
// `

// const Container = styled.div`
//   max-width: 120rem;
//   margin: 0 auto;
//   display: flex;
//   flex-direction: column;
//   gap: 3.2rem;
// `

// function AppLayout() {
//   return (
//     <StyledAppLayout>
//       <Header />
//       <Sidebar />
//       <Main>
//         <Container>
//           <Outlet />
//         </Container>
//       </Main>
//     </StyledAppLayout>
//   )
// }

// export default AppLayout
//v2

//v3
// import React from 'react'
// import { Outlet } from 'react-router-dom'
// import styled from 'styled-components'
// import Header from './Header'
// import Sidebar from './SideBar'

// const StyledAppLayout = styled.div`
//   display: grid;
//   grid-template-columns: 26rem 1fr;
//   grid-template-rows: auto 1fr;
//   height: 100vh;
//   overflow: hidden; /* Prevent page scroll */
// `

// const StyledHeader = styled(Header)`
//   grid-column: 1 / -1;
// `

// const StyledSidebar = styled(Sidebar)`
//   overflow-y: auto;
//   height: 100%;
// `

// const Main = styled.main`
//   background-color: var(--color-grey-50);
//   padding: 4rem 4.8rem 6.4rem;
//   overflow-y: auto;
//   height: 100%;
// `

// const Container = styled.div`
//   max-width: 120rem;
//   margin: 0 auto;
//   display: flex;
//   flex-direction: column;
//   gap: 3.2rem;
// `

// function AppLayout() {
//   return (
//     <StyledAppLayout>
//       <StyledHeader />
//       <StyledSidebar />
//       <Main>
//         <Container>
//           <Outlet />
//         </Container>
//       </Main>
//     </StyledAppLayout>
//   )
// }

// export default AppLayout
//v4

// import React from 'react'
// import { Outlet } from 'react-router-dom'
// import styled from 'styled-components'
// import Header from './Header'
// import Sidebar from './SideBar'

// const StyledAppLayout = styled.div`
//   display: grid;
//   grid-template-columns: 26rem 1fr;
//   grid-template-rows: auto 1fr;
//   height: 100vh;
//   overflow: hidden; /* Prevent full-page scroll */
// `

// const StyledHeader = styled(Header)`
//   grid-column: 1 / -1;
// `

// const StyledSidebar = styled(Sidebar)`
//   overflow-y: auto;
//   height: 100%;
//   box-sizing: border-box;
// `

// const Main = styled.main`
//   background-color: var(--color-grey-50);
//   padding: 4rem 4.8rem 6.4rem;
//   overflow-y: auto;
//   height: 100%;
//   box-sizing: border-box;
// `

// const Container = styled.div`
//   max-width: 120rem;
//   margin: 0 auto;
//   display: flex;
//   flex-direction: column;
//   gap: 3.2rem;
//   flex: 1 0 auto;
// `

// function AppLayout() {
//   return (
//     <StyledAppLayout>
//       <StyledHeader />
//       <StyledSidebar />
//       <Main>
//         <Container>
//           <Outlet />
//         </Container>
//       </Main>
//     </StyledAppLayout>
//   )
// }

// export default AppLayout

//v6

import styled, { createGlobalStyle } from 'styled-components'

import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './SideBar'

// ✅ Page-specific global styles
const PageGlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
    margin: 0;
    overflow: hidden;
  }
`

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
  overflow: hidden;
`

const StyledHeader = styled(Header)`
  grid-column: 1 / -1;
`

const StyledSidebar = styled(Sidebar)`
  overflow-y: auto;
  height: 100%;
  box-sizing: border-box;
`

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow-y: auto;
  height: 100%;
  box-sizing: border-box;
`

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  flex: 1 0 auto;
`

function AppLayout() {
  return (
    <>
      <PageGlobalStyle />
      <StyledAppLayout>
        <StyledHeader />
        <StyledSidebar />
        <Main>
          <Container>
            <Outlet />
          </Container>
        </Main>
      </StyledAppLayout>
    </>
  )
}

export default AppLayout

//v5
// import React from 'react'
// import { Outlet } from 'react-router-dom'
// import styled from 'styled-components'
// import Header from './Header' // Correct import for Header
// import Sidebar from './SideBar' // Correct import for Sidebar

// // Main content styling
// const Main = styled.main`
//   background-color: var(--color-grey-50);
//   padding: 4rem 4.8rem 6.4rem;
//   overflow: scroll;
// `
// const Container = styled.div`
//   max-width: 120 rem;
//   margin: 0 auto;
//   display: flex;
//   flex-direction: column;
//   gap: 3.2rem;
// `
// // Layout styling
// const StyledAppLayout = styled.div`
//   display: grid;
//   grid-template-columns: 26rem 1fr;
//   grid-template-rows: auto 1fr;
//   height: 100vh;
// `

// const AppLayout = () => {
//   return (
//     <StyledAppLayout>
//       <Header />
//       <Sidebar />
//       <Main>
//         <Container>
//           <Outlet />
//         </Container>
//       </Main>
//     </StyledAppLayout>
//   )
// }

// export default AppLayout
