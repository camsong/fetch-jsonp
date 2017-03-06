// Example of serviceWorker

let timeoutJsonpIds = [];

self.addEventListener('fetch', function(event) {
  const request = event.request;
  const url = request.url;

  event.respondWith(
    fetch(request.clone()).then((fetchResponse) => {
      if (timeoutJsonpIds.some((id) => url.indexOf(id) !== -1)) {
        timeoutJsonpIds = timeoutJsonpIds.filter((id) => url.indexOf(id) !== -1);
        // return empty response
        return new Response();
      }
      return fetchResponse;
    }).catch(() => {
      timeoutJsonpIds = timeoutJsonpIds.filter((id) => url.indexOf(id) !== -1);
    })
  );
});

self.addEventListener('message', (event) => {
  // it better to abort fetch
  // see https://github.com/whatwg/fetch/issues/447
  const data = event.data;
  if (data.from === 'fetch-jsonp') {
    timeoutJsonpIds.push(event.data.callbackFunction);
  }
});
