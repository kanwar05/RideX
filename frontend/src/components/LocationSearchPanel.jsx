import React from "react";
import { PremiumCard } from "./PremiumComponents";

const LocationSearchPanel = (props) => {
  const locations = props.suggestions || [];

  return (
    <div className="space-y-2">
      {locations.length > 0 ? (
        locations.map((location, index) => (
          <div onClick={() => props.onSuggestionSelect(location)}>
            <PremiumCard
              key={index}
              className="cursor-pointer p-3 hover:bg-slate-800"
              role="button"
              tabIndex={0}
            >
              <div className="flex items-center gap-3">
                <i className="ri-map-pin-fill text-lg text-indigo-300 flex-shrink-0"></i>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">
                    {location}
                  </p>
                </div>
                <i className="ri-arrow-right-s-line text-lg text-slate-500 flex-shrink-0"></i>
              </div>
            </PremiumCard>
          </div>
        ))
      ) : (
        <div className="p-8 text-center">
          <i className="ri-search-line text-4xl text-slate-600 block mb-3"></i>
          <p className="text-slate-400 text-sm">
            Start typing to see location suggestions
          </p>
        </div>
      )}
    </div>
  );
};

export default LocationSearchPanel;
