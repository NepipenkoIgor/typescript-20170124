// https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch

// `${this.uri}method=${this.qyeryMethod}&api_key=${this.apiKey}&text=${text}&page=1&format=json&nojsoncallback=1`
// https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg
// uri: 'https://api.flickr.com/services/rest/?',
//     queryMethod: 'flickr.photos.search',
//     apiKey: 'df05722919e95bb8904ef25378484604'


// Q , lodash

const DEBOUNCE_INTERVAL = 300;

type opt = {
  elem: HTMLDivElement,
  uri: string,
  queryMethod: string,
  apiKey: string
};

type FlickrPhoto = {
  id: string,
  farm: number,
  server: string,
  secret: string,
  title: string,
  owner: string
};

type FlickrPhotos = {
  page: number,
  pages: number,
  perpage: number,
  photo: FlickrPhoto[],
  total: string
};

type FlickrPhotoResponse = {
  photos: FlickrPhotos,
  stat: string
};

type FlickrPersonResponse = {
  person: FlickrPhotoOwner,
  stat: string
};

type Content = {
  _content: string
};

type FlickrPhotoOwner = {
  username: Content
  realname: Content
};

class Flickr {
  protected elem: HTMLDivElement;
  protected input: HTMLInputElement;
  protected searchButton: HTMLButtonElement;
  protected imagesBox: HTMLDivElement;
  protected uri: string;
  protected queryMethod: string;
  protected apiKey: string;

  protected photos: FlickrPhoto[];
  protected owners: {[id: string]: FlickrPhotoOwner};

  public constructor(opt: opt) {
    this.elem = opt.elem;
    this.uri = opt.uri;
    this.apiKey = opt.apiKey;
    this.queryMethod = opt.queryMethod;
    this.input = document.querySelector('.flickr-search-input') as HTMLInputElement;
    this.imagesBox = document.querySelector('.image-area') as HTMLDivElement;
    this.searchButton = document.querySelector('.flickr-search-button') as HTMLButtonElement;
    this.owners = {};

    this.searchButton.addEventListener('click', _.debounce(() => {
      this.search()
        .then(this.render.bind(this));
    }, DEBOUNCE_INTERVAL));
  }

  protected render(photos: FlickrPhotos): void {
    this.photos = Flickr.sort(photos.photo);
    let content = ``;
    for (let photo of this.photos) {
      content += `<div class="image-box">
<img src="https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg" />
<p>${photo.title + ' (owner: ' + this.getPhotoOwnerName(photo) + ')'}</p>
</div>`;
    }
    this.imagesBox.innerHTML = content;
  }

  protected search(): Promise<FlickrPhotos> {
    let promises: Promise<FlickrPhotoOwner>[] = [],
        response: FlickrPhotos;

    if (!this.input.value) {
      return Q.reject('No search query');
    }

    let text = this.input.value;
    let url = new Request(`${this.uri}method=${this.queryMethod}&api_key=${this.apiKey}&text=${text}&page=1&format=json&nojsoncallback=1`);
    return this.getPhotos(url)
      .then((res: FlickrPhotos) => {
        response = res;
        _.forEach(response.photo, (photo: FlickrPhoto) => {
          promises.push(this.getOwnerInfo(photo));
        });
        return Q.all(promises);
      })
      .then(() => response);
  }

  protected static sort(photos: FlickrPhoto[]): FlickrPhoto[] {
    return _.sortBy(photos, 'title');
  }

  protected getPhotos(input: string|IRequest): Promise<FlickrPhotos> {
    return fetch(input)
      .then((res: IResponse): Promise<FlickrPhotoResponse> => res.json())
      .then((res: FlickrPhotoResponse): FlickrPhotos => {
        return res.photos;
      });
  }

  protected getOwnerInfo(photo: FlickrPhoto): Promise<FlickrPhotoOwner> {
    if (this.owners[photo.owner]) {
      return Q.resolve(this.owners[photo.owner]);
    }
    let url = new Request(`${this.uri}method=flickr.people.getInfo&api_key=${this.apiKey}&user_id=${photo.owner}&format=json&nojsoncallback=1`);
    return fetch(url)
      .then((res: IResponse): Promise<FlickrPersonResponse> => res.json())
      .then((res: FlickrPersonResponse): FlickrPhotoOwner => {
        return this.owners[photo.owner] = res.person;
      });
  }

  protected getPhotoOwnerName(photo: FlickrPhoto): string {
    let owner: FlickrPhotoOwner = this.owners[photo.owner];
    return _.get(owner, 'username._content', '');
  }
}

let elem = document.querySelector('.flickr-box') as HTMLDivElement;

new Flickr({
  elem,
  uri: 'https://api.flickr.com/services/rest/?',
  queryMethod: 'flickr.photos.search',
  apiKey: 'df05722919e95bb8904ef25378484604'
});