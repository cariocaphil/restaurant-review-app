import React from "react";
import RestaurantItem from "./restaurant-item";
import { useTranslation } from "react-i18next";
import { getAverageRating } from "../utils/helper-functions";

function RestaurantList({
  data,
  minRating,
  maxRating,
  handleMaxRating,
  handleMinRating,
  currentBounds,
  isOpen,
  selected,
  handleDetailsView,
  handleClose,
}) {
  const { t } = useTranslation();

  return (
    <>
      <form>
        <label>
          {t("restaurantList.selectLabelMin")}
          <select value={minRating} onChange={handleMinRating}>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>

        <div>
          <label>
            {t("restaurantList.selectLabelMax")}
            <select value={maxRating} onChange={handleMaxRating}>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </label>
        </div>
      </form>
      <h2>{t("restaurantList.headline")}</h2>
      <ul>
        {data.map((restaurant, index) => (
          <RestaurantItem
            selected={selected === index}
            restaurant={restaurant}
            isOpen={isOpen}
            index={index}
            handleDetailsView={() => handleDetailsView(index)}
            handleClose={() => handleClose()}
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
