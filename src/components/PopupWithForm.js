import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(settings) {
    super(settings);
    this.overlay = settings.popup;
    this.submit = settings.submit;
    this.formPopup = settings.form;
    this.overlayFormButtonSelector = settings.overlayFormButtonSelector;
    this.overlayCloseButtonSelector = settings.overlayCloseButtonSelector;
    this.setListeners();
  }

  toggleLoadingButton(newValue) {
    const submitButton = this.overlay.querySelector(
      this.overlayFormButtonSelector
    );
    // const submitButton = this.overlay.querySelector(".overlay__form-button");
    submitButton.value = newValue;
  }

  _getInputValues() {
    let values = [];
    const inputs = this.overlay.querySelectorAll(".overlay__form-input");
    for (let i = 0; i < inputs.length; i++) {
      values.push(inputs[i].value);
    }
    console.log("values =", values);
    return values;
  }

  setListeners() {
    this.formPopup.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();
        // this.submit(event);
        this.submit(this._getInputValues());
      },
      true
    );
    console.log("setListeners", this.formPopup);
    const closeButton = this.overlay.querySelector(
      this.overlayCloseButtonSelector
    );
    closeButton.addEventListener("click", () => {
      this.close();
    });
    this.overlay.addEventListener("click", (event) => {
      if (event.target === this.overlay) {
        this.close();
      }
    });
  }

  close() {
    console.log("PopupWithForm close");
    console.log("PopupWithForm overlay", this.overlay);
    this.overlay.classList.remove("overlay_opened");
    document.removeEventListener("keydown", (event) => {
      super.handleEscClose(event, this.overlay);
    });
  }
}
