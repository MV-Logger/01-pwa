const CACHE_NAME = "logs-v1";

const CACHED_URLS = [
  "/",
  "/index.html",
  "/assets/css/bootstrap.min.css",
  "/assets/css/form.css",
  "/assets/css/home.css",
  "/assets/js/libs/boostrap.bundle.min.js",
  "/assets/js/libs/localforage.min.js",
  "/assets/js/home.js",
  "/assets/js/login.js",
  "/assets/js/login.js",
  "/assets/js/register.js",
  "/assets/js/main.js"
]

self.addEventListener("install", function(e) {
  e.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
        return cache.addAll(CACHED_URLS);
      })
  )
})

self.addEventListener("fetch", function(e) {
  e.respondWith(fetch(e.request)
      .catch(e => {
        return caches.open(CACHE_NAME).then(cache => {
          return cache.match(e.request);
        })
      }));
});
