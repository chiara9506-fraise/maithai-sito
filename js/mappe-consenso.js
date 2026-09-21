/* ==========================================================================
   Mappe Google solo con consenso — pagina Dove siamo

   Nell'HTML gli iframe hanno l'indirizzo in data-src, non in src: cosi il
   browser non contatta Google finche l'utente non accetta le mappe.
   Al posto di ogni mappa compare un segnaposto con due scelte:
   - "Mostra mappa": da il consenso (vale per tutte le mappe del sito)
   - "Apri in Google Maps": link esterno, non carica nulla su questa pagina
   Va caricato dopo js/cookie.js.
   ========================================================================== */

(function () {
  'use strict';

  var iframe = Array.prototype.slice.call(document.querySelectorAll('iframe[data-src]'));
  if (!iframe.length) return;

  var ICONA_PIN =
    '<svg class="mappa-bloccata__icona" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>' +
    '</svg>';

  // Link esterno ricavato dall'indirizzo gia scritto nell'iframe (?q=...)
  function linkEsterno(src) {
    var m = src.match(/[?&]q=([^&]+)/);
    var indirizzo = m ? m[1] : '';
    return 'https://www.google.com/maps/search/?api=1&query=' + indirizzo;
  }

  function carica(frame) {
    if (frame.getAttribute('src')) return;
    frame.setAttribute('src', frame.getAttribute('data-src'));
    var segnaposto = frame.parentNode.querySelector('.mappa-bloccata');
    if (segnaposto) segnaposto.remove();
  }

  function mettiSegnaposto(frame) {
    var contenitore = frame.parentNode;
    if (contenitore.querySelector('.mappa-bloccata')) return;

    var nome = (frame.getAttribute('title') || 'Mappa').replace(/^Mappa sede\s*/, '');
    var box = document.createElement('div');
    box.className = 'mappa-bloccata';
    box.innerHTML =
      ICONA_PIN +
      '<p class="mappa-bloccata__titolo">Mappa non caricata</p>' +
      '<p class="mappa-bloccata__testo">Per vederla serve il consenso ai contenuti di terze parti: Google Maps puo impostare i suoi cookie.</p>' +
      '<div class="mappa-bloccata__azioni">' +
        '<button type="button" class="mappa-bloccata__btn mappa-bloccata__btn--pieno">Mostra mappa</button>' +
        '<a class="mappa-bloccata__btn" target="_blank" rel="noopener" href="' + linkEsterno(frame.getAttribute('data-src')) + '"' +
          ' aria-label="Apri ' + nome + ' in Google Maps (nuova scheda)">Apri in Google Maps</a>' +
      '</div>';

    box.querySelector('button').addEventListener('click', function () {
      window.MaiThaiConsenso.accettaMappe();
    });

    contenitore.appendChild(box);
  }

  function aggiorna(consentite) {
    iframe.forEach(function (frame) {
      if (consentite) {
        carica(frame);
      } else if (frame.getAttribute('src')) {
        // Consenso ritirato: si scarica la mappa e torna il segnaposto
        frame.removeAttribute('src');
        mettiSegnaposto(frame);
      } else {
        mettiSegnaposto(frame);
      }
    });
  }

  aggiorna(window.MaiThaiConsenso && window.MaiThaiConsenso.mappe());

  document.addEventListener('consenso-cookie', function (e) {
    aggiorna(e.detail.mappe);
  });
})();
