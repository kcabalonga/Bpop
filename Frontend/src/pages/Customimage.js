import React, { useState, useEffect } from "react";
// import Listings from "./Listings";;

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

<div id="ListingHeader">
  {imageData && (
    <>
      <h1>{imageData.title}</h1>
    </>
  )}
</div>








      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div id="user-container">
        {userData && (
          <div>
           <a href={`/seller?title=${encodeURIComponent(userData.username)}`}>
              
              {userData.username}
            </a>
            <p>Posted on: {userData.date}</p>
          </div>
        )}
      </div>

      <div id="image-container">
        {imageData && (
          <>
            <img src={imageData.photo.data} alt={imageData.title} />
            <div>
              <h2>{imageData.title}</h2>
              <p>Description: {imageData.description}</p>
              <p>Price: ${imageData.price}</p>
              <p>User: {imageData.user}</p>
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
        <button type="submit">Buy Now</button>
      </form>
    </div>
  );
}

export default Customimage;

//<a href={`userprofile.html?title=${encodeURIComponent(userData.username)}`}>