import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// TODO: move them in a JSON file and import them
const resources = {
  en: {
    translation: {
      "map.userLocationMarker.label": "You are here",
      "map.warning": "Please check your geolocation settings.",
      "restaurantList.headline": "Restaurants in this area",
      "restaurantList.selectLabelMin": "From",
      "restaurantList.selectLabelMax": "to",
      "restaurantItem.ratingLabel": "average rating",
      "addRestaurantForm.nameLabel": "Retaurant name: ",
      "addRestaurantForm.addressLabel": "Address: ",
      "addRestaurantForm.selectDefault": "Choose a rating",
      "addRestaurantForm.textDefault": "Please write your feedback",
      "addRestaurantForm.submit": "Submit your review",
      "errorMessage.lengthName":
        "Name input should not be longer than 20 characters",
      "errorMessage.lengthAddress":
        "Address input should not be longer than 30 characters",
      "errorMessage.lengthComment":
        "Comment input should not be longer than 50 characters",
    },
  },
  fr: {
    translation: {
      "map.userLocationMarker.label": "Vous êtes ici",
      "restaurantList.headline": "Restaurants dans ce coin",
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",

    keySeparator: true, // we use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
