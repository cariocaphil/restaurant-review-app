import i18n from "i18next";

export const validate = (inputs) => {
  const errors = { name: "", address: "", stars: "", comment: "" };

  if (inputs.name.length > 20) {
    errors.name = i18n.t("errorMessage.lengthName");
  }
  if (inputs.address.length > 30) {
    errors.address = i18n.t("errorMessage.lengthAddress");
  }
  if (inputs.comment.length > 50) {
    errors.comment = i18n.t("errorMessage.lengthComment");
  }
  return errors;
};
