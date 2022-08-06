// @ts-nocheck

// npm run build; npm run dev

import FormValidator from "./components/FormValidator.js";
import Section from "./components/Section.js";

import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";

import Api from "./components/Api.js";
import Card from "./components/Card.js";
import UserInfo from "./components/userinfo.js";

import "./pages/index.css";

let owner;

import {
  inputCardName,
  inputCardImageUrl,
  inputProfileImage,
  // editProfileForm,
  // addForm,
  // avatarEditForm,
  profilePopup,
  newCardPopup,
  imagePopup,
  avatarEditPopup,
  profileAvatar,
  profileObject,
  profileInfo,
  inputName,
  inputJob,
  overlayImage,
  overlayImageTitle,
  cardTemplateSelectpr,
  cardSelector,
  cardImageSelector,
  cardHeartSelectedClass,
  cardHeartCounterSelector,
  cardTitleSelector,
  cardHeartSelector,
  cardDeleteButtonSelector,
  overlayOpenedClass,
  overlayCloseButtonSelector,
  overlayFormButtonSelector,
  // formSelector,
  // fromInputSelector,
  // formSubmitButtonSelector,
  // inputSubtitleErrorSelector,
  // inputErrorClass,
  editButton,
  addButton,
  editAvatarButton,
  editFormValidatorSettings,
  addFormValidatorSettings,
  avatarFormValidatorSettings,
} from "./utils/constants.js";

const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-6",
  headers: {
    authorization: "230ea98f-ed00-4030-a408-2ee71d4ed161",
    "Content-Type": "application/json",
  },
};

const userInfoConfig = {
  nameObject: profileObject,
  aboutObject: profileInfo,
  // getUserInfo: () => {
  //   myApi
  //     .getInitialCards()
  //     .then((response) => {
  //       console.log("response test", response[1]);
  //       return response[1];
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // },
};

// const editFormValidatorSettings = {
//   formSelector: formSelector,
//   inputSelector: fromInputSelector, // fromInputSelector
//   formSubmitButtonSelector: formSubmitButtonSelector,
//   inputSubtitleErrorClass: inputSubtitleErrorSelector,
//   inputErrorClass: inputErrorClass,
//   formObject: editProfileForm,
//   overlayCloseButtonSelector: overlayCloseButtonSelector,
// };
// const addFormValidatorSettings = {
//   formSelector: formSelector,
//   inputSelector: fromInputSelector,
//   formSubmitButtonSelector: formSubmitButtonSelector,
//   inputSubtitleErrorClass: inputSubtitleErrorSelector,
//   inputErrorClass: inputErrorClass,
//   formObject: addForm,
//   overlayCloseButtonSelector: overlayCloseButtonSelector,
// };
// const avatarFormValidatorSettings = {
//   formSelector: formSelector,
//   inputSelector: fromInputSelector,
//   formSubmitButtonSelector: formSubmitButtonSelector,
//   inputSubtitleErrorClass: inputSubtitleErrorSelector,
//   inputErrorClass: inputErrorClass,
//   formObject: avatarEditForm,
//   overlayCloseButtonSelector: overlayCloseButtonSelector,
// };

const profilePopupSettings = {
  popup: profilePopup,
  submit: (event) => {
    submitTitleChanges(event);
  },
  // form: editProfileForm,
  overlayOpenedClass: overlayOpenedClass,
  overlayCloseButtonSelector: overlayCloseButtonSelector,
  overlayFormButtonSelector: overlayFormButtonSelector,
};

const newCardPopupSettings = {
  popup: newCardPopup,
  // form: addForm,
  submit: (event) => {
    submitCardCreation(event);
  },
  overlayOpenedClass: overlayOpenedClass,
  overlayCloseButtonSelector: overlayCloseButtonSelector,
  overlayFormButtonSelector: overlayFormButtonSelector,
};
const avatarEditPopupSettings = {
  popup: avatarEditPopup,
  // form: avatarEditForm,
  submit: (event) => {
    submitUpdateAvatar(event);
  },
  overlayOpenedClass: overlayOpenedClass,
  overlayCloseButtonSelector: overlayCloseButtonSelector,
  overlayFormButtonSelector: overlayFormButtonSelector,
};

const imagePopupSettings = {
  popup: imagePopup,
  image: overlayImage,
  imageTitle: overlayImageTitle,
  overlayOpenedClass: overlayOpenedClass,
  overlayCloseButtonSelector: overlayCloseButtonSelector,
  overlayFormButtonSelector: overlayFormButtonSelector,
};

const editValidate = new FormValidator(editFormValidatorSettings);
// editValidate.enableValidation();
const addValidate = new FormValidator(addFormValidatorSettings);
// addValidate.enableValidation();
const avatarValidate = new FormValidator(avatarFormValidatorSettings);
// avatarValidate.enableValidation();

const myApi = new Api(apiConfig);
const myProfilePopupWithForm = new PopupWithForm(profilePopupSettings);
const myNewCardPopupWithForm = new PopupWithForm(newCardPopupSettings);
const myAvatarPopupWithForm = new PopupWithForm(avatarEditPopupSettings);
const myImagePopupWithImage = new PopupWithImage(imagePopupSettings);
// myImagePopupWithImage.setEventListeners();
const myUserInfo = new UserInfo(userInfoConfig);

function rerender(cardSettings) {
  const cardObject = new Card(cardSettings).card;
  return cardObject;
}

const testElements = [];
const mySection = new Section(
  {
    items: testElements,
    rerender: (cardSettings) => {
      return rerender(cardSettings);
    },
  },
  ".elements"
);

myApi
  .getInitialCards()
  .then((response) => {
    owner = response[1]._id;
    myUserInfo.setUserInfo(response[1]);
    for (let i = 0; i < response[0].length; i++) {
      let owned = false;
      if (response[1]._id === response[0][i].owner._id) {
        owned = true;
      }

      const cardSettings = {
        name: response[0][i].name,
        link: response[0][i].link,
        likes: response[0][i].likes,
        owned: owned,
        cardId: response[0][i]._id,
        ownerId: owner,
        apiObject: myApi,
        handleCardClick: (imageSettings) => {
          myImagePopupWithImage.open(imageSettings);
        },
        cardTemplateSelectpr: cardTemplateSelectpr,
        cardSelector: cardSelector,
        cardImageSelector: cardImageSelector,
        cardHeartSelectedClass: cardHeartSelectedClass,
        cardHeartCounterSelector: cardHeartCounterSelector,
        cardTitleSelector: cardTitleSelector,
        cardHeartSelector: cardHeartSelector,
        cardDeleteButtonSelector: cardDeleteButtonSelector,
        overlayCloseButtonSelector: overlayCloseButtonSelector,
      };
      testElements.push(cardSettings);
    }

    mySection.renderAll(testElements);

    profileObject.textContent = myUserInfo.name;
    profileInfo.textContent = myUserInfo.about;
    profileAvatar.setAttribute("src", myUserInfo.avatar);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

function openProfilePopup() {
  const info = myUserInfo.getUserInfo();
  // inputName.value = profileObject.textContent;
  // inputJob.value = profileInfo.textContent;
  inputName.value = info.name;
  inputJob.value = info.about;
}

function submitTitleChanges(event) {
  myProfilePopupWithForm.toggleLoadingButton("Сохранение...");
  const inputValues = myProfilePopupWithForm.getInputValues();
  myApi
    // .changeProfile(inputName.value, inputJob.value)
    .changeProfile(inputValues[0], inputValues[1])
    .then((response) => {
      myUserInfo.setUserInfo({
        name: inputValues[0],
        about: inputValues[1],
      });
      myProfilePopupWithForm.close();
    })
    .catch((error) => {
      console.error("Error:", error);
    })
    .finally(() => {
      myProfilePopupWithForm.toggleLoadingButton("Сохранить");
    });
}

function submitCardCreation(event) {
  myNewCardPopupWithForm.toggleLoadingButton("Создание...");
  const inputValues = myNewCardPopupWithForm.getInputValues();
  console.log("inputValues", inputValues);
  myApi
    .addCard(inputValues[0], inputValues[1])
    .then((response) => {
      console.log("response =", response);
      const newCardId = response._id;

      const cardSettings = {
        name: inputValues[0],
        link: inputValues[1],
        likes: 0,
        owned: true,
        cardId: newCardId,
        apiObject: myApi,
        handleCardClick: (imageSettings) => {
          imageSettings.overlayCloseButtonSelector = overlayCloseButtonSelector;
          console.log("image settings", imageSettings);

          myImagePopupWithImage.open(imageSettings);
        },
        cardTemplateSelectpr: cardTemplateSelectpr,
        cardSelector: cardSelector,
        cardImageSelector: cardImageSelector,
        cardHeartSelectedClass: cardHeartSelectedClass,
        cardHeartCounterSelector: cardHeartCounterSelector,
        cardTitleSelector: cardTitleSelector,
        cardHeartSelector: cardHeartSelector,
        cardDeleteButtonSelector: cardDeleteButtonSelector,
        overlayCloseButtonSelector: overlayCloseButtonSelector,
      };

      mySection.addItem(mySection.rerender(cardSettings));
      myNewCardPopupWithForm.close();
    })
    .catch((error) => {
      console.error("Error:", error);
    })
    .finally(() => {
      myNewCardPopupWithForm.toggleLoadingButton("Сохранить");
    });
}

function submitUpdateAvatar(event) {
  // event.preventDefault();
  console.log("submitUpdateAvatar");

  myAvatarPopupWithForm.toggleLoadingButton("Сохранение...");
  const inputValues = myAvatarPopupWithForm.getInputValues();
  myApi
    .updateAvatar(inputValues[0])
    .then((response) => {
      console.log("inputProfileImage.value", inputValues[0]);
      profileAvatar.src = inputValues[0];
      myAvatarPopupWithForm.close();
      console.log("profileAvatar", profileAvatar);
    })
    .catch((error) => {
      console.error("Error:", error);
    })
    .finally(() => {
      myAvatarPopupWithForm.toggleLoadingButton("Сохранить");
    });
}

// avatarEditForm.addEventListener("submit", submitUpdateAvatar, true);

// const editButton = document.querySelector(".profile__edit-button");
// const addButton = document.querySelector(".profile__add-button");
// const editAvatarButton = document.querySelector(".profile__avatar-overlay");

editButton.addEventListener("click", function () {
  myProfilePopupWithForm.open();
  editValidate.resetFormErrros();
  openProfilePopup();
});
addButton.addEventListener("click", function () {
  myNewCardPopupWithForm.open();
  addValidate.resetFormErrros();
});
editAvatarButton.addEventListener("click", function () {
  myAvatarPopupWithForm.open();
  avatarValidate.resetFormErrros();
});
