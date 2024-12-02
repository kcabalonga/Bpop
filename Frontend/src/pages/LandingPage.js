import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import Header from '../components/Header';
import Background from '../components/Background';
import Landing from '../components/Landing';
import Headertwo from '../components/HeaderAfterSignin';

function LandingPage() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoggedIn = async () => {
    
    try {

      const response = await fetch('/api/username');

      if (response.ok) {
        setIsLoggedIn(true);
       
      } 
      else {
        setIsLoggedIn(false);
      }


    } catch (error) {
      console.error("Error checking username", error);
      alert("An error occurred. Please try again.");
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
    </div>
  );


}


export default LandingPage;





//   checkLoggedIn();


// if (isLoggedIn === false){
//   return (
//     <div className="homepage">
//     <Header />
//     <Background>
//       <Landing />
//     </Background>
//     </div>
//   );
// }

// else {

//   return (
//     <div className="homepage">
//     <Headertwo />
//     <Background>
//       <Landing />
//     </Background>
//     </div>
//   );

// }
// }