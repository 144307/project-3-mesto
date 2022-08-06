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

  reset() {
    for (let i = 0; i < this._inputList.length; i++) {
      // console.log("this._inputList", this._inputList[i].value);
      this._inputList[i].value = "";
      // errors[i].textContent = "";
    }
  }

  getInputValues() {
    // this._formValues = [];
    this._formValues = {};
    // this._inputList = this.overlay.querySelectorAll(this.fromInputSelector);
    // this._inputList.forEach((input) => {
    //   this._formValues.push(input.value);
    // });
    this._inputList.forEach((input) => {
      // console.log("input.name", input.name)
      // console.log(
      //   "key " + input.name + " has value " + this._inputList[input.name]
      // );
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setListeners() {
    super.setListeners();
    // this.submitButton = this.overlay.querySelector(
    //   this.overlayFormButtonSelector
    // );
    this.formPopup.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();
        this.submit(this.getInputValues());
      },
      true
    );
    super.setListeners();
  }

  close() {
    super.close();
    this.reset();
  }
}
