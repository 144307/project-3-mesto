export default class FormValidator {
  constructor(options) {
    this.formSelector = options.formSelector;
    this.inputSelector = options.inputSelector;
    this.formSubmitButtonSelector = options.formSubmitButtonSelector;
    this.inputSubtitleErrorSelector = options.inputSubtitleErrorClass;
    this.inputSubtitleErrorClass = options.inputSubtitleErrorClass;
    this.inputErrorClass = options.inputErrorClass;
    this.formObject = options.formObject;
    this.formInputGroupSelector = options.formInputGroupSelector;
    // this.errors = this.formObject.querySelectorAll(
    //   this.inputSubtitleErrorClass
    // );
    this.enableValidation();
  }

  enableValidation() {
    this.inputFields = Array.from(
      this.formObject.querySelectorAll(this.inputSelector)
    );
    this.submitButton = this.formObject.querySelector(
      this.formSubmitButtonSelector
    );

    this.formObject.addEventListener("input", (event) => {
      this.checkForm();
    });
    for (let j = 0; j < this.inputFields.length; j++) {
      this.inputFields[j].addEventListener("input", () => {
        this.checkInput(this.inputFields[j]);
      });
      this.inputFields[j].inputSubtitleErrorClass =
        this.inputSubtitleErrorSelector;
    }
  }
  showButton(submitButton) {
    submitButton.disabled = false;
  }

  hideButton(submitButton) {
    submitButton.disabled = true;
  }

  showInputError(inputField) {
    inputField.classList.add(this.inputErrorClass);
  }
  hideInputError(inputField) {
    // const errors = this.formObject.querySelectorAll(
    //   this.inputSubtitleErrorClass
    // );
    inputField.classList.remove(this.inputErrorClass);
    inputField
      .closest(this.formInputGroupSelector)
      .querySelector(inputField.inputSubtitleErrorClass).textContent = "";
    // for (let i = 0; i < errors.length; i++) {
    //   errors[i].textContent = "";
    // }
  }

  checkInput(inputField) {
    const isValid = inputField.checkValidity();

    const errorMessage = inputField
      .closest(this.formInputGroupSelector)
      .querySelector(inputField.inputSubtitleErrorClass);
    errorMessage.textContent = inputField.validationMessage;

    if (!isValid) {
      this.showInputError(inputField);
    } else {
      this.hideInputError(inputField);
    }
  }

  resetFormErrros() {
    for (let i = 0; i < this.inputFields.length; i++) {
      this.hideInputError(this.inputFields[i]);
      // this.inputFields[i].value = "";
    }
    // }
    this.submitButton.disabled = true;
  }

  checkForm() {
    for (let i = 0; i < this.inputFields.length; i++) {
      const inputField = this.inputFields[i];
      inputField.inputSubtitleErrorClass = this.inputSubtitleErrorSelector;
      const isValid = inputField.checkValidity();

      if (!isValid) {
        this.hideButton(this.submitButton);
        break;
      } else {
        this.showButton(this.submitButton);
      }
    }
  }
}
