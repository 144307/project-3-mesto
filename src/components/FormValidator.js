export default class FormValidator {
  constructor(options) {
    this.formSelector = options.formSelector;
    this.inputSelector = options.inputSelector;
    this.formSubmitButtonSelector = options.formSubmitButtonSelector;
    this.inputSubtitleErrorSelector = options.inputSubtitleErrorClass;
    this.inputErrorClass = options.inputErrorClass;
    this.formObject = options.formObject;
    // console.log("this.formObject", this.formObject);
    // this.overlay = this.formObject.closest(".overlay__form");
    // console.log("test", this.overlay, this.formObject);
    this.errors = this.formObject.querySelectorAll(".overlay__form-error");
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
    // this.inputs = Array.from(
    //   this.formObject.querySelectorAll(this.inputSelector)
    // );
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
    inputField.classList.remove(this.inputErrorClass);
    for (let i = 0; i < this.errors.length; i++) {
      this.errors[i].textContent = "";
    }
  }

  checkInput(inputField) {
    const isValid = inputField.checkValidity();

    const errorMessage = inputField
      .closest(".input-group")
      .querySelector(inputField.inputSubtitleErrorClass);
    errorMessage.textContent = inputField.validationMessage;

    if (!isValid) {
      this.showInputError(inputField);
    } else {
      this.hideInputError(inputField);
    }
  }

  resetFormErrros() {
    // this.overlay = this.formObject.closest(".overlay__form");
    // const errors = this.overlay.querySelectorAll(".overlay__form-error");
    // for (let i = 0; i < this.errors.length; i++) {
    //   this.errors[i].textContent = "";
    // }
    // if (this.inputFields.length > 0) {
    for (let i = 0; i < this.inputFields.length; i++) {
      this.hideInputError(this.inputFields[i]);
      //     this.inputFields[i].classList.remove(this.inputErrorClass);
      this.inputFields[i].value = "";
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
