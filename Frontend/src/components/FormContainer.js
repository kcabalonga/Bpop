import styled from "styled-components";
import StarIcon from '../images/Star.svg';
import React from "react";

const Container = styled.div`
    width: 30rem;
    height: 41rem;
    background: #D7E9F7;
    border-radius: 32px;
    position: relative;
    flex-direction: column;
    align-items: center;
    display: flex;
    justify-content: flex-start;
`;

const Star = styled.div`
    background-image: url(${StarIcon});
    width: 13rem;
    height: 11rem;
    z-index: 1;
    background-repeat: no-repeat;
    background-size: contain;
    pointer-events: none;
    margin-top: 1rem;
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 21rem;
    align-items: center;
    gap: .75rem;
    pointer-events: auto;
    z-index: 2;
`;

const Heading = styled.h1`
    color: #000;
    font-family: "Poppins";
    font-size: 30px;
    font-style: normal;
    font-weight: 700;
    line-height: 130%;
    letter-spacing: -0.3px;
    text-align: center;
`;

// Form Fields

const Input = styled.input`
    display: inline-flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    height: 3.5rem;
    gap: 6px;
    flex-shrink: 0;
    border-radius: 10px;
    border: 1px solid #D8DADC;
    background: #FFF;
    padding: .75rem;
    font-family: "Inter";
    pointer-events: auto;
    box-sizing: border-box;
    

    &:focus {
        outline: none;
        border-color: #007BFF;
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }

    &::placeholder {
        color: rgba(0, 0, 0, 0.50);
        font-family: "Inter";
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 125%; /* 20px */
    }
`;

// Submit Button
const SubmitButton = styled.button`
    display: flex;
    width: 15rem;
    height: 58px;
    padding: 17px 20px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-radius: 10px;
    background: #000;
    color: #fff;
    font-family: "Inter";
    text-align: center;
    font-size: 16px;
    cursor: pointer
`;

const Link = styled.a`
    font-family: "Inter";
    text-align: center;
    font-size: 16px;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.50);
`;

const ProfilePic = styled.img`
    border-radius: 50%;
    max-width: 200px;
    max-height: 200px;

`;

const BioInput = styled.textarea`
    border-radius: 10px;
    margin-bottom: 6px;
    width: 100%;

    &::placeholder {
        color: rgba(0, 0, 0, 0.50);
        font-family: "Inter";
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 125%; /* 20px */
        padding: 3px;
    }
`;

const BioForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 21rem;
    align-items: center;
    gap: .75rem;
    pointer-events: auto;
    z-index: 2;
`

const FormContainer = ({ children, onSubmit }) => {
    return (
        <Container>
            <Star />
            <StyledForm onSubmit={onSubmit}>
                {children}
            </StyledForm>
        </Container>
    );
};

export { Input, SubmitButton, Heading, Link, ProfilePic, BioInput, BioForm };
export default FormContainer;