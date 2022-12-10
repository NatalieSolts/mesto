// включение валидации вызовом enableValidation
// все настройки передаются при вызове

const obj = {
    formSelector: '.popup__form', //селектор формы
    inputSelector: '.popup__input', //селектор инпутов внутри этой формы
    submitButtonSelector: '.popup__button-submit',  //селектор кнопки сабмита этой формы
    inactiveButtonClass: '.popup__button-submit_disabled', //селектор контейнеров для ошибок этой формы
    inputErrorClass: '.popup__input_type_error', //класс модификатор для инпутов при возникновении ошибки
    errorClass: '.popup__error_visible' //класс модификатор для дизэйбла кнопки
  };

  // функция, которая добавит обработчики всем полям формы
  const setEventListeners = (formElement) => {

  }

  const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'))
    console.log(formList);

    formList.forEach((formElement) => {
        setEventListeners(formElement);
    });
  };




