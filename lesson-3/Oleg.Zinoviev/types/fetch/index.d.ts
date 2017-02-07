interface IResponseInit {
  status: string;
  statusText: string;
}

interface IResponseBody {
  blob: Blob;
  formData: FormData;
}

interface IResponse {
  blob: () => Promise<Blob>;
  formData: () => Promise<FormData>;
  json: () => Promise<any>;
}

interface IRequest {
  method: string;
  url: string;
  mode: string;
}

interface IBodyPhotos {
  stat: string;
  photos: IPhotos;
}

interface IPhotos {
  page: number;
  pages: number;
  perpage: number;
  photo: IPhoto[];
  total: string;
}

interface IPhoto {
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

declare const Request: {
  new(input: string | typeof Request, init?: IRequest)
};

declare const Response: {
  new(body: IResponseBody, init: IResponseInit): IResponse
};

declare function fetch(input: string| IRequest): Promise<IResponse>;
