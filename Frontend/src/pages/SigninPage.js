import React from "react";
import Header from "../components/Header";
import Background from "../components/Background";
import FormContainer, { Input, SubmitButton, Heading, Link } from "../components/FormContainer";


function SignIn() {
  return (
    <div>
    <Header />
    <Background>
        <FormContainer action="http://localhost:8001/check-user" method="get">
        <Heading>Sign In</Heading>
          <Input type="text" id="username" name="username" placeholder="Username" required />
          <Input type="text" id="password" name="password" placeholder="Password" required />

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
