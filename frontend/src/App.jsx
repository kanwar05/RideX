import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserSignup from "./pages/UserSignup";
import UserLogin from "./pages/UserLogin";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import Start from "./pages/Start";
import UserProtectWrap from "./pages/UserProtectWrap";
import UserLogout from "./pages/UserLogout";
import CaptainHome from "./pages/CaptainHome";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/user-login" element={<UserLogin />} />
      <Route path="/user-signup" element={<UserSignup />} />
      <Route path="/user-logout" element={<UserLogout />} />
      <Route path="/captain-login" element={<CaptainLogin />} />
      <Route path="/captain-signup" element={<CaptainSignup />} />
      <Route
        path="/home"
        element={
          <UserProtectWrap>
            <Home />
          </UserProtectWrap>
        }
      />
      <Route path="/captain-home" element={<CaptainHome />} />
    </Routes>
    
  );
};

export default App;
