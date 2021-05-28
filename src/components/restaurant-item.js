import React from "react";
import { useTranslation } from "react-i18next";

import { Card, List, Typography, Collapse } from "antd";
import AddRestaurantForm from "./add-restaurant-form";

const { Panel } = Collapse;

function RestaurantItem({
  restaurant,
  isInCurrentMapRange,
  averageRating,
  handleInputChange,
  handleSubmit,
  errors,
  buttonEnabled,
}) {
  const { t } = useTranslation();

  return (
    <>
      {isInCurrentMapRange ? (
        <Card key={restaurant.id}>
          <h2>{restaurant.restaurantName}</h2>
          <h3>{restaurant.address}</h3>
          <br />
          <Collapse accordion>
            <Panel
              header={`${t("restaurantItem.ratingLabel")}: ${averageRating}`}
              key={restaurant.id}
            >
              <List
                dataSource={restaurant.ratings}
                renderItem={(item) => (
                  <List.Item key={item.id}>
                    {item.stars}{" "}
                    <Typography.Text mark>{item.comment}</Typography.Text>
                  </List.Item>
                )}
              />
              <AddRestaurantForm
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                showOnlyReviewSection
                restaurant={restaurant}
                errors={errors}
                buttonEnabled={buttonEnabled}
              />
            </Panel>
          </Collapse>
        </Card>
      ) : null}
    </>
  );
}

export default RestaurantItem;
