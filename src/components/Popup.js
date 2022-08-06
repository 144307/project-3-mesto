// @ts-nocheck

export default class Popup {
  constructor(settings) {
    this.overlay = settings.popup;
    this.overlayOpenedClass = settings.overlayOpenedClass;
  }

  open() {
    this.overlay.classList.add(this.overlayOpenedClass);
    document.addEventListener("keydown", this.handleEscClose);
  }

  close() {
    console.log("popup close()");
    this.overlay.classList.remove(this.overlayOpenedClass);
    document.removeEventListener("keydown", this.handleEscClose);
  }

  handleEscClose = (event) => {
    if (event.key === "Escape") {
      this.close();
    }
  };

  setEventListeners(overlayCloseButtonSelector) {
    const closeButton = this.overlay.querySelector(overlayCloseButtonSelector);
    closeButton.addEventListener("click", () => {
      this.close();
    });
    this.overlay.addEventListener("click", (event) => {
      if (event.target === this.overlay) {
        this.close();
      }
    });
  }
}
