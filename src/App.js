import React from "react";
import RestaurantList from "./components/restaurant-list";
import Map from "./components/map";
import { data } from "./data/restaurants";

function App() {
  return (
    <>
      <RestaurantList data={data} />
      <Map data={data} />
    </>
  );
}

export default App;
