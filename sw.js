// UBAH NAMA CACHE INI SETIAP KALI ADA PEMBARUAN PADA HTML/CSS/JS
const CACHE_NAME = 'kasir-cache-v2';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './LOGO BARU MUFLIH 20213.png',
  './icon-192x192.png',
  './icon-512x512.png'
];

// Install Service Worker & Simpan Cache Baru
self.addEventListener('install', event => {
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      }).catch(err => console.log('Gagal menyimpan cache:', err))
  );
});

// Activate Service Worker & Hapus Cache Lama
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Menghapus cache lama:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch/Load Web
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Gunakan cache jika ada, kalau tidak ambil dari internet
        return response || fetch(event.request);
      })
  );
});
