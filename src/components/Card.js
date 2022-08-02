// @ts-nocheck

// import PopupWithImage from "./PopupWithImage.js";

// const overlayImage = document.querySelector(".overlay__image-popup-photo");
// const imagePopup = document.querySelector(".overlay_type_picture");

// const myImagePopupWithImage = new PopupWithImage(imagePopup);
// myImagePopupWithImage.setEventListeners();

export default class Card {
  constructor(settings) {
    this._name = settings.name;
    this._link = settings.link;
    this._likes = settings.likes;
    this._owned = settings.owned;
    this._cardId = settings.cardId;
    this._ownerId = settings.ownerId;
    this.card = null;
    this.apiObject = settings.apiObject;
    this.testFunc = settings.testFunc;
    this.cardTemplateSelectpr = settings.cardTemplateSelectpr;
    this.cardSelector = settings.cardSelector;
    this.cardImageSelector = settings.cardImageSelector;
    this.cardHeartSelectedClass = settings.cardHeartSelectedClass;
    this.cardHeartCounterSelector = settings.cardHeartCounterSelector;
    this.cardTitleSelector = settings.cardTitleSelector;
    this.cardHeartSelector = settings.cardHeartSelector;
    this.cardDeleteButtonSelector = settings.cardDeleteButtonSelector;
    this.overlayCloseButtonSelector = settings.overlayCloseButtonSelector;

    this.createCard();
  }

  setEventListeners() {
    // console.log("setEventListeners Card.js");
    this.likeButton.addEventListener("click", (event) => {
      this._toggleLike(event, this._cardId, this._likes.length, this.counter);
    });
    this.deleteButton.addEventListener("click", (event) => {
      this.removeCard(event, this._cardId);
    });
    this.imageButton.addEventListener("click", (event) => {
      this.openImagePopup(event);
    });
  }

  createCard() {
    const cardTemplate = document.querySelector(
      this.cardTemplateSelectpr
    ).content;
    const card = cardTemplate.querySelector(this.cardSelector).cloneNode(true);
    const cardImage = card.querySelector(this.cardImageSelector);
    cardImage.setAttribute("src", this._link);
    cardImage.setAttribute("alt", this._name);
    const cardTitle = card.querySelector(this.cardTitleSelector);
    cardTitle.textContent = this._name;
    this.likeButton = card.querySelector(this.cardHeartSelector);
    this.counter = card.querySelector(this.cardHeartCounterSelector);
    for (let i = 0; i < this._likes.length; i++) {
      // console.log("this._likes[i]._id", this._likes[i]._id);
      // console.log("this._ownerId", this._ownerId);
      if (this._likes[i]._id.localeCompare(this._ownerId) === 0) {
        this._turnOnLike(card.querySelector(this.cardHeartSelector));
      }
    }
    this.counter.textContent = this._likes.length;
    this.deleteButton = card.querySelector(this.cardDeleteButtonSelector);
    if (this._owned) {
      this.deleteButton.setAttribute("style", "display: block");
    }
    this.imageButton = card.querySelector(this.cardImageSelector);
    this.setEventListeners();
    this.card = card;
    return card;
  }

  _turnOnLike(likeButton) {
    likeButton.classList.add(this.cardHeartSelectedClass);
  }
  _turnOffLike(likeButton) {
    likeButton.classList.remove(this.cardHeartSelectedClass);
  }

  _toggleLike(likeButton, cardId, likes, counter) {
    if (
      !likeButton.currentTarget.classList.contains(this.cardHeartSelectedClass)
    ) {
      this.apiObject
        .giveLike(cardId)
        .then((response) => {
          this._turnOnLike(likeButton.target);
          likes = response.likes.length;
          counter.textContent = likes;
          console.log("likes =", likes);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      this.apiObject
        .removeLike(cardId)
        .then((response) => {
          this._turnOffLike(likeButton.target);
          likes = response.likes.length;
          counter.textContent = likes;
          console.log("likes =", likes);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  removeCard(event, cardId) {
    console.log("removeCard ID =", cardId);

    this.apiObject
      .deleteCard(cardId)
      .then((response) => {
        event.target.closest(this.cardSelector).remove();
        console.log("testDeleting response =", response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  openImagePopup(openButton) {
    const imageSettings = {
      src: openButton.currentTarget.src,
      alt: openButton.currentTarget.alt,
    };
    // this.overlayCloseButtonSelector

    // myImagePopupWithImage.open(imageSettings);
    this.testFunc(imageSettings);
  }
}
