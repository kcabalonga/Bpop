import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import HeaderAfterSignin from "../components/Header";
import Background from '../components/Background';
import { ErrorContainer } from '../components/Error';
import Header from '../components/Header';

function CustomImage() {
    // State variables
    const [imageData, setImageData] = useState(null);
    const [userData, setUserData] = useState(null);
    const [price, setPrice] = useState('');
    const [error, setError] = useState('');
    const location = useLocation();
  
    // Extract query parameters
    const getQueryParam = (param) => {
      const params = new URLSearchParams(location.search);
      return params.get(param);
    };
  
    // Format date
    const editDate = (date) => {
      return date.slice(0, 10);
    };
  
    // Fetch image attributes
    useEffect(() => {
      const fetchImageAttributes = async () => {
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
            throw new Error('Failed to fetch image attributes');
          }
          const data = await response.json();
  
          setImageData(data);
          setPrice(data.price);
          fetchUsernameAttributes(data.user, data.date);
        } catch (error) {
          console.error('Error fetching image attributes:', error);
          setError('Error loading image attributes');
        }
      };
  
      const fetchUsernameAttributes = async (username, date) => {
        if (!username) {
         // console.error('No User provided');
          setError('Error: User not found');
          return;
        }
  
        try {
          const response = await fetch(
            `http://localhost:8001/fetch-user-attributes?username=${encodeURIComponent(username)}`
          );
          if (!response.ok) {
            throw new Error('Failed to fetch user attributes');
          }
  
          const userdata = await response.json();
          userdata.date = editDate(date);
          setUserData(userdata);
        } catch (error) {
          console.error('Error fetching user attributes:', error);
          setError('Error loading user attributes');
        }
      };
  
      fetchImageAttributes();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    // Render component based on state
//    if (error) {
 //     return <p>{error}</p>;
 //   }
  
 //   if (!imageData || !userData) {
 //     return <p>Loading...</p>;
 //   }
  
 return (
    <div>
      <HeaderAfterSignin />
      <Background>
        {error ? (
          // Show error message
          <ErrorContainer>
            <h1>Something went wrong</h1>
            <p>{error}</p>
          </ErrorContainer>
        ) : !imageData || !userData ? (
          // Show loading message
          <p>Loading...</p>
        ) : (
          // Show main content when data is loaded
          <div>
            <h1>Custom Image</h1>
            <div id="user-container">
              <div>
                <Link to={`/userprofile?username=${encodeURIComponent(userData.username)}`}>
                  {userData.username}
                </Link>
                <p>Posted on: {userData.date}</p>
              </div>
            </div>
            <div id="image-container">
              <img
                src={`data:${imageData.photo.contentType};base64,${imageData.photo.data}`}
                alt={imageData.title}
              />
              <div>
                <h2>{imageData.title}</h2>
                <p>Description: {imageData.description}</p>
                <p>Price: ${imageData.price}</p>
              </div>
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
              <input type="hidden" name="item_name" value={imageData.title} />
              <input type="hidden" name="amount" value={price} />
              <input type="hidden" name="currency_code" value="USD" />
              <button type="submit">Buy Now</button>
            </form>
          </div>
        )}
      </Background>
    </div>
  );
}
  
export default CustomImage;
  