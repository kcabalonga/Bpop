import React, { useState, useEffect } from "react";
// import Listings from "./Listings";
import styled from "styled-components";
import { SubmitButton } from "../components/FormContainer";
import HeaderAfterSignin from "../components/Header";
import Background from "../components/Background";


const Container = styled.div`
  width: 80rem;
  height: auto;
  background: #D7E9F7;
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  margin: 0 auto;
`;

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  margin-top: 2rem;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-right: 2rem;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Subtitle = styled.a`
  color: #007BFF;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;

  &:hover {
    text-decoration: underline;
    color: #0056b3;
  }
`;

const Content = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 1rem;
`;

const StyledImage = styled.img`
  width: 400px;
  height: 300px;
  object-fit: contain;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

function Customimage() {
  const [imageData, setImageData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  const getQueryParam = (param) => {
    const params = new URLSearchParams(window.location.search);
    return params.get(param);
  };

  const fetchListings = async () => {
    const title = getQueryParam('title');
    if (!title) {
      setError('Error: No title provided');
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8001/fetch-image-attributes?title=${encodeURIComponent(title)}`
      );
      if (!response.ok) {
        throw new Error('Error fetching listing');
      }
      const data = await response.json();
      setImageData(data);
      fetchUsernameAttributes(data.user, data.date);
    } catch (error) {
      console.error('Error fetching image attributes:', error);
      setError('Error loading image attributes');
    }
  };

  const fetchUsernameAttributes = async (username, date) => {
    if (!username) {
      setError('Error: No user provided');
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8001/fetch-user-attributes?title=${encodeURIComponent(username)}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch user attributes');
      }

      const userdata = await response.json();
      setUserData({ ...userdata, date: editDate(date) });
    } catch (error) {
      console.error('Error fetching user attributes:', error);
      setError('Error loading user attributes');
    }
  };

  const editDate = (date) => {
    return date.slice(0, 10);
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <div>
      <HeaderAfterSignin />
      <Background> 
<Container>
<div id="ListingHeader">
  {imageData && (
    <>
      <Title>{imageData.title}</Title>
    </>
  )}
</div>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div id="user-container">
        {userData && (
          <div>
           <Subtitle href={`/seller?title=${encodeURIComponent(userData.username)}`}>
              
              @{userData.username}
            </Subtitle>
            <Content>Posted on: {userData.date}</Content>
          </div>
        )}
      </div>

      <div id="image-container">
        {imageData && (
          <>
            <StyledImage src={imageData.photo.data} alt={imageData.title} />
            <div>
              <Content>Description: {imageData.description}</Content>
              <Content>Price: ${imageData.price}</Content>
              <Content>User: {imageData.user}</Content>
            </div>
          </>
        )}
      </div>

      <form
        id="paypal-form"
        action="https://www.sandbox.paypal.com/cgi-bin/webscr"
        method="post"
        target="_top"
      >
        <input type="hidden" name="cmd" value="_xclick" />
        <input
          type="hidden"
          name="business"
          value="sb-2x1wq34432659@business.example.com"
        />
        <input type="hidden" name="item_name" value="Custom Image" />
        <input
          type="hidden"
          id="paypal-amount"
          name="amount"
          value={imageData?.price || ''}
        />
        <input type="hidden" name="currency_code" value="USD" />
        <SubmitButton type="submit">Buy Now</SubmitButton>
      </form>
      </Container>
      </Background>
    </div>
  );
}

export default Customimage;

//<a href={`userprofile.html?title=${encodeURIComponent(userData.username)}`}>