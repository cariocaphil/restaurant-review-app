import React, { useState } from "react";
import RestaurantList from "./components/restaurant-list";
import Map from "./components/map";
import { data } from "./data/restaurants";
import { getAverageRating } from "./utils/helper-functions";

function App() {
  const [currentBounds, setCurrentBounds] = useState(null); // map bounds state
  const [minRating, setMinRating] = useState(1);
  const [maxRating, setMaxRating] = useState(5);
  const [selected, setSelected] = useState(null);

  // handlers for rating form filter
  const handleMinRating = (e) => {
    const value = e.target.value;
    setMinRating(value);
  };

  const handleMaxRating = (e) => {
    const value = e.target.value;
    setMaxRating(value);
  };

  // handlers for restaurant list
  const handleDetailsView = (index) => {
    setSelected(index);
  };

  const handleClose = () => {
    setSelected(null);
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
      <RestaurantList
        data={filteredData}
        minRating={minRating}
        maxRating={maxRating}
        handleMaxRating={handleMaxRating}
        handleMinRating={handleMinRating}
        currentBounds={currentBounds}
        handleBounds={handleBounds}
        selected={selected}
        handleDetailsView={handleDetailsView}
        handleClose={handleClose}
      />
      <Map data={filteredData} handleBounds={handleBounds} />
    </>
  );
}

export default App;
