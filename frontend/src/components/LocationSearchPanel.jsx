import React from "react";

const LocationSearchPanel = (props) => {
  const locations = props.suggestions || [];

  return (
    <div className="space-y-2">
      {locations.length > 0 ? (
        locations.map((location, index) => (
          <div
            onClick={() => {
              props.onSuggestionSelect(location);
            }}
            className="flex items-center gap-3 p-4 bg-dark-800 hover:bg-dark-700 border border-dark-700 rounded-lg cursor-pointer transition-smooth active:scale-95"
            key={index}
          >
            <i className="ri-map-pin-fill text-lg text-primary flex-shrink-0"></i>
            <div className="flex-1 min-w-0">
              <p className="text-text-primary font-medium truncate">
                {location}
              </p>
            </div>
            <i className="ri-arrow-right-s-line text-lg text-text-muted flex-shrink-0"></i>
          </div>
        ))
      ) : (
        <div className="p-8 text-center">
          <i className="ri-search-line text-4xl text-text-muted/50 block mb-3"></i>
          <p className="text-text-muted text-sm">
            Start typing to see location suggestions
          </p>
        </div>
      )}
    </div>
  );
};

export default LocationSearchPanel;
