import PhotographerFactory from '../factories/photographer.js';
import LocalStorage from '../utils/localStorage.js';
import Api from '../api/api.js';

class App {
  constructor() {
    this.$photographWrapper = document.querySelector('.photographer-section');
    this.allPhotographers = [];
  }

  // fetchData collects data in localStorage
  // if null, get from the json with the module Api
  async fetchData() {
    const localData = LocalStorage.get();
    if (localData) {
      this.allPhotographers = localData.photographers.map((photograph) =>
        PhotographerFactory.createUser(photograph),
      );
    } else {
      const data = await Api.getData();
      this.allPhotographers = data.photographers.map((photograph) =>
        PhotographerFactory.createUser(photograph),
      );
    }
  }

  async main() {
    await this.fetchData();

    // display all photographer's card
    this.allPhotographers.forEach((photograph) => {
      this.$photographWrapper.appendChild(photograph.userCard);
    });
  }
}

const app = new App();
app.main();
