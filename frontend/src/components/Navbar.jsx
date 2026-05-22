import React from 'react'

const Navbar = () => {
  return (
    <div className=''>
      <div
        onClick={() => navigate("/intro-slide")}
        className="flex flex-row w-full items-center justify-between cursor-pointer  "
      >
        <div className=" flex  flex-col  ">
          <h1 className="text-4xl  font-bold">
            Ride<span className=" text-lime-500">X</span>{" "}
          </h1>
        </div>
        <div className="  ">
          <i className="text-2xl font-bold ri-arrow-left-long-line"></i>
        </div>
      </div>
    </div>
  )
}

export default Navbar
