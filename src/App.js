import React, { useState } from "react";
import RestaurantList from "./components/restaurant-list";
import Map from "./components/map";
import data from "./data/restaurants";
import { getAverageRating } from "./utils/helper-functions";
import "./App.css";

function App() {
  const [currentBounds, setCurrentBounds] = useState(null); // map bounds state
  const [minRating, setMinRating] = useState(1);
  const [maxRating, setMaxRating] = useState(5);

  // handlers for rating form filter
  const handleMinRating = (value) => {
    setMinRating(value);
  };

  const handleMaxRating = (value) => {
    setMaxRating(value);
  };

  const handleBounds = (bounds) => {
    setCurrentBounds(bounds);
  };

  let filteredData = data.filter((restaurant) => {
    const averageRating = getAverageRating(restaurant.ratings);
    return averageRating >= minRating && averageRating <= maxRating;
  });

  return (
    <>
      <div className="flex-container">
        <div className="restaurant-section">
          <RestaurantList
            data={filteredData}
            minRating={minRating}
            maxRating={maxRating}
            handleMaxRating={handleMaxRating}
            handleMinRating={handleMinRating}
            currentBounds={currentBounds}
            handleBounds={handleBounds}
          />
        </div>
        <div className="map-section">
          <Map data={filteredData} handleBounds={handleBounds} />
        </div>
      </div>
    </>
  );
}

export default App;
