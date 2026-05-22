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
            className="flex flex-row h-20 overflow-hidden bg-slate-800 border-1 border-white/10 p-3 rounded-xl active:border-black items-center justify-start gap-4 my-4"
            key={index}
          >
            <h2 className="flex items-center justify-center rounded-xl ">
              <i className="ri-map-pin-fill text-xl text-lime-500/70"></i>
            </h2>
            <h4 className="text-lg py-1 font-medium text-white/70 ">{location}</h4>
          </div>
        ))
      ) : (
        <p className="text-white/50 p-3">Start typing to see suggestions</p>
      )}
    </div>
  );
};

export default LocationSearchPanel;
