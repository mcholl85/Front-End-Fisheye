import PhotographerFactory from '../factories/photographer.js';
import Api from '../api/api.js';
import Lightbox from '../utils/lightbox.js';
import LocalStorage from '../utils/localStorage.js';

class App {
  constructor() {
    this.photographersApi = new Api('./data/photographers.json');
    this.url = new URL(document.location);

    this.$mediaWrapper = document.querySelector('.media');
    this.$sorterWrapper = document.getElementsByName('sorter');

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
      const data = await this.photographersApi.get();
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

  photographerByID() {
    const id = this.getIdFromURL();
    const photographerIdExist = this.photographerData.photographers.some(
      (obj) => obj.id === id,
    );

    if (photographerIdExist) {
      return this.photographerData.photographers.find(
        (photographer) => photographer.id === id,
      );
    }
    window.location.replace(window.location.origin);
    return null;
  }

  mediaByPhotographerID() {
    const id = this.getIdFromURL();
    const photographerIdExist = this.photographerData.photographers.some(
      (obj) => obj.id === id,
    );

    if (photographerIdExist) {
      return this.photographerData.media.filter(
        (media) => media.photographerId === id,
      );
    }
    window.location.replace(window.location.origin);
    return null;
  }

  getIdFromURL() {
    const params = this.url.searchParams;
    return parseInt(params.get('photographerId'), 10);
  }

  getSorterFromURL() {
    const params = this.url.searchParams;
    return params.get('sorting');
  }

  displayUserInfos() {
    this.photographerByID().displayHeader();
    this.photographerByID().displayPrice();
    this.photographerByID().displayNameInForm();
  }

  displayMedia() {
    this.$mediaWrapper.innerHTML = '';
    const sorter = this.getSorterFromURL();
    const defaultSorter = 'like';
    let media;

    if (!sorter) {
      media = this.sortingMedia(defaultSorter);
      this.url.searchParams.set('sorting', defaultSorter);
      window.history.pushState({}, '', this.url);
    } else if (this.sortingMedia(sorter) === null) {
      this.url.searchParams.delete('sorting');
      window.history.pushState({}, '', this.url);
    } else {
      media = this.sortingMedia(sorter);
      const btnSelectedSorter = document.querySelector('.sorter__selected');
      let sorterText;
      switch (sorter) {
        case 'like':
          sorterText = 'Popularité';
          break;
        case 'date':
          sorterText = 'Date';
          break;
        case 'title':
          sorterText = 'Titre';
          break;
        default:
          throw new Error('invalid sorter');
      }
      btnSelectedSorter.innerText = sorterText;
    }

    media.forEach((m) => {
      const DOM = m.mediaCard;
      this.$mediaWrapper.appendChild(DOM);
    });
    PhotographerFactory.displaySumLikes();
    Lightbox.init();
  }

  displaySorter() {
    const btnSelectedSorter = document.querySelector('.sorter__selected');
    const listSorter = document.querySelector('.sorter__list');

    btnSelectedSorter.addEventListener('click', (e) => {
      e.target.style.display = 'none';
      listSorter.style.display = 'block';
    });

    this.$sorterWrapper.forEach((element) => {
      element.addEventListener('click', (e) => {
        const sorter = e.target.value;
        let sorterText;

        this.url.searchParams.set('sorting', sorter);
        window.history.pushState({}, '', this.url);
        switch (sorter) {
          case 'like':
            sorterText = 'Popularité';
            break;
          case 'date':
            sorterText = 'Date';
            break;
          case 'title':
            sorterText = 'Titre';
            break;
          default:
            throw new Error('invalid sorter');
        }
        btnSelectedSorter.innerText = sorterText;
        listSorter.style.display = 'none';
        btnSelectedSorter.style.display = 'block';
        this.displayMedia();
      });
    });
  }

  sortingMedia(sorter) {
    if (sorter === 'like') {
      return Array.from(this.mediaByPhotographerID()).sort(
        (a, b) => b.likes - a.likes,
      );
    }
    if (sorter === 'date') {
      return Array.from(this.mediaByPhotographerID()).sort(
        (a, b) => new Date(b.date) - new Date(a.date),
      );
    }
    if (sorter === 'title') {
      return Array.from(this.mediaByPhotographerID()).sort((a, b) =>
        a.title.localeCompare(b.title),
      );
    }
    return null;
  }

  async main() {
    try {
      await this.fetchData();
      this.displayUserInfos();
      this.displaySorter();
      this.displayMedia();
      LocalStorage.save(this.photographerData);
    } catch (e) {
      console.log(e);
    }
  }
}

const app = new App();
app.main();
