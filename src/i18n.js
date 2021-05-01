import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// TODO: move them in a JSON file and import them
const resources = {
  en: {
    translation: {
      "map.userLocationMarker.label": "You are here",
      "restaurantList.headline": "Restaurants in this area",
      "restaurantList.selectLabelMin": "Rating from",
      "restaurantList.selectLabelMax": "to",
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
