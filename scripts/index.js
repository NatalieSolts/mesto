const popupElement = document.querySelector('.popup');
// Все ПОПАПЫ:
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddPlace = document.querySelector('.popup_type_add-place');
const popupIncreaseCard = document.querySelector('.popup_type_increase-card');
// ПОПАП редактировать профиль
const popupOpenEditButton = document.querySelector('.profile__edit-button');
const popupCloseEditButton = popupElement.querySelector('.popup__button-close');
const formEditProfile = popupElement.querySelector('.popup__form_edit-profile');
const popupNameInput = popupElement.querySelector('.popup__text_type_name');
const popupJobInput = popupElement.querySelector('.popup__text_type_job');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
// ПОПАП добавить новое место
const popupAddPlaceButton = document.querySelector('.profile__add-button');
const popupCloseAddPlaceButton = popupAddPlace.querySelector('.popup__button-close');
const formAddPlace = document.querySelector('.popup__form_add-place');
const popupCardNameInput = document.querySelector('.popup__text_type_card-name');
const popupLinkInput = document.querySelector('.popup__text_type_link');
const cardName = document.querySelector('.cards__name'); /*ссылка на название места в массив с карточками*/
const cardImage = document.querySelector('.cards__image'); /*ссылка на URL изображение места*/



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

// Выстраиваем карточки из массива
// 1. ВАРИАНТ с методом insertAdjacentHTML
// const cardsContainer = document.querySelector('.cards__list');
// const createCard = (dataCard) => {
//   cardsContainer.insertAdjacentHTML('beforeend', `
//     <li class="cards__card">
//       <img class="cards__image" src="${dataCard.link}">
//       <div class="cards__description">
//         <h2 class="cards__name">${dataCard.name}</h2>
//         <button class="cards__icon-heart button-hover" type="button"></button>
//       </div>
//     </li>
//   `)};
// initialCards.forEach((dataCard) => {
//   createCard(dataCard);
// });

// Выстраиваем карточки из массива
//  2. ВАРИАНТ (template)
const cardsContainer = document.querySelector('.cards__list');
const createCard = (dataCard) => {
  const cardTemplate = document.querySelector('#cards-template').content.querySelector('.cards__card').cloneNode(true);
  cardTemplate.querySelector('.cards__image').src = dataCard.link;
  cardTemplate.querySelector('.cards__name').textContent = dataCard.name;
  // cardImage.src = dataCard.link; не работает
  // cardName.textContent = dataCard.name;
  // cardsContainer.append(cardTemplate);
  return cardTemplate;
}
initialCards.forEach((dataCard) => {
  createCard(dataCard);
});

// Для добавления новОй карточки в верстку
const renderCard = (dataCard, cardContainer) => {
  const cardNewElement = createCard(dataCard);
  cardContainer.prepend(cardNewElement);
}
initialCards.forEach(function(dataCard) {
  renderCard(dataCard, cardsContainer);
});

// удалить карточку, поставить лайк, которые нихрена не работают
const deleteButton = document.querySelector('.cards__delete');
const likeButton = document.querySelector('.cards__icon-heart');
console.log(deleteButton);
console.log(likeButton);
//

// Возможность удаления карточки и лайки
const deleteButtonClickHandler = (e) => {
  e.target.closest('.cards__card').remove();
}
const likeButtonClickHandler = (e) => {
  e.target.classlist.toggle('.cards__icon-heart_is-active');
}

// обработчики кликов для кнопок лайка и удаления
deleteButton.addEventListener('click', deleteButtonClickHandler);
likeButton.addEventListener('click', likeButtonClickHandler);

// deleteButton.addEventListener('click', function(e) {
//   e.target.classList.toggle('.cards__icon-heart_is-active');
// });

// Открытие попапов
const openPopup = function(popup) {
  popup.classList.add('popup_opened');
}

// Закрытие попапов
const closePopup = function(popup) {
  popup.classList.remove('popup_opened');
}

// Слушатели
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

// Возможность удаления карточки и лайки


// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEditProfile.addEventListener('submit', formEditProfileSubmitHandler);
formAddPlace.addEventListener('submit', formAddPlaceSubmitHandler);

