import React from "react";

function RestaurantList({ data }) {
  return (
    <ul>
      {data.map((restaurant, index) => (
        <li key={index}>
          <h2>{restaurant.restaurantName}</h2>
        </li>
      ))}
    </ul>
  );
}

export default RestaurantList;
