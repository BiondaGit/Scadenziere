self.addEventListener('push', event => {
  console.log('[SW] PUSH RICEVUTA');

  const pushTask = async () => {

    // 1. Legge il contenuto della Push
    let titolo = 'Scadenziere';
    let messaggio = 'Hai una nuova notifica.';

    try {
      if (event.data) {
        const dati = event.data.json();

        titolo = dati.titolo || titolo;
        messaggio = dati.messaggio || messaggio;

        console.log('[SW] Titolo:', titolo);
        console.log('[SW] Messaggio:', messaggio);
      }
    } catch (err) {
      console.error('[SW] Errore lettura payload:', err);
    }

    // 2. Notifica la pagina aperta, se presente
    try {
      const clients = await self.clients.matchAll();

      clients.forEach(client => {
        client.postMessage({
          tipo: 'PUSH_RICEVUTA',
          titolo: titolo,
          messaggio: messaggio
        });
      });

    } catch (err) {
      console.error(
        '[SW] Errore invio messaggio ai client:',
        err
      );
    }

    // 3. Mostra la notifica di sistema
    try {
      await self.registration.showNotification(titolo, {
        body: messaggio
      });

      console.log('[SW] NOTIFICA MOSTRATA');

    } catch (error) {
      console.error(
        '[SW] ERRORE SHOW NOTIFICATION:',
        error
      );
    }
  };

  event.waitUntil(pushTask());
});
