// import styled, { createGlobalStyle } from 'styled-components'
// import React from 'react'
// import { Outlet } from 'react-router-dom'
// import Header from './Header'
// import Sidebar from './SideBar'

// // ✅ Page-specific global styles
// const PageGlobalStyle = createGlobalStyle`
//   html, body, #root {
//     height: 100%;
//     margin: 0;
//     overflow: hidden;
//   }
// `

// const StyledAppLayout = styled.div`
//   display: grid;
//   grid-template-columns: 26rem 1fr;
//   grid-template-rows: auto 1fr;
//   height: 100vh;
//   overflow: hidden;
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
//     <>
//       <PageGlobalStyle />
//       <StyledAppLayout>
//         <StyledHeader />
//         <StyledSidebar />
//         <Main>
//           <Container>
//             <Outlet />
//           </Container>
//         </Main>
//       </StyledAppLayout>
//     </>
//   )
// }

// export default AppLayout

// import React, { useState } from 'react'
// import styled, { createGlobalStyle } from 'styled-components'

// import { Outlet } from 'react-router-dom'
// import Header from './Header'
// import Sidebar from './SideBar'

// const PageGlobalStyle = createGlobalStyle`
//   html, body, #root {
//     height: 100%;
//     margin: 0;
//     overflow: hidden;
//   }
// `

// const StyledAppLayout = styled.div`
//   display: grid;
//   grid-template-columns: ${({ isSidebarVisible }) =>
//     isSidebarVisible ? '26rem 1fr' : '1fr'};
//   grid-template-rows: auto 1fr;
//   height: 100vh;
//   overflow: hidden;
//   transition: grid-template-columns 0.3s ease;
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
//   const [isSidebarVisible, setIsSidebarVisible] = useState(true)

//   const toggleSidebar = () => {
//     setIsSidebarVisible((prev) => !prev)
//   }

//   return (
//     <>
//       <PageGlobalStyle />
//       <StyledAppLayout isSidebarVisible={isSidebarVisible}>
//         <Header onToggleSidebar={toggleSidebar} />
//         {isSidebarVisible && <Sidebar />}
//         <Main>
//           <Container>
//             <Outlet />
//           </Container>
//         </Main>
//       </StyledAppLayout>
//     </>
//   )
// }

// export default AppLayout

// import React, { useState } from 'react'
// import styled, { createGlobalStyle } from 'styled-components'

// import { Outlet } from 'react-router-dom'
// import Header from './Header'
// import Sidebar from './SideBar'

// const PageGlobalStyle = createGlobalStyle`
//   html, body, #root {
//     height: 100%;
//     margin: 0;
//     overflow: hidden;
//   }
// `

// const StyledAppLayout = styled.div`
//   display: grid;
//   grid-template-columns: 1fr;
//   grid-template-rows: auto 1fr;
//   height: 100vh;
//   overflow: hidden;
//   position: relative;
// `

// const SidebarWrapper = styled.div`
//   position: absolute;
//   top: 6.4rem; /* Assuming header is around 6.4rem */
//   left: 0;
//   width: 26rem;
//   height: calc(100% - 6.4rem);
//   background-color: white;
//   box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
//   transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
//   transform: ${({ isVisible }) =>
//     isVisible ? 'translateX(0)' : 'translateX(-100%)'};
//   opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
//   pointer-events: ${({ isVisible }) => (isVisible ? 'auto' : 'none')};
//   z-index: 10;
// `

// const Main = styled.main`
//   background-color: var(--color-grey-50);
//   padding: 4rem 4.8rem 6.4rem;
//   overflow-y: auto;
//   height: 100%;
//   box-sizing: border-box;
//   transition: margin-left 0.3s ease-in-out;
//   margin-left: ${({ isSidebarVisible }) => (isSidebarVisible ? '26rem' : '0')};
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
//   const [isSidebarVisible, setIsSidebarVisible] = useState(true)

//   const toggleSidebar = () => {
//     setIsSidebarVisible((prev) => !prev)
//   }

//   return (
//     <>
//       <PageGlobalStyle />
//       <StyledAppLayout>
//         <Header onToggleSidebar={toggleSidebar} />
//         <SidebarWrapper isVisible={isSidebarVisible}>
//           <Sidebar />
//         </SidebarWrapper>
//         <Main isSidebarVisible={isSidebarVisible}>
//           <Container>
//             <Outlet />
//           </Container>
//         </Main>
//       </StyledAppLayout>
//     </>
//   )
// }

// export default AppLayout

// import React, { useState } from 'react'
// import styled, { createGlobalStyle } from 'styled-components'

// import { Outlet } from 'react-router-dom'
// import Header from './Header'
// import Sidebar from './SideBar'

// const PageGlobalStyle = createGlobalStyle`
//   html, body, #root {
//     height: 100%;
//     margin: 0;
//     overflow: hidden;
//   }
// `

// const StyledAppLayout = styled.div`
//   display: grid;
//   grid-template-columns: ${({ isSidebarVisible }) =>
//     isSidebarVisible ? '26rem 1fr' : '0 1fr'};
//   grid-template-rows: auto 1fr;
//   height: 100vh;
//   overflow: hidden;
//   transition: grid-template-columns 0.3s ease-in-out;
// `

// const StyledSidebarWrapper = styled.div`
//   overflow: hidden;
//   transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
//   transform: ${({ isVisible }) =>
//     isVisible ? 'translateX(0)' : 'translateX(-100%)'};
//   opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
//   will-change: transform, opacity;
// `

// const Main = styled.main`
//   background-color: var(--color-grey-50);
//   padding: 4rem 4.8rem 6.4rem;
//   overflow-y: auto;
//   height: 100%;
//   box-sizing: border-box;
//   transition: margin-left 0.3s ease-in-out;
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
//   const [isSidebarVisible, setIsSidebarVisible] = useState(true)

//   const toggleSidebar = () => {
//     setIsSidebarVisible((prev) => !prev)
//   }

//   return (
//     <>
//       <PageGlobalStyle />
//       <StyledAppLayout isSidebarVisible={isSidebarVisible}>
//         <Header onToggleSidebar={toggleSidebar} />
//         <StyledSidebarWrapper isVisible={isSidebarVisible}>
//           <Sidebar />
//         </StyledSidebarWrapper>
//         <Main>
//           <Container>
//             <Outlet />
//           </Container>
//         </Main>
//       </StyledAppLayout>
//     </>
//   )
// }

// export default AppLayout

import React, { useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './SideBar'

const PageGlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
    margin: 0;
    overflow: hidden;
  }
`

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: ${({ isSidebarVisible }) =>
    isSidebarVisible ? '26rem 1fr' : '1fr'};
  grid-template-rows: auto 1fr;
  height: 100vh;
  overflow: hidden;
  transition: grid-template-columns 0.3s ease;
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
  const [isSidebarVisible, setIsSidebarVisible] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev)
  }

  return (
    <>
      <PageGlobalStyle />
      <StyledAppLayout isSidebarVisible={isSidebarVisible}>
        <Header onToggleSidebar={toggleSidebar} />
        {isSidebarVisible && <Sidebar />}
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
