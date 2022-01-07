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
}
