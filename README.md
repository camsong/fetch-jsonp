# Fetch JSONP [![Build Status](https://travis-ci.org/camsong/fetch-jsonp.svg)](https://travis-ci.org/camsong/fetch-jsonp) [![npm version](https://badge.fury.io/js/fetch-jsonp.svg)](http://badge.fury.io/js/fetch-jsonp)

JSONP is NOT supported in standard Fetch API, https://fetch.spec.whatwg.org.
fetch-jsonp provides you same API to fetch JSONP like naive Fetch, also comes
with global `fetchJsonp` function.

If you need a `fetch` polyfill for old browsers, try [github/fetch](http://github.com/github/fetch).

## Installation

You can install with `npm`.

```
npm install fetch-jsonp
```

You'll also need a Promise polyfill for [old browsers](http://caniuse.com/#feat=promises).

```
npm install es6-promise
```

## Usage

The `fetch-jsonp` function supports any HTTP method. We'll focus on GET and POST
example requests.
Not need timeout check error;Check the error by "onerror" and "onreadystatechange";

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
    jsonpCallback: 'custom_callback'
  })
  .then(function(response) {
    return response.json()
  }).then(function(json) {
    console.log('parsed json', json)
  }).catch(function(ex) {
    console.log('parsing failed', ex)
  })
```

### Set JSONP request timeout, default is 0

timeout Not equal 0,use timeout

```javascript
fetchJsonp('/users.jsonp', {
    timeout: 3000,
    jsonpCallback: 'custom_callback'
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

![Chrome](https://raw.github.com/alrra/browser-logos/master/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/firefox/firefox_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/internet-explorer/internet-explorer_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/safari/safari_48x48.png)
--- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | 8+ ✔ | Latest ✔ | 6.1+ ✔ |

## Support Promise
[promise](https://github.com/then/promise) This is a simple implementation of Promises.

# License

MIT

# Acknowledgement

Thanks to [github/fetch](https://github.com/github/fetch) for bring Fetch to old browsers.


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/camsong/fetch-jsonp/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

