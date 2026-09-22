/* ==========================================================================
   Consenso cookie — banner Accetta / Personalizza / Rifiuta

   Cosa usa il sito:
   - Necessari (sempre attivi): carrello e scelta sui cookie, salvati nel
     browser (localStorage). Non richiedono consenso.
   - Mappe (facoltativi): le mappe di Google Maps nella pagina Dove siamo.
     Google puo impostare cookie propri, quindi restano spente finche
     l'utente non le accetta (vedi js/mappe-consenso.js).

   Regole seguite (linee guida Garante Privacy):
   - "Rifiuta" ha lo stesso peso visivo di "Accetta"
   - la X chiude e vale come rifiuto
   - nessuna casella gia spuntata
   - la scelta si puo cambiare in ogni momento: link "Cookie Policy" nel
     footer, poi "Gestisci i cookie" nella pagina
   - la domanda non viene ripetuta prima di 6 mesi

   Da fuori:  window.MaiThaiConsenso.apri()         riapre le preferenze
              window.MaiThaiConsenso.mappe()        true se accettate
              window.MaiThaiConsenso.accettaMappe() consenso dal segnaposto
   Evento:    'consenso-cookie' su document, detail = { mappe: true|false }
   ========================================================================== */

(function () {
  'use strict';

  var CHIAVE = 'maithai-consenso';
  var VERSIONE = 1;            // alzarla se cambiano le categorie: il banner ricompare
  var DURATA_GIORNI = 180;     // dopo 6 mesi la domanda viene riproposta

  // Link all'informativa estesa; se vuoto il link nel banner non compare
  var COOKIE_POLICY_URL = 'cookie-policy.html';

  /* ---------- Salvataggio ---------- */

  function leggi() {
    try {
      var dati = JSON.parse(localStorage.getItem(CHIAVE));
      if (!dati || dati.versione !== VERSIONE) return null;
      var eta = (Date.now() - new Date(dati.data).getTime()) / 86400000;
      if (!(eta < DURATA_GIORNI)) return null;
      return dati;
    } catch (e) {
      return null;
    }
  }

  function salva(mappe) {
    var dati = { versione: VERSIONE, mappe: !!mappe, data: new Date().toISOString() };
    try {
      localStorage.setItem(CHIAVE, JSON.stringify(dati));
    } catch (e) { /* navigazione privata: la scelta vale solo per questa pagina */ }
    scelta = dati;
    document.dispatchEvent(new CustomEvent('consenso-cookie', { detail: { mappe: dati.mappe } }));
  }

  var scelta = leggi();

  /* ---------- Banner ---------- */

  var banner, pannello, interruttoreMappe, bottoneSalva, bottonePersonalizza;

  function crea() {
    banner = document.createElement('div');
    banner.className = 'cookie';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-labelledby', 'cookie-titolo');
    banner.setAttribute('aria-describedby', 'cookie-testo');

    // Senza pagina della policy la frase resta, ma senza link
    var policy = COOKIE_POLICY_URL
      ? '<a href="' + COOKIE_POLICY_URL + '" class="cookie__link">Cookie Policy</a>'
      : 'Cookie Policy';

    banner.innerHTML =
      '<div class="cookie__box">' +
        '<button type="button" class="cookie__chiudi" aria-label="Chiudi e rifiuta i cookie facoltativi">&times;</button>' +
        '<h2 class="cookie__titolo" id="cookie-titolo">Cookie</h2>' +
        '<p class="cookie__testo" id="cookie-testo">' +
          'Usiamo solo strumenti tecnici, necessari al funzionamento del sito, come il carrello. ' +
          'Con il tuo consenso carichiamo anche le mappe di Google Maps, che possono impostare cookie di Google. ' +
          'Puoi cambiare idea quando vuoi dalla ' + policy + ', in fondo a ogni pagina.' +
        '</p>' +

        '<div class="cookie__pannello" id="cookie-pannello" hidden>' +
          '<div class="cookie__categoria">' +
            '<div class="cookie__categoria-testa">' +
              '<span class="cookie__categoria-nome">Necessari</span>' +
              '<span class="cookie__sempre">Sempre attivi</span>' +
            '</div>' +
            '<p class="cookie__categoria-desc">Ricordano il carrello e la scelta che fai qui. Restano nel tuo browser e non servono a tracciarti.</p>' +
          '</div>' +
          '<div class="cookie__categoria">' +
            '<label class="cookie__categoria-testa" for="cookie-mappe">' +
              '<span class="cookie__categoria-nome">Mappe e contenuti di terze parti</span>' +
              '<span class="cookie__switch">' +
                '<input type="checkbox" id="cookie-mappe" class="cookie__switch-input">' +
                '<span class="cookie__switch-track" aria-hidden="true"></span>' +
              '</span>' +
            '</label>' +
            '<p class="cookie__categoria-desc">Mappe di Google Maps nella pagina Dove siamo. Google puo impostare cookie propri.</p>' +
          '</div>' +
        '</div>' +

        '<div class="cookie__azioni">' +
          '<button type="button" class="cookie__btn" data-azione="rifiuta">Rifiuta</button>' +
          '<button type="button" class="cookie__btn cookie__btn--contorno" data-azione="personalizza" aria-expanded="false" aria-controls="cookie-pannello">Personalizza</button>' +
          '<button type="button" class="cookie__btn cookie__btn--contorno" data-azione="salva" hidden>Salva le scelte</button>' +
          '<button type="button" class="cookie__btn" data-azione="accetta">Accetta</button>' +
        '</div>' +
      '</div>';

    pannello = banner.querySelector('.cookie__pannello');
    interruttoreMappe = banner.querySelector('#cookie-mappe');
    bottoneSalva = banner.querySelector('[data-azione="salva"]');
    bottonePersonalizza = banner.querySelector('[data-azione="personalizza"]');

    banner.addEventListener('click', function (e) {
      if (e.target.closest('.cookie__chiudi')) return decidi(false);
      var btn = e.target.closest('[data-azione]');
      if (!btn) return;
      var azione = btn.getAttribute('data-azione');
      if (azione === 'accetta') decidi(true);
      else if (azione === 'rifiuta') decidi(false);
      else if (azione === 'salva') decidi(interruttoreMappe.checked);
      else if (azione === 'personalizza') mostraPannello(true);
    });

    banner.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') decidi(false);
    });

    // In cima al body: chi naviga da tastiera lo incontra per primo
    document.body.insertBefore(banner, document.body.firstChild);
  }

  function mostraPannello(aperto) {
    pannello.hidden = !aperto;
    bottoneSalva.hidden = !aperto;
    bottonePersonalizza.hidden = aperto;
    bottonePersonalizza.setAttribute('aria-expanded', aperto ? 'true' : 'false');
    banner.classList.toggle('cookie--esteso', aperto);
    if (aperto) interruttoreMappe.focus();
  }

  function apri(conPannello) {
    if (!banner) crea();
    // Riaprendo si parte dalla scelta attuale, mai da una casella gia spuntata a caso
    interruttoreMappe.checked = !!(scelta && scelta.mappe);
    mostraPannello(!!conPannello);
    banner.hidden = false;
    // Il frame dopo, cosi la transizione di entrata parte
    requestAnimationFrame(function () { banner.classList.add('is-visibile'); });
  }

  function chiudi() {
    if (!banner) return;
    banner.classList.remove('is-visibile');
    setTimeout(function () { banner.hidden = true; }, 250);
  }

  function decidi(mappe) {
    salva(mappe);
    chiudi();
  }

  /* ---------- Link "Gestisci i cookie" (pagina Cookie Policy) ---------- */

  document.addEventListener('click', function (e) {
    var link = e.target.closest('[data-preferenze-cookie]');
    if (!link) return;
    e.preventDefault();
    apri(true);
  });

  /* ---------- API ---------- */

  window.MaiThaiConsenso = {
    apri: function () { apri(true); },
    mappe: function () { return !!(scelta && scelta.mappe); },
    accettaMappe: function () { decidi(true); }
  };

  if (!scelta) apri(false);
})();
