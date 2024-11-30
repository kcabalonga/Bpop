import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SigninPage from './pages/SigninPage';

function App() {
  return (
    <Routes>
      {/* Default Route */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/LandingPage" element={<LandingPage />} />
      <Route path="/SigninPage" element={<SigninPage />} />
    </Routes>
  );
}

export default App;

