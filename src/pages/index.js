import './index.css'; // добавили импорт главного файла стилей
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { validationConfig } from '../utils/validationConfig.js';
import {
  initialCards,
  cardListSelector, // Контейнер для добавления карточек
  popupEditProfile,
  popupOpenEditButton,
  popupAddPlace,
  popupAddPlaceButton,
} from '../utils/constants.js';

// --- ЭКЗЕМПЛЯРЫ ---

const formValidatorAddPlace = new FormValidator(validationConfig, popupAddPlace);
const formValidatorEditProfile = new FormValidator(validationConfig, popupEditProfile);
const popupWithImage = new PopupWithImage('.popup_type_increase-img');
const popupAddCard = new PopupWithForm('.popup_type_add-place', handleFormSubmitAddPlace);
const popupProfileEdit = new PopupWithForm('.popup_type_edit-profile', handleFormSubmitEditProfile);
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
  popupProfileEdit.setFormValues({ name, job });
  formValidatorEditProfile.resetValidation(); //для очистки ошибок и управления кнопкой
  popupProfileEdit.open();
}

// открывает попап добавления карточки
const handleFormAddPlaceOpen = () => {
  formValidatorAddPlace.resetValidation();
  popupAddCard.open();
}

// Возможность редактирования имени и информации о себе
function handleFormSubmitEditProfile(evt, values) {
  evt.preventDefault();
  userInfo.setUserInfo(values.name, values.job);
  popupProfileEdit.close();
}

// Возможность добавлять карточки
function handleFormSubmitAddPlace(evt, dataCard) {
  evt.preventDefault();
  renderCard(dataCard);
  formValidatorAddPlace.resetValidation(); // управляем кнопкой сабмита и очищаем поля формы от ошибок
  popupAddCard.close();
}

cardSection.renderCards();
formValidatorAddPlace.enableValidation();
formValidatorEditProfile.enableValidation();
popupWithImage.setEventListeners();
popupAddCard.setEventListeners();
popupProfileEdit.setEventListeners();

// --- СЛУШАТЕЛИ ---
popupOpenEditButton.addEventListener('click', handleFormEditProfileOpen);
popupAddPlaceButton.addEventListener('click', handleFormAddPlaceOpen);
