import PhotographerFactory from '../factories/photographer.js';

export default class Sorter {
  constructor(media, sorter) {
    this.media = media;
    this.sorter = sorter;
    this.$sorterWrapper = document.getElementsByName('sorter');
  }

  mediaSorted() {
    if (this.sorter === 'like') {
      return Array.from(this.media).sort((a, b) => b.likes - a.likes);
    }
    if (this.sorter === 'date') {
      return Array.from(this.media).sort(
        (a, b) => new Date(b.date) - new Date(a.date),
      );
    }
    if (this.sorter === 'title') {
      return Array.from(this.media).sort((a, b) =>
        a.title.localeCompare(b.title),
      );
    }
    return null;
  }

  getSorterName() {
    let sorterText;

    switch (this.sorter) {
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
        sorterText = '';
    }
    return sorterText;
  }

  loadButton() {
    const url = new URL(document.location);
    const sorterName = this.getSorterName(this.sorter);
    const btnSelectedSorter = document.querySelector('.sorter__selected');
    const listSorter = document.querySelector('.sorter__list');

    listSorter.setAttribute('aria-activedescendant', this.sorter);
    btnSelectedSorter.innerText = sorterName;
    btnSelectedSorter.addEventListener('click', (e) => {
      e.target.style.display = 'none';
      e.target.setAttribute('aria-expanded', 'true');
      listSorter.style.display = 'block';
    });
    this.$sorterWrapper.forEach((element) => {
      if (element.id === this.sorter) {
        element.setAttribute('aria-selected', 'true');
      } else {
        element.setAttribute('aria-selected', 'false');
      }
      element.addEventListener('click', (e) => {
        this.sorter = e.target.id;
        this.media = this.mediaSorted();

        url.searchParams.set('sorting', this.sorter);
        window.history.pushState({}, '', url);
        btnSelectedSorter.innerText = this.getSorterName(this.sorter);
        listSorter.style.display = 'none';
        btnSelectedSorter.style.display = 'block';
        btnSelectedSorter.setAttribute('aria-expanded', 'false');

        this.displaySorter();
      });
    });
  }

  displaySorter() {
    this.loadButton();
    PhotographerFactory.displayMedia(this.mediaSorted());
  }
}
