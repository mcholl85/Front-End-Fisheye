import PhotographerFactory from '../factories/photographer.js';

export default class Sorter {
  // create a sorter
  constructor(media, sorter) {
    this.media = media;
    this.sorter = sorter;
    this.$sorterWrapper = document.getElementsByName('sorter');
  }

  // mediaSorted returns a object array based on the sorter value
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

  // getSorterName returns the name of the sort
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

  // loadButton the DOM of the sort
  loadButton() {
    const url = new URL(document.location);
    const sorterName = this.getSorterName(this.sorter);
    const btnSelectedSorter = document.querySelector('.sorter__selected');
    const listSorter = document.querySelector('.sorter__list');

    // load the name of the sort
    btnSelectedSorter.innerText = sorterName;
    listSorter.setAttribute('aria-activedescendant', this.sorter);

    btnSelectedSorter.addEventListener('click', (e) => {
      e.target.style.display = 'none'; // hide the button
      e.target.setAttribute('aria-expanded', 'true');
      listSorter.style.display = 'block'; // show the list of sort
      document.getElementById('like').focus(); // focus the first elt of the list
    });
    this.$sorterWrapper.forEach((element) => {
      // select the active sorter
      if (element.id === this.sorter) {
        element.setAttribute('aria-selected', 'true');
      } else {
        element.setAttribute('aria-selected', 'false');
      }

      // when sorter is selected, media are sorted
      // change sorting's params url and refresh the DOM
      element.addEventListener('click', (e) => {
        this.sorter = e.target.id;
        this.media = this.mediaSorted();

        url.searchParams.set('sorting', this.sorter);
        window.history.pushState({}, '', url);

        // hide the list and show the button
        listSorter.style.display = 'none';
        btnSelectedSorter.style.display = 'block';
        btnSelectedSorter.setAttribute('aria-expanded', 'false');
        btnSelectedSorter.focus();

        this.displaySorter();
      });
    });
  }

  // display sorter and gallery media sorted
  displaySorter() {
    this.loadButton();
    PhotographerFactory.displayMedia(this.mediaSorted());
  }
}
