const obj = {
  formSelector: '.popup__form', //селектор формы
  inputSelector: '.popup__input', //селектор инпутов внутри этой формы
  submitButtonSelector: '.popup__button-submit',  //селектор кнопки сабмита этой формы
  inactiveButtonClass: 'popup__button-submit_disabled', //класс модификатор для дизэйбла кнопки
  inputErrorClass: 'popup__input_type_error', //класс модификатор для инпутов при возникновении ошибки
  errorClass: 'popup__error_visible' //селектор контейнеров для ошибок этой формы
};

// функция, которая добавляет класс с ошибкой
const showInputError = (formSelector, inputSelector, errorMessage, obj) => {
  const { inputErrorClass, errorClass } = obj;
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

// функция, которая скрывает класс с ошибкой
const hideInputError = (formSelector, inputSelector, obj) => {
  const { inputErrorClass, errorClass } = obj;
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

// Проверяем валидность поля
const isValid = (formSelector, inputSelector, obj) => {
  if (!inputSelector.validity.valid) {
    showInputError(formSelector, inputSelector, inputSelector.validationMessage, obj);
  } else {
    hideInputError(formSelector, inputSelector, obj);
  }
};

// Функция принимает массив полей и проверяет наличие невалидного поля
hasInvalidInput = (inputList) => {
  return inputList.some((inputSelector) => {
    return !inputSelector.validity.valid;
  });
};

// Функция, которая меняет состояние кнопки
const toggleButtonState = (inputList, buttonElement, obj) => {
  const { inactiveButtonClass } = obj;
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = 'disabled';
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = '';
  }
};

// функция, которая добавит обработчики всем полям формы
const setEventListeners = (formSelector, obj) => {
  const { inputSelector, submitButtonSelector, ...restObj } = obj;
  const inputList = [...formSelector.querySelectorAll(inputSelector)];
  const buttonElement = formSelector.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, restObj);
  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener('input', function () {
      isValid(formSelector, inputSelector, restObj);
      toggleButtonState(inputList, buttonElement, restObj);
    });
  });
};

const enableValidation = (obj) => {
  const { formSelector, ...restObj } = obj;
  const formList = [...document.querySelectorAll(formSelector)];
  formList.forEach((formSelector) => {
    setEventListeners(formSelector, restObj);
  });
};

enableValidation(obj);




