// import React, { useState, useEffect } from "react";
// import Header from "../components/Header";
// import Background from "../components/Background";
// import FormContainer, { Input, SubmitButton, Heading, ProfilePic, BioInput, BioForm } from "../components/FormContainer";
// import { Tag, TagsContainer } from "../components/Landing";

// function Profile() {
//   const [bio, setBio] = useState("");
//   const [profilePic, setProfilePic] = useState("");
//   const [userName, setUserName] = useState("");
//   const [name, setName] = useState("");
//   const [selectedTags, setSelectedTags] = useState([]);
//   const [dropdownVisible, setDropdownVisible] = useState(false);

//   const getUserAttributes = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         alert("Not Logged In");
//         window.location.href = "/Signin";
//       } else {
//         const response = await fetch("http://localhost:8001/api/username", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`, // Include the token in the Authorization header
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           if (data.username) {
//             const userResponse = await fetch(
//               `http://localhost:8001/fetch-user-attributes?title=${encodeURIComponent(data.username)}`
//             );

//             if (userResponse.ok) {
//               const userdata = await userResponse.json();
//               setName(userdata.name);
//               setUserName(userdata.username);
//               setBio(userdata.bio || "No bio available");
              
//               if (userdata.photo?.data && userdata.photo?.contentType) {
//                 setProfilePic(`data:${userdata.photo.contentType};base64,${userdata.photo.data}`);
//               } else {
//                 setProfilePic(""); // Set to an empty string or a default image URL
//               }
//             }
//           }
//         } else {
//           alert("Token not valid");
//         }
//       }
//     } catch (error) {
//       console.error("Error checking login status:", error);
//       alert("An error occurred while checking login status");
//     }
//   };

//   useEffect(() => {
//     getUserAttributes();
//   }, []); // Run once when the component mounts

//   // Update the DOM when state changes
//   useEffect(() => {
//     const nameElement = document.getElementById("name");
//     const bioHeaderElement = document.getElementById("BioHeader");
//     const bioParaElement = document.getElementById("BioPara");
//     const mainHeaderElement = document.getElementById("mainHeaderMain");
//     const profilePicElement = document.getElementById("profilepicphoto");

   

//     if (nameElement) nameElement.textContent = name;
//     if (bioHeaderElement) bioHeaderElement.textContent = `${name}'s Bio`;
//     if (mainHeaderElement) mainHeaderElement.textContent = `${name}'s Personal Page`;
//     if (bioParaElement) bioParaElement.textContent = `${bio}`;
//     if (profilePicElement) profilePicElement.textContent = `${profilePic}`;
  



//   }, [name, bio, profilePic]); // Depend on `name` and `bio`





//   const editBio = async () => {
//     const newBio = prompt("Edit your bio:", bio);

//     if (newBio === null || newBio.trim() === "") {
//       alert("Bio cannot be empty");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:8001/editBio", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username: userName, bio: newBio }),
//       });

//       if (response.ok) {
//         alert("Bio updated successfully!");
//         setBio(newBio); 
//       } else {
//         const errorText = await response.text();
//         alert(`Failed to update bio: ${errorText}`);
//       }
//     } catch (error) {
//       console.error("Error updating bio:", error);
//       alert("An error occurred while updating the bio.");
//     }
//   };




//   const handleUploadPhoto = async (event) => {
//     event.preventDefault(); // Prevent default form submission
    
//     const formData = new FormData(event.target); // Gather form data (file input)
    
//     // Append the username to the FormData
//     formData.append("userName", userName);
   
//     try {
//       const response = await fetch("http://localhost:8001/upload-photo", {
//         method: "POST",
//         body: formData, // Send the form data with username
//       });
  
//       if (response.ok) {


//         const data = await response.json();
//         console.log("Photo uploaded successfully:", data);
        
        



        
//         window.location.reload(); // Optionally reload the page
//       } else {
//         const errorData = await response.text();
//         console.error("Photo upload failed:", errorData);
//         alert(`Failed to upload photo: ${errorData}`);
//        }
//     } catch (error) {
//       console.error("Error during photo upload:", error);
//       alert("An error occurred while uploading the photo.");
//     }
//   };
  
  









//   return (
// <>
//   <h1 id= "mainHeaderMain">Personal Profile Page!</h1>
//   <p id="name" />
//   <div id="uploadpho">
//     {/* <form
//       id="uploadForm"
//       action="/upload-photo"
//       method="post"
//       encType="multipart/form-data"
//       onsubmit="checkProfilePic()"
//     >
//       <label htmlFor="photo">Upload Profile Picture:</label>
//       <input type="file" name="photo" accept="image/*" required="" />
//       <button type="submit">Upload</button>
//     </form> */}


//   <form
//   id="uploadForm"
//   encType="multipart/form-data"
//   onSubmit={handleUploadPhoto} // Call your function
// >
//   <label htmlFor="photo">Upload Profile Picture:</label>
//   <input type="file" name="photo" accept="image/*" required />
//   <button type="submit">Upload</button>
// </form>




//   </div>
//   <div id="profilepicphoto"> <img id ="ProfilePicImg"></img> </div>
  
//   <div id="bioDiv">
//       <h3 id="BioHeader">{userName}'s Bio</h3>
//       <p id="BioPara">{bio}</p>
//       <button onClick={editBio}>Edit Bio</button>
//     </div>




//   <div id="addListingDiv">
//     <h3>Add a New Listing</h3>
//     <form
//       id="addListingForm"
//       action="/add-listing"
//       method="post"
//       encType="multipart/form-data"
//     >
//       <label htmlFor="title">Title:</label>
//       <br />
//       <input type="text" id="title" name="title" required="" />
//       <br />
//       <br />
//       <label htmlFor="description">Description:</label>
//       <br />
//       <textarea
//         id="description"
//         name="description"
//         rows={4}
//         cols={50}
//         required=""
//         defaultValue={""}
//       />
//       <br />
//       <br />
//       <label htmlFor="price">Price:</label>
//       <br />
//       <input type="text" id="price" name="price" required="" />
//       <br />
//       <br />
//       <label htmlFor="photo">Upload Listing Photo:</label>
//       <br />
//       <input type="file" name="photo" accept="image/*" required="" />
//       <br />
//       <br />
//       {/*Tags Section*/}
//       <label htmlFor="tags">Tags (click selected tag to remove):</label>
//       <br />
//       <div id="tagsContainer">
//         <input
//           type="text"
//           id="selectedTags"
//           name="tags"
//           readOnly=""
//           placeholder="Select tags"
//           onclick="toggleDropdown()"
//           style={{ cursor: "pointer" }}
//         />
//         <ul
//           id="tagsDropdown"
//           style={{
//             display: "none",
//             border: "1px solid #ccc",
//             listStyle: "none",
//             padding: 5
//           }}
//         >
//           <li onclick="addTag('accessory')">accessory</li>
//           <li onclick="addTag('athletic')">athletic</li>
//           <li onclick="addTag('graphic')">graphic</li>
//           <li onclick="addTag('hat')">hat</li>
//           <li onclick="addTag('jacket')">jacket</li>
//           <li onclick="addTag('long-sleeve')">long-sleve</li>
//           <li onclick="addTag('shirt')">shirt</li>
//           <li onclick="addTag('short-sleeve')">short-sleeve</li>
//           <li onclick="addTag('shorts')">shorts</li>
//           <li onclick="addTag('socks')">socks</li>
//           <li onclick="addTag('vintage')">vintage</li>
//           <li onclick="addTag('modern')">modern</li>
//           <li onclick="addTag('object')">objects</li>
//         </ul>
//       </div>
//       <div id="selectedTagsDisplay" style={{ marginTop: 10 }} />
//       <br />
//       <button type="submit">Add Listing</button>
//     </form>
//   </div>
// </>

//   );
// }

// export default Profile;


import React, { useState, useEffect } from "react";

function Profile() {
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");

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
            `http://localhost:8001/fetch-user-attributes?title=${encodeURIComponent(data.username)}`
          );

          if (userResponse.ok) {
            const userdata = await userResponse.json();
            setName(userdata.name || "User");
            setUserName(userdata.username || "Username");
            setBio(userdata.bio || "No bio available");

            if (userdata.photo?.data && userdata.photo?.contentType) {
              setProfilePic(`data:${userdata.photo.contentType};base64,${userdata.photo.data}`);
            } else {
              setProfilePic(" "); // Placeholder image
            }
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

  const editBio = async () => {
    const newBio = prompt("Edit your bio:", bio);

    if (newBio === null || newBio.trim() === "") {
      alert("Bio cannot be empty");
      return;
    }

    try {
      const response = await fetch("http://localhost:8001/editBio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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

  const handleUploadPhoto = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    formData.append("userName", userName);

    try {
      const response = await fetch("http://localhost:8001/upload-photo", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Photo uploaded successfully!");
        getUserAttributes(); // Refresh user data to update profile picture
      } else {
        const errorText = await response.text();
        alert(`Failed to upload photo: ${errorText}`);
      }
    } catch (error) {
      console.error("Error during photo upload:", error);
      alert("An error occurred while uploading the photo.");
    }
  };

  useEffect(() => {
    getUserAttributes();
  }, []);





  return (
<>
  <h1 id= "mainHeaderMain">{name}'s Profile Page!</h1>
  <p id="name" />
  <div id="uploadpho">



  <form
  id="uploadForm"
  encType="multipart/form-data"
  onSubmit={handleUploadPhoto} // Call your function
>
  <label htmlFor="photo">Upload Profile Picture:</label>
  <input type="file" name="photo" accept="image/*" required />
  <button type="submit">Upload</button>
</form>




  </div>
  <div id="profilepicphoto"> <img id ="ProfilePicImg"></img> </div>
  
  <div id="bioDiv">
      <h3 id="BioHeader">{name}'s Bio</h3>
      <p id="BioPara">{bio}</p>
      <button onClick={editBio}>Edit Bio</button>
    </div>




  <div id="addListingDiv">
    <h3>Add a New Listing</h3>
    <form
      id="addListingForm"
      action="/add-listing"
      method="post"
      encType="multipart/form-data"
    >
      <label htmlFor="title">Title:</label>
      <br />
      <input type="text" id="title" name="title" required="" />
      <br />
      <br />
      <label htmlFor="description">Description:</label>
      <br />
      <textarea
        id="description"
        name="description"
        rows={4}
        cols={50}
        required=""
        defaultValue={""}
      />
      <br />
      <br />
      <label htmlFor="price">Price:</label>
      <br />
      <input type="text" id="price" name="price" required="" />
      <br />
      <br />
      <label htmlFor="photo">Upload Listing Photo:</label>
      <br />
      <input type="file" name="photo" accept="image/*" required="" />
      <br />
      <br />
      {/*Tags Section*/}
      <label htmlFor="tags">Tags (click selected tag to remove):</label>
      <br />
      <div id="tagsContainer">
        <input
          type="text"
          id="selectedTags"
          name="tags"
          readOnly=""
          placeholder="Select tags"
          onclick="toggleDropdown()"
          style={{ cursor: "pointer" }}
        />
        <ul
          id="tagsDropdown"
          style={{
            display: "none",
            border: "1px solid #ccc",
            listStyle: "none",
            padding: 5
          }}
        >
          <li onclick="addTag('accessory')">accessory</li>
          <li onclick="addTag('athletic')">athletic</li>
          <li onclick="addTag('graphic')">graphic</li>
          <li onclick="addTag('hat')">hat</li>
          <li onclick="addTag('jacket')">jacket</li>
          <li onclick="addTag('long-sleeve')">long-sleve</li>
          <li onclick="addTag('shirt')">shirt</li>
          <li onclick="addTag('short-sleeve')">short-sleeve</li>
          <li onclick="addTag('shorts')">shorts</li>
          <li onclick="addTag('socks')">socks</li>
          <li onclick="addTag('vintage')">vintage</li>
          <li onclick="addTag('modern')">modern</li>
          <li onclick="addTag('object')">objects</li>
        </ul>
      </div>
      <div id="selectedTagsDisplay" style={{ marginTop: 10 }} />
      <br />
      <button type="submit">Add Listing</button>
    </form>
  </div>
</>

  );
}

export default Profile;
