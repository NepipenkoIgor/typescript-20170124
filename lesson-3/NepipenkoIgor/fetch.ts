// https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch

// `${this.uri}method=${this.qyeryMethod}&api_key=${this.apiKey}&text=${text}&page=1&format=json&nojsoncallback=1`
// https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg
// uri: 'https://api.flickr.com/services/rest/?',
//     queryMethod: 'flickr.photos.search',
//     apiKey: 'df05722919e95bb8904ef25378484604'


// Q , lodash

import 'whatwg-fetch';


type opt = {
  elem: HTMLDivElement,
  uri: string,
  queryMethod: string,
  apiKey: string
};

export class Flickr {
  protected elem: HTMLDivElement;
  protected input: HTMLInputElement;
  protected searchButton: HTMLButtonElement;
  protected imagesBox: HTMLDivElement;
  protected uri: string;
  protected queryMethod: string;
  protected apiKey: string;

  protected photos: any[];

  public constructor(opt: opt) {

    this.elem = opt.elem;
    this.uri = opt.uri;
    this.apiKey = opt.apiKey;
    this.queryMethod = opt.queryMethod;
    this.input = document.querySelector('.flickr-search-input') as HTMLInputElement;
    this.imagesBox = document.querySelector('.image-area') as HTMLDivElement;
    this.searchButton = document.querySelector('.flickr-search-button') as HTMLButtonElement;

    this.searchButton.addEventListener('click', this.search.bind(this, this.render.bind(this)));
  }


  protected render(body: any): void {
    this.photos = body.photos.photo;
    let content = ``;
    for (let photo of this.photos) {
      content += `<div class="image-box">
<img src="https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg" />
<p>${photo.title}</p>
</div>`;
    }
    this.imagesBox.innerHTML = content;
  }

  protected search(cb: (body: any) => any): void {
    if (!this.input.value) {
      return;
    }
    let text = this.input.value;
    let url = new Request(`${this.uri}method=${this.queryMethod}&api_key=${this.apiKey}&text=${text}&page=1&format=json&nojsoncallback=1`);
    this.getPhotos(url, cb);
  }

  protected getPhotos(input: string|Request, cb: (body: any) => any): void {
    fetch(input).then((res: Response): Promise<any> => res.json())
      .then(cb);
  }
}
