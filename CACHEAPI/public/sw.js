const CACHE_NAME = 'mi-cache-v8';

const urlsToCache = [
    '/',
    '/index.html',
    '/app.js',
    '/datos'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            if(response){
                return response;
            }
            return fetch(event.request);
        })
    );
});