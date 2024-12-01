import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import Header from '../components/Header';
import Background from '../components/Background';
import Landing from '../components/Landing';

function LandingPage() {


  return (
    <div className="homepage">
    <Header />
    <Background>
      <Landing />
    </Background>
    </div>
  );
}

export default LandingPage;
