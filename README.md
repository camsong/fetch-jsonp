# Fetch JSONP [![Build Status](https://travis-ci.org/camsong/fetch-jsonp.svg)](https://travis-ci.org/camsong/fetch-jsonp) [![npm version](https://badge.fury.io/js/fetch-jsonp.svg)](http://badge.fury.io/js/fetch-jsonp) [![npm downloads](https://img.shields.io/npm/dm/fetch-jsonp.svg?style=flat-square)](https://www.npmjs.com/package/fetch-jsonp)

JSONP is NOT supported in standard Fetch API, https://fetch.spec.whatwg.org.
fetch-jsonp provides you same API to fetch JSONP like naive Fetch, also comes
with global `fetchJsonp` function.

If you need a `fetch` polyfill for old browsers, try [github/fetch](http://github.com/github/fetch).

## Installation

You can install with `npm`.

```
npm install fetch-jsonp
```

## Promise Polyfill for IE

IE8/9/10/11 does not support [ES6 Promise](https://tc39.github.io/ecma262/#sec-promise-constructor), run this to polyfill the global environment at the beginning of your application.

```js
require('es6-promise').polyfill();
```

## Usage

JSONP only support GET method, as same as `fetch-jsonp`.

### Fetch JSONP in simple way

```javascript
fetchJsonp('/users.jsonp')
  .then(function(response) {
    return response.json()
  }).then(function(json) {
    console.log('parsed json', json)
  }).catch(function(ex) {
    console.log('parsing failed', ex)
  })
```

### Set JSONP callback name, default is 'callback'

```javascript
fetchJsonp('/users.jsonp', {
    jsonpCallback: 'custom_callback',
    jsonpCallbackFunction: '<name of your callback function>'
  })
  .then(function(response) {
    return response.json()
  }).then(function(json) {
    console.log('parsed json', json)
  }).catch(function(ex) {
    console.log('parsing failed', ex)
  })
```

### Set JSONP request timeout, default is 5000ms

```javascript
fetchJsonp('/users.jsonp', {
    timeout: 3000,
    jsonpCallback: 'custom_callback',
    jsonpCallbackFunction: '<name of your callback function>'
  })
  .then(function(response) {
    return response.json()
  }).then(function(json) {
    console.log('parsed json', json)
  }).catch(function(ex) {
    console.log('parsing failed', ex)
  })
```

### Caveats

You need to call `.then(function(response) { return response.json(); })` in order
to keep consistent with Fetch API.

## Browser Support

![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_7-8/internet-explorer_7-8_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png)
--- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | 8+ ✔ | Latest ✔ | 6.1+ ✔ |

# License

MIT

# Acknowledgement

Thanks to [github/fetch](https://github.com/github/fetch) for bring Fetch to old browsers.
