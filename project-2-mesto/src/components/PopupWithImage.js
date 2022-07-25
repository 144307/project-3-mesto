import Popup from "./popup";

const overlayImage = document.querySelector(".overlay__image-popup-photo");
const overlayImageTitle = document.querySelector(".overlay__image-popup-tilte");

export default class PopupWithImage extends Popup {
  open(imageSettings) {
    overlayImage.setAttribute("src", imageSettings.src);
    overlayImage.setAttribute("alt", imageSettings.alt);
    overlayImageTitle.textContent = imageSettings.alt;
    super.open();
  }
}
