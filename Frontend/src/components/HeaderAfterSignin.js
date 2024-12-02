import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AccountIcon from '../images/Account.svg';



const BpopHeader = styled.div`
    z-index: 2001;
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    top: 0;
    background: #72B6ED;
    width: 100%;
    padding: 0.2em 0;
    color: white;
    font-family: 'Hammersmith One';
    font-style: normal;
    font-weight: 400;
    text-align: center;
    font-size: 2em;
    line-height: normal;
`;
const IconContainer = styled.div`
  position: absolute;
  right: 0.75em;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  gap: 0.75em;
`;

const Account = styled(Link)`
  background-image: url(${AccountIcon});
  z-index: 2;
  width: 1em;
  height: 1em;
  background-repeat: no-repeat;
  background-size: contain;
  display: block; /* Ensure it's clickable */
`
const HeaderAfterSignin = () => {
  return (
    <BpopHeader>
      BPOP
      <IconContainer>
        <Account to="/Profile" />
      </IconContainer>
    </BpopHeader>
  );
};

export default HeaderAfterSignin;