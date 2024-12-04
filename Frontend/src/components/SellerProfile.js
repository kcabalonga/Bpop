import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Listings from "./Listings";;

const Container = styled.div`
    width: 80rem;
    height: 100%;
    max-height: 100vh;
    background: #D7E9F7;
    border-radius: 32px;
    position: relative;
    flex-direction: column;
    align-items: center;
    display: flex;
    justify-content: flex-start;
    overflow-y: auto;
    padding: 1rem;
`;

const ProfilePicture = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 2px solid #fff;
  position: absolute;
  top: 60px;
  left: 60px;
  object-fit: cover;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  position: absolute;
  font-weight: bold;
  top: 50px;
  left: 350px;
`;

const Subtitle = styled.h2`
  font-size: 1.7rem;
  font-weight: bold;
  position: absolute;
  top: 120px;
  left: 350px;
`;

const Content = styled.div`
    // background: linear-gradient(to bottom, #ff9a9e, #fad0c4);
    font-size: 1rem;
    position: absolute;
    font-weight: bold;
    top: 200px;
    left: 350px;
`;

const Title2 = styled.div`
    font-size: 2rem;
    position: absolute;
    font-weight: bold;
    top: 300px;
    left: 70px;
`;

const SellerProfile = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState("");
  
    const getQueryParam = (param) => {
      const params = new URLSearchParams(window.location.search);
      return params.get(param);
    };
  
    useEffect(() => {
      const fetchUserData = async () => {
        const username = getQueryParam("title");
        if (!username) {
          setError("Error: Not Logged in");
          return;
        }
  
        try {
          const response = await fetch(
            `http://localhost:8001/fetch-user-attributes?title=${encodeURIComponent(
              username
            )}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch user attributes");
          }
          const data = await response.json();
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user attributes:", error);
          setError("Error loading user attributes");
        }
      };
  
      fetchUserData();
    }, []);
  
    if (error) {
      return <Container>{error}</Container>;
    }
  
    return (
      <Container>
        {userData && (
          <>
            <ProfilePicture
              src={
                userData.photo?.data ||
                "https://via.placeholder.com/200"
              }
              alt={`${userData.name}'s profile`}
            />
            <Title>{`${userData.name}'s Personal Page`}</Title>
            <Subtitle>@{userData.username}</Subtitle>
            <Content>{userData.bio || "No bio available"}</Content>
          </>
        )}
        <Listings user={userData?.username} /> {/* Pass the username to filter listings */}
      </Container>
    );
  };

// const SellerProfile = () => {
//     return (
//         <Container>
//             <ProfilePicture />
//             <Title> Celine's Personal Page</Title>
//             <Subtitle> @Celinechu</Subtitle>
//             <Content> This is bio</Content>
//             <Title2> All Listings </Title2>
//         </Container>
//     );
// };

export default SellerProfile;