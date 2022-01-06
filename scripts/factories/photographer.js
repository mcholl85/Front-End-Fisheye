import Photographer from '../models/photographer.js';
import Picture from '../models/picture.js';
import Movie from '../models/movie.js';

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
}
