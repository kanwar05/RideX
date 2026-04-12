import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

const Start = () => {
  return (
    <div className="bg-cover bg-center bg-no-repeat bg-[url(https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8xODM0ZTZmZC0zM2UzLTRjOTUtYWQ3YS1mNDg0YThjODEyZDcuanBn)] ">
      <div className="flex flex-col justify-between h-screen">
        <div className="text-4xl text-black mt-5 ml-5 font-medium">Uber</div>
        <div className="bg-white w-full px-4 py-6 flex flex-col ">
          <h1 className="text-2xl font-bold mb-4">Get started with Uber</h1>
          <Link
            to="/user-login"
            className="bg-black w-full text-center text-white text-xl  py-2 px-4 rounded-lg flex items-center justify-center"
          >
            <span>Continue</span>

            <FaArrowRight className="inline-block ml-5 " />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
