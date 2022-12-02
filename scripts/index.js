const popupElement = document.querySelector('.popup');
const cardsContainer = document.querySelector('.cards__list'); // ul
// ПОПАП редактировать профиль
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupOpenEditButton = document.querySelector('.profile__edit-button');
const popupCloseEditButton = popupElement.querySelector('.popup__button-close');
const formEditProfile = popupElement.querySelector('.popup__form_edit-profile');
const popupNameInput = popupElement.querySelector('.popup__text_type_name');
const popupJobInput = popupElement.querySelector('.popup__text_type_job');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
// ПОПАП добавить новое место
const popupAddPlace = document.querySelector('.popup_type_add-place');
const popupAddPlaceButton = document.querySelector('.profile__add-button');
const popupCloseAddPlaceButton = popupAddPlace.querySelector('.popup__button-close');
const formAddPlace = document.querySelector('.popup__form_add-place');
const popupCardNameInput = document.querySelector('.popup__text_type_card-name');
const popupLinkInput = document.querySelector('.popup__text_type_link');
// ПОПАП увеличить изображение
const popupIncreaseImage = document.querySelector('.popup_type_increase-img');
const popupImage = document.querySelector('.popup__cards-image');
const popupImageCloseButton = popupIncreaseImage.querySelector('.popup__button-close');
const popupImageName = document.querySelector('.popup__cards-name');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
];

// Выстраиваем карточки из массива (template)
const createCard = (dataCard) => {
  const cardTemplate = document.querySelector('#cards-template').content.querySelector('.cards__card').cloneNode(true);
  const cardName = cardTemplate.querySelector('.cards__name');
  const cardImage = cardTemplate.querySelector('.cards__image');
  cardImage.src = dataCard.link;
  cardName.textContent = dataCard.name;

  // Удалить карточку, поставить лайк
  const deleteButton = cardTemplate.querySelector('.cards__delete');
  const likeButton = cardTemplate.querySelector('.cards__icon-heart');

  deleteButton.addEventListener('click', function(e) {
    e.target.closest('.cards__card').remove();
  });

  likeButton.addEventListener('click', function(e) {
    e.target.classList.toggle('cards__icon-heart_is-active');
  });

  // Открыть картинки в попапе
  cardImage.addEventListener('click', function () {
    popupImage.src = dataCard.link;
    popupImage.alt = dataCard.name;
    popupImageName.textContent = dataCard.name;
    openPopup(popupIncreaseImage);
  });

  return cardTemplate;
}
initialCards.forEach((dataCard) => {
  createCard(dataCard);
});

// Для добавления новой карточки в верстку
const renderCard = (dataCard, cardContainer) => {
  const cardNewElement = createCard(dataCard);
  cardContainer.prepend(cardNewElement);
}
initialCards.forEach(function(dataCard) {
  renderCard(dataCard, cardsContainer);
});

// Открытие попапов
const openPopup = function(popup) {
  popup.classList.add('popup_opened');
}

// Закрытие попапов
const closePopup = function(popup) {
  popup.classList.remove('popup_opened');
}

// СЛУШАТЕЛИ
popupOpenEditButton.addEventListener('click', () => {
  openPopup(popupEditProfile);
  popupNameInput.value = profileName.textContent;
  popupJobInput.value = profileAbout.textContent;
});

popupCloseEditButton.addEventListener('click', () => {
    closePopup(popupEditProfile);
});

popupAddPlaceButton.addEventListener('click', () => {
  openPopup(popupAddPlace);
});

popupCloseAddPlaceButton.addEventListener('click', () => {
  closePopup(popupAddPlace);
});

popupImageCloseButton.addEventListener('click', () => {
  closePopup(popupIncreaseImage);
});

// ОБРАБОТЧИКИ СОБЫТИЙ
// Возможность редактирования имени и информации о себе
const formEditProfileSubmitHandler = (event) => {
  event.preventDefault();
  profileName.textContent = popupNameInput.value;
  profileAbout.textContent = popupJobInput.value;
  closePopup(popupEditProfile);
}

// Возможность добавлять карточки
const formAddPlaceSubmitHandler = (evt) => {
  evt.preventDefault();
  // создаем объект, который будем передавать в renderCard
  const card = {
    name: popupCardNameInput.value,
    link: popupLinkInput.value
  }
  renderCard(card, cardsContainer);
  popupCardNameInput.value = '';
  popupLinkInput.value = '';
  closePopup(popupAddPlace);
}

// Прикрепляем обработчики к форме:
formEditProfile.addEventListener('submit', formEditProfileSubmitHandler);
formAddPlace.addEventListener('submit', formAddPlaceSubmitHandler);
