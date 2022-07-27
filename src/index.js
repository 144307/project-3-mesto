// @ts-nocheck

// npm run build; npm run dev

import FormValidator from "./components/FormValidator.js";
import Section from "./components/Section.js";

import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";

import API from "./components/api.js";
import Card from "./components/Card.js";
import UserInfo from "./components/userinfo.js";

import "./pages/index.css";

let owner;

import {
  inputCardName,
  inputCardImageUrl,
  inputProfileImage,
  editProfileForm,
  addForm,
  avatarEditForm,
  profilePopup,
  newCardPopup,
  imagePopup,
  avatarEditPopup,
  profileAvatar,
  profileName,
  profileInfo,
  inputName,
  inputJob,
} from "./utils/constants.js";

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

const FormValidatorSettings = {
  formSelector: ".overlay__form",
  inputSelector: ".overlay__form-input",
  submitsubmitButton: ".overlay__form-button",
  inputSubtitleErrorClass: ".overlay__form-error",
  inputErrorClass: "overlay__form-input_error",
};

const editValidate = new FormValidator(FormValidatorSettings, editProfileForm);
editValidate.enableValidation();
const addValidate = new FormValidator(FormValidatorSettings, addForm);
addValidate.enableValidation();
const avatarValidate = new FormValidator(FormValidatorSettings, avatarEditForm);
avatarValidate.enableValidation();

const MyAPI = new API(APIconfig);
const MyProfilePopupWithForm = new PopupWithForm(profilePopup);
MyProfilePopupWithForm.setEventListeners();
const MyNewCardPopupWithForm = new PopupWithForm(newCardPopup);
MyNewCardPopupWithForm.setEventListeners();
const MyAvatarPopupWithForm = new PopupWithForm(avatarEditPopup);
MyAvatarPopupWithForm.setEventListeners();
const MyImagePopupWithImage = new PopupWithImage(imagePopup);
MyImagePopupWithImage.setEventListeners();
const MyUserInfo = new UserInfo(UserInfoConfig);

function doCard(cardSettings) {
  const cardObject = new Card(cardSettings).card;
  return cardObject;
}

var testElements = [];
const MySection = new Section(
  {
    items: testElements,
    rerender: (cardSettings) => {
      return doCard(cardSettings);
    },
  },
  ".elements"
);

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
        apiObject: MyAPI,
        testFunc: (imageSettings) => {
          MyImagePopupWithImage.open(imageSettings);
        },
      };

      // const cardObject = new Card(cardSettings);
      // cardObject.createCard();
      testElements.push(cardSettings);
      // elements.prepend(cardObject.card);
    }

    MySection.renderAll(testElements);

    profileName.textContent = response[1].name;
    profileInfo.textContent = response[1].about;
    profileAvatar.setAttribute("src", response[1].avatar);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

function openProfilePopup(profilePopup) {
  inputName.value = profileName.textContent;
  inputJob.value = profileInfo.textContent;
}

function submitTitleChanges(event) {
  event.preventDefault();
  MyProfilePopupWithForm.toggleLoadingButton("Сохранение...");
  MyAPI.changeProfile(inputName.value, inputJob.value).then(() => {
    MyUserInfo.setUserInfo({
      name: inputName.value,
      about: inputJob.value,
    });
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

      MySection.rerender(cardSettings);

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
  editValidate._resetFormErrros();
  openProfilePopup(profilePopup);
});
addButton.addEventListener("click", function () {
  MyNewCardPopupWithForm.open();
  addValidate._resetFormErrros();
});
editAvatarButton.addEventListener("click", function () {
  MyAvatarPopupWithForm.open();
});
