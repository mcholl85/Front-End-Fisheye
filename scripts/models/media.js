import PhotographerFactory from '../factories/photographer.js';

export default class Media {
  // Create a media
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

  // displayLike takes an DOM mediaCard and display the data "likes"
  displayLike(mediaCard) {
    const $wrapper = mediaCard.querySelector('data');
    $wrapper.innerText = this.likes;
  }

  // getLiked takes an DOM mediaCard
  // add or remove a "like" when click on the icon
  getLiked(mediaCard) {
    const icon = mediaCard.querySelector('em');

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
        this.displayLike(mediaCard); // reload the value of the like
        PhotographerFactory.displaySumLikes(); // Change the values of the like's sum
      });
  }
}
