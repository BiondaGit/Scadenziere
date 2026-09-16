self.addEventListener('push', event => {
  console.log('[SW] PUSH RICEVUTA');

  // Gestione completa di tutte le attività asincrone
  const pushTask = async () => {
    // 1. Notifica la pagina aperta (se presente)
    try {
      const clients = await self.clients.matchAll();
      clients.forEach(client => client.postMessage('PUSH_RICEVUTA'));
    } catch (err) {
      console.error('[SW] Errore nell\'invio del messaggio ai client:', err);
    }

    // 2. Mostra la notifica di sistema
    try {
      await self.registration.showNotification('Scadenziere', {
        body: 'Push ricevuta dal Service Worker',
        // icon: '/icon.png' // Opzionale: aggiungi un'icona se necessaria
      });
      console.log('[SW] NOTIFICA MOSTRATA');
    } catch (error) {
      console.error('[SW] ERRORE SHOW NOTIFICATION:', error);
    }
  };

  // Mantieni in vita il SW finché pushTask non ha finito
  event.waitUntil(pushTask());
});
