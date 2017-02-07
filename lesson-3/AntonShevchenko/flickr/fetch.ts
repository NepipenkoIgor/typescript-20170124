class Flickr {
    protected elem: HTMLDivElement;
    protected input: HTMLInputElement;
    protected searchButton: HTMLButtonElement;
    protected imagesBox: HTMLDivElement;
    protected uri: string;
    protected queryMethod: string;
    protected apiKey: string;
    protected sortBy: 'title';
    protected wait: number;

    protected photos: IFlickrPhotosSearchPhoto[];
    protected authors: WeakMap<IFlickrPhotosSearchPhoto, string> = new WeakMap();

    public constructor(opt: opt) {

        this.elem = opt.elem;
        this.uri = opt.uri;
        this.apiKey = opt.apiKey;
        this.queryMethod = opt.queryMethod;
        this.input = document.querySelector('.flickr-search-input') as HTMLInputElement;
        this.imagesBox = document.querySelector('.image-area') as HTMLDivElement;
        this.searchButton = document.querySelector('.flickr-search-button') as HTMLButtonElement;
        this.sortBy = opt.sortBy;
        this.wait = opt.wait;

        let searchButtonClickHandler = _.debounce(this.search.bind(this, this.render.bind(this)), this.wait);
        this.searchButton.addEventListener('click', searchButtonClickHandler);
    }


    protected render(): void {
        this.sortPhotos();

        let content = ``;
        for (let photo of this.photos) {
            let author: string|undefined = this.authors.get(photo) || '';

            content += `<h3>${author}:</h3><div class="image-box">
<img src="https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg" />
<p>${photo.title}</p>
</div>`;
        }
        this.imagesBox.innerHTML = content;
    }

    protected search(cb: () => void): void {
        if (!this.input.value) {
            return;
        }
        let text = this.input.value;
        let url = new Request(`${this.uri}method=${this.queryMethod}&api_key=${this.apiKey}&text=${text}&page=1&format=json&nojsoncallback=1`);
        this.getPhotos(url)
            .then(this.getAuthors.bind(this))
            .then(cb);
    }

    protected getAuthors(): Promise<void[]> {
        let promises: Promise<void>[] = this.photos.reduce(this.getAuthor.bind(this), []);

        return Promise.all(promises);

    }

    protected getAuthor(promosesArr: Promise<void>[], photo: IFlickrPhotosSearchPhoto): Promise<void>[] {
        let url = `${this.uri}method=flickr.people.getInfo&
            api_key=${this.apiKey}&user_id=${photo.owner}&format=json&nojsoncallback=1`;

        const toJson = (res: IResponse): Promise<IFlickrPeopleGetInfoResponse> => res.json();
        const extractUsername = (res: IFlickrPeopleGetInfoResponse): string => res.person.username._content;
        const storeUsername = (username: string): void => {
            this.authors.set(photo, username);
        };

        let promise = fetch(url)
            .then(toJson)
            .then(extractUsername)
            .then(storeUsername);

        promosesArr.push(promise);

        return promosesArr;
    }

    protected getPhotos(input: string|IRequest): Promise<IFlickrPhotosSearchPhoto[]> {
        const toJson = (res: IResponse): Promise<IFlickrPhotosSearchResponse> => res.json();
        const extractPhotos = (res: IFlickrPhotosSearchResponse): IFlickrPhotosSearchPhoto[] => [...res.photos.photo];
        const storePhotos = (photos: IFlickrPhotosSearchPhoto[]): IFlickrPhotosSearchPhoto[] => this.photos = photos;

        return fetch(input)
            .then(toJson)
            .then(extractPhotos)
            .then(storePhotos);
    }

    private sortPhotos(): void {
        const compareFumction = (a: IFlickrPhotosSearchPhoto, b: IFlickrPhotosSearchPhoto): number => {
            if (a[this.sortBy] > b[this.sortBy]) {
                return 1;
            }
            if (a[this.sortBy] < b[this.sortBy]) {
                return -1;
            }
            return 0;
        };
        this.photos.sort(compareFumction);
    }
}

type opt = {
    elem: HTMLDivElement,
    uri: string,
    queryMethod: string,
    apiKey: string,
    sortBy: 'title',
    wait: number
};

let elem = document.querySelector('.flickr-box') as HTMLDivElement;

let flickr = new Flickr({
    elem,
    uri: 'https://api.flickr.com/services/rest/?',
    queryMethod: 'flickr.photos.search',
    apiKey: 'df05722919e95bb8904ef25378484604',
    sortBy: 'title',
    wait: 200
});
