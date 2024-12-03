import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import Header from '../components/Header';
import Background from '../components/Background';
import Landing from '../components/Landing';
import Headertwo from '../components/HeaderAfterSignin';
import Listings from '../components/Listings';


function LandingPage() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoggedIn = async () => {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('token');

      if(!token){
       alert("No Token");
        
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
        alert ("Error fetching data");
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
        <Landing />
      </Background>
    <Listings />
    </div>
  );


}


export default LandingPage;



      // // Make the fetch call with the Authorization header
      // const response = await fetch('http://localhost:8001/api/username', {
      //   method: 'GET',
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
  
      // const data = await response.json(); // Parse the response as JSON
  
      // if (data.isLoggedIn) {
      //   alert("User is logged in: " + data.name); // Replace with your logic
      // } else {
      //   alert("User is not logged in: " + data.error); // Replace with your logic
      // }