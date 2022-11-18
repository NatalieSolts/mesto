const popupElement = document.querySelector('.popup');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const popupCloseButtonElement = popupElement.querySelector('.popup__button-close');

const formElement = popupElement.querySelector('.popup__form');
const popupNameInput = popupElement.querySelector('.popup__text_name');
const popupJobInput = popupElement.querySelector('.popup__text_job');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

const popupSaveButtonElement = popupElement.querySelector('.popup__button-submit');

const openPopup = function() {
  popupElement.classList.add('popup_is-opened');
  popupNameInput.value = profileName.textContent;
  popupJobInput.value = profileAbout.textContent;
}

const closePopup = function() {
  popupElement.classList.remove('popup_is-opened');
}

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = popupNameInput.value;
  profileAbout.textContent = popupJobInput.value;
  closePopup();
}
formElement.addEventListener('submit', formSubmitHandler);
