export default class FormValidator {
  constructor({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }, formElement) {
    this._formSelector = formSelector;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._form = formElement;
    this._inputList = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
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
  _hasInvalidInput() {
    return this._inputList.some((inputSelector) => {
      return !inputSelector.validity.valid;
    });
  };

  // Функция, которая меняет состояние кнопки
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = 'disabled';
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = '';
    }
  };

  // Функция для очистки ошибок и управления кнопкой
  resetValidation() {
    this._toggleButtonState(); // управляем кнопкой

    this._inputList.forEach((inputSelector) => {
      this._hideInputError(inputSelector) //очищаем ошибки
    });
  }

  enableValidation () {
    this._toggleButtonState();
      //  проходим по всем инпутам в форме
    this._inputList.forEach(inputSelector => {
      inputSelector.addEventListener('input', () => {
        this._isValid(inputSelector);
        this._toggleButtonState();
      });
    });
  };
}
