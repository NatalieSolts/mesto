import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
  }

  handleFormSubmitConfirmation(submit) {
    this._handleFormSubmitConfirmation = submit;
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._handleFormSubmitConfirmation()
    });
    super.setEventListeners();
  }
}
