import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__cards-image');
    this._popupImageName = this._popup.querySelector('.popup__cards-name');
  }

  open(name, link) {
    this._popupImage.src = link; // устанавливаем ссылку
    this._popupImage.alt = name; // устанавливаем подпись картинке
    this._popupImageName.textContent = name;

    super.open();
  }
}
