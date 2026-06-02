const CACHE_NAME = "my-cache-v1";

const ARCHIVOS = [
  "/",
  "/index.html"
];

//instalacion
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ARCHIVOS);
        })
    );
});

//Activacion
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then(function (nombres){
            return Promise.all(
                nombres.filter(function (nombre) {
                    return nombre !== CACHE_NAME;
                }).map(function (nombre) {
                    return caches.delete(nombre);
                })
            );
        })
    );
});

//Fetch
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((respuesta) => {
            if (respuesta) {
                return respuesta;
            }
            return fetch(event.request);
        }
    ));
});