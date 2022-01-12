export default class Api {
  // get all the data from json
  static async getData() {
    const url = './data/photographers.json';
    return fetch(url)
      .then((res) => res.json())
      .catch((err) => console.log('an error occurs', err));
  }
}
