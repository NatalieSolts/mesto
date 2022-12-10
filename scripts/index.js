const popupElement = document.querySelectorAll('.popup');
const cardsContainer = document.querySelector('.cards__list'); // ul
// ПОПАП редактировать профиль
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupOpenEditButton = document.querySelector('.profile__edit-button');
const popupCloseEditButton = popupEditProfile.querySelector('.popup__button-close');
const formEditProfile = popupEditProfile.querySelector('.popup__form_edit-profile');
const popupNameInput = popupEditProfile.querySelector('.popup__input_type_name');
const popupJobInput = popupEditProfile.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const cardTemplate = document.querySelector('#cards-template').content.querySelector('.cards__card');
// ПОПАП добавить новое место
const popupAddPlace = document.querySelector('.popup_type_add-place');
const popupAddPlaceButton = document.querySelector('.profile__add-button');
const popupCloseAddPlaceButton = popupAddPlace.querySelector('.popup__button-close');
const formAddPlace = document.querySelector('.popup__form_add-place');
const popupCardNameInput = document.querySelector('.popup__input_type_card-name');
const popupLinkInput = document.querySelector('.popup__input_type_link');
// ПОПАП увеличить изображение
const popupIncreaseImage = document.querySelector('.popup_type_increase-img');
const popupImage = document.querySelector('.popup__cards-image');
const popupImageCloseButton = popupIncreaseImage.querySelector('.popup__button-close');
const popupImageName = document.querySelector('.popup__cards-name');

// Выстраиваем карточки из массива (template)
const createCard = (dataCard) => {
  const card = cardTemplate.cloneNode(true);
  const cardName = card.querySelector('.cards__name');
  const cardImage = card.querySelector('.cards__image');
  cardImage.src = dataCard.link;
  cardImage.alt = dataCard.name;
  cardName.textContent = dataCard.name;

  // Удалить карточку, поставить лайк
  const buttonDelete = card.querySelector('.cards__delete');
  const buttonLike = card.querySelector('.cards__icon-heart');

  buttonDelete.addEventListener('click', function(e) {
    e.target.closest('.cards__card').remove();
  });

  buttonLike.addEventListener('click', function(e) {
    e.target.classList.toggle('cards__icon-heart_is-active');
  });

  // Открыть картинки в попапе
  cardImage.addEventListener('click', function () {
    popupImage.src = dataCard.link;
    popupImage.alt = dataCard.name;
    popupImageName.textContent = dataCard.name;
    openPopup(popupIncreaseImage);
  });

  return card;
}

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

// закрытие попапов клавишей Esc
// const keyHandler = function(evt) {
//   if (evt.key === 'Esc') {
//     popup.classList.remove('popup_opened');
//   }
//   console.log(evt);
// }

// СЛУШАТЕЛИ
popupOpenEditButton.addEventListener('click', () => {
  openPopup(popupEditProfile);
  popupNameInput.value = profileName.textContent;
  popupJobInput.value = profileAbout.textContent;
});

popupCloseEditButton.addEventListener('keydown', function(evt) {
  console.log(evt);
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
const handleFormSubmitEditProfile = (event) => {
  event.preventDefault();
  profileName.textContent = popupNameInput.value;
  profileAbout.textContent = popupJobInput.value;
  closePopup(popupEditProfile);
}

// Возможность добавлять карточки
const handleFormSubmitAddPlace = (evt) => {
  evt.preventDefault();
  // создаем объект, который будем передавать в renderCard
  const cardNew = {
    name: popupCardNameInput.value,
    link: popupLinkInput.value
  }
  renderCard(cardNew, cardsContainer);
  evt.target.reset(); //Очищает поля формы
  closePopup(popupAddPlace);
}

// Прикрепляем обработчики к форме:
formEditProfile.addEventListener('submit', handleFormSubmitEditProfile);
formAddPlace.addEventListener('submit', handleFormSubmitAddPlace);
