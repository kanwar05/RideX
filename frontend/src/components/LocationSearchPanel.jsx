import React from "react";

const LocationSearchPanel = (props) => {
  const locations = [
    "1504, Govind Vihar 2, Dera Bassi, Punjab, 140507",
    "Meriotorious senior secondary school, Mohali, Punjab, 140507",
    "Rose Garden, Chandigarh, Punjab, 160019",
    "Sector 17, Chandigarh, Punjab, 160017",
    "Elante Mall, Chandigarh, Punjab, 160002",
  ];
  return (
    <div>
      {/* this is sample data  */}
      {locations.map((location, index) => (
        <div
          onClick={() => {
            props.setVehiclePanelOpen(true);
            props.setPanelOpen(false);
          }}
          className="flex flex-row border-2 border-gray-100 p-3 rounded-xl active:border-black items-center justify-start gap-4 my-4"
          key={index}
        >
          <h2 className="h-10 w-14 bg-[#eee] flex items-center justify-center rounded-xl ">
            <i className="ri-map-pin-fill "></i>
          </h2>
          <h4 className="text-lg font-medium ">{location}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
