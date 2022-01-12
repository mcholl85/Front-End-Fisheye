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

  getIdFromURL() {
    const params = this.url.searchParams;
    return parseInt(params.get('photographerId'), 10);
  }

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

    if (photograph != null) {
      PhotographerFactory.displayInfosPhotographer(
        this.photographerData.photographers,
        this.id,
      );
    } else {
      window.location.replace(window.location.origin);
    }
    if (!['like', 'date', 'title'].includes(sorter)) {
      this.url.searchParams.set('sorting', 'like');
      window.history.pushState({}, '', this.url);
      sorter = 'like';
    }

    const sorting = new Sorter(mediaPhotographer, sorter);
    sorting.displaySorter();
    LocalStorage.save(this.photographerData);
  }
}

const app = new App();
app.main();
