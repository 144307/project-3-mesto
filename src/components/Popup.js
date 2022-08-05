// @ts-nocheck

export default class Popup {
  constructor(settings) {
    this.overlay = settings.popup;
    this.overlayOpenedClass = settings.overlayOpenedClass;
  }

  open() {
    this.overlay.classList.add(this.overlayOpenedClass);
    document.addEventListener("keydown", (event) => {
      this.handleEscClose(event, this.overlay);
    });
  }

  close() {
    console.log("popup close()");
    this.overlay.classList.remove(this.overlayOpenedClass);
    document.removeEventListener("keydown", (event) => {
      this.handleEscClose(event, this.overlay);
    });
  }

  handleEscClose(event, overlay) {
    if (event.key === "Escape") {
      overlay.classList.remove(this.overlayOpenedClass);
      document.removeEventListener("keydown", (event) => {
        this.handleEscClose(event, this.overlay);
      });
    }
  }

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
