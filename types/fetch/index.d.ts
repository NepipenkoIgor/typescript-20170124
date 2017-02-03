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
