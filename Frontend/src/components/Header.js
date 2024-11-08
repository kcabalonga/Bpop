import styled from 'styled-components';
import CartIcon from '../images/Cart.svg';
import AccountIcon from '../images/Account.svg';

const BpopHeader = styled.div`
    z-index: 2001;
    position: -webkit-sticky;
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
    display: flex;
`;
const IconContainer = styled.div`
  position: absolute;
  right: .75em;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  gap: .75em;
`;

const Cart = styled.div`
  background-image: url(${CartIcon});
  z-index: 2;
  width: 1em;
  height: 1em;
  background-repeat: no-repeat;
  background-size: contain;
`;

const Account = styled.div`
  background-image: url(${AccountIcon});
  z-index: 2;
  width: 1em;
  height: 1em;
  background-repeat: no-repeat;
  background-size: contain;
`;



const Header = () => {
  return (
      <BpopHeader>
        BPOP
        <IconContainer>
          <Cart />
          <Account />
        </IconContainer>
      </BpopHeader>
    )
  }
  
export default Header;

