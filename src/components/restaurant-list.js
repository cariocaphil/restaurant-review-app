import React from "react";
import { useTranslation } from "react-i18next";
import { Select, Form, Input } from "antd";
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
  const { Option } = Select;

  return (
    <>
      <h2 style={{ marginLeft: 24, marginTop: 10 }}>
        {t("restaurantList.headline")}
      </h2>
      <Form
        layout="inline"
        style={{ marginLeft: 24, marginTop: 10, marginBottom: 10 }}
      >
        <Input.Group compact>
          <Form.Item label={t("restaurantList.selectLabelMin")}>
            <Select
              style={{ width: 50 }}
              value={minRating}
              onChange={(value) => handleMinRating(value)}
              size="small"
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
              style={{ width: 50 }}
              value={maxRating}
              onChange={(value) => handleMaxRating(value)}
              size="small"
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
