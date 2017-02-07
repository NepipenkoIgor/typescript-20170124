// https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch

// `${this.uri}method=${this.qyeryMethod}&api_key=${this.apiKey}&text=${text}&page=1&format=json&nojsoncallback=1`
// https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg
// uri: 'https://api.flickr.com/services/rest/?',
//     queryMethod: 'flickr.photos.search',
//     apiKey: 'df05722919e95bb8904ef25378484604'

// Q , lodash

// @TODO Сортировка по имени или названию (сортировка по title - сделана)
// @TODO Использование lodash - debounce на click по search
// @TODO Подключить Queue library

type opt = {
  elem: HTMLDivElement,
  uri: string,
  queryMethod: string,
  apiKey: string
};

type FnFlickrCallback = (body: IFlickrPhotoResponseBody) => void;

class Flickr {
  protected elem: HTMLDivElement;
  protected input: HTMLInputElement;
  protected searchButton: HTMLButtonElement;
  protected imagesBox: HTMLDivElement;
  protected uri: string;
  protected queryMethod: string;
  protected apiKey: string;

  protected photos: IFlickrPhoto[];

  public clsPerson = 'person';
  public constructor(opt: opt) {
    this.elem = opt.elem;
    this.uri = opt.uri;
    this.apiKey = opt.apiKey;
    this.queryMethod = opt.queryMethod;
    this.input = document.querySelector('.flickr-search-input') as HTMLInputElement;
    this.imagesBox = document.querySelector('.image-area') as HTMLDivElement;
    this.searchButton = document.querySelector('.flickr-search-button') as HTMLButtonElement;

    this.searchButton.addEventListener('click', this.search.bind(this, this.render.bind(this)));
    const enterKeyCode = 13;
    this.input.addEventListener('keydown', (ev) => {
      if (ev.keyCode === enterKeyCode) {
        let evClick: Event = new Event('click');
        this.searchButton.dispatchEvent(evClick);
      }
    });
  }

  protected findPersonEltById(id: string): HTMLElement | null {
    let sel = `.${this.clsPerson}[data-photo-id="${id}"`;
    return document.querySelector(sel) as HTMLElement | null;
  }

  protected renderPerson(id: string, person: IFlickrPerson): void {
    let elPerson: HTMLElement | null = this.findPersonEltById(id);
    if (elPerson !== null && typeof person.realname !== 'undefined') {
      elPerson.innerHTML = person.realname._content;
    }
  }

  protected render(body: IFlickrPhotoResponseBody): void {
    this.photos = body.photos.photo.sort((leftPhoto: IFlickrPhoto, rightPhoto: IFlickrPhoto) => {
      return leftPhoto.title === rightPhoto.title ? 0 : leftPhoto.title > rightPhoto.title ? 1 : -1;
    });
    let content = ``;
    for (let photo of this.photos) {
      this.getUserName(photo).then((responsePersonBody: IFlickrPersonResponseBody) => {
        this.renderPerson(photo.id, responsePersonBody.person);
      });
      content += `<div class="image-box">
<img src="https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg" />
<div>
  <strong>Owner's name: </strong>
  <span class="person" data-photo-id="${photo.id}"></span>
</div>
<p>${photo.title}</p>
</div>`;
    }
    this.imagesBox.innerHTML = content;
  }

  protected search(cb: FnFlickrCallback): void {
    if (!this.input.value) {
      return;
    }
    let text = this.input.value;
    let url = new Request(`${this.uri}method=${this.queryMethod}&api_key=${this.apiKey}&text=${text}&page=1&format=json&nojsoncallback=1`);
    this.getPhotos(url, cb);
  }

  protected getPhotos(input: string|IRequest, cb: (body: IFlickrPhotoResponseBody) => void): void {
    fetch(input).then((res: IResponse): Promise<IFlickrPhotoResponseBody> => res.json())
      .then(cb);
  }

  protected getUserName(photo: IFlickrPhoto): Promise<IFlickrPersonResponseBody> {
    let url = `${this.uri}method=flickr.people.getInfo&api_key=${this.apiKey}&user_id=${photo.owner}&format=json&nojsoncallback=1`;
    return fetch(url).then((res: IResponse): Promise<IFlickrPersonResponseBody> => res.json());
  }
}

let elem = document.querySelector('.flickr-box') as HTMLDivElement;

new Flickr({
  elem,
  uri: 'https://api.flickr.com/services/rest/?',
  queryMethod: 'flickr.photos.search',
  apiKey: 'df05722919e95bb8904ef25378484604'
});