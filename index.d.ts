declare function fetchJsonp(url: string, options?: fetchJsonp.Options): Promise<fetchJsonp.Response>;

declare namespace fetchJsonp {
  interface Options {
    timeout?: number;
    jsonpCallback?: string;
    jsonpCallbackFunction?: string;
    nonce?: string;
    crossorigin?: boolean | string;
    referrerPolicy?: ReferrerPolicy;
    charset?: string;
    fetchPriority?: 'high' | 'low' | 'auto';
  }

  interface Response {
    json(): Promise<any>;
    json<T>(): Promise<T>;
    ok: boolean;
  }
}

export = fetchJsonp;
