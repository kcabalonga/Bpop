import styled from "styled-components";
import CloudIcon from '../images/Cloud.svg';
import React from "react";

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
    z-index: -1;
`;

export const Cloud = styled.div`
    position: absolute;
    background-image: url(${CloudIcon});
    width: 35rem;
    height: 30rem;
    background-repeat: no-repeat;
    background-size: contain;
    pointer-events: none;
    ${({ position }) => position === 'bottom-left' && `
        left: -15rem;
        bottom: -5rem;
    `}
    ${({ position }) => position === 'top-right' && `
        right: -15rem;
        top: 3rem;
    `}
`;

const Background = () => {
    return (
      <Landing>
        <Cloud position="bottom-left" />
        <Cloud position="top-right" />
      </Landing>
    );
  };
  
  export default Background;
  