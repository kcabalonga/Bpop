import styled from 'styled-components';

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
    /* border-bottom: 2px solid black; */
`;

const Header = () => {
    return (
      <BpopHeader>
        BPOP
      </BpopHeader>
    )
  }
  
export default Header;