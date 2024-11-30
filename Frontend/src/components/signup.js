import React, { useState } from 'react';
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

const SignUpContainer = styled.div`
width: 467px;
height: 663px;
background-color: #D7E9F7;
border-radius: 32px;
padding: 50px;
display: flex;
flex-direction: column;
align-items: center;
`;

const InputField = styled.input`
  width: 100%;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
  background-color: #FFFFFF;
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

const Message = styled.p`
  margin-top: 20px;
  color: ${(props) => (props.error ? 'red' : 'green')};
  font-weight: bold;
`;

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const Logo = styled.div`
  width: 209.742px;
  height: 208.962px;
  flex-shrink: 0;
  fill: #FFF;
  stroke-width: 1px;
  stroke: #000;
  background-image: url(${Star4});
`;

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8001/add-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('User registered successfully!');
        setIsError(false);
        setFormData({
          name: '',
          username: '',
          email: '',
          password: '',
        });
      } else {
        const errorText = await response.text();
        setMessage(`Error: ${errorText}`);
        setIsError(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
      setIsError(true);
    }
  };

  return (
    <PageContainer>
      <SignUpContainer>
        <Logo/>
            <h2>Create an Account</h2>
            <form onSubmit={handleSubmit}>
            <InputField
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <InputField
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
            />
            <InputField
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <InputField
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
            />
            <SubmitButton type="submit">Sign Up</SubmitButton>
            </form>
            {message && <Message error={isError}>{message}</Message>}
      </SignUpContainer>
    </PageContainer>
  );
};

export default SignUp;
