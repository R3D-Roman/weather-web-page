const staticCacheName = "site-static-v1";
const dynamicCacheName = "site-dynamic-v1";
const assets = [
  "/",
  "weather-web-page/index.html/",
  "js/app.js",
  "js/pwa.js",
  "css/style.css",
  "css/normalize.css",
  "font-awesome/all.min.css",
  "font-awesome/all.min.js",
  "img/mars-img.png",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",
  "webfonts/fa-brands-400.eot",
  "webfonts/fa-brands-400.svg",
  "webfonts/fa-brands-400.ttf",
  "webfonts/fa-brands-400.woff",
  "webfonts/fa-brands-400.woff2",
  "webfonts/fa-regular-400.eot",
  "webfonts/fa-regular-400.svg",
  "webfonts/fa-regular-400.ttf",
  "webfonts/fa-regular-400.woff",
  "webfonts/fa-regular-400.woff2",
  "webfonts/fa-solid-900.eot",
  "webfonts/fa-solid-900.svg",
  "webfonts/fa-solid-900.ttf",
  "webfonts/fa-solid-900.woff",
  "webfonts/fa-solid-900.woff2"
];

// cache size limits function
const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

// install event
self.addEventListener("install", evt => {
  //console.log('service worker installed');
  evt.waitUntil(
    caches.open(staticCacheName).then(cache => {
      // console.log("caching shell assets");
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener("activate", evt => {
  //console.log('service worker activated');
  evt.waitUntil(
    caches.keys().then(keys => {
      //console.log(keys);
      return Promise.all(
        keys
          .filter(key => key !== staticCacheName && key !== dynamicCacheName)
          .map(key => caches.delete(key))
      );
    })
  );
});

// fetch event
self.addEventListener("fetch", evt => {
  //console.log('fetch event', evt);
  // check if request is made by chrome extensions or web page
  // if request is made for web page url must contains http.
  if (!(evt.request.url.indexOf("http") === 0)) return; // skip the request. if request is not made with http protocol

  evt.respondWith(
    caches
      .match(evt.request)
      .then(cacheRes => {
        return (
          cacheRes ||
          fetch(evt.request).then(fetchRes => {
            return caches.open(dynamicCacheName).then(cache => {
              cache.put(evt.request.url, fetchRes.clone());
              // check cached items size
              limitCacheSize(dynamicCacheName, 25);
              return fetchRes;
            });
          })
        );
      })
  );
});
