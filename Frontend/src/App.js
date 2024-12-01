import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUp from "./pages/SignUpPage";
import SignIn from './pages/SigninPage';
/*import LandingPage from './pages/LandingPage';
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

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
}

export default App;
