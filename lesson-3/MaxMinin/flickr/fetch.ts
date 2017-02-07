// https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch

// `${this.uri}method=${this.qyeryMethod}&api_key=${this.apiKey}&text=${text}&page=1&format=json&nojsoncallback=1`
// https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg
// uri: 'https://api.flickr.com/services/rest/?',
//     queryMethod: 'flickr.photos.search',
//     apiKey: 'df05722919e95bb8904ef25378484604'

declare const _;

// Q , lodash
type opt = {
  elem: HTMLDivElement,
  uri: string,
  queryMethod: string,
  apiKey: string
};

type cdFunction = (body: IJsonResponse) => void;

class Flickr {
  protected elem: HTMLDivElement;
  protected input: HTMLInputElement;
  protected searchButton: HTMLButtonElement;
  protected imagesBox: HTMLDivElement;
  protected uri: string;
  protected queryMethod: string;
  protected apiKey: string;

  protected photos: IPhoto[];

  public constructor(opt: opt) {

    this.elem = opt.elem;
    this.uri = opt.uri;
    this.apiKey = opt.apiKey;
    this.queryMethod = opt.queryMethod;
    this.input = document.querySelector('.flickr-search-input') as HTMLInputElement;
    this.imagesBox = document.querySelector('.image-area') as HTMLDivElement;
    this.searchButton = document.querySelector('.flickr-search-button') as HTMLButtonElement;

    this.searchButton.addEventListener('click', this.search.bind(this, _.debounce(this.render.bind(this), 500)));
  }


  protected render(body: IJsonResponse): void {
    this.photos = _.sortBy(body.photos.photo, ['title']);
    let content = ``;
    for (let photo of this.photos) {
      content += `<br>
        <div class="image-box">
            <img src="https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg" />
            <p>Заголовок: ${photo.title}</p>
            <p>Владелец: ${photo.owner}</p>
        </div>`;
    }
    this.imagesBox.innerHTML = content;
  }

  protected search(cb: cdFunction): void {
    if (!this.input.value) {
      return;
    }
    let text = this.input.value;
    let url = new Request(`${this.uri}method=${this.queryMethod}&api_key=${this.apiKey}&text=${text}&page=1&format=json&nojsoncallback=1`);
    this.getPhotos(url, cb);
  }

  protected getPhotos(input: string|IRequest, cb: cdFunction): void {
    fetch(input).then(
        (res: IResponse): Promise<IJsonResponse> => {
          return res.json()
        }
      )
      .then(cb);
  }
}

let elem = document.querySelector('.flickr-box') as HTMLDivElement;

new Flickr({
  elem,
  uri: 'https://api.flickr.com/services/rest/?',
  queryMethod: 'flickr.photos.search',
  apiKey: 'df05722919e95bb8904ef25378484604'
});