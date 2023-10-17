const STATIC = "staticv2";
const INMUTABLE = "inmutablev1";
const DYNAMIC = "dynamicv2";
const STATIC_LIMIT= 15;
const DYNAMIC_LIMIT = 30;
//Archivos que tengamos en nuestra aplicación (propios)
const APP_SHELL = [
    "/",
    "/index.html",
    "js/app.js",
    "img/descarga.jpg",
    "css/styles.css",
    "img/lapiz.jpg",
];

const APP_SHELL_INMUTABLE = [
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
];

self.addEventListener("install", (e) =>{
    console.log("Instalado");
    const staticCache =  caches.open(STATIC)
    .then(cache => {
        cache.addAll(APP_SHELL);
    });
    const inmutableCache =  caches.open(INMUTABLE)
    .then(cache => {
        cache.addAll(APP_SHELL_INMUTABLE);
    });

    const recoverMode =  caches.open('offline-cache').then(function(cache) {
        return cache.add('/pages/offline.html');
    });

    e.waitUntil(Promise.all([staticCache, inmutableCache]));
   // e.skipWaiting();    
});

self.addEventListener("activate", (e) =>{
    console.log("Activado");
});

self.addEventListener("fetch", (e) =>{
    if (!navigator.onLine) {
        e.respondWith(
          caches.match("/pages/offline.html").then((response) => {
            if (response) {
              return response;
            }
          })
        );
      }
});