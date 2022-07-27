import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(overlay) {
    super();
    this.overlay = overlay;
  }

  open() {
    this.overlay.querySelector(".overlay__form-button").disabled = true;
    super.open();
  }

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
}
