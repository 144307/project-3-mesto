import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(settings) {
    super(settings);
    this.overlay = settings.popup;
    this.submit = settings.submit;
    this.FormPopup = settings.Form;
    this.setListeners();
  }

  // open() {
  //   // this.overlay.querySelector(".overlay__form-button").disabled = true;
  //   super.open();
  // }

  toggleLoadingButton(newValue) {
    let submitButton = this.overlay.querySelector(".overlay__form-button");
    submitButton.value = newValue;
  }

  _getInputValues() {
    let values = {};
    const inputs = this.overlay.querySelectorAll(".overlay__form-input");
    for (let i = 0; i < inputs.length; i++) {
      values.add(inputs[i].value);
    }
    return values;
  }

  setListeners() {
    console.log("setListeners");
    this.FormPopup.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();
        this.submit(event);
      },
      true
    );
    const closeButton = this.overlay.querySelector(".overlay__close-button");
    closeButton.addEventListener("click", () => {
      this.close();
    });
    this.overlay.addEventListener("click", (event) => {
      if (event.target === this.overlay) {
        this.close();
      }
    });
  }

  _handleEscClose(event) {
    console.log("PopupWithForm _handleEscClose()");
    if (event.key === "Escape") {
      console.log("PopupWithForm close()", this.close());
      this.close();
    }
  }

  close() {
    console.log("PopupWithForm close");
    console.log("PopupWithForm overlay", this.overlay);
    this.overlay.classList.remove("overlay_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    const inputs = this.overlay.querySelectorAll(".overlay__form-input");
    if (inputs.length > 0) {
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove("overlay__form-input_error");
        inputs[i].value = "";
      }
    }
  }
}
