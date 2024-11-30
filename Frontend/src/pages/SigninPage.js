import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import { Cloud1, Cloud2 } from '../components/clouds';
import SignIn from '../components/signin';
import SignUp from '../components/signup';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #F5FAFF;
  position: relative;
  overflow: hidden;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50px; /* Adjust space between the components */
  justify-content: center;
  align-items: flex-start;
  padding: 50px;
  width: 100%;
  max-width: 1200px;
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
`;

const CloudWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: -1;
`;

export default function SigninPage() {
  return (
    <PageContainer>
      <Header />
      <CloudWrapper>
        <Cloud1 />
        <Cloud2 />
      </CloudWrapper>
      <FormContainer>
        <LeftSection>
          <SignUp />
        </LeftSection>
        <RightSection>
          <SignIn />
        </RightSection>
      </FormContainer>
    </PageContainer>
  );
}
