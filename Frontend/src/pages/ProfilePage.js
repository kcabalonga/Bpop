import React, { useState, useEffect, useRef } from "react";
import Background from "../components/Background";
import HeaderAfterSignin from "../components/HeaderAfterSignin";
import styled from "styled-components";
import { SubmitButton } from "../components/FormContainer";

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
  z-index: 3;
  margin-top: 1rem;
`;

const ProfilePicture = styled.img`
  position: absolute;
  top: 80px;
  left: 220px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 2px solid #fff;
  object-fit: cover;
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

const Button = styled.button`
    display: flex;
    width: 10rem;
    height: 29px;
    padding: 17px 20px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-radius: 10px;
    background: #72B6ED;
    color: #fff;
    font-family: "Inter";
    text-align: center;
    font-size: 16px;
    cursor: pointer
`;

function Profile() {
  // State for user attributes
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [showUploadForm, setShowUploadForm] = useState(true);
  const [previewImage, setPreviewImage] = useState("");

  // State for listing data
  const [listingData, setListingData] = useState({
    title: "",
    description: "",
    price: "",
    tags: [],
    photo: null,
  });

  // Reference to the profile photo input
  const profilePhotoRef = useRef(null);
  // Reference to the listing photo input
  const listingPhotoRef = useRef(null);

  // Predefined list of available tags
  const availableTags = [
    "accessory",
    "athletic",
    "graphic",
    "hat",
    "jacket",
    "long-sleeve",
    "shirt",
    "short-sleeve",
    "shorts",
    "socks",
    "vintage",
    "modern",
    "object",
  ];

  // Fetch user attributes using JWT
  const getUserAttributes = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Not Logged In");
        window.location.href = "/Signin";
        return;
      }

      const response = await fetch("http://localhost:8001/api/username", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.username) {
          const userResponse = await fetch(
            `http://localhost:8001/fetch-user-attributes?title=${encodeURIComponent(
              data.username
            )}`
          );

          if (userResponse.ok) {
            const userdata = await userResponse.json();
            console.log("User data:", userdata); // Debugging log
            setName(userdata.name || "User");
            setUserName(userdata.username || "Username");
            setBio(userdata.bio || "No bio available");

            if (userdata.photo && userdata.photo.data) {
              setProfilePic(userdata.photo.data); // Use the complete Data URL directly
            } else {
              setProfilePic(""); // Placeholder image or empty string
            }
          } else {
            const errorText = await userResponse.text();
            alert(`Failed to fetch user attributes: ${errorText}`);
          }
        }
      } else {
        alert("Token not valid");
      }
    } catch (error) {
      console.error("Error fetching user attributes:", error);
      alert("An error occurred while fetching user attributes");
    }
  };

  // Edit Bio Handler
  const editBio = async () => {
    const newBio = prompt("Edit your bio:", bio);

    if (newBio === null || newBio.trim() === "") {
      alert("Bio cannot be empty");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8001/editBio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username: userName, bio: newBio }),
      });

      if (response.ok) {
        setBio(newBio);
      } else {
        const errorText = await response.text();
        alert(`Failed to update bio: ${errorText}`);
      }
    } catch (error) {
      console.error("Error updating bio:", error);
      alert("An error occurred while updating the bio.");
    }
  };

  // Edit Profile Picture Handler
  const editPic = async (event) => {
    event.preventDefault();

    const file = profilePhotoRef.current.files[0];

    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("photo", file);
    formData.append("username", userName);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8001/upload-photo", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Photo uploaded successfully!");
       //setShowUploadForm(false); // Hide the upload form
        setPreviewImage(""); // Clear the preview
        await getUserAttributes(); // Wait for the updated attributes
      } else {
        const errorText = await response.text();
        alert(`Failed to upload photo: ${errorText}`);
      }
    } catch (error) {
      console.error("Error during photo upload:", error);
      alert("An error occurred while uploading the photo.");
    }
  };

  // Handle Add Listing Form Input Changes
  const handleListingChange = (e) => {
    
    const { name, value } = e.target;

    if (name === "price" && (!Number.isInteger(Number(value)) || Number(value) < 0)) 
      return; // Ignore invalid inputs

    setListingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle Tags Selection
  const handleAddTag = (tag) => {
    if (!listingData.tags.includes(tag)) {
      setListingData((prevData) => ({
        ...prevData,
        tags: [...prevData.tags, tag],
      }));
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setListingData((prevData) => ({
      ...prevData,
      tags: prevData.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  // Handle Listing Photo Change
  const handleListingPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setListingData((prevData) => ({
        ...prevData,
        photo: file,
      }));
    }
  };

  // Handle Add Listing Form Submission
  const uploadListing = async (e) => {
    e.preventDefault();

    const { title, description, price, tags, photo } = listingData;

    if (!title || !description || !price || !photo) {
      alert("Please fill in all required fields and upload a photo.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("tags", tags.join(","));
    formData.append("photo", photo);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8001/add-listing", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Listing added successfully!");
        // Reset the form
        setListingData({
          title: "",
          description: "",
          price: "",
          tags: [],
          photo: null,
        });
      } else {
        const errorText = await response.text();
        alert(`Failed to add listing: ${errorText}`);
      }
    } catch (error) {
      console.error("Error adding listing:", error);
      alert("An error occurred while adding the listing.");
    }
  };

  // Edit Bio Handler
  const logoutUser = async () => {

    try {

      const token = localStorage.getItem("token");

      if (token){
        localStorage.removeItem('token');
        const token = localStorage.getItem("token");
            if (token){
              alert("Error Logging Out")
            }
            else {
              alert ("Logged Out!");
              window.location.href = "/signin";
            }

      }

      else {
        alert("Error Logging Out");
      }


    } catch (error) {
      console.error("Error ", error);
      alert("An error occurred while Logging Out.");
    }
  };




  // Fetch user attributes on component mount
  useEffect(() => {
    getUserAttributes();
  }, []);

  return (
    <>
    <HeaderAfterSignin />
    <Background>
    <Container>
      <Title>{name}'s Personal Profile Page</Title>

      {/* Profile Picture Upload Section */}
      <div id="uploadpho">
        {showUploadForm ? (
          <form id="uploadForm" encType="multipart/form-data" onSubmit={editPic}>
            <Subtitle htmlFor="photo">Upload Profile Picture:</Subtitle>
            <input
              type="file"
              name="photo"
              accept="image/*"
              required
              ref={profilePhotoRef}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setPreviewImage(URL.createObjectURL(file));
                } else {
                  setPreviewImage("");
                }
              }}
            />
            <Button type="submit">Upload</Button>
          </form>
        ) : null}
      </div>

      {/* Preview of Profile Picture */}
      {previewImage && (
        <div>
          <h3>Preview:</h3>
          <ProfilePicture
            src={previewImage}
            alt="Preview"
            style={{ width: "200px", height: "200px" }}
          />
        </div>
      )}

      {/* Display Current Profile Picture */}
      {profilePic && (
        <div id="profilepicphoto">
          <ProfilePicture
            id="ProfilePicImg"
            src={profilePic}
          />
        </div>
      )}

      {/* Bio Section */}
      <div id="bioDiv">
        <Subtitle id="BioHeader">{userName}'s Bio</Subtitle>
        <p id="BioPara">{bio}</p>
        <Button onClick={editBio}>Edit Bio</Button>
      </div>

      {/* Add Listing Section */}
      <div id="addListingDiv">
        <Subtitle>Add a New Listing</Subtitle>
        <form id="addListingForm" onSubmit={uploadListing}>
          {/* Title Input */}
          <label htmlFor="title">Title:</label>
          <br />
          <input
            type="text"
            id="title"
            name="title"
            value={listingData.title}
            onChange={handleListingChange}
            required
          />
          <br />
          <br />

          {/* Description Input */}
          <label htmlFor="description">Description:</label>
          <br />
          <textarea
            id="description"
            name="description"
            rows={4}
            cols={50}
            required
            value={listingData.description}
            onChange={handleListingChange}
          />
          <br />
          <br />

          {/* Price Input */}
          <label htmlFor="price">Price:</label>
          <br />
          <input
            type="number"
            id="price"
            name="price"
            value={listingData.price}
            onChange={handleListingChange}
            required
            step="1" // Enforces integer values
            min="0"  // Optional: Prevents negative prices
          />
          <br />
          <br />

          {/* Listing Photo Upload */}
          <label htmlFor="photo">Upload Listing Photo:</label>
          <br />
          <input
            type="file"
            name="photo"
            accept="image/*"
            required
            ref={listingPhotoRef}
            onChange={handleListingPhotoChange}
          />
          <br />
          <br />

          {/* Tags Section */}
          <label htmlFor="tags">Tags:</label>
          <br />
          <div id="tagsContainer">
            {availableTags.map((tag) => (
              <button
                type="button"
                key={tag}
                onClick={() => {
                  if (listingData.tags.includes(tag)) {
                    handleRemoveTag(tag);
                  } else {
                    handleAddTag(tag);
                  }
                }}
                style={{
                  margin: "5px",
                  padding: "5px 10px",
                  backgroundColor: listingData.tags.includes(tag) ? "#007BFF" : "#e0e0e0",
                  color: listingData.tags.includes(tag) ? "#fff" : "#000",
                  border: "none",
                  borderRadius: "15px",
                  cursor: "pointer",
                }}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Display Selected Tags */}
          <div id="selectedTagsDisplay" style={{ marginTop: 10 }}>
            {listingData.tags.map((tag, index) => (
              <span
                key={index}
                style={{
                  display: "inline-block",
                  backgroundColor: "#e0e0e0",
                  padding: "5px 10px",
                  borderRadius: "15px",
                  margin: "5px",
                  cursor: "pointer",
                }}
                onClick={() => handleRemoveTag(tag)}
                title="Click to remove"
              >
                {tag} &times;
              </span>
            ))}
          </div>
          <br />

          {/* Submit Button */}
          <Button type="submit">Add Listing</Button>
        </form>
      </div>

      <SubmitButton onClick={logoutUser}>Log Out</SubmitButton>
      </Container>
      </Background>
    </>
  );
}

export default Profile;