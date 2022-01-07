import PhotographerFactory from '../factories/photographer.js';

export default class Media {
  constructor(data) {
    this.id = data.id;
    this.photographerId = data.photographerId;
    this.title = data.title;
    this.likes = data.likes;
    this.date = data.date;
    this.price = data.price;
    this.mediaLiked = data.mediaLiked || false;
  }

  incrementLikes() {
    this.likes += 1;
  }

  decrementLikes() {
    this.likes -= 1;
  }

  displayLike(mediaCard) {
    const $wrapper = mediaCard.querySelector('data');
    $wrapper.innerText = this.likes;
  }

  getLiked(mediaCard) {
    const icon = mediaCard.querySelector('i');

    mediaCard
      .querySelector('.media__article__desc__like__icon')
      .addEventListener('click', () => {
        if (icon.classList.contains('far')) {
          icon.classList.replace('far', 'fas');
          this.mediaLiked = true;
          this.incrementLikes();
        } else {
          icon.classList.replace('fas', 'far');
          this.mediaLiked = false;
          this.decrementLikes();
        }
        this.displayLike(mediaCard);
        PhotographerFactory.displaySumLikes();
      });
  }
}
