import React from "react";

const LocationSearchPanel = (props) => {
  const locations = props.suggestions || [];

  return (
    <div>
      {locations.length > 0 ? (
        locations.map((location, index) => (
          <div
            onClick={() => {
              props.onSuggestionSelect(location);
              
            }}
            className="flex flex-row border-2 border-gray-100 p-3 rounded-xl active:border-black items-center justify-start gap-4 my-4"
            key={index}
          >
            <h2 className="h-10 w-14 bg-[#eee] flex items-center justify-center rounded-xl ">
              <i className="ri-map-pin-fill "></i>
            </h2>
            <h4 className="text-lg font-medium ">{location}</h4>
          </div>
        ))
      ) : (
        <p className="text-gray-500 p-3">Start typing to see suggestions</p>
      )}
    </div>
  );
};

export default LocationSearchPanel;
