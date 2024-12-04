import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import Header from "../components/Header";
import Background from "../components/Background";

const Container = styled.div`
  width: 80rem;
  height: 100%;
  max-height: 100vh;
  background: #D7E9F7;
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  overflow-y: auto;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  width: 100%;
  margin-bottom: 2rem;
`;

const ProfilePicture = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 2px solid #fff;
  object-fit: cover;
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
`;

const Subtitle = styled.h3`
  font-size: 1.7rem;
  font-weight: bold;
  color: #555;
`;

const Content = styled.p`
  font-size: 1rem;
  color: #666;
`;

const ListingsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;

const ListingCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  width: 250px;
  text-align: center;
  background-color: #fff;
`;

const ListingImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
`;

const Seller = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [userListings, setUserListings] = useState([]);

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

        const responseTwo = await fetch(
          `http://localhost:8001/getUser-listings?user=${encodeURIComponent(username)}`
        );
        if (!responseTwo.ok) {
          throw new Error("Failed to fetch listings");
        }

        const data2 = await responseTwo.json();
        setUserListings(data2);
      } catch (error) {
        console.error("Error fetching user attributes or listings:", error);
        setError("Error loading user data");
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return <Container>{error}</Container>;
  }

  return (
    <>
    <Header />
    <Background>
        <Container>
        {userData && (
            <ProfileSection>
            <ProfilePicture
                src={
                userData.photo?.data || "https://via.placeholder.com/200"
                }
                alt={`${userData.name}'s profile`}
            />
            <ProfileDetails>
                <Title>{`${userData.name}'s Personal Page`}</Title>
                <Subtitle>@{userData.username}</Subtitle>
                <Content>{userData.bio || "No bio available"}</Content>
            </ProfileDetails>
            </ProfileSection>
        )}

        <ListingsContainer>
            {userListings.map((listing) => (
            <ListingCard key={listing.id}>
            {listing.photo && (
              <Link to={`/customimage?title=${encodeURIComponent(listing.title)}`}>
              <ListingImage src={listing.photo} alt={listing.title} />
              </Link>
            )}
                <h2 className="listing-title">{listing.title}</h2>
                <p className="listing-price">${listing.price}</p>
                <p className="listing-description">{listing.description}</p>
            </ListingCard>
            ))}
        </ListingsContainer>
        </Container>
    </Background>
        </>

  );
};

export default Seller;

