import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import Header from '../components/Header';
import Background from '../components/Background';
import Landing from '../components/Landing';
import Headertwo from '../components/HeaderAfterSignin';
import Listings from '../components/Listings';

// import Seller from './SellerPage';
// import SellerProfile from '../components/SellerProfile';


function LandingPage() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const handleSearch = (tags) => {
    setSelectedTags(tags);
  }
  const checkLoggedIn = async () => {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('token');

      if(!token){
       return;
        
      }
      else{

       
      
      const response = await fetch('http://localhost:8001/api/username', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      if (response.ok){
        const data = await response.json();
        if (data.username){
          setIsLoggedIn(true);
        }
        else {
          setIsLoggedIn(false);
        }
       
      }

      else {
        // alert(token);
        // alert(response);
       // alert ("Error fetching data");
      setIsLoggedIn(false);
        if (token){
          localStorage.removeItem('token');
        }


     // alert(data.username)
      }

    }

    } catch (error) {
      console.error('Error checking login status:', error);
      alert("An error occurred while checking login status");
    }
  };
  
  
  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <div className="homepage">
      {isLoggedIn ? <Headertwo /> : <Header />}
      <Background>
        <Landing onSearch={handleSearch}/>
        <Listings tags={selectedTags}/>
      </Background>
    </div>
  );


}


export default LandingPage;


