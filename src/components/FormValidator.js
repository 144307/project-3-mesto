export default class FormValidator {
  constructor(options) {
    this.formSelector = options.formSelector;
    this.inputSelector = options.inputSelector;
    this.submitsubmitButton = options.submitsubmitButton;
    this.inputSubtitleErrorClass = options.inputSubtitleErrorClass;
    this.inputErrorClass = options.inputErrorClass;
    this.formObject = options.formObject;
    // console.log("this.formObject", this.formObject);
  }

  enableValidation() {
    // console.log("this.formObject", this.formObject);
    this.formObject.addEventListener("input", (event) => {
      this.checkForm();
    });
    this.inputs = Array.from(
      this.formObject.querySelectorAll(this.inputSelector)
    );
    for (let j = 0; j < this.inputs.length; j++) {
      this.inputs[j].addEventListener("input", () => {
        this.checkInput(this.inputs[j], this.inputErrorClass);
      });
      this.inputs[j].inputSubtitleErrorClass = this.inputSubtitleErrorClass;
    }
  }
  showButton(submitButton) {
    submitButton.disabled = false;
  }

  hideButton(submitButton) {
    submitButton.disabled = true;
  }

  showInputError(inputField, inputErrorClass) {
    inputField.classList.add(inputErrorClass);
  }
  hideInputError(inputField, inputErrorClass) {
    inputField.classList.remove(inputErrorClass);
  }

  checkInput(inputField, inputErrorClass) {
    // console.log("checkInput");
    const isValid = inputField.checkValidity();

    const errorMessage = inputField
      .closest(".input-group")
      .querySelector(inputField.inputSubtitleErrorClass);
    errorMessage.textContent = inputField.validationMessage;

    if (!isValid) {
      this.showInputError(inputField, inputErrorClass);
    } else {
      this.hideInputError(inputField, inputErrorClass);
    }
  }

  resetFormErrros() {
    this.overlay = this.formObject.closest(".overlay__form");
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
    this.formObject.querySelector(".overlay__form-button").disabled = true;
  }

  checkForm() {
    const inputFields = Array.from(
      this.formObject.querySelectorAll(this.inputSelector)
    );
    for (let i = 0; i < inputFields.length; i++) {
      const inputField = inputFields[i];
      inputField.inputSubtitleErrorClass = this.inputSubtitleErrorClass;
      const isValid = inputField.checkValidity();

      const submitButton = inputField
        .closest(this.formSelector)
        .querySelector(this.submitsubmitButton);

      if (!isValid) {
        this.hideButton(submitButton);
        break;
      } else {
        this.showButton(submitButton);
      }
    }
  }
}
