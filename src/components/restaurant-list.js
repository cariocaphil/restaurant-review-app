import React from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "antd";
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
  handleSubmit,
  handleInputChange,
  inputs,
  toggleData,
}) {
  const { t } = useTranslation();

  return (
    <>
      <div className="gutter">
        <h2 style={{ marginTop: 10 }}>{t("restaurantList.headline")}</h2>
        <label style={{ display: "block" }} htmlFor="GooglePlacesSwitch">
          Show GooglePlaces Data
        </label>
        <Switch defaultChecked onChange={toggleData} id="GooglePlacesSwitch">
          Toggle
        </Switch>
      </div>
      <RatingFilter
        minRating={minRating}
        maxRating={maxRating}
        handleMinRating={handleMinRating}
        handleMaxRating={handleMaxRating}
      />
      <ul>
        {data &&
          data.map((restaurant) => (
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
              handleInputChange={handleInputChange}
              inputs={inputs}
              handleSubmit={handleSubmit}
            />
          ))}
      </ul>
    </>
  );
}

export default RestaurantList;
