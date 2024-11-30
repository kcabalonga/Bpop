import React from 'react';
import styled from 'styled-components';
import Star4 from '../images/Star4.svg';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f4f4f4;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f4f4f4;
`;


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
    width: 209.742px;
    height: 208.962px;
    flex-shrink: 0;
    fill: #FFF;
    stroke-width: 1px;
    stroke: #000;
    background-image: url(${Star4});
`;

// Title
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

// const SignIn = () => {
//     return (
//         <SignInContainer>
//             <Logo />
//             <Title>Sign in</Title>
//             <InputField type="email" placeholder="Email address" />
//             <InputField type="password" placeholder="Password" />
//             <SignInButton>Sign in</SignInButton>
//         </SignInContainer>
//     );
// };


const ResetLink = styled.a`
  margin-top: 20px;
  color: #007BFF;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const SignIn = () => {
    return (
      <PageContainer>
        <SignInContainer>
          <Logo />
          <Title>Sign in</Title>
          <form action="http://localhost:8001/check-user" method="get">
            <InputField type="text" id="username" name="username" placeholder="Username" required />
            <InputField type="password" id="password" name="password" placeholder="Password" required />
            <SignInButton type="submit">Sign in</SignInButton>
          </form>
          <ResetLink href="RestartPassword.html">Reset Password</ResetLink>
        </SignInContainer>
      </PageContainer>
    );
  };

export default SignIn;