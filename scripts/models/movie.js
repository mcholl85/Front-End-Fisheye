import Media from './media.js';

export default class Movie extends Media {
  // create a Movie
  constructor(data) {
    super(data);
    this.video = data.video;
  }

  // get the url of the movie
  get link() {
    return `./assets/images/${this.video}`;
  }

  // mediaCard builds an element card with Movie's properties
  // and return it
  get mediaCard() {
    const article = document.createElement('article');
    // the poster is stored in the same folder with the same name
    const linkThumbnail = `${this.link.substring(
      0,
      this.link.lastIndexOf('.'),
    )}.jpg`;

    article.classList.add('media__article');
    article.innerHTML = `<a href="${this.link}" alt="${this.title}">
      <video class="media__article__video" autobuffer=true src="${
        this.link
      }" alt="${this.title}, vue rapprochée" poster="${linkThumbnail}"></video>
    </a>
    <footer class="media__article__desc">
      <h3 class="media__article__desc__title">${this.title}</h3>
      <div class="media__article__desc__like">
        <data value="${this.likes}" class="media__article__desc__like__value">${
      this.likes
    }</data>
    <button class="media__article__desc__like__icon" aria-label="likes">
      <i class="${this.mediaLiked ? 'fas' : 'far'} fa-heart"></i>
    </button>
      </div>
    </footer>
        `;
    return article;
  }
}
