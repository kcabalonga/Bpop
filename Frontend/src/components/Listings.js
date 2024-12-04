import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 

function Listings({ tags }) {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);

  const styles = {
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '20px',
      marginTop: '30px',
    },
    listing: {
      backgroundColor: '#fff',
      border: '1px solid #ddd',
      borderRadius: '8px',
      width: '300px',
      padding: '16px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s',
    },
    listingHover: {
      transform: 'scale(1.02)',
    },
    image: {
      width: '100%',
      height: 'auto',
      borderRadius: '4px',
    },
    title: {
      fontSize: '1.5em',
      margin: '10px 0',
      color: '#333',
    },
    price: {
      color: '#28a745',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    description: {
      color: '#555',
    },
  };

  useEffect(() => {
    const fetchListings = async() => {
      try {
        const tagsQuery = tags.length > 0 ? `?tags=${tags.join(',')}` : '';
        const response = await fetch(`http://localhost:8001/get-listings${tagsQuery}`);

        if (!response.ok) {
          throw new Error('Failed to fetch listings');
        }
        const data = await response.json();
        setListings(data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchListings();
  }, [tags]);

  if (error) {
    return <p>Failed to load listings: {error}</p>;
  }

  if (listings.length === 0) {
    return <p>No listings available.</p>;
  }

  return (
    <div style={styles.container}>
      {listings.map((listing) => (
        <div key={listing.id} style={styles.listing}>

            {listing.photo && (

          <Link
          to={
            localStorage.getItem('token')
              ? `/customimage?title=${encodeURIComponent(listing.title)}`
              : "/Signin"
          }
        >
          <img src={listing.photo} alt={listing.title} style={styles.image} />
        </Link>


            )}


          <h2 style={styles.title}>{listing.title}</h2>
          <p style={styles.price}>${listing.price}</p>
          <p style={styles.description}>{listing.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Listings;