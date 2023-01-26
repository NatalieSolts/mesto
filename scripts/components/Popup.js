// класс Popup отвечает за открытие и закрытие попапа
export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

// открытие попапа
  openPopup() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose);
  }

  // закрытие попапа
  closePopup() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose);
  }

  // содержит логику закрытия попапа клавишей Esc
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.closePopup();
      };
    };

  // добавляет слушатель клика иконке закрытия попапа
  setEventListeners() {
    this._popup.addEventListener('mousedown', (e) => {
      if (e.target.classList.contains('popup') || e.target.classList.contains('popup__button-close')) {
        this.closePopup();
      };
    });
  }
}
