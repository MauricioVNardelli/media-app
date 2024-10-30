"use client";

// Define um cache name para armazenar os recursos da mídia
const CACHE_NAME = "media-cache-v1";

// Lista de arquivos que deseja colocar no cache na instalação
const cacheFiles = [
  // Adicione URLs de mídia se desejar que sejam pré-cacheados
];

// Instalando o Service Worker e adicionando mídias ao cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(cacheFiles);
    })
  );
});

// Interceptando requisições e respondendo com cache
self.addEventListener("fetch", (event) => {
  // Checa se o recurso é de mídia
  if (event.request.url.includes("/AR/")) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          // Retorna o recurso do cache
          return cachedResponse;
        }
        // Faz o fetch e coloca no cache para futuras requisições
        return fetch(event.request).then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());

            return networkResponse;
          });
        });
      })
    );
  }
});

// Atualização do cache
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
