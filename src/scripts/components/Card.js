export default class Card {
  constructor(dataCard, selector, handleCardClick) {
    this._name = dataCard.name;
    this._link = dataCard.link;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardTemplate = document
    .querySelector(this._selector)
    .content
    .querySelector('.cards__card')
    .cloneNode(true);

    return cardTemplate;
  }

  // Выстраиваем карточки из массива (template)
  createCard() {
    this._card = this._getTemplate();
    this._cardName = this._card.querySelector('.cards__name');
    this._cardImage = this._card.querySelector('.cards__image');
    this._likeButton = this._card.querySelector('.cards__icon-heart');
    this._deleteButton = this._card.querySelector('.cards__delete');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardName.textContent = this._name;

    this._setEventListeners();

    return this._card;
  }

  _likeClick() {
    this._likeButton.classList.toggle('cards__icon-heart_is-active');
  }

  _deleteClick() {
    this._deleteButton.closest('.cards__card').remove();
  }

   _setEventListeners = () => {
    this._likeButton.addEventListener('click', () => {
      this._likeClick();
    });
    this._deleteButton.addEventListener('click', () => {
      this._deleteClick();
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  };
}
