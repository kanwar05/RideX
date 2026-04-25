import React from "react";

const CaptainDetails = () => {
  return (
    <div>
      <div className="flex items-center p-6 justify-between">
        <div className="flex items-center space-x-3">
          <img
            className="h-15 w-15 rounded-full"
            src="https://imgs.search.brave.com/vdRYk5Fef873iKhep6GE8FrjCAJQafa8F189pqmsNjo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vRUFGeHM0/Y0pNekkvMi8wLzE2/MDB3L2NhbnZhLXB1/cnBsZS1ibGFjay1h/bmQtd2hpdGUtY29v/bC1jcmVhdGl2ZS1s/aW5rZWRpbi1wcm9m/aWxlLXBpY3R1cmUt/U283clZpQ1daYnMu/anBn"
          />
          <h1 className="text-xl font-semibold">John Doe</h1>
        </div>
        <div>
          <h1 className="text-xl font-bold">₹295.20</h1>
          <p className="text-sm text-gray-500">Earned</p>
        </div>
      </div>

      <div className="flex justify-evenly w-full bg-gray-100 rounded-xl p-6 ">
        <div className="flex flex-col items-center ">
          <i className="text-3xl mb-1 font-medium ri-timer-2-line"></i>
          <h2 className="text-lg font-semibold">10.2</h2>
          <p className="text-sm font-normal">Hours Online</p>
        </div>
        <div className="flex flex-col items-center ">
          <i className="text-3xl mb-1 font-medium ri-dashboard-2-line"></i>
          <h2 className="text-lg font-semibold">10.2</h2>
          <p className="text-sm font-normal">Hours Online</p>
        </div>
        <div className="flex flex-col items-center ">
          <i className="text-3xl mb-1 font-medium ri-booklet-line"></i>
          <h2 className="text-lg font-semibold">10.2</h2>
          <p className="text-sm font-normal">Hours Online</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
