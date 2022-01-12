import Photographer from '../models/photographer.js';
import Picture from '../models/picture.js';
import Movie from '../models/movie.js';
import Lightbox from '../utils/lightbox.js';

export default class PhotographerFactory {
  // createUser takes a params json
  // returns an object photographer if property name exists
  static createUser(data) {
    if (data.name) {
      return new Photographer(data);
    }
    throw new Error('Unknow type format');
  }

  // createUser takes a params json
  // returns a object Movie or Picture from data
  static createMedia(data) {
    // return Movie if property video exists
    if (data.video) {
      return new Movie(data);
    }
    // return Picture if property image exists
    if (data.image) {
      return new Picture(data);
    }
    throw new Error('Unknow type format');
  }

  // idValid takes an array of Photographer and a string id
  // checks if the id is in one of them, return a boolean
  static idIsValid(photographers, id) {
    return photographers.some((photographer) => photographer.id === id);
  }

  // getPhotographerById takes an array of Photographer and a string id
  // return the object photographer where the id matches
  static getPhotographerById(photographers, id) {
    if (this.idIsValid(photographers, id)) {
      return photographers.find((photographer) => photographer.id === id);
    }
    return null;
  }

  // getMediaByPhotographerId takes an array of Media and a string id
  // return a array of object Media where the id matches with photographerId
  static getMediaByPhotographerId(allMedia, id) {
    return allMedia.filter((media) => media.photographerId === id);
  }

  // displayInfosPhotographer takes an array of Media and a string id
  // get the object Photographer and launch the method to display its information
  static displayInfosPhotographer(photographers, id) {
    const photographer = this.getPhotographerById(photographers, id);
    photographer.displayHeader();
    photographer.displayPrice();
    photographer.displayNameInForm();
  }

  // displayMedia takes an array of Media
  // display the gallery of photographer's media
  static displayMedia(media) {
    const $mediaWrapper = document.querySelector('.media');

    $mediaWrapper.innerHTML = '';
    media.forEach((m) => {
      const card = m.mediaCard;
      m.getLiked(card); // init the eventListener "Liked"
      $mediaWrapper.appendChild(card);
    });
    this.displaySumLikes(); // displays the sum of the photographer's likes
    Lightbox.init(); // initializes the lightbox module
  }

  // displaySumLikes retrieve all the values of like, add them together
  // and display them in its wrapper
  static displaySumLikes() {
    const $wrapper = document.querySelector('.summary__likes');
    const arrayLikes = Array.from(
      document.querySelectorAll('.media__article__desc__like__value'),
    ).map((data) => parseInt(data.innerText, 10));
    const sumLikes = arrayLikes.reduce((a, b) => a + b);

    $wrapper.innerText = sumLikes;
  }
}
