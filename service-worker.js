self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', event => {
  console.log('[SW] PUSH RICEVUTA');

  event.waitUntil(
    self.registration.showNotification('Scadenziere', {
      body: 'Push ricevuta dal Service Worker'
    })
  );
});
