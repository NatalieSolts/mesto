import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import Popup from './components/Popup.js';
import PopupWithImage from './components/PopupWithImage.js';
import { obj } from './utils/validationObj.js';
import {
  initialCards,
  cardListSelector
} from './utils/constants.js';

// const popupList = document.querySelectorAll('.popup');
export const cardsContainer = document.querySelector('.cards__list'); // ul
// ПОПАП редактировать профиль
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupOpenEditButton = document.querySelector('.profile__edit-button'); // vv

const formEditProfile = popupEditProfile.querySelector('.popup__form_edit-profile');
const popupNameInput = popupEditProfile.querySelector('.popup__input_type_name');
const popupJobInput = popupEditProfile.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
// ПОПАП добавить новое место
const popupAddPlace = document.querySelector('.popup_type_add-place'); //

const popupAddPlaceButton = document.querySelector('.profile__add-button');
const formAddPlace = document.querySelector('.popup__form_add-place');
const popupCardNameInput = document.querySelector('.popup__input_type_card-name');
const popupLinkInput = document.querySelector('.popup__input_type_link');
// ПОПАП увеличить изображение
// const popupIncreaseImage = document.querySelector('.popup_type_increase-img');
// const popupImage = document.querySelector('.popup__cards-image');
// const popupImageName = document.querySelector('.popup__cards-name');

// Создание функции валидации
const formValidatorAddPlace = new FormValidator(obj, popupAddPlace);
const formValidatorEditProfile = new FormValidator(obj, popupEditProfile);

formValidatorAddPlace.enableValidation();
formValidatorEditProfile.enableValidation();

// функция для Card.js получает на вход данные карточки:
const handleCardClick = (name, link) => {
  popupWithImage.openPopup(name, link);
  // popupImage.src = link; // устанавливаем ссылку
  // popupImage.alt = name; // устанавливаем подпись картинке
  // popupImageName.textContent = name;
  // openPopup(popupIncreaseImage); // открываем попап универсальной функцией, которая навешивает обработчик Escape внутри себя
}


const cardList = new Section({
  items: initialCards,
  renderer: (dataCard) => { //функция - Отрисовка каждого отдельного элемента
    const card = new Card(dataCard, '#cards-template', handleCardClick);
    const cardElement = card.createCard();
    cardList.addCard(cardElement);
  }
}, cardListSelector); // Контейнер для добавления карточек

cardList.renderCards();


// для создания карточки
// const createCard = (dataCard) => {
//   const card = new Card(dataCard, '#cards-template', handleCardClick);
//   const cardElement = card.createCard();
//   return cardElement;
// }

// // Для добавления карточки в верстку
// const renderCard = (dataCard, cardContainer) => {
//   const cardElement = createCard(dataCard);
//   cardContainer.prepend(cardElement);
// }

// initialCards.forEach(function(dataCard) {
//   renderCard(dataCard, cardsContainer);
// });


// Открытие попапов
// const openPopup = function(popup) {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keyup', handleKeyUp);
// }

// Закрытие попапов
// const closePopup = function(popup) {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keyup', handleKeyUp);
// }

// Закрытие попапов + по клику на оверлэй
// popupList.forEach((popup) => {

  // popup.addEventListener('mousedown', (e) => {
  //   if (e.target.classList.contains('popup') || e.target.classList.contains('popup__button-close')) {
  //     closePopup(popup);
    // };
  // });
// });

// закрытие попапов клавишей Esc
// const handleKeyUp = function(evt) {
//   if (evt.key === 'Escape') {
//     const openPopup = document.querySelector('.popup_opened');
//     closePopup(openPopup);
//   };
// };


const addPlacePopup = new Popup('.popup_type_add-place');
const editProfilePopup = new Popup('.popup_type_edit-profile');
const popupWithImage = new PopupWithImage('.popup_type_increase-img');

addPlacePopup.setEventListeners();
editProfilePopup.setEventListeners();
popupWithImage.setEventListeners();


// СЛУШАТЕЛИ
popupOpenEditButton.addEventListener('click', () => {
  editProfilePopup.openPopup();
  // openPopup(popupEditProfile);
  popupNameInput.value = profileName.textContent;
  popupJobInput.value = profileAbout.textContent;
});

popupAddPlaceButton.addEventListener('click', () => {
  formValidatorAddPlace.resetValidation(); //для очистки ошибок и управления кнопкой
  addPlacePopup.openPopup();
  // openPopup(popupAddPlace);
});

// ОБРАБОТЧИКИ СОБЫТИЙ
// Возможность добавлять карточки
const handleFormSubmitAddPlace = (evt) => {
  evt.preventDefault();
  const submitButton = document.querySelector('.button-submit'); //находим кнопку
  // создаем объект, который будем передавать в renderCard:
  const cardNew = {
    name: popupCardNameInput.value,
    link: popupLinkInput.value
  }
  renderCard(cardNew, cardsContainer);
  evt.target.reset();
  formValidatorAddPlace.resetValidation(); // управляем кнопкой сабмита и очищаем поля формы от ошибок
  addPlacePopup.closePopup();
  // closePopup(popupAddPlace);
}

// Возможность редактирования имени и информации о себе
const handleFormSubmitEditProfile = (event) => {
  event.preventDefault();
  profileName.textContent = popupNameInput.value;
  profileAbout.textContent = popupJobInput.value;
  editProfilePopup.closePopup();
  // closePopup(popupEditProfile);
}

// Прикрепляем обработчики к форме:
formEditProfile.addEventListener('submit', handleFormSubmitEditProfile);
formAddPlace.addEventListener('submit', handleFormSubmitAddPlace);
