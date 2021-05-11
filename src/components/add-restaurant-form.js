import React from "react";
import "./add-restaurant-form.css";
import { useTranslation } from "react-i18next";

function AddRestaurantForm({
  handleSubmit,
  handleInputChange,
  inputs,
  showOnlyReviewSection,
  restaurant,
}) {
  const { t } = useTranslation();

  return (
    <>
      <form
        onSubmit={(event) => handleSubmit(event, restaurant && restaurant.id)}
      >
        <div className="add-form">
          {!showOnlyReviewSection && (
            <>
              <label htmlFor="name">{t("addRestaurantForm.nameLabel")}</label>
              <input
                name="name"
                id="name"
                value={inputs && inputs.name}
                onChange={(e) => handleInputChange(e)}
              />
              <label htmlFor="address">
                {t("addRestaurantForm.addressLabel")}
              </label>
              <input
                name="address"
                id="address"
                value={inputs && inputs.address}
                onChange={(e) => handleInputChange(e)}
              />
            </>
          )}
          <select
            name="stars"
            value={inputs && inputs.stars}
            onChange={(e) => handleInputChange(e)}
            defaultValue=""
          >
            <option disabled value="">
              {t("addRestaurantForm.selectDefault")}{" "}
            </option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <textarea
            name="comment"
            value={inputs && inputs.comment}
            placeholder={t("addRestaurantForm.textDefault")}
            onChange={(e) => handleInputChange(e)}
          />
          <input type="submit" value={t("addRestaurantForm.submit")} />
        </div>
      </form>
    </>
  );
}

export default AddRestaurantForm;
