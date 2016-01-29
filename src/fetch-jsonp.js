const defaultOptions = {
  timeout: 0,
  jsonpCallback: 'callback',
  jsonpCallbackFunction: null,
};

function generateCallbackFunction() {
  return `jsonp_${Date.now()}_${Math.ceil(Math.random() * 100000)}`;
}

// Known issue: Will throw 'Uncaught ReferenceError: callback_*** is not defined' error if request timeout
function clearGlobalObject(objectName) {
  // IE8 throws an exception when you try to delete a property on window
  // http://stackoverflow.com/a/1824228/751089
  try {
    delete window[objectName];
  } catch (e) {
    window[objectName] = undefined;
  }
}

function removeScript(scriptId) {
  const script = document.getElementById(scriptId);
  document.getElementsByTagName("head")[0].removeChild(script);
}

const fetchJsonp = function(url, options = {}) {
  const timeout = options.timeout != null ? options.timeout : defaultOptions.timeout;
  const jsonpCallback = options.jsonpCallback != null ? options.jsonpCallback : defaultOptions.jsonpCallback;
  //Generate different "timeoutid"

  //Do not use the same timeoutid
  //let timeoutId;

  return new Promise((resolve, reject) => {
    let callbackFunction = options.jsonpCallbackFunction || generateCallbackFunction();

    const timeoutId = jsonpCallback + '_' + callbackFunction + '_' + 'timeoutId';

    function claer() {
      clearGlobalObject(timeoutId);
      clearGlobalObject(callbackFunction);
      removeScript(jsonpCallback + '_' + callbackFunction);
    }

    window[callbackFunction] = function(response) {
      resolve({
        ok: true,
        // keep consistent with fetch API
        json: function() {
          return Promise.resolve(response);
        }
      });

      if (timeoutId) clearTimeout(timeoutId);

      claer();
    };

    // Check if the user set their own params, and if not add a ? to start a list of params
    url += (url.indexOf('?') === -1) ? '?' : '&';

    const jsonpScript = document.createElement('script');
    jsonpScript.setAttribute("src", url + jsonpCallback + '=' + callbackFunction);
    jsonpScript.id = jsonpCallback + '_' + callbackFunction;

    // Attach handlers for all browsers
    jsonpScript.onerror = jsonpScript.onreadystatechange = function(err) {
      var hasError = false;
      //IE8 Unable to determine the load failed.
      //But the execution is faster than the this.readyState change.
      //Request to complete the callback will be deleted, if there is a callback, that is, the request failed
      //
      //Delay will affect the result but does not affect your overall request
      // status, which is considered a failure by more than your delay time.
      if (/loaded|complete/.test(this.readyState)) {
        if (window[callbackFunction]) {
          hasError = true;
        }
      }

      if (hasError || err) {
        reject(new Error(`JSONP request to ${url} request failed`));
        claer();
      }
    }

    if (timeout > 0) {
      //Generate different “timeoutid”
      //That is not because of the asynchronous lead, the entire "timeout" chaos
      window[timeoutid] = setTimeout(() => {
        reject(new Error(`JSONP request to ${url} timed out`));
        claer();
      }, timeout);
    }

    document.getElementsByTagName("head")[0].appendChild(jsonpScript);

  });
};

// export as global function
/*
let local;
if (typeof global !== 'undefined') {
  local = global;
} else if (typeof self !== 'undefined') {
  local = self;
} else {
  try {
    local = Function('return this')();
  } catch (e) {
    throw new Error('polyfill failed because global object is unavailable in this environment');
  }
}

local.fetchJsonp = fetchJsonp;
*/

export default fetchJsonp;