import './index.css'; // добавили импорт главного файла стилей

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import { validationConfig } from '../utils/validationConfig.js';
import {
  cardListSelector, // Контейнер для добавления карточек
  popupEditProfile,
  popupOpenEditButton,
  popupAddPlace,
  popupAddPlaceButton,
  popupUpdateAva,
  popupUpdateAvatarButton
} from '../utils/constants.js';

// --- ЭКЗЕМПЛЯРЫ ---

const formValidatorAddPlace = new FormValidator(validationConfig, popupAddPlace);
const formValidatorEditProfile = new FormValidator(validationConfig, popupEditProfile);
const formValidatorUpdateAvatar = new FormValidator(validationConfig, popupUpdateAva)

const popupWithImage = new PopupWithImage('.popup_type_increase-img');

const popupAddCard = new PopupWithForm('.popup_type_add-place', handleFormSubmitAddPlace);
const popupProfileEdit = new PopupWithForm('.popup_type_edit-profile', handleFormSubmitEditProfile);
const popupUpdateAvatar = new PopupWithForm('.popup_type_update-avatar', handleFormSubmitUpdateAvatar);

const popupWithConfirmation = new PopupWithConfirmation('.popup_type_delete-card-confirmation');

const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userJobSelector: '.profile__about',
  avatarSelector: '.profile__avatar',
});

// класс Section отвечает за отрисовку элементов на странице
const cardSection = new Section({renderer: renderCard}, cardListSelector);

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: '93a90e29-0cdc-487a-9ed4-31b8026d8e92',
    'Content-Type': 'application/json'
  }
});

// Загрузка информации о пользователе и начальных карточек с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userRes, cardsRes]) => {
    userInfo.setUserInfo(userRes);
    cardSection.renderCards(cardsRes.reverse());
  })
  .catch(err => console.log(err))

// --- ФУНКЦИИ ---

// для создания карточки
const createCard = (dataCard) => {
  const card = new Card(dataCard, userInfo.getUserId(), '#cards-template', handleCardClick,
  {
    handleDeleteCard: (_id) => {
      popupWithConfirmation.open();
      popupWithConfirmation.handleFormSubmitConfirmation(() => {
        popupWithConfirmation.setButtonText('Удаление...')
        api.deleteCard(_id)
          .then(() => {
            card.deleteClick()
            popupWithConfirmation.close();
          })
          .catch(err => console.log(err))
          .finally(() => {
            popupWithConfirmation.setButtonText('Да')
          })
      })
    },
    handleLikeClick: (_id) => {
      if (card.isLiked() !== true) {
        api.addLike(_id)
        .then(res => {
          card.likesCounter(res.likes)
        })
        .catch(err => console.log(err))
      }
      else {
        api.deleteLike(_id)
          .then(res => {
            card.likesCounter(res.likes)
          })
          .catch(err => console.log(err))
      }
    }
  })
  return card.createCard()
}

// Отрисовка каждого отдельного элемента
function renderCard(dataCard) {
  cardSection.addCard(createCard(dataCard));
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

// открывает попап обновления аватара
const handleFormUpdateAvatarOpen = () => {
  formValidatorUpdateAvatar.resetValidation();
  popupUpdateAvatar.open();
}

// Возможность обновления аватара
function handleFormSubmitUpdateAvatar(evt, userData) {
  evt.preventDefault();
popupUpdateAvatar.setButtonText('Сохранение...')
api.updateAvatar(userData)
  .then((res) => {
    userInfo.setUserInfo(res);
    popupUpdateAvatar.close();
  })
  .catch(err => console.log(err))
  .finally(() => popupUpdateAvatar.setButtonText('Сохранить'))
}

// Возможность редактирования имени и информации о себе
function handleFormSubmitEditProfile(evt, userData) {
  evt.preventDefault();
  popupProfileEdit.setButtonText('Сохранение...')
  api.sendUserInfo(userData)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupProfileEdit.close();
    })
    .catch(err => console.log(err))
    .finally(() => popupProfileEdit.setButtonText('Сохранить'))
}

// Возможность добавлять карточки
function handleFormSubmitAddPlace(evt, {name, link}) {
  evt.preventDefault();
  popupAddCard.setButtonText('Сохранение...') //  уведомление пользователя о процессе загрузки
  api.addNewCard(name, link)
    .then(res => {
      renderCard(res)
      formValidatorAddPlace.resetValidation() // управляем кнопкой сабмита и очищаем поля формы от ошибок
      popupAddCard.close()
    })
    .catch(err => console.log(err))
    .finally(() => popupAddCard.setButtonText('Создать'))
}

formValidatorAddPlace.enableValidation();
formValidatorEditProfile.enableValidation();
formValidatorUpdateAvatar.enableValidation();
popupWithImage.setEventListeners();
popupAddCard.setEventListeners();
popupProfileEdit.setEventListeners();
popupUpdateAvatar.setEventListeners();
popupWithConfirmation.setEventListeners();

// --- СЛУШАТЕЛИ ---
popupOpenEditButton.addEventListener('click', handleFormEditProfileOpen);
popupAddPlaceButton.addEventListener('click', handleFormAddPlaceOpen);
popupUpdateAvatarButton.addEventListener('click', handleFormUpdateAvatarOpen);
