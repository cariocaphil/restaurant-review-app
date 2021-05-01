import React from "react";
import { useTranslation } from "react-i18next";

import { Button, Card, List, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";

function RestaurantItem({
  selected,
  restaurant,
  handleClose,
  index,
  handleDetailsView,
  isInCurrentMapRange,
  averageRating,
}) {
  const { t } = useTranslation();

  return (
    <>
      {isInCurrentMapRange ? (
        <Card key={restaurant.id} onClick={() => handleDetailsView(index)}>
          {selected ? (
            <Button
              type="secondary"
              icon={<CloseOutlined />}
              onClick={() => handleClose()}
              style={{ float: "right" }}
            />
          ) : null}
          <h2>{restaurant.restaurantName}</h2>
          <h3>{restaurant.address}</h3>
          <h3>
            {t("restaurantItem.ratingLabel")}: {averageRating}
          </h3>
          {selected ? (
            <>
              <List
                dataSource={restaurant.ratings}
                renderItem={(item) => (
                  <List.Item key={item.id}>
                    {item.stars}{" "}
                    <Typography.Text mark>{item.comment}</Typography.Text>
                  </List.Item>
                )}
              />
            </>
          ) : null}
        </Card>
      ) : null}
    </>
  );
}

export default RestaurantItem;
