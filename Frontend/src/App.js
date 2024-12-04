import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUp from "./pages/SignUpPage";
import SignIn from './pages/SigninPage';
import ResetPassword from './pages/ResetPassword';
import LandingPage from './pages/LandingPage';
import ListingsPage from './pages/ListingsPage';
import Profile from './pages/ProfilePage';
import Product from './pages/ProductPage';
import Customimage from './pages/Customimage';
import Seller from './pages/SellerPage';

// import Seller from './pages/SellerPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="/listings" element={<ListingsPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/product" element={<Product />} />
      <Route path="/customimage" element={<Customimage />} />
      <Route path="/seller" element={<Seller />} />

      {/* <Route path="/Seller" element={<Seller />} /> */}
    </Routes>
  );
}

export default App;
