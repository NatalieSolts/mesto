// класс Section отвечает за отрисовку элементов на странице
export default class Section {
  constructor( {renderer}, containerSelector) {
    this._renderer = renderer; // renderer — это функция - Отрисовка каждого отдельного элемента
    this._cardContainer = document.querySelector(containerSelector);
  }

  // публичный метод, который отвечает за отрисовку всех элементов
  renderCards(items) {
      items.forEach((dataCard) => {
      this._renderer(dataCard); // вызываем renderer, передав dataCard
    });
  }

 // принимает параметр cardElement и вставляет его в контейнер методом prepend
  addCard(cardElement) {
    this._cardContainer.prepend(cardElement);
  }
}
