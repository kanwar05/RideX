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
              className="cursor-pointer p-3"
              role="button"
              tabIndex={0}
            >
              <div className="flex items-center gap-3">
                <i className="ri-map-pin-fill text-lg text-primary flex-shrink-0"></i>
                <div className="flex-1 min-w-0">
                  <p className="text-text-primary font-medium truncate">
                    {location}
                  </p>
                </div>
                <i className="ri-arrow-right-s-line text-lg text-text-muted flex-shrink-0"></i>
              </div>
            </PremiumCard>
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
