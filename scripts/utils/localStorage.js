export default class LocalStorage {
  static get() {
    return JSON.parse(localStorage.getItem('photographerData'));
  }

  static save(data) {
    const likeButtons = document.querySelectorAll(
      '.media__article__desc__like__icon',
    );
    likeButtons.forEach((button) => {
      button.addEventListener('click', () => {
        localStorage.setItem('photographerData', JSON.stringify(data));
      });
    });
  }
}
