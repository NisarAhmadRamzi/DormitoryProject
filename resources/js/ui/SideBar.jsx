import Logo from '../ui/Logo'
import MainNav from './MainNav'
import styled from 'styled-components'

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  overflow-y: auto;

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  /* Scrollbar styling */
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: var(--color-grey-400) transparent;

  /* Chrome, Edge, Safari scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--color-grey-400);
    /* border-radius: 0; <- remove rounded corners */
    /* border: none; */
  }
`

function Sidebar() {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
    </StyledSidebar>
  )
}

export default Sidebar
