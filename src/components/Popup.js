// класс Popup отвечает за открытие и закрытие попапа
export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._button = this._popup.querySelector('.popup__button-submit');
  }

// открытие попапа
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose);
  }

  // закрытие попапа
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose);
  }

  // содержит логику закрытия попапа клавишей Esc
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
      };
    };

  // добавляет слушатель клика иконке закрытия попапа
  setEventListeners() {
    this._popup.addEventListener('mousedown', (e) => {
      if (e.target.classList.contains('popup') || e.target.classList.contains('popup__button-close')) {
        this.close();
      };
    });
  }

  //  уведомление пользователя о процессе загрузки,
  // меняется текст кнопки на: «Сохранение...», пока данные загружаются:
  setButtonText(text) {
    this._button.textContent = text;
  }
}
