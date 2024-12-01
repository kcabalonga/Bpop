import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Background from "../components/Background";
import FormContainer, { Input, SubmitButton, Heading } from "../components/FormContainer";

function Profile() {
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [name, setName] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Fetch profile data on component load
  useEffect(() => {
    async function fetchProfile() {
      try {
        const nameResponse = await fetch("/api/username");
        if (nameResponse.ok) {
          const nameData = await nameResponse.json();
          setName(nameData.name);
        } else {
          alert("User not logged in. Redirecting to login...");
          window.location.href = "/Login.html";
        }

        const bioResponse = await fetch("/returnBio");
        if (bioResponse.ok) {
          const bioData = await bioResponse.json();
          setBio(bioData.bio);
        }

        const photoResponse = await fetch("/check-photo");
        if (photoResponse.ok) {
          const photoData = await photoResponse.json();
          setProfilePic(photoData.photo);
        }
      } catch (error) {
        console.error("Error loading profile data:", error);
      }
    }

    fetchProfile();
  }, []);

  // Handle bio edit
  const handleBioEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/editBio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bio }),
      });

      if (response.ok) {
        alert("Bio updated successfully!");
      } else {
        alert("Failed to update bio.");
      }
    } catch (error) {
      console.error("Error updating bio:", error);
    }
  };

  // Handle tag selection
  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

  const addTag = (tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const removeTag = (tag) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  return (
    <div>
      <Header />
      <Background>
        <FormContainer>
          <Heading>{name ? `${name}'s Profile` : "Profile"}</Heading>
          <div>
            <img
              src={profilePic}
              alt="Profile"
              style={{ maxWidth: "200px", maxHeight: "200px" }}
            />
          </div>
          <form
            id="bioForm"
            onSubmit={handleBioEdit}
            style={{ marginTop: "20px" }}
          >
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Add your bio here"
              required
              rows="4"
              style={{ width: "100%" }}
            ></textarea>
            <SubmitButton type="submit">Update Bio</SubmitButton>
          </form>
          <div>
            <Heading>Add Tags</Heading>
            <Input
              type="text"
              id="selectedTags"
              value={selectedTags.join(", ")}
              readOnly
              placeholder="Selected tags"
              onClick={toggleDropdown}
              style={{ cursor: "pointer" }}
            />
            {dropdownVisible && (
              <ul
                id="tagsDropdown"
                style={{
                  border: "1px solid #ccc",
                  listStyle: "none",
                  padding: "5px",
                  marginTop: "10px",
                }}
              >
                {[
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
                ].map((tag) => (
                  <li
                    key={tag}
                    style={{ cursor: "pointer", padding: "5px 0" }}
                    onClick={() => addTag(tag)}
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
            <div id="selectedTagsDisplay" style={{ marginTop: "10px" }}>
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    margin: "0 5px",
                    padding: "5px",
                    backgroundColor: "#ddd",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => removeTag(tag)}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </FormContainer>
      </Background>
    </div>
  );
}

export default Profile;
