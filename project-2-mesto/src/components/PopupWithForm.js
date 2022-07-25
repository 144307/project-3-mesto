import Popup from "./popup";

export default class PopupWithForm extends Popup {
  constructor(overlay) {
    super();
    this.overlay = overlay;
  }

  open() {
    this.overlay.querySelector(".overlay__form-button").disabled = true;
    this._resetFormErrros();
    this.overlay.classList.add("overlay_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  toggleLoadingButton(newValue) {
    let submitButton = this.overlay.querySelector(".overlay__form-button");
    submitButton.value = newValue;
  }
}
