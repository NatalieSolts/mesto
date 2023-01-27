import './index.css'; // добавили импорт главного файла стилей
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { obj } from '../utils/validationObj.js';
import {
  initialCards,
  cardListSelector, // Контейнер для добавления карточек
  popupEditProfile,
  popupOpenEditButton,
  popupAddPlace,
  popupAddPlaceButton,
} from '../utils/constants.js';

// --- ЭКЗЕМПЛЯРЫ ---

const formValidatorAddPlace = new FormValidator(obj, popupAddPlace);
const formValidatorEditProfile = new FormValidator(obj, popupEditProfile);
const popupWithImage = new PopupWithImage('.popup_type_increase-img');
const addPlacePopup = new PopupWithForm('.popup_type_add-place', handleFormSubmitAddPlace);
const editProfilePopup = new PopupWithForm('.popup_type_edit-profile', handleFormSubmitEditProfile);
const userInfo = new UserInfo({ userNameSelector: '.profile__name', userJobSelector: '.profile__about'});

// класс Section отвечает за отрисовку элементов на странице
const cardSection = new Section({ items: initialCards, renderer: renderCard}, cardListSelector);

// --- ФУНКЦИИ ---

// для создания карточки
const createCard = (dataCard) => {
  return new Card(dataCard, '#cards-template', handleCardClick);
}

// Отрисовка каждого отдельного элемента
function renderCard(dataCard) {
  const card = createCard(dataCard);
  const cardElement = card.createCard();
  cardSection.addCard(cardElement);
}

// открывает попап с картинкой при клике на карточку
function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

// открывает попап редактирования профиля
const handleFormEditProfileOpen = () => {
  const { name, job } = userInfo.getUserInfo();
  editProfilePopup.setFormValues({ name, job });
  formValidatorEditProfile.resetValidation(); //для очистки ошибок и управления кнопкой
  editProfilePopup.open();
}

// открывает попап добавления карточки
const handleFormAddPlaceOpen = () => {
  formValidatorAddPlace.resetValidation();
  addPlacePopup.open();
}

// Возможность редактирования имени и информации о себе
function handleFormSubmitEditProfile(evt, values) {
  evt.preventDefault();
  userInfo.setUserInfo(values.name, values.job);
  editProfilePopup.close();
}

// Возможность добавлять карточки
function handleFormSubmitAddPlace(evt, dataCard) {
  evt.preventDefault();
  renderCard(dataCard);
  formValidatorAddPlace.resetValidation(); // управляем кнопкой сабмита и очищаем поля формы от ошибок
  addPlacePopup.close();
}

cardSection.renderCards();
formValidatorAddPlace.enableValidation();
formValidatorEditProfile.enableValidation();
popupWithImage.setEventListeners();
addPlacePopup.setEventListeners();
editProfilePopup.setEventListeners();

// --- СЛУШАТЕЛИ ---
popupOpenEditButton.addEventListener('click', handleFormEditProfileOpen);
popupAddPlaceButton.addEventListener('click', handleFormAddPlaceOpen);
