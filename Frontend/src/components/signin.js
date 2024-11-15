// import styled from "styled-components";

// const signincontainer = styled.div`
//     width: 467px;
//     height: 663px;
//     flex-shrink: 0;
//     border-radius: 32px;
//     background: #D7E9F7;
//     padding: 50px;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
// `

// const SignIn = () => {
//     return (
//         <signincontainer>
//         </signincontainer>
//     );
// };

// export default SignIn;

import React from 'react';
import styled from 'styled-components';

// Main container with blue background
const SignInContainer = styled.div`
    width: 467px;
    height: 663px;
    background-color: #D7E9F7;
    border-radius: 32px;
    padding: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

// Logo (stars) at the top
const Logo = styled.div`
    width: 100px; /* Adjust as needed */
    height: 100px; /* Adjust as needed */
    margin-bottom: 30px;
    /* Add background image or SVG here for the stars */
`;

// Title (e.g., "Sign in")
const Title = styled.h2`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 30px;
`;

// Input fields for email and password
const InputField = styled.input`
    width: 100%;
    padding: 15px;
    margin: 10px 0;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 16px;
    background-color: #FFFFFF;
`;

// Sign-in button
const SignInButton = styled.button`
    width: 100%;
    padding: 15px;
    background-color: #000;
    color: #fff;
    font-size: 18px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 20px;
`;

const SignIn = () => {
    return (
        <SignInContainer>
            <Logo />
            <Title>Sign in</Title>
            <InputField type="email" placeholder="Email address" />
            <InputField type="password" placeholder="Password" />
            <SignInButton>Sign in</SignInButton>
        </SignInContainer>
    );
};

export default SignIn;