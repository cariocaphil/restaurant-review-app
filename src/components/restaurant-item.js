import React from "react";
import { useTranslation } from "react-i18next";

import { Card, List, Typography, Collapse } from "antd";

const { Panel } = Collapse;

function RestaurantItem({ restaurant, isInCurrentMapRange, averageRating }) {
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
            </Panel>
          </Collapse>
        </Card>
      ) : null}
    </>
  );
}

export default RestaurantItem;
