// Класс `UserInfo` отвечает за управление отображением информации
// о пользователе на странице.

export default class UserInfo {
  constructor({ userNameSelector, userJobSelector, avatarSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
    this._userAvatar = document.querySelector(avatarSelector);
  }

  // возвращает объект с данными пользователя
  getUserInfo() {
    return {
      name: this._userName.textContent,
      job: this._userJob.textContent,
    };
  }

  // возвращает ID пользователя
  getUserId() {
    return this._userId;
  }

  // принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(userData) {
    this._userName.textContent = userData.name;
    this._userJob.textContent = userData.about;
    this._userId = userData._id;
    this._userAvatar.src = userData.avatar;
  }

  setUserAvatar() {
    return this._userAvatar.src;
  }
}
