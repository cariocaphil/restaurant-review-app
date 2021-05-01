import React from "react";
import RestaurantItem from "./restaurant-item";
import { useTranslation } from "react-i18next";
import { getAverageRating } from "../utils/helper-functions";
import { Select, Form, Input } from "antd";
const { Option } = Select;

import "./restaurant-list.css";

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
      <Form layout="inline" style={{ margin: 10 }}>
        <Input.Group compact>
          <Form.Item label={t("restaurantList.selectLabelMin")}>
            <Select
              style={{ width: 55 }}
              value={minRating}
              onChange={(value) => handleMinRating(value)}
            >
              <Option value="0">0</Option>
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
              <Option value="5">5</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label={t("restaurantList.selectLabelMax")}
            style={{ marginLeft: "10px" }}
          >
            <Select
              style={{ width: 55 }}
              value={maxRating}
              onChange={(value) => handleMaxRating(value)}
            >
              <Option value="0">0</Option>
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
              <Option value="5">5</Option>
            </Select>
          </Form.Item>
        </Input.Group>
      </Form>
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
