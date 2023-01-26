// ## Создайте класс `UserInfo`

// Класс `UserInfo` отвечает за управление отображением информации о пользователе на странице. Этот класс:

// - Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
// - Содержит публичный метод `getUserInfo`, который возвращает объект с данными пользователя.
// Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
// - Содержит публичный метод `setUserInfo,` который принимает новые данные пользователя и добавляет их на страницу.

export default class UserInfo {
  constructor({ userNameSelector, userJobSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
  }

  // возвращает объект с данными пользователя
  getUserInfo() {
    return {
      name: this._userName.textContent,
      job: this._userJob.textContent
    };
  }

  // принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(name, job) {
    this._userName.textContent = name;
    this._userJob.textContent = job;
  }
}
