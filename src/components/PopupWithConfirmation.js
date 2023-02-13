import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  handleFormSubmitConfirmation(submit) {
    this._handleFormSubmitConfirmation = submit;
  }

  setEventsListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._handleFormSubmitConfirmation()
    })
    super.setEventsListeners();
  }
}
