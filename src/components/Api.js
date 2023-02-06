// Создан класс Api , внутри которого описаны запросы к серверу. Запросы к серверу не должны быть описаны
// внутри других классов или index.js
// Каждый метод, включающий обращение к серверу содержит return fetch , т.е возвращает объект Promise
// Все операции над DOM включены внутрь цепочки промисов.
// Ответ от сервера всегда проверяется на корректность:
// .then(res => {
// if (res.ok) {
// return res.json();
// }
// // если ошибка, отклоняем промис
// return Promise.reject(`Ошибка: ${res.status}`);
// });
// Каждый промис содержит обработку ошибок после обращения к серверу.
// Внутри класса Api не создаются экземпляры других классов, не вызываются методы других классов.
// Используется слабое связывание между классами.


export default class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
    }

    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers
      })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.message}`))

      .then((res) => {
        console.log(res)
      })
    }

    getInitialCards() {
      return fetch(`${this._baseUrl}/cards/`, {
          headers: this._headers
      })

      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.message}`))

      .then((res) => {
        console.log(res)
      })
    }

    // другие методы работы с API
  }




