import React from "react";
import styled from "styled-components";
import Star4 from "../images/Star4.svg";
import Header from "../components/Header";
import { Cloud1, Cloud2 } from "../components/clouds";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f4f4f4;
`;

const FormContainer = styled.div`
  width: 467px;
  height: 663px;
  background-color: #d7e9f7;
  border-radius: 32px;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.div`
  width: 209.742px;
  height: 208.962px;
  background-image: url(${Star4});
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
  background-color: #ffffff;
`;

const SubmitButton = styled.button`
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

const ResetPassword = () => {
    return (
        <div>
            <Header />
            <div
                style={{
                    position: "relative",
                    height: "100vh",
                    background: "#F5FAFF",
                    overflow: "hidden",
                }}
            >
                <PageContainer>
                    <FormContainer>
                        <Logo />
                        <Title>Reset Password</Title>
                        <form action="http://localhost:8001/reset-password" method="post">
                            <InputField
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                required
                            />
                            <SubmitButton type="submit">Send Reset Link</SubmitButton>
                        </form>
                    </FormContainer>
                </PageContainer>
                <Cloud1 />
                <Cloud2 />
            </div>
        </div>
    );
};

export default ResetPassword;