import styled from "styled-components";
import CloudIcon from '../images/Cloud.svg';
import React from "react";

const Landing = styled.div`
    width: 100%;
    background: #F5FAFF;
    align-items: center;
    display: flex;
    position: relative;
    padding: 10rem 0;
    flex-direction: column;
    min-height: 100%;
    overflow: hidden;
`;

const Cloud = styled.div`
    position: absolute;
    background-image: url(${CloudIcon});
    width: 35rem;
    height: 30rem;
    z-index: 0;
    background-repeat: no-repeat;
    background-size: contain;
    ${({ position }) => position === 'bottom-left' && `
        left: -15rem;
        bottom: -5rem;
    `}
    ${({ position }) => position === 'top-right' && `
        right: -15rem;
        top: 3rem;
    `}
`;

const Background = ({ children }) => {
    return (
      <Landing>
        <Cloud position="bottom-left" />
        <Cloud position="top-right" />
        {children}
      </Landing>
    );
  };
  
  export default Background;
  