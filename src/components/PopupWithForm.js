import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._button = this._form.querySelector('.popup__button-submit')
  }

  // метод собирает данные всех полей формы
  _getInputValues() {
    const values = {}; // создаем пустой объект
    // собираем в него значения всех полей из формы
    this._inputList.forEach(input => {
      const name = input.name;
      const value = input.value;

      values[name] = value;
    });
    return values; //
  }

  // метод добавляет обработчик клика иконке закрытия и обработчик сабмита формы
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      this._handleFormSubmit(evt, this._getInputValues());
    });
  }

  // при закрытии попапа форма должна ещё и сбрасываться
  close() {
    super.close();
    this._form.reset();
  }

  setFormValues(values) {
    this._inputList.forEach(input => {
      const name = input.name;

      if(values[name]) {
        input.value = values[name]
      }
    });
  }

  //  уведомление пользователя о процессе загрузки,
  // меняется текст кнопки на: «Сохранение...»,
  // пока данные загружаются:
  setButtonText(text) {
    this._button.textContent = text;
  }
}
