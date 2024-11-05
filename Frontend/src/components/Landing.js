import styled from "styled-components";

const Landing = styled.div`
    width: 100%;
    height: 100vh;
    background: #F5FAFF;
    align-items: center;
    justify-content: center;
    display: flex;
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
    margin-top: -15vh;
`;

const LandingPage = () => {
    return (
        <Landing>
        <Container>
            UCLA's own buy and sell platform
        </Container>
        </Landing>
    )
}

export default LandingPage;