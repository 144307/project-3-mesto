// @ts-nocheck

// import { openPopup } from "./modal.js";
// import Modal from "./modal.js";
// const MyModal = new Modal();
// import { PopupWithImage } from "./popup.js";

import PopupWithImage from "./PopupWithImage.js";
// import { openImagePopup } from "./modal.js";
// import { testModal } from "./modal.js";

const overlayImage = document.querySelector(".overlay__image-popup-photo");
const overlayImageTitle = document.querySelector(".overlay__image-popup-tilte");
const imagePopup = document.querySelector(".overlay_type_picture");

const APIconfig = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-6",
  headers: {
    authorization: "230ea98f-ed00-4030-a408-2ee71d4ed161",
    "Content-Type": "application/json",
  },
};

///

import API from "./api.js";
const MyAPI = new API(APIconfig);
const MyImagePopupWithImage = new PopupWithImage(imagePopup);
MyImagePopupWithImage.setEventListeners();

export default class Card {
  constructor(settings) {
    this._name = settings.name;
    this._link = settings.link;
    this._likes = settings.likes;
    this._owned = settings.owned;
    this._cardId = settings.cardId;
    this._ownerId = settings.owner;
    this.card = null;
  }

  // logCard() {
  //   console.log("logCard", this.card);
  // }

  createCard() {
    // console.log("createCard cardId =", this._cardId);

    const cardTemplate = document.querySelector("#card").content;
    const card = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImage = card.querySelector(".card__image");
    cardImage.setAttribute("src", this._link);
    cardImage.setAttribute("alt", this._name);
    const cardTitle = card.querySelector(".card__title");
    cardTitle.textContent = this._name;
    const likeButton = card.querySelector(".card__heart");
    const counter = card.querySelector(".card__heart-counter");
    for (let i = 0; i < this._likes.length; i++) {
      // console.log(this._likes[i]._id);
      // console.log(this._ownerId);
      if (this._likes[i]._id.localeCompare(this._ownerId) === 0) {
        this._turnOnLike(card.querySelector(".card__heart"));
      }
    }
    counter.textContent = this._likes.length;
    likeButton.addEventListener("click", (event) => {
      this._toggleLike(event, this._cardId, this._likes.length, counter);
    });
    if (this._owned) {
      const deleteButton = card.querySelector(".card__delete-button");
      deleteButton.addEventListener("click", (event) => {
        this.removeCard(event, this._cardId);
        console.log("EVENT", event);
      });
      deleteButton.setAttribute("style", "display: block");
    }
    const imageButton = card.querySelector(".card__image");
    imageButton.addEventListener("click", this.openImagePopup);
    this.card = card;
    return card;
  }

  _turnOnLike(likeButton) {
    likeButton.classList.add("card__heart_selected");
  }
  _turnOffLike(likeButton) {
    likeButton.classList.remove("card__heart_selected");
  }

  _toggleLike(likeButton, cardId, likes, counter) {
    if (!likeButton.currentTarget.classList.contains("card__heart_selected")) {
      MyAPI.giveLike(cardId)
        .then((response) => {
          this._turnOnLike(likeButton.target);
          likes = response.likes.length;
          counter.textContent = likes;
          console.log("likes =", likes);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      // likeButton.currentTarget.classList.add("card__heart_selected");
      return likes;
    } else {
      MyAPI.removeLike(cardId)
        .then((response) => {
          this._turnOffLike(likeButton.target);
          likes = response.likes.length;
          counter.textContent = likes;
          console.log("likes =", likes);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      // likeButton.currentf.classList.remove("card__heart_selected");
      return likes;
    }
  }

  removeCard(card, cardId) {
    console.log("removeCard ID =", cardId);

    console.log("card =", card);
    MyAPI.deleteCard(cardId)
      .then((response) => {
        card.target.closest(".card").remove();
        console.log("testDeleting response =", response);
        console.log("card =", card);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    console.log(card);
  }

  openImagePopup(openButton) {
    console.log("openImagePopup");
    console.log(overlayImage);

    const imageSettings = {
      src: openButton.currentTarget.src,
      alt: openButton.currentTarget.alt,
      image: overlayImage,
    };

    // overlayImage.setAttribute("src", openButton.currentTarget.src);
    // overlayImage.setAttribute("alt", openButton.currentTarget.alt);
    // overlayImageTitle.textContent = openButton.currentTarget.alt;

    MyImagePopupWithImage.open(imageSettings);
  }
}

///

// function turnOnLike(likeButton) {
//   likeButton.classList.add("card__heart_selected");
// }
// function turnOffLike(likeButton) {
//   likeButton.classList.remove("card__heart_selected");
// }

// function toggleLike(likeButton, cardId, likes, counter) {
//   if (!likeButton.currentTarget.classList.contains("card__heart_selected")) {
//     giveLike(cardId)
//       .then((response) => {
//         turnOnLike(likeButton.target);
//         likes = response.likes.length;
//         counter.textContent = likes;
//         console.log("likes =", likes);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//     // likeButton.currentTarget.classList.add("card__heart_selected");
//     return likes;
//   } else {
//     removeLike(cardId)
//       .then((response) => {
//         turnOffLike(likeButton.target);
//         likes = response.likes.length;
//         counter.textContent = likes;
//         console.log("likes =", likes);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//     // likeButton.currentf.classList.remove("card__heart_selected");
//     return likes;
//   }
// }

// function removeCard(card, cardId) {
//   console.log("TEST ID =", cardId);
//   // testDeleting(cardId).then((response) => {
//   //   console.log("testDeleting response =", response);
//   // });

//   console.log("card =", card);
//   deleteCard(cardId)
//     .then((response) => {
//       card.target.closest(".card").remove();
//       console.log("testDeleting response =", response);
//       console.log("card =", card);
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
//   console.log(card);
// }

// function openImagePopup(openButton) {
//   overlayImage.setAttribute("src", openButton.currentTarget.src);
//   overlayImage.setAttribute("alt", openButton.currentTarget.alt);
//   overlayImageTitle.textContent = openButton.currentTarget.alt;
//   openPopup(imagePopup);
// }

// export function createCard(name, link, likes, owned, cardId, ownerId) {
//   console.log("createCard cardId =", cardId);
//   const cardTemplate = document.querySelector("#card").content;
//   const card = cardTemplate.querySelector(".card").cloneNode(true);
//   const cardImage = card.querySelector(".card__image");
//   cardImage.setAttribute("src", link);
//   cardImage.setAttribute("alt", name);
//   const cardTitle = card.querySelector(".card__title");
//   cardTitle.textContent = name;
//   const likeButton = card.querySelector(".card__heart");
//   const counter = card.querySelector(".card__heart-counter");
//   for (let i = 0; i < likes.length; i++) {
//     console.log(likes[i]._id);
//     console.log(ownerId);
//     if (likes[i]._id.localeCompare(ownerId) === 0) {
//       turnOnLike(card.querySelector(".card__heart"));
//     }
//   }
//   counter.textContent = likes.length;
//   likeButton.addEventListener("click", (event) => {
//     toggleLike(event, cardId, likes.length, counter);
//   });
//   if (owned) {
//     const deleteButton = card.querySelector(".card__delete-button");
//     deleteButton.addEventListener("click", (event) => {
//       removeCard(event, cardId);
//     });
//     deleteButton.setAttribute("style", "display: block");
//   }
//   const imageButton = card.querySelector(".card__image");
//   imageButton.addEventListener("click", openImagePopup);
//   return card;
// }
