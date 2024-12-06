import React, { useState } from "react";
import Header from "../components/Header";
import Background from "../components/Background";
import FormContainer, { Input, SubmitButton, Heading } from "../components/FormContainer";

function ResetPasswordtwo() {
  // State for form inputs
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    password2: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const token = localStorage.getItem('token');

    if(!token){
     alert ("Not Signed in")

      
    }
    else{

     
      const response = await fetch('http://localhost:8001/api/username', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      if (response.ok){
        const data = await response.json();
        if (data.username){
         if (data.username != formData.username ){
          alert("Username inputed does not match current user. Try again")
         }

        }

      }
      else{
        alert("Something went wrong try again");
      }
   

    }

  
    // Check if passwords match
    if (formData.password !== formData.password2) {
      alert('Passwords do not match.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8001/reset-passwordProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: formData.username,
            password: formData.password,
            password2: formData.password2, // Include password2 in the request body
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        alert('Password reset successful! Redirecting to sign-in page.');
        window.location.href = "/signin";
      } else {
        const errorData = await response.json();
        alert(`Error resetting password: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    }
  };
  
  return (
    <div>
    <Header />
    <Background>
      <FormContainer onSubmit={handleSubmit}>
      <Heading>Reset Password</Heading>

        <Input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <Input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="New Password"
          required
        />
        <Input
          type="password"
          id="password2"
          name="password2"
          value={formData.password2}
          onChange={handleChange}
          placeholder="Retype Password"
          required
        />
        <SubmitButton type="submit">Reset Password</SubmitButton>
      </FormContainer>
    </Background>
    </div>
  );
}

export default ResetPasswordtwo;

