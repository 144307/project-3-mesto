// @ts-nocheck

export default class Popup {
  constructor(settings) {
    this.overlay = settings.popup;
  }

  open() {
    this.overlay.classList.add("overlay_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    console.log("popup close()");
    this.overlay.classList.remove("overlay_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    console.log("popup _handleEscClose()");
    if (event.key === "Escape") {
      // this.close();
      // const overlay = document.querySelector(".overlay_opened");
      this.overlay.classList.remove("overlay_opened");
      document.removeEventListener("keydown", this._handleEscClose);
    }
  }

  setEventListeners() {
    console.log("popup setEventListeners()");
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
}
