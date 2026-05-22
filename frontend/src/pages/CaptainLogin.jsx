import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CaptainDataContext } from "../context/CapatinContext";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import Navbar from "../components/Navbar";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = { email: email, password: password };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/login`,
        captainData,
      );

      if (response.status === 200) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem("token", data.token);
        navigate("/captain-home");
      }
    } catch (error) {
      console.error("Login error:", error);
    }

    setEmail("");
    setPassword("");
  };
  return (
    <div className="min-h-screen text-white flex flex-col justify-between bg-[radial-gradient(circle_at_top_left,#0f172a,#020617)] overflow-hidden relative p-6 box-border">
      <Navbar />
      <div className="relative z-10 w-full max-w-[380px]">
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
          className="flex flex-col items-center justify-center bg-slate-900/70 p-4 py-6 rounded-xl backdrop-blur-sm border border-white/20 shadow-[0_0_40px_rgba(0,0,0,0.6)]"
        >
          <h2 className="text-center text-white  text-2xl font-semibold">
            Welcome Back
          </h2>
          <p className="text-sm mb-10  text-lime-500/70">
            Login to earn from rides
          </p>
          <label
            htmlFor="email"
            className="self-start text-lg text-gray-200 p-2 "
          >
            E-mail
          </label>
          <div className="flex flex-row gap-2 w-full border border-white/10  px-4 py-3 rounded-xl bg-slate-800 backdrop-blur shadow-[0_0_40px_rgba(0,0,0,0.6)] mb-2">
            <i className="text-xl text-lime-500/70 font-medium ri-mail-open-line"></i>
            <input
              className="outline-none placeholder:text-base w-full "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              required
              placeholder="abc@example.com"
            />
          </div>
          {/* password */}
          <label
            htmlFor="password"
            className="self-start text-lg text-gray-200 p-2 "
          >
            Password
          </label>
          <div className="flex flex-row gap-2 w-full border border-white/10  px-4 py-3 rounded-xl bg-slate-800 backdrop-blur shadow-[0_0_40px_rgba(0,0,0,0.6)]">
            <i className="text-xl text-lime-500/70 font-medium ri-lock-2-line"></i>
            <input
              className="outline-none placeholder:text-base "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              required
              placeholder="••••••••"
            />
          </div>
          <button className="self-start text-sm text-lime-500/70 pl-2 mt-2">
            Forgot Password ?
          </button>

          <button
            type="submit"
            className="w-full bg-lime-500 text-black font-semibold backdrop-blur py-3 px-4 rounded-xl mt-8 "
          >
            Login
          </button>

          <button className="w-full bg-slate-700 text-white/80 font-semibold py-2 px-4 rounded-xl mt-4 flex items-center justify-center gap-3 ">
            <FcGoogle className="h-8 w-8" /> <span>Continue with Google</span>
          </button>
        </form>
      </div>

      <p className="text-center mt-4 text-slate-400 text-sm mb-4 ">
        Don't have an account?{" "}
        <Link to="/captain-signup" className="text-lime-500 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default CaptainLogin;
