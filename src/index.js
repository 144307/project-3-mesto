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
  overlayImage,
  overlayImageTitle,
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

const ProfilePopupSettings = {
  popup: profilePopup,
  submit: (event) => {
    submitTitleChanges(event);
  },
  Form: editProfileForm,
};

const newCardPopupSettings = {
  popup: newCardPopup,
  Form: addForm,
  submit: (event) => {
    submitCardCreation(event);
  },
};
const avatarEditPopupSettings = {
  popup: avatarEditPopup,
  Form: avatarEditForm,
  submit: (event) => {
    submitUpdateAvatar(event);
  },
};

const imagePopupSettings = {
  popup: imagePopup,
  image: overlayImage,
  imageTitle: overlayImageTitle,
};

const editValidate = new FormValidator(FormValidatorSettings, editProfileForm);
editValidate.enableValidation();
const addValidate = new FormValidator(FormValidatorSettings, addForm);
addValidate.enableValidation();
const avatarValidate = new FormValidator(FormValidatorSettings, avatarEditForm);
avatarValidate.enableValidation();

const MyAPI = new API(APIconfig);
console.log("0");
const MyProfilePopupWithForm = new PopupWithForm(ProfilePopupSettings);
// MyProfilePopupWithForm.setEventListeners();
console.log("1");
const MyNewCardPopupWithForm = new PopupWithForm(newCardPopupSettings);
// MyNewCardPopupWithForm.setEventListeners();
console.log("2");
const MyAvatarPopupWithForm = new PopupWithForm(avatarEditPopupSettings);
// MyAvatarPopupWithForm.setEventListeners();
console.log("3");
const MyImagePopupWithImage = new PopupWithImage(imagePopupSettings);
MyImagePopupWithImage.setEventListeners();
console.log("4");
const MyUserInfo = new UserInfo(UserInfoConfig);

function rerender(cardSettings) {
  const cardObject = new Card(cardSettings).card;
  // console.log(cardObject.card);
  return cardObject;
}

var testElements = [];
const MySection = new Section(
  {
    items: testElements,
    rerender: (cardSettings) => {
      return rerender(cardSettings);
    },
  },
  ".elements"
);

MyAPI.getInitialCards()
  .then((response) => {
    MyUserInfo.avatar = response[1].avatar;
    MyUserInfo.id = response[1]._id;
    console.log("MyUserInfo.avatar", MyUserInfo.avatar);

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
    profileAvatar.setAttribute("src", MyUserInfo.avatar);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

function openProfilePopup() {
  inputName.value = profileName.textContent;
  inputJob.value = profileInfo.textContent;
}

function submitTitleChanges(event) {
  // event.preventDefault();
  MyProfilePopupWithForm.toggleLoadingButton("Сохранение...");
  MyAPI.changeProfile(inputName.value, inputJob.value)
    .then((response) => {
      console.log("response =", response);
      MyUserInfo.setUserInfo({
        name: inputName.value,
        about: inputJob.value,
      });
      MyProfilePopupWithForm.close();
    })
    .finally(() => {
      MyProfilePopupWithForm.toggleLoadingButton("Сохранить");
    });
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
        apiObject: MyAPI,
        testFunc: (imageSettings) => {
          MyImagePopupWithImage.open(imageSettings);
        },
      };

      MySection.addItem(MySection.rerender(cardSettings));
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
  // event.preventDefault();
  console.log("submitUpdateAvatar");

  // const submitButton = event.submitter;
  console.log("profileAvatar", profileAvatar);
  console.log("inputProfileImage.value", inputProfileImage.value);
  MyAvatarPopupWithForm.toggleLoadingButton("Сохранение...");
  MyAPI.updateAvatar(inputProfileImage.value)
    .then((response) => {
      profileAvatar.setAttribute("src", inputProfileImage.value);
      MyAvatarPopupWithForm.close();
    })
    .catch((error) => {
      console.error("Error:", error);
    })
    .finally(() => {
      MyAvatarPopupWithForm.toggleLoadingButton("Сохранить");
    });
}

// editProfileForm.addEventListener("submit", submitTitleChanges, true);
// editProfileForm.addEventListener(
//   "submit",
//   (event) => {
//     event.preventDefault();
//     MyProfilePopupWithForm.submit(event);
//   },
//   true
// );
// addForm.addEventListener("submit", submitCardCreation, true);
avatarEditForm.addEventListener("submit", submitUpdateAvatar, true);

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const editAvatarButton = document.querySelector(".profile__avatar-overlay");

editButton.addEventListener("click", function () {
  MyProfilePopupWithForm.open();
  editValidate._resetFormErrros();
  openProfilePopup();
});
addButton.addEventListener("click", function () {
  MyNewCardPopupWithForm.open();
  addValidate._resetFormErrros();
});
editAvatarButton.addEventListener("click", function () {
  MyAvatarPopupWithForm.open();
});
