/**
 * @description
 * @author acrazing
 * @since 2016-09-19 17:01:54
 * @version 1.0.0.0
 * @file src/models/fetch-jsonp.d.ts
 * @desc src/models/fetch-jsonp.d.ts
 */

export interface FetchJsonpInit {
  timeout?: number;
  jsonpCallback?: string;
}

function FetchJsonp(url: string, init?: FetchJsonpInit): Promise<Response>;

export default FetchJsonp
