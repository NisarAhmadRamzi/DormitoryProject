import { HiOutlineHome, HiOutlineHomeModern } from "react-icons/hi2";

import { IoSettingsOutline } from "react-icons/io5";
import { LuUsers } from "react-icons/lu";
import { MdOutlineHomeRepairService } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import styled from "styled-components";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavlink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavlink to="/dashboard">
            <HiOutlineHome />
            <span> Home</span>
          </StyledNavlink>
        </li>
        <li>
          <StyledNavlink to="/bookins">
            <HiOutlineHomeModern />
            <span> Bookings</span>
          </StyledNavlink>
        </li>
        <li>
          <StyledNavlink to="/cabins">
            <MdOutlineHomeRepairService />
            <span> Cabins</span>
          </StyledNavlink>
        </li>
        <li>
          <StyledNavlink to="/users">
            <LuUsers />
            <span> Users</span>
          </StyledNavlink>
        </li>
        <li>
          <StyledNavlink to="/settings">
            <IoSettingsOutline />
            <span> Settings</span>
          </StyledNavlink>
        </li>
        <li>
          <StyledNavlink to="/accounts">
            <VscAccount />
            <span> Accounts</span>
          </StyledNavlink>
        </li>
      </NavList>
    </nav>
  );
}
export default MainNav;
