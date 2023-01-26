export const initialCards = [
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

export const cardListSelector = '.cards__list';
export const cardsContainer = document.querySelector('.cards__list'); // ul
// ПОПАП редактировать профиль
export const popupEditProfile = document.querySelector('.popup_type_edit-profile');
export const popupOpenEditButton = document.querySelector('.profile__edit-button');

// ПОПАП добавить новое место
export const popupAddPlace = document.querySelector('.popup_type_add-place');
export const popupAddPlaceButton = document.querySelector('.profile__add-button');
export const popupCardNameInput = document.querySelector('.popup__input_type_card-name');
export const popupLinkInput = document.querySelector('.popup__input_type_link');
