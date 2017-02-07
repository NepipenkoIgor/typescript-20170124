/**
 * Created by LinkFly on 2/7/2017.
 */
interface IFlickrPhoto {
  farm: number;
  id: string;
  isfamily: number;
  isfriend: number;
  ispublic: number;
  owner: string;
  secret: string;
  server: string;
  title: string;
}

interface IFlickrPhotoResponseBody {
  photos: {
    photo: IFlickrPhoto[];
  };
}

interface IFlickrPerson {
  realname?: {
    _content: string;
  };
}

interface IFlickrPersonResponseBody {
  stat: string;
  person: IFlickrPerson;
}
