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
  profilePopup,
  newCardPopup,
  imagePopup,
  avatarEditPopup,
  profileAvatar,
  // profileObject,
  // profileInfo,
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
  formSelector,
  fromInputSelector,
  editButton,
  addButton,
  editAvatarButton,
  editFormValidatorSettings,
  addFormValidatorSettings,
  avatarFormValidatorSettings,
  userInfoConfig,
} from "./utils/constants.js";

const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-6",
  headers: {
    authorization: "230ea98f-ed00-4030-a408-2ee71d4ed161",
    "Content-Type": "application/json",
  },
};

// const userInfoConfig = {
//   nameObject: profileObject,
//   aboutObject: profileInfo,
//   avatarObject: profileAvatar,
// };

const profilePopupSettings = {
  popup: profilePopup,
  submit: (event) => {
    submitTitleChanges(event);
  },
  formSelector: formSelector,
  fromInputSelector: fromInputSelector,
  overlayOpenedClass: overlayOpenedClass,
  overlayCloseButtonSelector: overlayCloseButtonSelector,
  overlayFormButtonSelector: overlayFormButtonSelector,
};

const newCardPopupSettings = {
  popup: newCardPopup,
  formSelector: formSelector,
  fromInputSelector: fromInputSelector,
  submit: (event) => {
    submitCardCreation(event);
  },
  overlayOpenedClass: overlayOpenedClass,
  overlayCloseButtonSelector: overlayCloseButtonSelector,
  overlayFormButtonSelector: overlayFormButtonSelector,
};
const avatarEditPopupSettings = {
  popup: avatarEditPopup,
  formSelector: formSelector,
  fromInputSelector: fromInputSelector,
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
const addValidate = new FormValidator(addFormValidatorSettings);
const avatarValidate = new FormValidator(avatarFormValidatorSettings);

const myApi = new Api(apiConfig);
const myProfilePopupWithForm = new PopupWithForm(profilePopupSettings);
const myNewCardPopupWithForm = new PopupWithForm(newCardPopupSettings);
const myAvatarPopupWithForm = new PopupWithForm(avatarEditPopupSettings);
const myImagePopupWithImage = new PopupWithImage(imagePopupSettings);
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

    // profileObject.textContent = myUserInfo.name;
    // profileInfo.textContent = myUserInfo.about;
    // profileAvatar.setAttribute("src", myUserInfo.avatar);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

function openProfilePopup() {
  const info = myUserInfo.getUserInfo();
  inputName.value = info.name;
  inputJob.value = info.about;
}

function submitTitleChanges(event) {
  myProfilePopupWithForm.toggleLoadingButton("Сохранение...");
  const inputValues = myProfilePopupWithForm.getInputValues();
  myApi
    .changeProfile(
      inputValues["overlay__form-input_line-one"],
      inputValues["overlay__form-input_line-two"]
    )
    .then(() => {
      myUserInfo.setUserInfo({
        // name: inputValues[0],
        // about: inputValues[1],
        name: inputValues["overlay__form-input_line-one"],
        about: inputValues["overlay__form-input_line-two"],
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
    .addCard(
      inputValues["overlay__form-input_line-one"],
      inputValues["overlay__form-input_line-two"]
    )
    .then((response) => {
      console.log("response =", response);
      const newCardId = response._id;

      const cardSettings = {
        name: inputValues["overlay__form-input_line-one"],
        link: inputValues["overlay__form-input_line-two"],
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
  console.log("submitUpdateAvatar");

  myAvatarPopupWithForm.toggleLoadingButton("Сохранение...");
  const inputValues = myAvatarPopupWithForm.getInputValues();
  myApi
    .updateAvatar(inputValues["overlay__form-input_line-one"])
    .then((response) => {
      console.log(
        "inputProfileImage.value",
        inputValues["overlay__form-input_line-one"]
      );
      console.log(
        "test inputValues",
        inputValues["overlay__form-input_line-one"]
      );
      profileAvatar.src = inputValues["overlay__form-input_line-one"];
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
