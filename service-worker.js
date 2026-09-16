self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', event => {
  let dati = {
    titolo: 'Scadenziere',
    messaggio: 'Hai una nuova notifica.'
  };

  if (event.data) {
    try {
      dati = event.data.json();
    } catch (e) {
      dati.messaggio = event.data.text();
    }
  }

  event.waitUntil(
    self.registration.showNotification(dati.titolo, {
      body: dati.messaggio,
      icon: '/Scadenziere/icons/icon-192.png',
      badge: '/Scadenziere/icons/icon-192.png'
    })
  );
});
