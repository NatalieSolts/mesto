// Класс Api , внутри которого описаны запросы к серверу

export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // Загрузка информации о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    // если ошибка, отклоняем промис:
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  }

   // Редактирование профиля
  sendUserInfo(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.job
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.message}`))
  }

  // Обновление аватара пользователя
  updateAvatar(userData) {
    return fetch(`${this._baseUrl}/users/me/avatar/`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: userData.avatar
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.message}`))
  }

  // Загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards/`, {
        headers: this._headers
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.message}`))
  }

  // Добавление новой карточки
  addNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards/`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.message}`))
  }

  // Удаление карточки
  deleteCard(_id) {
    return fetch(`${this._baseUrl}/cards/`+ _id, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.message}`))
  }

  // Постановка лайка карточки
  addLike(_id) {
    return fetch(`${this._baseUrl}/cards/likes/`+ _id, {
      method: 'PUT',
      headers: this._headers
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.message}`))
  }

  // Снятие лайка
  deleteLike(_id) {
    return fetch(`${this._baseUrl}/cards/likes/`+ _id, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.message}`))
  }


}


