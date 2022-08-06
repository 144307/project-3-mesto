import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(settings) {
    super(settings);
    this.overlay = settings.popup;
    this.submit = settings.submit;
    // this.formPopup = settings.form;
    this.formPopup = this.overlay.querySelector(".overlay__form");
    this.overlayFormButtonSelector = settings.overlayFormButtonSelector;
    this.overlayCloseButtonSelector = settings.overlayCloseButtonSelector;
    this.setListeners();
  }

  toggleLoadingButton(newValue) {
    // const submitButton = this.overlay.querySelector(
    //   this.overlayFormButtonSelector
    // );
    // const submitButton = this.overlay.querySelector(".overlay__form-button");
    this.submitButton.value = newValue;
  }

  // getInputValuesOld() {
  //   let values = [];
  //   this._inputList = this.overlay.querySelectorAll(".overlay__form-input");
  //   for (let i = 0; i < this._inputList.length; i++) {
  //     values.push(this._inputList[i].value);
  //   }
  //   console.log("values =", values);
  //   return values;
  // }

  getInputValues() {
    this._formValues = [];
    this._inputList = this.overlay.querySelectorAll(".overlay__form-input");
    this._inputList.forEach((input) => {
      // this._formValues[input.name] = input.value;
      this._formValues.push(input.value);
    });
    return this._formValues;
  }

  setListeners() {
    this.submitButton = this.overlay.querySelector(
      this.overlayFormButtonSelector
    );
    this.formPopup.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();
        // this.submit(event);
        this.submit(this.getInputValues());
      },
      true
    );
    // console.log("setListeners", this.formPopup);
    super.setEventListeners(this.overlayCloseButtonSelector);
    // const closeButton = this.overlay.querySelector(
    //   this.overlayCloseButtonSelector
    // );
    // closeButton.addEventListener("click", () => {
    //   this.close();
    // });
    // this.overlay.addEventListener("click", (event) => {
    //   if (event.target === this.overlay) {
    //     this.close();
    //   }
    // });
  }

  close() {
    super.close();
    // console.log("PopupWithForm close");
    // console.log("PopupWithForm overlay", this.overlay);
    // this.overlay.classList.remove("overlay_opened");
    // document.removeEventListener("keydown", (event) => {
    //   super.handleEscClose(event);
    // });
  }
}

// close() {
//   console.log("popup close()");
//   this.overlay.classList.remove(this.overlayOpenedClass);
//   document.removeEventListener("keydown", (event) => {
//     this.handleEscClose(event);
//   });
// }
