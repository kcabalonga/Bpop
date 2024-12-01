import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUp from "./pages/SignUpPage";
import SignIn from './pages/SigninPage';
import ResetPassword from './pages/ResetPassword';
import LandingPage from './pages/LandingPage';
import ListingsPage from './pages/ListingsPage';
import Profile from './pages/profile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="/listings" element={<ListingsPage />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
