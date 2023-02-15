export default class Card {
  constructor(dataCard, userId, selector, handleCardClick, {handleDeleteCard, handleLikeClick}) {
    this._dataCard = dataCard;
    this._name = dataCard.name;
    this._link = dataCard.link;
    this._cardId = dataCard._id;
    this._likes = dataCard.likes;
    this._userId = userId;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeClick = handleLikeClick;
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
    this._likeCounter = this._card.querySelector('.cards__number-of-likes');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardName.textContent = this._name;

    this._setEventListeners();

// отображение корзины только на своих карточках:
    if (this._dataCard.owner._id !== this._userId) {
      this._card.querySelector('.cards__delete').classList.add('cards__delete_hidden')
    }

    this._updateLikesView();

    return this._card;
  }

  // Отображение количество лайков карточки и переключает фон у лайка
  _updateLikesView() {
    this._likeCounter.textContent = this._likes.length;
    if (this.isLiked()) {
      this._likeButton.classList.add('cards__icon-heart_is-active')
    } else {
      this._likeButton.classList.remove('cards__icon-heart_is-active')
    }
  }

  // сообщает, есть ли на карточке лайк
  isLiked() {
    return Boolean(this._likes.some(user => user._id === this._userId));
  }

  likesCounter(numOfLikes) {
    this._likes = numOfLikes;
    this._updateLikesView();
  }

  deleteClick() {
    this._card.remove();
    this._card = null;
  }

   _setEventListeners = () => {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this._cardId);
    });
    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteCard(this._cardId);
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  };
}
