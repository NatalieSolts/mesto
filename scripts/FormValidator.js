export default class FormValidator {
  constructor(obj, formElement) {
    this._formSelector = obj.formSelector;
    this._inputSelector = obj.inputSelector;
    this._submitButtonSelector = obj.submitButtonSelector;
    this._inactiveButtonClass = obj.inactiveButtonClass;
    this._inputErrorClass = obj.inputErrorClass;
    this._errorClass = obj.errorClass;
    this._form = formElement;
  }

  // функция, которая добавляет класс с ошибкой
  _showInputError = (inputSelector, errorMessage) => {
    const errorElement = document.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  // функция, которая скрывает класс с ошибкой
  _hideInputError = (inputSelector) => {
    const errorElement = document.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  // Проверяем валидность поля
  _isValid = (inputSelector) => {
    if (!inputSelector.validity.valid) {
      this._showInputError(inputSelector, inputSelector.validationMessage);
    } else {
      this._hideInputError(inputSelector);
    }
  };

  // Функция принимает массив полей и проверяет наличие невалидного поля
  _hasInvalidInput(inputList) {
    return inputList.some((inputSelector) => {
      return !inputSelector.validity.valid;
    });
  };

  // Функция, которая меняет состояние кнопки
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = 'disabled';
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = '';
    }
  };

  enableValidation () {
    const formList = [...document.querySelectorAll(this._formSelector)];
    formList.forEach(form => {
      const inputList = [...form.querySelectorAll(this._inputSelector)];
      const buttonElement = form.querySelector(this._submitButtonSelector);
      //  проходим по всем инпутам в форме
      inputList.forEach(inputSelector => {
        inputSelector.addEventListener('input', () => {
          this._isValid(inputSelector);
          this._toggleButtonState(inputList, buttonElement);
        });
      });
    });
  };
}
