import PhotographerFactory from '../factories/photographer.js';
import Api from '../api/api.js';
import LocalStorage from '../utils/localStorage.js';
import Sorter from '../utils/sorter.js';

class App {
  constructor() {
    this.url = new URL(document.location);
    this.id = this.getIdFromURL();

    this.photographerData = {};
  }

  // fetchData collects data in localStorage
  // if null, get from the json with the module Api
  async fetchData() {
    const localData = LocalStorage.get();
    if (localData) {
      this.photographerData = {
        photographers: localData.photographers.map((photograph) =>
          PhotographerFactory.createUser(photograph),
        ),
        media: localData.media.map((media) =>
          PhotographerFactory.createMedia(media),
        ),
      };
    } else {
      const data = await Api.getData();
      this.photographerData = {
        photographers: data.photographers.map((photograph) =>
          PhotographerFactory.createUser(photograph),
        ),
        media: data.media.map((media) =>
          PhotographerFactory.createMedia(media),
        ),
      };
    }
  }

  // getIdFromURL returns the value of 'photographerId' from the url
  getIdFromURL() {
    const params = this.url.searchParams;
    return parseInt(params.get('photographerId'), 10);
  }

  // getSorterFromURL return the value of 'sorting' from the url
  getSorterFromURL() {
    const params = this.url.searchParams;
    return params.get('sorting');
  }

  async main() {
    await this.fetchData();

    const mediaPhotographer = PhotographerFactory.getMediaByPhotographerId(
      this.photographerData.media,
      this.id,
    );
    const photograph = PhotographerFactory.getPhotographerById(
      this.photographerData.photographers,
      this.id,
    );
    let sorter = this.getSorterFromURL();

    // if photographerId does not exit, user is redirected to the homepage
    if (photograph != null) {
      PhotographerFactory.displayInfosPhotographer(
        this.photographerData.photographers,
        this.id,
      );
    } else {
      window.location.replace(window.location.origin);
    }

    // if the value of sorter is wrong, user is redirected to the default sorter : like
    if (!['like', 'date', 'title'].includes(sorter)) {
      this.url.searchParams.set('sorting', 'like');
      window.history.pushState({}, '', this.url);
      sorter = 'like';
    }

    // launch the module sorter
    const sorting = new Sorter(mediaPhotographer, sorter);
    sorting.displaySorter();

    LocalStorage.save(this.photographerData);
  }
}

const app = new App();
app.main();
