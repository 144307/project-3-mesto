// @ts-nocheck

// npm run build; npm run dev

import FormValidator from "./components/validate.js";
import Section from "./components/section.js";

// import { PopupWithForm } from "./components/popup.js";
import PopupWithForm from "./components/PopupWithForm.js";

import API from "./components/api.js";
import Card from "./components/card.js";
import UserInfo from "./components/userinfo.js";

import "./pages/index.css";

let owner;

const profilePopup = document.querySelector(".overlay_type_profile");
const newCardPopup = document.querySelector(".overlay_type_card-add");
// const imagePopup = document.querySelector(".overlay_type_picture");
const avatarEditPopup = document.querySelector(".overlay_type_avatar-edit");

const profileAvatar = document.querySelector(".profile__avatar");
const profileName = document.querySelector(".profile__intro-title");
const profileInfo = document.querySelector(".profile__intro-subtitle");
const elements = document.querySelector(".elements");

const inputName = document.querySelector("#overlay__form-input_line-one");
const inputJob = document.querySelector("#overlay__form-input_line-two");

const APIconfig = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-6",
  headers: {
    authorization: "230ea98f-ed00-4030-a408-2ee71d4ed161",
    "Content-Type": "application/json",
  },
};

const UserInfoConfig = {
  nameSelector: profileName,
  aboutSelector: profileInfo,
};

const MyAPI = new API(APIconfig);
const MyProfilePopupWithForm = new PopupWithForm(profilePopup);
MyProfilePopupWithForm.setEventListeners();
const MyNewCardPopupWithForm = new PopupWithForm(newCardPopup);
MyNewCardPopupWithForm.setEventListeners();
const MyAvatarPopupWithForm = new PopupWithForm(avatarEditPopup);
MyAvatarPopupWithForm.setEventListeners();
const MyUserInfo = new UserInfo(UserInfoConfig);

var testElements = [];
const MySection = new Section(
  {
    items: testElements,
    rerender: (element) => {
      const cardObject = new Card(element);
      return cardObject.createCard();
    },
  },
  ".elements"
);
MySection.renderAll();

MyAPI.getInitialCards()
  .then((response) => {
    owner = response[1]._id;

    for (let i = 0; i < response[0].length; i++) {
      let owned = false;
      if (owner === response[0][i].owner._id) {
        owned = true;
      }
      const cardSettings = {
        name: response[0][i].name,
        link: response[0][i].link,
        likes: response[0][i].likes,
        owned: owned,
        cardId: response[0][i]._id,
        ownerId: owner,
      };
      MySection.addItem(MySection.rerender(cardSettings));

      // const cardObject = new Card(cardSettings);
      // cardObject.createCard();
      testElements.push(cardSettings);
      // elements.prepend(cardObject.card);
    }

    // const MySection = new Section(
    //   {
    //     items: testElements,
    //     rerender: (element) => {
    //       const cardObject = new Card(element);
    //       return cardObject.createCard();
    //     },
    //   },
    //   ".elements"
    // );
    // MySection.renderAll();

    profileName.textContent = response[1].name;
    profileInfo.textContent = response[1].about;
    profileAvatar.setAttribute("src", response[1].avatar);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

const inputCardName = document.querySelector(
  "#overlay__form-new-card-name-input"
);
const inputCardImageUrl = document.querySelector(
  "#overlay__form-new-card-url-input"
);
const inputProfileImage = document.querySelector(
  "#overlay__form-new-profile-image-input"
);

const editProfileForm = document.querySelector("#edit_form");
const addForm = document.querySelector("#add_form");
const avatarEditForm = document.querySelector("#avatar_edit_form");

function openProfilePopup(profilePopup) {
  inputName.value = profileName.textContent;
  inputJob.value = profileInfo.textContent;
}

function submitTitleChanges(event) {
  event.preventDefault();
  MyProfilePopupWithForm.toggleLoadingButton("Сохранение...");
  MyUserInfo.setUserInfo({
    name: inputName.value,
    about: inputJob.value,
  });
  MyProfilePopupWithForm.close();
  MyProfilePopupWithForm.toggleLoadingButton("Сохранить");
}

function submitCardCreation(event) {
  event.preventDefault();
  MyNewCardPopupWithForm.toggleLoadingButton("Создание...");
  MyAPI.addCard(inputCardName.value, inputCardImageUrl.value)
    .then((response) => {
      console.log("response =", response);
      const newCardId = response._id;

      const cardSettings = {
        name: inputCardName.value,
        link: inputCardImageUrl.value,
        likes: 0,
        owned: true,
        cardId: newCardId,
      };
      MySection.addItem(MySection.rerender(cardSettings));

      // const cardObject = new Card(cardSettings);
      // cardObject.createCard();
      // elements.prepend(cardObject.card);

      MyNewCardPopupWithForm.close();
    })
    .catch((error) => {
      console.error("Error:", error);
    })
    .finally(() => {
      MyNewCardPopupWithForm.toggleLoadingButton("Сохранить");
    });
}

function submitUpdateAvatar(event) {
  event.preventDefault();
  const submitButton = event.submitter;
  MyAvatarPopupWithForm.toggleLoadingButton("Сохранение...");
  MyAPI.updateAvatar(inputProfileImage.value)
    .then((response) => {
      MyAvatarPopupWithForm.close();
      MyAvatarPopupWithForm.toggleLoadingButton("Сохранить");
      profileAvatar.setAttribute("src", inputProfileImage.value);
    })
    .catch((error) => {
      console.error("Error:", error);
    })
    .finally(() => {
      MyAvatarPopupWithForm.toggleLoadingButton("Сохранить");
    });
}

editProfileForm.addEventListener("submit", submitTitleChanges, true);
addForm.addEventListener("submit", submitCardCreation, true);
avatarEditForm.addEventListener("submit", submitUpdateAvatar, true);

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const editAvatarButton = document.querySelector(".profile__avatar-overlay");

editButton.addEventListener("click", function () {
  MyProfilePopupWithForm.open();
  openProfilePopup(profilePopup);
});
addButton.addEventListener("click", function () {
  MyNewCardPopupWithForm.open();
});
editAvatarButton.addEventListener("click", function () {
  MyAvatarPopupWithForm.open();
});

const FormValidatorSettings = {
  formSelector: ".overlay__form",
  inputSelector: ".overlay__form-input",
  submitsubmitButton: ".overlay__form-button",
  inputSubtitleErrorClass: ".overlay__form-error",
  inputErrorClass: "overlay__form-input_error",
};

const editForm = document.querySelector("#edit_form");
const editFormInput = editForm.querySelector(".overlay__form-input");
const newCardForm = document.querySelector("#newCardForm");
const newCardFormInput = document.querySelector(".overlay__form-input");

const editValidate = new FormValidator(FormValidatorSettings, editFormInput);
editValidate.enableValidation();
const addValidate = new FormValidator(FormValidatorSettings, newCardForm);
addValidate.enableValidation();
const avatarValidate = new FormValidator(
  FormValidatorSettings,
  newCardFormInput
);
avatarValidate.enableValidation();

// const MyFormValidator = new FormValidator(FormValidatorSettings);
// MyFormValidator.enableValidation();

// enableValidation(
//   ".overlay__form",
//   ".overlay__form-input",
//   ".overlay__form-button",
//   ".overlay__form-error",
//   "overlay__form-input_error"
// );

// changeProfile("Marie Skłodowska Curie", "Physicist and Chemist").then(
// changeProfile("ffffsdfsdf sdf sdf", "Physicist and Chemist").then((result) => {
//   console.log("changeProfile =", result);
// });
// addCard().then((result) => {
//   console.log("addCard =", result);
// });
