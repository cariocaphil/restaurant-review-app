import React from "react";
import { useTranslation } from "react-i18next";
import RatingFilter from "./rating-filter";
import RestaurantItem from "./restaurant-item";
import { getAverageRating } from "../utils/helper-functions";

import "./restaurant-list.css";

function RestaurantList({
  data,
  minRating,
  maxRating,
  handleMaxRating,
  handleMinRating,
  currentBounds,
}) {
  const { t } = useTranslation();

  return (
    <>
      <h2 style={{ marginLeft: 24, marginTop: 10 }}>
        {t("restaurantList.headline")}
      </h2>
      <RatingFilter
        minRating={minRating}
        maxRating={maxRating}
        handleMinRating={handleMinRating}
        handleMaxRating={handleMaxRating}
      />
      <ul>
        {data.map((restaurant) => (
          <RestaurantItem
            key={restaurant.id}
            restaurant={restaurant}
            currentBounds={currentBounds}
            isInCurrentMapRange={
              currentBounds &&
              currentBounds.contains({
                lat: restaurant.lat,
                lng: restaurant.long,
              })
            }
            averageRating={getAverageRating(restaurant.ratings)}
          />
        ))}
      </ul>
    </>
  );
}

export default RestaurantList;
