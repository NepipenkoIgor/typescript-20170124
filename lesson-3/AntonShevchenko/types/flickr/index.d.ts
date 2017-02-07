interface IFlickrPhotosSearchResponse {

    photos: IFlickrPhotosSearchPhotos;
}

interface IFlickrPhotosSearchPhotos {
    photo: IFlickrPhotosSearchPhoto[];
}

interface IFlickrPhotosSearchPhoto {
    farm: number;
    server: string;
    title: string;
    id: string;
    secret: string;
    owner: string;
}

interface IFlickrPeopleGetInfoResponse {
    person: IFlickrPeopleGetInfoPerson;
}

interface IFlickrPeopleGetInfoPerson {
    username: IFlickrPeopleGetInfoPersonUsername;
}

interface IFlickrPeopleGetInfoPersonUsername {
    _content: string;
}