self.addEventListener('push', event => {
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage('PUSH_RICEVUTA');
    });
  });

  console.log('[SW] PUSH RICEVUTA');

  event.waitUntil(
    self.registration.showNotification('Scadenziere', {
      body: 'Push ricevuta dal Service Worker'
    })
      .then(() => console.log('[SW] NOTIFICA MOSTRATA'))
      .catch(error => console.error('[SW] ERRORE SHOW NOTIFICATION:', error))
  );
});
