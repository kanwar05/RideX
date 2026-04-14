import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CapatinContext";

const CaptainProtectWrap = ({ children }) => {
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);

  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
    }
  }, [token, navigate]);

  return <>{children}</>;
};

export default CaptainProtectWrap;
