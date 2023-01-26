// Класс `UserInfo` отвечает за управление отображением информации о пользователе на странице.

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
