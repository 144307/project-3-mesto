import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(settings) {
    super(settings);
    this.submit = settings.submit;
    this.fromInputSelector = settings.fromInputSelector;
    this.formSelector = settings.formSelector;
    this.formPopup = this.overlay.querySelector(this.formSelector);
    this.overlayFormButtonSelector = settings.overlayFormButtonSelector;
    this._inputList = this.overlay.querySelectorAll(this.fromInputSelector);
    this.submitButton = this.overlay.querySelector(
      this.overlayFormButtonSelector
    );
    this.setListeners();
  }

  renderLoading(newValue) {
    this.submitButton.value = newValue;
  }

  getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setListeners() {
    super.setListeners();
    this.formPopup.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();
        this.submit(this.getInputValues());
      },
      true
    );
  }

  close() {
    super.close();
    this.formPopup.reset();
  }
}
