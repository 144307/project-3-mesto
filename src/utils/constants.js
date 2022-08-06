export const inputCardName = document.querySelector(
  "#overlay__form-new-card-name-input"
);
export const inputCardImageUrl = document.querySelector(
  "#overlay__form-new-card-url-input"
);
export const inputProfileImage = document.querySelector(
  "#overlay__form-new-profile-image-input"
);

export const editProfileForm = document.querySelector("#edit_form");
export const addForm = document.querySelector("#add_form");
export const avatarEditForm = document.querySelector("#avatar_edit_form");

export const profilePopup = document.querySelector(".overlay_type_profile");
export const newCardPopup = document.querySelector(".overlay_type_card-add");
export const imagePopup = document.querySelector(".overlay_type_picture");
export const avatarEditPopup = document.querySelector(
  ".overlay_type_avatar-edit"
);
export const profileAvatar = document.querySelector(".profile__avatar");
export const profileObject = document.querySelector(".profile__intro-title");
export const profileInfo = document.querySelector(".profile__intro-subtitle");

export const inputName = document.querySelector(
  "#overlay__form-input_line-one"
);
export const inputJob = document.querySelector("#overlay__form-input_line-two");

export const overlayImage = document.querySelector(
  ".overlay__image-popup-photo"
);
export const overlayImageTitle = document.querySelector(
  ".overlay__image-popup-tilte"
);
export const cardTemplateSelectpr = "#card";
export const cardSelector = ".card";
export const cardImageSelector = ".card__image";
export const cardHeartSelectedClass = "card__heart_selected";
export const cardHeartCounterSelector = ".card__heart-counter";
export const cardTitleSelector = ".card__title";
export const cardHeartSelector = ".card__heart";
export const cardDeleteButtonSelector = ".card__delete-button";
export const overlayOpenedClass = "overlay_opened";
export const overlayCloseButtonSelector = ".overlay__close-button";
export const overlayFormButtonSelector = ".overlay__form-button";

export const formSelector = ".overlay__form";
export const fromInputSelector = ".overlay__form-input";
export const formSubmitButtonSelector = ".overlay__form-button";
export const inputSubtitleErrorSelector = ".overlay__form-error";
export const inputErrorClass = "overlay__form-input_error";

export const editButton = document.querySelector(".profile__edit-button");
export const addButton = document.querySelector(".profile__add-button");
export const editAvatarButton = document.querySelector(
  ".profile__avatar-overlay"
);

export const editFormValidatorSettings = {
  formSelector: formSelector,
  inputSelector: fromInputSelector, // fromInputSelector
  formSubmitButtonSelector: formSubmitButtonSelector,
  inputSubtitleErrorClass: inputSubtitleErrorSelector,
  inputErrorClass: inputErrorClass,
  formObject: editProfileForm,
  overlayCloseButtonSelector: overlayCloseButtonSelector,
};
export const addFormValidatorSettings = {
  formSelector: formSelector,
  inputSelector: fromInputSelector,
  formSubmitButtonSelector: formSubmitButtonSelector,
  inputSubtitleErrorClass: inputSubtitleErrorSelector,
  inputErrorClass: inputErrorClass,
  formObject: addForm,
  overlayCloseButtonSelector: overlayCloseButtonSelector,
};
export const avatarFormValidatorSettings = {
  formSelector: formSelector,
  inputSelector: fromInputSelector,
  formSubmitButtonSelector: formSubmitButtonSelector,
  inputSubtitleErrorClass: inputSubtitleErrorSelector,
  inputErrorClass: inputErrorClass,
  formObject: avatarEditForm,
  overlayCloseButtonSelector: overlayCloseButtonSelector,
};
