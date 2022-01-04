class Photographer {
  constructor(data) {
    this.name = data.name;
    this.id = data.id;
    this.city = data.city;
    this.country = data.country;
    this.tagline = data.tagline;
    this.price = data.price;
    this.portrait = data.portrait;
  }

  getPortrait() {
    return `./assets/photographers/${this.portrait}`;
  }

  get userCardDOM() {
    const $wrapper = document.createElement("article");
    const photographCard = `
      <a href="./photographer.html?photographerId=${this.id}">
        <img class="user" src="${this.getPortrait()}" alt="portrait du photographe : ${
      this.name
    }"/>
        <h2>${this.name}</h2>
      </a>
      <p class="city">${this.city}</p>
      <p class="tagline">${this.tagline}</p>
      <p class="price">${this.price}€/jour</p>
      `;
    $wrapper.innerHTML = photographCard;

    return $wrapper;
  }

  get photographHeaderDOM() {
    // Retourne le header du photographe
    const $wrapper = document.querySelector(".photograph-header");
    const headerDOM = `
    <div class="photograph-header__desc">
      <h1 class="photograph-header__desc__name">${this.name}</h1>
      <h2 class="photograph-header__desc__city">${this.city}</h2>
      <p class="photograph-header__desc__tagline">${this.tagline}</p>
    </div>
    <button class="contact_button" onclick="displayModal()">
      Contactez-moi
    </button>
    <img class="user" src="${this.getPortrait()}" alt="portrait du photographe :${
      this.name
    }" />`;
    $wrapper.innerHTML = headerDOM;
  }
}
