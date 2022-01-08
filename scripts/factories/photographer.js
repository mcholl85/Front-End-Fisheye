import Photographer from '../models/photographer.js';
import Picture from '../models/picture.js';
import Movie from '../models/movie.js';
import Lightbox from '../utils/lightbox.js';

export default class PhotographerFactory {
  static createUser(data) {
    if (data.name) {
      return new Photographer(data);
    }
    throw new Error('Unknow type format');
  }

  static createMedia(data) {
    if (data.video) {
      return new Movie(data);
    }
    if (data.image) {
      return new Picture(data);
    }
    throw new Error('Unknow type format');
  }

  static idIsValid(photographers, id) {
    return photographers.some((photographer) => photographer.id === id);
  }

  static getPhotographerById(photographers, id) {
    if (this.idIsValid(photographers, id)) {
      return photographers.find((photographer) => photographer.id === id);
    }
    return null;
  }

  static getMediaByPhotographerId(allMedia, id) {
    return allMedia.filter((media) => media.photographerId === id);
  }

  static displayInfosPhotographer(photographers, id) {
    const photographer = this.getPhotographerById(photographers, id);
    photographer.displayHeader();
    photographer.displayPrice();
    photographer.displayNameInForm();
  }

  static displayMedia(media) {
    const $mediaWrapper = document.querySelector('.media');

    $mediaWrapper.innerHTML = '';
    media.forEach((m) => {
      $mediaWrapper.appendChild(m.mediaCard);
    });
    this.displaySumLikes();
    Lightbox.init();
  }

  static displaySumLikes() {
    const $wrapper = document.querySelector('.summary__likes');
    const arrayLikes = Array.from(
      document.querySelectorAll('.media__article__desc__like__value'),
    ).map((data) => parseInt(data.innerText, 10));
    const sumLikes = arrayLikes.reduce((a, b) => a + b);

    $wrapper.innerText = sumLikes;
  }
}
