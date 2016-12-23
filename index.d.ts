export interface FetchJsonpOptions {
  timeout?: number;
  jsonpCallback?: string;
  callbackFunction?: string;
}

declare function fetchJsonp(url:string, options?:FetchJsonpOptions):Function;

export default fetchJsonp;
