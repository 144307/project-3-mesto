import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(settings) {
    super(settings);
    this.overlay = settings.popup;
    this.image = settings.image;
    this.title = settings.imageTitle;
    this.overlayCloseButtonSelector = settings.overlayCloseButtonSelector;
    super.setEventListeners();
  }

  open(imageSettings) {
    this.image.setAttribute("src", imageSettings.src);
    this.image.setAttribute("alt", imageSettings.alt);
    this.title.textContent = imageSettings.alt;
    super.open();
  }
}
