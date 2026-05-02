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
import CaptainProtectWrap from "./pages/CaptainProtectWrap";
import CaptainLogout from "./pages/CaptainLogout";
import Riding from "./pages/Riding";
import CaptainRiding from "./pages/CaptainRiding";
import Splash from "./pages/Splash";
import IntroSlide from "./pages/IntroSlide";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/intro-slide" element={<IntroSlide />} />
      {/* <Route path="/" element={<Start />} /> */}
      <Route path="/user-login" element={<UserLogin />} />
      <Route path="/user-signup" element={<UserSignup />} />
      <Route path="/user-logout" element={<UserLogout />} />
      <Route path="/riding" element={<Riding />} />
      <Route path="/captain-riding" element={<CaptainRiding />} />
      <Route path="/captain-login" element={<CaptainLogin />} />
      <Route path="/captain-signup" element={<CaptainSignup />} />
      <Route path="/captain-logout" element={<CaptainLogout />} />
      <Route
        path="/home"
        element={
          <UserProtectWrap>
            <Home />
          </UserProtectWrap>
        }
      />
      <Route
        path="/captain-home"
        element={
          <CaptainProtectWrap>
            <CaptainHome />
          </CaptainProtectWrap>
        }
      />
    </Routes>
  );
};

export default App;
