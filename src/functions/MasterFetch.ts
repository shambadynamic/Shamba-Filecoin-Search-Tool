export interface Headers {
  [key: string]: any;
}

export interface ReturnObject {
  headers: Headers | null;
  data: any;
  e?: any;
  stack?: string;
}

export type CallBackFun = (obj: ReturnObject) => void;
export type HttpMethod = "POST" | "GET" | "PUT" | "DELETE" | "PATCH";
export type ResponseFun = (response: Response) => Promise<any>;

export default class MasterFetch {
  stringify(data: any) {
    if (typeof data === "string") {
      return data;
    }
    return JSON.stringify(data);
  }

  constructor(
    protected response: ResponseFun = async (response: Response) => {
      return await response.json();
    },
    protected headers: Headers = {},
    protected parsReqBodyToJson: boolean = false,
    protected cache: RequestCache = "no-cache",
    protected redirect: RequestRedirect = "follow",
    protected referrerPolicy: ReferrerPolicy = "no-referrer-when-downgrade",
    protected mode: RequestMode = "cors",
    protected credentials: RequestCredentials = "include"
  ) {}

  async cacheRequest(
    url: string,
    method: HttpMethod = "GET",
    data: any = `{}`,
    headers: Headers = {},
    dataFun: CallBackFun
  ) {
    url = url.trim();
    const localStorageItemName =
      method + ":" + url + ":" + this.stringify(data);

    let get;

    if ((get = window.localStorage.getItem(localStorageItemName))) {
      get = JSON.parse(get);
      console.log("Data returning from cache");
      dataFun(get);
    }

    const ret = await this.req(url, method, data, headers, "default");
    if (ret.headers && !ret.e) {
      window.localStorage.setItem(localStorageItemName, this.stringify(ret));
    }
    console.log("Data returning from fetch");
    dataFun(ret);
  }

  async req(
    url: RequestInfo,
    method: HttpMethod = "GET",
    data: any = `{}`,
    headers: Headers = {},
    cache: RequestCache | null = null
  ): Promise<ReturnObject> {
    let response;
    try {
      const requestInit: RequestInit = {
        method,
        mode: this.mode,

        cache: cache ? cache : this.cache,

        credentials: this.credentials,

        headers: {
          ...this.headers,
          ...headers,
        },
        redirect: this.redirect,
        referrerPolicy: this.referrerPolicy,
      };

      if (["PUT", "POST", "PATCH"].includes(method)) {
        requestInit.body = this.parsReqBodyToJson ? this.stringify(data) : data;
      }

      response = await fetch(url, requestInit);
    } catch (e) {
      return {
        headers: null,
        data: null,
        e,
        stack: "when trying to fetch url",
      };
    }

    const retheaders: Headers = {};

    response.headers.forEach((a, b) => {
      retheaders[b] = a;
    });

    const head: Headers = {
      status: response.status,
      type: response.type,
      url: response.url,
      redirected: response.redirected,
      ok: response.ok,
      statusText: response.statusText,
      bodyUsed: response.bodyUsed,
      ...headers,
    };

    let retdata;
    try {
      retdata = await this.response(response);
    } catch (e) {
      return {
        headers: head,
        data: null,
        e,
        stack: "when trying to parse fetched data",
      };
    }

    return {
      headers: head,
      data: retdata,
    };
  }
}
