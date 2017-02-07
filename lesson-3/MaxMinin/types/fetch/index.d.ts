interface IResponseInit {
    status: string;
    statusText: string;
}


interface IResponseBody {
    blob: Blob;
    formData: FormData;
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

interface IPhotos {
    page: number;
    pages: number;
    perpage: number;
    total: string;
    photo: Array<IPhoto>
}

interface IJsonResponse {
    stat: string;
    photos: IPhotos
}

interface IResponse {
    blob: () => Promise<Blob>;
    formData: () => Promise<FormData>;
    json: () => Promise<IJsonResponse>;
}

declare const Response: {
    new(body: IResponseBody, init: IResponseInit): IResponse
};


interface IRequest {
    method: string;
    url: string;
    mode: string;
}

declare const Request: {
    new(input: string | typeof Request, init?: IRequest)
};


declare function fetch(input: string| IRequest): Promise<IResponse>;
