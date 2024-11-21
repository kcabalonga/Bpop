import styled from "styled-components";
import CloudIcon1 from '../images/Cloud1.svg';
import CloudIcon2 from '../images/Cloud2.svg';

export const Landing = styled.div`
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
    flex-direction: column;
`;

export const Cloud1 = styled.div`
    position: absolute;
    background-image: url(${CloudIcon1});
    width: 35rem;
    height: 30rem;
    background-repeat: no-repeat;
    background-size: contain;
    pointer-events: none;
    left: 0%;
    top: 50%;
`;

export const Cloud2 = styled.div`
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