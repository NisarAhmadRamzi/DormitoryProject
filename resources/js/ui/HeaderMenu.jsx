import ButtonIcon from './ButtonIcon';
import { HiOutlineUser } from 'react-icons/hi2';
import Logouts from '../features/authentication/Logouts';
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const StyledHeaderMenu = styled.ul`
display: flex;
gap : 0.4rem
`
const HeaderMenu = () => {
    const navigate = useNavigate();
  return (
    <StyledHeaderMenu>
    <li>
    <ButtonIcon onClick={()=> navigate("/accounts")}>
    <HiOutlineUser/>
    </ButtonIcon>
    </li>
    <li>
    <Logouts/>
    </li>
    </StyledHeaderMenu>
  );
};

export default HeaderMenu;