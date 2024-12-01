import React from 'react';
import { Routes, Route } from 'react-router-dom';
/*import LandingPage from './pages/LandingPage';
import SigninPage from './pages/SigninPage';
import ResetPassword from './pages/ResetPassword';
import CreateUser from './pages/CreateUser';

function App() {
  return (
    <Routes>
      {/* Default Route *//*}
      <Route path="/" element={<LandingPage />} />
      <Route path="/LandingPage" element={<LandingPage />} />
      <Route path="/SigninPage" element={<SigninPage />} />
      <Route path="/ResetPassword" element={<ResetPassword />} />
      <Route path="/CreateUser" element={<CreateUser />} />
    </Routes>
  );
}

export default App;*/

import SignUp from "./pages/SignUpPage";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
