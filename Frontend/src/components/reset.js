import React, { useState } from 'react';
import styled from 'styled-components';
import Star4 from '../images/Star4.svg';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #F5FAFF;
`;

const ResetContainer = styled.div`
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

const Reset = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    password2: '',
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
      const response = await fetch('http://localhost:8001/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Password reset successfully!');
        setIsError(false);
        setFormData({
          username: '',
          password: '',
          password2: '',
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

//   return (
//     <PageContainer>
//       <ResetContainer>
//         <Logo/>
//             <h2>Reset Password</h2>
//             <form onSubmit={handleSubmit}>
//             <InputField
//                 type="text" id="username" name="username" placeholder="Username" required
//             />
//             <InputField
//                 type="text" id="password" name="password" placeholder="Password" required
//             />
//             <InputField
//                 type="text" id="password" name="password2" placeholder="Retype Password" required
//             />
//             <SubmitButton href="ResetPassword.js">Reset Password</SubmitButton>
//             </form>
//             {message && <Message error={isError}>{message}</Message>}
//       </ResetContainer>
//     </PageContainer>
//   );
return (
    <PageContainer>
      <ResetContainer>
        <Logo />
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <InputField
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <InputField
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <InputField
            type="password"
            id="password2"
            name="password2"
            placeholder="Retype Password"
            value={formData.password2}
            onChange={handleChange}
            required
          />
          <SubmitButton type="submit">Reset Password</SubmitButton>
        </form>
        {message && <Message error={isError}>{message}</Message>}
      </ResetContainer>
    </PageContainer>
  );
};

export default Reset;