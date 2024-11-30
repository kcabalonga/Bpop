// import styled from 'styled-components';
// import CartIcon from '../images/Cart.svg';
// import AccountIcon from '../images/Account.svg';

// const BpopHeader = styled.div`
//     z-index: 2001;
//     position: -webkit-sticky;
//     position: sticky;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     top: 0;
//     background: #72B6ED;
//     width: 100%;
//     padding: 0.2em 0;
//     color: white;
//     font-family: 'Hammersmith One';
//     font-style: normal;
//     font-weight: 400;
//     text-align: center;
//     font-size: 2em;
//     line-height: normal;
//     display: flex;
// `;
// const IconContainer = styled.div`
//   position: absolute;
//   right: .75em;
//   top: 50%;
//   transform: translateY(-50%);
//   display: flex;
//   gap: .75em;
// `;

// const Cart = styled.div`
//   background-image: url(${CartIcon});
//   z-index: 2;
//   width: 1em;
//   height: 1em;
//   background-repeat: no-repeat;
//   background-size: contain;
// `;

// const Account = styled.div`
//   background-image: url(${AccountIcon});
//   z-index: 2;
//   width: 1em;
//   height: 1em;
//   background-repeat: no-repeat;
//   background-size: contain;
// `;

// const Header = () => {
//   return (
//       <BpopHeader>
//         BPOP
//         <IconContainer>
//           <Cart />
//         <Account />
//         </IconContainer>
//       </BpopHeader>
//     )
//   }
  
// export default Header;

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CartIcon from '../images/Cart.svg';
import AccountIcon from '../images/Account.svg';



const BpopHeader = styled.div`
    z-index: 2001;
    position: sticky;
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

const TitleLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

const IconContainer = styled.div`
  position: absolute;
  right: 0.75em;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  gap: 0.75em;
`;

const Cart = styled.div`
  background-image: url(${CartIcon});
  z-index: 2;
  width: 1em;
  height: 1em;
  background-repeat: no-repeat;
  background-size: contain;
`;

const Account = styled(Link)`
  background-image: url(${AccountIcon});
  z-index: 2;
  width: 1em;
  height: 1em;
  background-repeat: no-repeat;
  background-size: contain;
  display: block; /* Ensure it's clickable */
`;

const Header = () => {
  return (
    <BpopHeader>
      <TitleLink to="/">BPOP</TitleLink>
      <IconContainer>
        <Cart />
        <Account to="/SigninPage" />
      </IconContainer>
    </BpopHeader>
  );
};

export default Header;