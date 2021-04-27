import React from "react";
import RestaurantItem from "./restaurant-item";
import { useTranslation } from "react-i18next";
import { getAverageRating } from "../utils/helper-functions";

import { Select } from "antd";
const { Option } = Select;

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
          <Select value={minRating} onChange={handleMinRating}>
            <Option value="0">0</Option>
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
            <Option value="4">4</Option>
            <Option value="5">5</Option>
          </Select>
        </label>

        <div>
          <label>
            {t("restaurantList.selectLabelMax")}
            <Select value={maxRating} onChange={handleMaxRating}>
              <Option value="0">0</Option>
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
              <Option value="5">5</Option>
            </Select>
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
