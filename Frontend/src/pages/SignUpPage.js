import React, { useState } from "react";
import Header from "../components/Header";
import Background from "../components/Background";
import FormContainer, { Input, SubmitButton, Heading } from "../components/FormContainer";

function SignUp() {
  // State for form inputs
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await fetch("http://localhost:8001/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {

        const data = await response.json();

        if (data.token){
          localStorage.setItem('token', data.token); 
          window.location.href = "/profile"; // Redirect to profile page
        }

       // window.location.href = "/profile";
       // alert(`User added successfully: ${JSON.stringify(data)}`);

      } else {
        alert("Failed to add user. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
    <Header />
    <Background>
        <FormContainer onSubmit={handleSubmit}>
        <Heading>Create Account</Heading>
                <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                />
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
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                />
                <Input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
                <SubmitButton type="submit">Sign Up</SubmitButton>
        </FormContainer>
    </Background>
    </div>
  );
}

export default SignUp;
