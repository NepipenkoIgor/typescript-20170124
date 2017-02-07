type opt = {
  elem: HTMLDivElement,
  uri: string,
  queryMethod: string,
  apiKey: string,
  debounceDuration?: number,
  perPage?: number,
  sortBy?: string
};

class Flickr {
  protected elem: HTMLDivElement;
  protected input: HTMLInputElement;
  protected searchButton: HTMLButtonElement;
  protected imagesBox: HTMLDivElement;
  protected uri: string;
  protected queryMethod: string;
  protected apiKey: string;
  protected debounceDuration: number;
  protected perPage: number;
  protected sortBy: string;
  protected photos: IPhoto[];

  public constructor(opt: opt) {

    this.elem = opt.elem;
    this.uri = opt.uri;
    this.apiKey = opt.apiKey;
    this.queryMethod = opt.queryMethod;
    this.input = document.querySelector('.flickr-search-input') as HTMLInputElement;
    this.imagesBox = document.querySelector('.image-area') as HTMLDivElement;
    this.searchButton = document.querySelector('.flickr-search-button') as HTMLButtonElement;
    this.debounceDuration = opt.debounceDuration || 300;
    this.perPage = opt.perPage || 10;
    this.sortBy = opt.sortBy || 'date-posted-asc';

    // click
    this.searchButton.addEventListener('click', _.debounce(() => {
      this.search()
          .then(this.render.bind(this));
    }, this.debounceDuration).bind(this));

    // keydown
    this.input.addEventListener('keydown', _.debounce((e: KeyboardEvent) => {
        let keyCodeEnter: number = 13;
        if (e.keyCode === keyCodeEnter) {
          this.search()
              .then(this.render.bind(this));
        }
    }, this.debounceDuration).bind(this));
  }

  protected render(body: IBodyPhotos): void {
    this.photos = body.photos.photo;
    let content = ``;
    for (let photo of this.photos) {
      content += `<div class="image-box">
                  <img src="https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg" />
                  <p>${photo.title}</p>
                  <p>Author: ${photo.owner}</p>
                  </div>`;
    }
    this.imagesBox.innerHTML = content;
  }

  protected search(): Promise<IBodyPhotos> {
    let text = this.input.value;
    let url = new Request(`${this.uri}method=${this.queryMethod}&api_key=${this.apiKey}&text=${text}&sort=${this.sortBy}&per_page=${this.perPage}&page=1&format=json&nojsoncallback=1`);

    return fetch(url)
        .then((res: IResponse): Promise<IBodyPhotos> => res.json());
  }
}

let elem = document.querySelector('.flickr-box') as HTMLDivElement;

new Flickr({
  elem,
  uri: 'https://api.flickr.com/services/rest/?',
  queryMethod: 'flickr.photos.search',
  apiKey: 'df05722919e95bb8904ef25378484604',
  debounceDuration: 500,
  perPage: 3,
  sortBy: 'date-posted-asc'
});
