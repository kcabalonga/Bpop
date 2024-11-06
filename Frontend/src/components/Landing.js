import styled from "styled-components";
import CloudIcon1 from '../images/Cloud1.svg';
import CloudIcon2 from '../images/Cloud2.svg';

const Landing = styled.div`
    width: 100%;
    height: 60rem;
    background: #F5FAFF;
    align-items: center;
    justify-content: center;
    display: flex;
    position: relative;
    padding: 0;
    margin: 0;
    overflow: hidden;
`;

const Container = styled.div`
    display: flex;
    width: 735px;
    height: 405px;
    flex-direction: column;
    justify-content: center;
    color: #72B6ED;
    text-align: center;
    font-family: "Hammersmith One";
    font-size: 75px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    align-self: center;
    margin-top: -10rem;
    z-index: 1;
`;

const Cloud1 = styled.div`
    position: absolute;
    background-image: url(${CloudIcon1});
    width: 35rem;
    height: 30rem;
    background-repeat: no-repeat;
    background-size: contain;
    pointer-events: none;
    left: 0%;
    top: 50%
`;

const Cloud2 = styled.div`
    position: absolute;
    background-image: url(${CloudIcon2});
    width: 35rem;
    height: 30rem;
    background-repeat: no-repeat;
    background-size: contain;
    pointer-events: none;
    right: -17%;
    bottom: 50%;
    padding: 0;
    margin: 0;
`;

const LandingPage = () => {
    return (
        <Landing>
        <Cloud1 />
        <Container>
            UCLA's own buy and sell platform
        </Container>
        <Cloud2 />
        </Landing>
    )
}

export default LandingPage;