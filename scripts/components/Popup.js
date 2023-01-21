// Создайте класс `Popup`, который отвечает за открытие и закрытие попапа. Этот класс:

// - Принимает в конструктор единственный параметр — селектор попапа.
// - Содержит публичные методы `open` и `close`, которые отвечают за открытие и закрытие попапа.
// - Содержит приватный метод `_handleEscClose`, который содержит логику закрытия попапа клавишей Esc.
// - Содержит публичный метод `_setEventListeners`, который добавляет слушатель клика иконке закрытия попапа.

export default class Popup {
  constructor(popupSelector ) {
    this._popup = document.querySelector(popupSelector); //селектор template-элемента ????
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
      console.log('!!!!!!!!!!')
      this.closePopup();
      // const popupIsOpened = document.querySelector('.popup_opened');
      // closePopup(popupIsOpened);
      };
    };

  // добавляет слушатель клика иконке закрытия попапа
  setEventListeners() {
    this._popup.addEventListener('mousedown', (e) => {
      console.log('222')
      if (e.target.classList.contains('popup') || e.target.classList.contains('popup__button-close')) {
        console.log('000000');
        this.closePopup();
      };
    });
  }
}
