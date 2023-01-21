import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  openPopup(name, link) {
    const popupImage = this._popup.querySelector('.popup__cards-image');
    const popupImageName = this._popup.querySelector('.popup__cards-name');

    popupImage.src = link; // устанавливаем ссылку
    popupImage.alt = name; // устанавливаем подпись картинке
    popupImageName.textContent = name;

    super.openPopup();
  }
}
