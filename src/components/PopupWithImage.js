import Popup from "./Popup";

import { overlayImage, overlayImageTitle } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  open(imageSettings) {
    overlayImage.setAttribute("src", imageSettings.src);
    overlayImage.setAttribute("alt", imageSettings.alt);
    overlayImageTitle.textContent = imageSettings.alt;
    super.open();
  }
}
