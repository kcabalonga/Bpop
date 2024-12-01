import React, { useState } from "react";
import Header from "../components/Header";
import Background from "../components/Background";
import FormContainer, { Input, SubmitButton, Heading, Link } from "../components/FormContainer";


function SignIn() {

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to validate user
  const checkUserfunc = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
       const response = await fetch(
        `http://localhost:8001/check-user?username=${encodeURIComponent(
          formData.username
        )}&password=${encodeURIComponent(formData.password)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );


  
      if (response.ok) {
        window.location.href = "/profile"; // Redirect to profile page
       
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to validate user");
      }
    } catch (error) {
      console.error("Error checking username", error);
      alert("An error occurred. Please try again.");
    }
  };
  





  return (
    <div>
    <Header />
    <Background>
        <FormContainer onSubmit = {checkUserfunc}>
        <Heading>Sign In</Heading>
          <Input type="text" id="username" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
          <Input type="text" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />

          <SubmitButton type="submit">Sign In</SubmitButton>
          <br />
          <Link href="/resetpassword">Forgot Password?</Link>
          <Link href="/signup">Need to Create an Account?</Link>
        </FormContainer>
    </Background>
    </div>
  );
}

export default SignIn;
