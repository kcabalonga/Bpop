// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom'; 
// import Header from '../components/Header';
// import Background from '../components/Background';

// function Homepage() {
//   const [listings, setListings] = useState([]);
//   const [link, setLink] = useState("");

//   // Function to extract query parameters from URL
//   const getQueryParams = () => {
//     const params = new URLSearchParams(window.location.search);
//     const tags = params.get('tags'); // Get 'tags' parameter from URL
//     return tags ? tags.split(',') : []; // Split tags into an array if present
//   };

//   // Function to fetch listings from the backend
//   const fetchListings = async () => {
//     try {
//       const tags = getQueryParams(); // Retrieve tags from URL
//       const tagsQuery = tags.length > 0 ? `?tags=${tags.join(',')}` : '';

//       const response = await fetch(`http://localhost:8001/get-listings${tagsQuery}`); // Include tags in API request
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const listingsData = await response.json();
//       setListings(listingsData);
      
//     } catch (error) {
//       console.error('Error fetching listings:', error);
//       // Optionally, you can set an error state here
//     }

//   };

//   useEffect(() => {
//     fetchListings();
//   }, []); // Run once when the component mounts

//   // Function to display listings
//   const displayListings = () => {
//     if (listings.length === 0) {
//       return <p>No listings available.</p>;
//     }

//     return listings.map((listing) => (
//       <div className="listing" key={listing.id}>
//         {/* Listing Image */}
//         {listing.photo && (
//           <Link to={`/customimage?title=${encodeURIComponent(listing.title)}`}>
//             <img src={listing.photo} alt={listing.title} />
//           </Link>
//         )}

//         {/* Listing Title */}
//         <h2 className="listing-title">{listing.title}</h2>

//         {/* Listing Price */}
//         <p className="listing-price">${listing.price}</p>

//         {/* Listing Description */}
//         <p className="listing-description">{listing.description}</p>
//       </div>
//     ));
//   };

//   return (
//     <div className="homepage">
//     <Header />
//     <Background>
//       <h1>Available Listings</h1>
//       <div className="listing-container">
//         {displayListings()}
//       </div>
//       </Background>
//     </div>
//   );
// }

// export default Homepage;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import Header from '../components/Header';
import Background from '../components/Background';


function Homepage() {
  const [listings, setListings] = useState([]);
  const [link, setLink] = useState("");
  
  // Function to extract query parameters from URL
  const getQueryParams = () => {
    const params = new URLSearchParams(window.location.search);
    const tags = params.get('tags'); // Get 'tags' parameter from URL
    return tags ? tags.split(',') : []; // Split tags into an array if present
  };

  // Function to fetch listings from the backend
  const fetchListings = async () => {
    try {
      const tags = getQueryParams(); // Retrieve tags from URL
      const tagsQuery = tags.length > 0 ? `?tags=${tags.join(',')}` : '';

      const response = await fetch(`http://localhost:8001/get-listings${tagsQuery}`); // Include tags in API request
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const listingsData = await response.json();
      setListings(listingsData);
      const token = localStorage.getItem('token');




    } catch (error) {
      console.error('Error fetching listings:', error);
      // Optionally, you can set an error state here
    }

  };

  useEffect(() => {
    fetchListings();
  }, []); // Run once when the component mounts



  const displayListings = () => {
    if (listings.length === 0) {
      return <p>No listings available.</p>;
    }

    const token = localStorage.getItem('token'); // Check token once, here
  
    return listings.map((listing) => {
      const link = token
        ? `/customimage?title=${encodeURIComponent(listing.title)}`
        : "/signin";

      return (
        <div className="listing" key={listing.id}>
          {/* Listing Image */}
          {listing.photo && (
            <Link to={link}>
              <img src={listing.photo} alt={listing.title} />
            </Link>
          )}

          {/* Listing Title */}
          <h2 className="listing-title">{listing.title}</h2>

          {/* Listing Price */}
          <p className="listing-price">${listing.price}</p>

          {/* Listing Description */}
          <p className="listing-description">{listing.description}</p>
        </div>
      );
    });
  };


  return (
    <div className="homepage">
    <Header />
    <Background>
      <h1>Available Listings</h1>
      <div className="listing-container">
        {displayListings()}
      </div>
      </Background>
    </div>
  );
}

export default Homepage;
