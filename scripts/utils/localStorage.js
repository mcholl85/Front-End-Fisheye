export default class LocalStorage {
  // collect data from the localStorage
  static get() {
    return JSON.parse(localStorage.getItem('photographerData'));
  }

  // save data into the localstorage when user clicks on a "like" icon
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
