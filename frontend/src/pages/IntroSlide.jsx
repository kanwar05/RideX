import React, { useState } from "react";
import slide1 from "../assets/rideximg/slide1.jpeg";

const IntroSlide = () => {
  const [index, setIndex] = useState(0);

  const slide = [
    {
      title: "Welcome to RideX",
      titleh: "",
      des1: "Book rides anytime, anywhere,  ",
      des2: "Safe, reliable and affordable",
    },
    {
      title: "Quick & Easy",
      titleh: "Booking",
      des1: "Book ride in just a few taps  ",
      des2: "and get moving in no time",
    },
    {
      title: "Safety is Our",
      titleh: "Priority",
      des1: "Verified drivers, live tracking  ",
      des2: "and SOS support for your safety",
    },
    {
      title: "Transparent",
      titleh: "Pricing",
      des1: "Know your fare before you ride  ",
      des2: "No Hidden charges",
    },
    {
      title: "Ride Your Way",
      titleh: "",
      des1: "Chose from a range ride",
      des2: "options that suit your needs",
    },
  ];

  const next = () => {
    if (index < slide.length - 1) setIndex(index + 1);
  };

  return (
    <div className="relative h-screen w-screen flex flex-col items-center justify-center md:flex-row p-6">
      <div className="relative w-screen h-screen  flex flex-col md:flex-row md:gap-3  ">
        <div className="flex flex-col h-1/5  items-center justify-end md:justify-center  md:h-full md:w-1/2  ">
          <h1 className="text-5xl md:text-7xl font-bold">
            Ride <span className=" text-lime-400">X</span>{" "}
          </h1>
          <p className="mt-3 text-lg md:text-2xl text-gray-400">
            Your Ride, Your Way
          </p>
          <div className="hidden md:block text-center p-4 ">
            <h1 className="text-4xl font-medium mt-4">{slide[index].title}</h1>
            <h1 className="text-3xl text-lime-400 font-medium mb-4">
              {slide[index].titleh}
            </h1>
            <p className="text-xl font-normal text-gray-600 mt-2">
              {slide[index].des1}
            </p>
            <p className="text-xl font-normal text-gray-600">
              {slide[index].des2}
            </p>
            <button className="w-100 h-10 bg-black text-white px-8 rounded-xl mt-8 ">
              {index === slide.length - 1 ? "GetStarted" : "Next"}
            </button>
          </div>
        </div>
        <div className=" flex flex-col items-center justify-center h-2/5  md:h-full md:w-1/2 md:right-0 p-4   ">
          <img
            className="h-full h-full border-2 border-lime-600 rounded-xl w-screen md:h-3/4 md:w-full "
            src={slide1}
          />
        </div>
        <div className="absolute bottom-0 md:hidden w-full h-2/5 flex flex-col items-center justify-center  ">
          <h1 className="text-3xl font-bold  ">{slide[index].title}</h1>
          <h1 className="text-3xl text-lime-400 font-bold mb-2">
            {slide[index].titleh}
          </h1>
          <p className="text-lg font-normal text-gray-600 ">
            {slide[index].des1}
          </p>
          <p className="text-lg font-normal text-gray-600">
            {slide[index].des2}
          </p>
          <button className="w-70 h-10 bg-black text-white px-8 rounded-xl mt-8 ">
            {index === slide.length - 1 ? "GetStarted" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntroSlide;
