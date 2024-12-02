import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import Header from '../components/Header';
import Background from '../components/Background';
import Landing from '../components/Landing';
import Listings from '../components/Listings';


function LandingPage() {


  return (
    <div className="homepage">
    <Header />
    <Background>
      <Landing />
    </Background>
    <Listings />
    </div>
  );
}

export default LandingPage;
