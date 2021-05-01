import React from "react";

function RestaurantItem({
  selected,
  restaurant,
  handleClose,
  index,
  handleDetailsView,
  isInCurrentMapRange,
  averageRating,
}) {
  return (
    <>
      {isInCurrentMapRange ? (
        <li key={index}>
          <h2 onClick={() => handleDetailsView(index)}>
            {restaurant.restaurantName}
          </h2>
          <h3>average rating: {averageRating}</h3>
          {selected ? (
            <>
              <button onClick={() => handleClose()}>Close</button>
              <ul>
                {restaurant.ratings.map((item) => {
                  return (
                    <li>
                      {item.stars}, {item.comment}
                    </li>
                  );
                })}
              </ul>
            </>
          ) : null}
        </li>
      ) : null}
    </>
  );
}

export default RestaurantItem;
