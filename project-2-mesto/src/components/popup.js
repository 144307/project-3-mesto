// @ts-nocheck

export default class Popup {
  constructor(selector) {
    this.overlay = selector;
  }

  _resetFormErrros() {
    console.log(this.overlay);
    const errors = this.overlay.querySelectorAll(".overlay__form-error");
    for (let i = 0; i < errors.length; i++) {
      errors[i].textContent = "";
    }
    const inputs = this.overlay.querySelectorAll(".overlay__form-input");
    if (inputs.length > 0) {
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove("overlay__form-input_error");
        inputs[i].value = "";
      }
    }
  }

  // toggleLoadingButton(submitButton, newValue) {
  //   // let submitButton = overlay.querySelector(".overlay__form-button");
  //   submitButton.value = newValue;
  // }

  open() {
    this.overlay.classList.add("overlay_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    console.log("popup.js close()");
    const overlay = document.querySelector(".overlay_opened");
    overlay.classList.remove("overlay_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      console.log("popup.js _handleEscClose()");
      // this.close();
      const overlay = document.querySelector(".overlay_opened");
      overlay.classList.remove("overlay_opened");
      document.removeEventListener("keydown", this._handleEscClose);
    }
  }

  setEventListeners() {
    const closeButton = this.overlay.querySelector(".overlay__close-button");
    closeButton.addEventListener("click", () => {
      this.close();
    });
    this.overlay.addEventListener("click", (event) => {
      if (event.target === this.overlay) {
        console.log("popup.js event.target === selector");
        this.close();
      }
    });
  }
}

// const overlayImage = document.querySelector(".overlay__image-popup-photo");
// const overlayImageTitle = document.querySelector(".overlay__image-popup-tilte");

// export class PopupWithImage extends Popup {
//   open(imageSettings) {
//     overlayImage.setAttribute("src", imageSettings.src);
//     overlayImage.setAttribute("alt", imageSettings.alt);
//     overlayImageTitle.textContent = imageSettings.alt;
//     super.open();
//   }
// }

// export class PopupWithImage extends Popup {
//   constructor(image) {
//     super();
//     this.src = image.src;
//     this.alt = image.alt;
//   }
//   open() {
//     const cardTemplate = document.querySelector("#card").content;
//     const card = cardTemplate.querySelector(".card").cloneNode(true);
//     const cardImage = card.querySelector(".card__image");
//     cardImage.setAttribute("src", this.src);
//     cardImage.setAttribute("alt", this.alt);
//   }

//   // openImage(name, link) {
//   //   super.open();
//   //   this._image.src = link;
//   //   this._image.alt = name;
//   //   this._title.textContent = name;
//   // }
// }

// export class PopupWithForm extends Popup {
//   constructor(overlay) {
//     super();
//     this.overlay = overlay;
//   }

//   open() {
//     this.overlay.querySelector(".overlay__form-button").disabled = true;
//     this._resetFormErrros();
//     this.overlay.classList.add("overlay_opened");
//     document.addEventListener("keydown", this._handleEscClose);
//   }

//   toggleLoadingButton(newValue) {
//     let submitButton = this.overlay.querySelector(".overlay__form-button");
//     submitButton.value = newValue;
//   }
// }
