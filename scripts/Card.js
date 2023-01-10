// Создайте класс Card, который создаёт карточку с текстом и ссылкой на изображение:
// принимает в конструктор её данные и селектор её template-элемента;
// содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
// содержит приватные методы для каждого обработчика;
// содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.
// Для каждой карточки создайте экземпляр класса Card.
import { popupIncreaseImage, openPopup } from './index.js'

export default class Card {
  constructor(dataCard, selector) {
    this._name = dataCard.name;
    this._link = dataCard.link;
    this._selector = selector;
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

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardName.textContent = this._name;

    this._setEventListeners();

    return this._card;
  }

  _likeClick() {
    this._card.querySelector('.cards__icon-heart').classList.toggle('cards__icon-heart_is-active');
  }

  _deleteClick() {
    this._card.querySelector('.cards__delete').closest('.cards__card').remove();
  }

  _openImage() {
      document.querySelector('.popup__cards-image').src = this._link;
      document.querySelector('.popup__cards-image').alt = this._name;
      document.querySelector('.popup__cards-name').textContent = this._name;
      openPopup(popupIncreaseImage);
    };

  _setEventListeners () {
    this._card.querySelector('.cards__icon-heart').addEventListener('click', () => {
      this._likeClick();
    });
    this._card.querySelector('.cards__delete').addEventListener('click', () => {
      this._deleteClick();
    });
    this._cardImage.addEventListener('click', () => {
      this._openImage();
    });
  };
}
