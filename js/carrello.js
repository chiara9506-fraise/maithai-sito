/* ===========================================================
   CARRELLO — Mai Thai
   Ordinazione senza backend: l'ordine parte via WhatsApp.
   Tutto lato browser, quindi funziona su GitHub Pages.

   I prezzi NON sono duplicati qui: vengono letti dall'HTML, che resta
   l'unico punto in cui modificarli. Per i piatti con piu prezzi le
   etichette stanno nell'attributo data-varianti della card.
   =========================================================== */

(function () {
  'use strict';

  /* =========================================================
     ⚠️  NUMERO DI PROVA — DA SOSTITUIRE PRIMA DELLA PUBBLICAZIONE
     Tutte le sedi puntano allo stesso numero personale, usato solo per
     verificare che WhatsApp funzioni. Ogni ordine inviato dal sito
     arriva qui, da qualunque sede.
     Quando arrivano i numeri veri: cancellare NUMERO_DI_PROVA e mettere
     il numero di ciascuna sede al posto suo.
     ========================================================= */
  var NUMERO_DI_PROVA = '393923589317';

  /* ---------- DESTINATARIO DEGLI ORDINI ----------
     Un numero solo: chi lo riceve smista l'ordine alla sede che copre
     l'indirizzo del cliente. Per questo il cliente non sceglie la sede,
     che non avrebbe modo di sapere, ma scrive il proprio indirizzo.

     Quando saranno note le zone di consegna si potra instradare in
     automatico, aggiungendo qui una tabella citta -> sede. */
  var ORDINI_A = NUMERO_DI_PROVA;

  /* ---------- Sedi gestite separatamente ----------
     Cuneo e Mondovì non fanno capo alla titolarita di Torino: gli ordini
     di quelle zone non possono passare dal numero unico. Se il cliente
     scrive una di queste citta, gli mostriamo il numero da chiamare. */
  var CITTA_SEPARATE = [
    { citta: 'cuneo',   nome: 'Cuneo',   telefono: '0171 480 470' },
    { citta: 'mondovi', nome: 'Mondovì', telefono: '0174 300 296' }
  ];

  var CHIAVE = 'maithai-carrello';
  var CHIAVE_DATI = 'maithai-dati-cliente';

  var carrello = {};
  var controlli = [];

  /* =========================================================
     STATO E SALVATAGGIO
     ========================================================= */

  // localStorage puo fallire (navigazione privata, spazio esaurito):
  // in quel caso il carrello funziona lo stesso, solo non sopravvive al reload.
  function carica() {
    try {
      carrello = JSON.parse(localStorage.getItem(CHIAVE)) || {};
    } catch (e) {
      carrello = {};
    }
  }

  function salva() {
    try {
      localStorage.setItem(CHIAVE, JSON.stringify(carrello));
    } catch (e) { /* silenzioso */ }
  }

  /* ---------- Prezzi ----------
     Nel sito i prezzi sono all'italiana ("€14,00"), per i conti serve
     il punto decimale. */

  function leggiPrezzo(testo) {
    var m = (testo || '').match(/(\d+)[.,](\d{2})/);
    return m ? parseFloat(m[1] + '.' + m[2]) : 0;
  }

  function formatta(n) {
    return '€' + n.toFixed(2).replace('.', ',');
  }

  function chiaveDi(nome, variante) {
    return variante ? nome + ' — ' + variante : nome;
  }

  /* ---------- Operazioni ---------- */

  function aggiungi(nome, prezzo, variante) {
    var k = chiaveDi(nome, variante);
    if (carrello[k]) carrello[k].qta++;
    else carrello[k] = { nome: nome, prezzo: prezzo, variante: variante || '', qta: 1 };
    salva();
    aggiornaTutto();
  }

  function cambiaQta(k, delta) {
    if (!carrello[k]) return;
    carrello[k].qta += delta;
    if (carrello[k].qta <= 0) delete carrello[k];
    salva();
    aggiornaTutto();
  }

  function rimuovi(k) {
    delete carrello[k];
    salva();
    aggiornaTutto();
  }

  function totale() {
    return Object.keys(carrello).reduce(function (t, k) {
      return t + carrello[k].prezzo * carrello[k].qta;
    }, 0);
  }

  function numeroArticoli() {
    return Object.keys(carrello).reduce(function (n, k) {
      return n + carrello[k].qta;
    }, 0);
  }

  /* =========================================================
     CONTROLLI SU CARD E BEVANDE
     ========================================================= */

  // Crea la coppia "Aggiungi" / "− qta +" per una voce.
  // onAggiungi() e separato perche i piatti con varianti aprono una scelta
  // invece di aggiungere direttamente.
  function creaControlli(chiaveFn, onAggiungi, classe) {
    var wrap = document.createElement('div');
    wrap.className = classe || 'cart-btn-wrap';

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'cart-btn';
    btn.textContent = 'Aggiungi';

    var box = document.createElement('div');
    box.className = 'cart-qta';
    box.hidden = true;

    var meno = document.createElement('button');
    meno.type = 'button';
    meno.className = 'cart-qta__btn';
    meno.textContent = '−';
    meno.setAttribute('aria-label', 'Togli uno');

    var num = document.createElement('span');
    num.className = 'cart-qta__n';

    var piu = document.createElement('button');
    piu.type = 'button';
    piu.className = 'cart-qta__btn';
    piu.textContent = '+';
    piu.setAttribute('aria-label', 'Aggiungi uno');

    box.appendChild(meno);
    box.appendChild(num);
    box.appendChild(piu);
    wrap.appendChild(btn);
    wrap.appendChild(box);

    // La card apre il popup del piatto: senza stopPropagation ogni clic
    // sui pulsanti aprirebbe anche quello.
    function stop(e) { e.stopPropagation(); }

    btn.addEventListener('click', function (e) { stop(e); onAggiungi(); });
    piu.addEventListener('click', function (e) { stop(e); cambiaQta(chiaveFn(), 1); });
    meno.addEventListener('click', function (e) { stop(e); cambiaQta(chiaveFn(), -1); });

    wrap.aggiorna = function () {
      var voce = carrello[chiaveFn()];
      btn.hidden = !!voce;
      box.hidden = !voce;
      if (voce) num.textContent = voce.qta;
    };

    controlli.push(wrap);
    return wrap;
  }

  /* ---------- Scelta variante ----------
     Per i piatti con piu prezzi (es. Noodle Soup): piccolo menu a
     comparsa con le opzioni lette da data-varianti. */

  function leggiVarianti(nodoPrezzo) {
    var attr = nodoPrezzo.getAttribute('data-varianti');
    if (!attr) return null;
    return attr.split('|').map(function (pezzo) {
      var p = pezzo.split(':');
      return { nome: p[0].trim(), prezzo: leggiPrezzo(p[1]) };
    });
  }

  function apriSceltaVariante(nome, varianti, ancora) {
    // Chiude un eventuale menu gia aperto
    var vecchio = document.querySelector('.cart-varianti');
    if (vecchio) vecchio.remove();

    var menu = document.createElement('div');
    menu.className = 'cart-varianti';

    varianti.forEach(function (v) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'cart-varianti__opt';
      b.innerHTML = '<span>' + v.nome + '</span><strong>' + formatta(v.prezzo) + '</strong>';
      b.addEventListener('click', function (e) {
        e.stopPropagation();
        aggiungi(nome, v.prezzo, v.nome);
        menu.remove();
      });
      menu.appendChild(b);
    });

    ancora.appendChild(menu);

    // Un clic fuori chiude il menu
    setTimeout(function () {
      document.addEventListener('click', function chiudi() {
        menu.remove();
        document.removeEventListener('click', chiudi);
      }, { once: true });
    }, 0);
  }

  /* ---------- Montaggio sulle card ---------- */

  function montaSulleCard() {
    document.querySelectorAll('.dish-card-sm').forEach(function (card) {
      var nodoNome = card.querySelector('.dish-card-sm__name');
      var nodoPrezzo = card.querySelector('.dish-card-sm__price');
      var info = card.querySelector('.dish-card-sm__info');
      if (!nodoNome || !nodoPrezzo || !info) return;

      // Il nome puo contenere lo span della quantita ("3pz"): prendo solo
      // il primo nodo di testo, come fa gia il popup.
      var nome = nodoNome.firstChild.textContent.trim();
      var varianti = leggiVarianti(nodoPrezzo);

      var wrap;
      if (varianti) {
        // Con varianti la chiave dipende da quale e stata scelta: mostro i
        // controlli solo se ce n'e almeno una nel carrello.
        wrap = creaControlli(
          function () {
            var k = Object.keys(carrello).filter(function (x) {
              return carrello[x].nome === nome;
            });
            return k[0] || chiaveDi(nome, '');
          },
          function () { apriSceltaVariante(nome, varianti, wrap); }
        );
        wrap.classList.add('cart-btn-wrap--varianti');
      } else {
        var prezzo = leggiPrezzo(nodoPrezzo.textContent);
        wrap = creaControlli(
          function () { return chiaveDi(nome, ''); },
          function () { aggiungi(nome, prezzo, ''); }
        );
      }
      info.appendChild(wrap);
    });
  }

  /* ---------- Montaggio sulle bevande ----------
     Struttura diversa dalle card: <li> con nome e prezzo affiancati. */

  function montaSulleBevande() {
    document.querySelectorAll('.drinks-list li').forEach(function (li) {
      var nodoNome = li.querySelector('.drinks-list__name');
      var nodoPrezzo = li.querySelector('.drinks-list__price');
      if (!nodoNome || !nodoPrezzo) return;

      var nome = nodoNome.textContent.trim();
      var prezzo = leggiPrezzo(nodoPrezzo.textContent);

      var wrap = creaControlli(
        function () { return chiaveDi(nome, ''); },
        function () { aggiungi(nome, prezzo, ''); },
        'cart-btn-wrap cart-btn-wrap--drink'
      );
      li.appendChild(wrap);
    });
  }

  /* ---------- Pulsante dentro il popup piatto ---------- */

  var popupWrap, popupNome, popupPrezzo;

  function montaSulPopup() {
    var modal = document.getElementById('dish-modal');
    if (!modal) return;
    var info = modal.querySelector('.dish-modal__info');
    if (!info) return;

    popupWrap = creaControlli(
      function () { return chiaveDi(popupNome, ''); },
      function () { aggiungi(popupNome, popupPrezzo, ''); },
      'cart-btn-wrap cart-btn-wrap--popup'
    );
    info.appendChild(popupWrap);

    // menu-modal.js segnala quale piatto sta mostrando
    modal.addEventListener('piatto-aperto', function (e) {
      popupNome = e.detail.nome;
      popupPrezzo = leggiPrezzo(e.detail.prezzo);

      // I piatti con varianti si aggiungono dalla card, dove c'e la scelta
      var multi = (e.detail.prezzo.match(/\d+[.,]\d{2}/g) || []).length > 1;
      popupWrap.hidden = multi;
      aggiornaTutto();
    });
  }

  /* =========================================================
     PULSANTE FLOTTANTE
     ========================================================= */

  var fab;

  function creaFab() {
    fab = document.createElement('button');
    fab.type = 'button';
    fab.className = 'cart-fab';
    fab.hidden = true;
    fab.setAttribute('aria-label', 'Apri il carrello');
    fab.innerHTML = '<span class="cart-fab__n"></span><span class="cart-fab__t"></span>';
    fab.addEventListener('click', apriPannello);
    document.body.appendChild(fab);
  }

  function aggiornaFab() {
    if (!fab) return;
    var n = numeroArticoli();
    fab.hidden = n === 0;
    fab.querySelector('.cart-fab__n').textContent = n;
    fab.querySelector('.cart-fab__t').textContent = formatta(totale());
  }

  /* =========================================================
     PANNELLO CARRELLO
     ========================================================= */

  var pannello, elenco, totaleEl, form;

  function creaPannello() {
    pannello = document.createElement('div');
    pannello.className = 'cart-panel';
    pannello.setAttribute('aria-hidden', 'true');
    pannello.innerHTML =
      '<div class="cart-panel__overlay"></div>' +
      '<div class="cart-panel__box" role="dialog" aria-label="Il tuo ordine">' +
        '<button type="button" class="cart-panel__close" aria-label="Chiudi">✕</button>' +
        '<h2 class="cart-panel__title">Il tuo ordine</h2>' +
        '<div class="cart-panel__list"></div>' +
        '<p class="cart-panel__vuoto">Il carrello è vuoto.</p>' +
        '<div class="cart-panel__tot"><span>Totale</span><strong></strong></div>' +
        '<form class="cart-form" novalidate>' +
          '<p class="cart-form__intro">Consegna a domicilio — compila i tuoi dati</p>' +
          campo('nome', 'Nome', 'text') +
          campo('cognome', 'Cognome', 'text') +
          campo('telefono', 'Telefono', 'tel') +
          campo('indirizzo', 'Indirizzo', 'text', 'Via e numero civico') +
          campo('citta', 'Città', 'text', 'Es. Torino') +
          '<div class="cart-form__coppia">' +
            campo('cap', 'CAP', 'text', '10121') +
            campo('provincia', 'Prov.', 'text', 'TO') +
          '</div>' +
          '<div class="cart-form__nota" hidden></div>' +
          '<label class="cart-form__row">' +
            '<span class="cart-form__label">Note <em>(facoltativo)</em></span>' +
            '<textarea name="note" rows="2" class="cart-form__input"></textarea>' +
          '</label>' +
          '<p class="cart-form__avviso" hidden></p>' +
          '<button type="submit" class="cart-form__invia">Ordina su WhatsApp</button>' +
          '<a class="cart-form__chiama" hidden></a>' +
        '</form>' +
      '</div>';

    document.body.appendChild(pannello);

    elenco = pannello.querySelector('.cart-panel__list');
    totaleEl = pannello.querySelector('.cart-panel__tot strong');
    form = pannello.querySelector('.cart-form');

    pannello.querySelector('.cart-panel__close').addEventListener('click', chiudiPannello);
    pannello.querySelector('.cart-panel__overlay').addEventListener('click', chiudiPannello);
    form.addEventListener('submit', inviaOrdine);
    // L'avviso si aggancia alla citta digitata, non piu a un menu a tendina
    form.elements.citta.addEventListener('input', aggiornaNotaSede);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && pannello.classList.contains('is-open')) chiudiPannello();
    });

    ripristinaDati();
    // Se la sede ripristinata e una di quelle solo-telefono, l'avviso
    // deve esserci gia all'apertura
    aggiornaNotaSede();
  }

  function campo(nome, etichetta, tipo, suggerimento) {
    return '<label class="cart-form__row">' +
      '<span class="cart-form__label">' + etichetta + '</span>' +
      '<input type="' + tipo + '" name="' + nome + '" class="cart-form__input" autocomplete="on"' +
        (suggerimento ? ' placeholder="' + suggerimento + '"' : '') + '>' +
      '<span class="cart-form__err"></span>' +
    '</label>';
  }

  function apriPannello() {
    pannello.classList.add('is-open');
    pannello.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    disegnaElenco();
  }

  function chiudiPannello() {
    pannello.classList.remove('is-open');
    pannello.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function disegnaElenco() {
    if (!elenco) return;
    elenco.innerHTML = '';
    var chiavi = Object.keys(carrello);

    pannello.querySelector('.cart-panel__vuoto').hidden = chiavi.length > 0;
    form.hidden = chiavi.length === 0;
    pannello.querySelector('.cart-panel__tot').hidden = chiavi.length === 0;

    chiavi.forEach(function (k) {
      var v = carrello[k];
      var riga = document.createElement('div');
      riga.className = 'cart-riga';
      riga.innerHTML =
        '<div class="cart-riga__testo">' +
          '<span class="cart-riga__nome">' + v.nome + '</span>' +
          (v.variante ? '<span class="cart-riga__var">' + v.variante + '</span>' : '') +
        '</div>' +
        '<div class="cart-qta cart-qta--riga">' +
          '<button type="button" class="cart-qta__btn" data-a="meno" aria-label="Togli uno">−</button>' +
          '<span class="cart-qta__n">' + v.qta + '</span>' +
          '<button type="button" class="cart-qta__btn" data-a="piu" aria-label="Aggiungi uno">+</button>' +
        '</div>' +
        '<span class="cart-riga__prezzo">' + formatta(v.prezzo * v.qta) + '</span>' +
        '<button type="button" class="cart-riga__x" aria-label="Rimuovi">✕</button>';

      riga.querySelector('[data-a="meno"]').addEventListener('click', function () { cambiaQta(k, -1); });
      riga.querySelector('[data-a="piu"]').addEventListener('click', function () { cambiaQta(k, 1); });
      riga.querySelector('.cart-riga__x').addEventListener('click', function () { rimuovi(k); });

      elenco.appendChild(riga);
    });

    totaleEl.textContent = formatta(totale());
  }

  /* =========================================================
     FORM: memoria, validazione, invio
     ========================================================= */

  // I dati del cliente restano salvati: chi riordina non li riscrive.
  function ripristinaDati() {
    try {
      var d = JSON.parse(localStorage.getItem(CHIAVE_DATI)) || {};
      ['nome', 'cognome', 'telefono', 'indirizzo', 'citta', 'cap', 'provincia', 'note'].forEach(function (c) {
        if (d[c] && form.elements[c]) form.elements[c].value = d[c];
      });
    } catch (e) { /* silenzioso */ }
  }

  function salvaDati(d) {
    try {
      localStorage.setItem(CHIAVE_DATI, JSON.stringify(d));
    } catch (e) { /* silenzioso */ }
  }

  /* ---------- Zone gestite separatamente ----------
     L'avviso compare mentre si scrive la citta, non all'invio: scoprirlo
     dopo aver compilato tutto il form sarebbe frustrante. Al posto del
     pulsante WhatsApp compare quello per chiamare. */

  // "Mondovì", "mondovi", "MONDOVI'" devono valere tutti: tolgo accenti,
  // apostrofi e maiuscole prima di confrontare.
  function normalizza(s) {
    return (s || '')
      .toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/['’]/g, '')
      .trim();
  }

  function zonaSeparata() {
    var c = normalizza(form.elements.citta.value);
    if (!c) return null;
    return CITTA_SEPARATE.filter(function (z) { return c === z.citta; })[0] || null;
  }

  function aggiornaNotaSede() {
    var nota = form.querySelector('.cart-form__nota');
    var inviaBtn = form.querySelector('.cart-form__invia');
    var chiamaBtn = form.querySelector('.cart-form__chiama');
    var z = zonaSeparata();

    if (z) {
      var tel = z.telefono.replace(/\s/g, '');
      nota.innerHTML =
        '<strong>Gli ordini per ' + z.nome + ' non passano dal sito.</strong> ' +
        'Quella sede è gestita separatamente: per ordinare chiama direttamente ' +
        'il ristorante al <a href="tel:' + tel + '">' + z.telefono + '</a>.';
      nota.hidden = false;

      chiamaBtn.textContent = 'Chiama ' + z.nome + ' — ' + z.telefono;
      chiamaBtn.href = 'tel:' + tel;
      chiamaBtn.hidden = false;
      inviaBtn.hidden = true;
    } else {
      nota.hidden = true;
      chiamaBtn.hidden = true;
      inviaBtn.hidden = false;
    }
  }

  function mostraErrore(campo, messaggio) {
    var riga = form.elements[campo].closest('.cart-form__row');
    riga.classList.add('is-errore');
    riga.querySelector('.cart-form__err').textContent = messaggio;
  }

  function puliciErrori() {
    form.querySelectorAll('.cart-form__row').forEach(function (r) {
      r.classList.remove('is-errore');
      var e = r.querySelector('.cart-form__err');
      if (e) e.textContent = '';
    });
    var avviso = form.querySelector('.cart-form__avviso');
    avviso.hidden = true;
    avviso.textContent = '';
  }

  function valida(d) {
    var errori = [];
    if (!d.nome) errori.push(['nome', 'Inserisci il tuo nome']);
    if (!d.cognome) errori.push(['cognome', 'Inserisci il tuo cognome']);

    if (!d.telefono) {
      errori.push(['telefono', 'Inserisci un numero di telefono']);
    } else if (d.telefono.replace(/[^\d]/g, '').length < 8) {
      errori.push(['telefono', 'Il numero sembra incompleto']);
    }

    if (!d.indirizzo) {
      errori.push(['indirizzo', 'Inserisci via e numero civico']);
    } else if (!/\d/.test(d.indirizzo)) {
      // Senza un numero l'indirizzo e quasi sempre incompleto
      errori.push(['indirizzo', 'Manca il numero civico']);
    }

    if (!d.citta) errori.push(['citta', 'Inserisci la città']);

    if (!d.cap) {
      errori.push(['cap', 'Inserisci il CAP']);
    } else if (!/^\d{5}$/.test(d.cap)) {
      errori.push(['cap', 'Il CAP è di 5 cifre']);
    }

    if (!d.provincia) {
      errori.push(['provincia', 'Inserisci la provincia']);
    } else if (!/^[A-Za-z]{2}$/.test(d.provincia)) {
      errori.push(['provincia', 'Due lettere (es. TO)']);
    }

    return errori;
  }

  /* ---------- Messaggio WhatsApp ----------
     encodeURIComponent gestisce accenti, simbolo € e a capo. */

  function componiMessaggio(d) {
    var righe = [];
    righe.push('Ciao Mai Thai! Vorrei fare un ordine 🍜');
    righe.push('Modalità: Consegna a domicilio');
    righe.push('');

    // La variante va fra parentesi: usando il trattino si confonderebbe
    // con quello che separa il prezzo.
    Object.keys(carrello).forEach(function (k) {
      var v = carrello[k];
      var etichetta = v.variante ? v.nome + ' (' + v.variante + ')' : v.nome;
      righe.push(v.qta + 'x ' + etichetta + ' – ' + formatta(v.prezzo * v.qta));
    });

    righe.push('');
    righe.push('Totale: ' + formatta(totale()));
    righe.push('');
    righe.push('Nome: ' + d.nome + ' ' + d.cognome);
    righe.push('Telefono: ' + d.telefono);
    // Indirizzo su una riga sola, nel formato italiano abituale
    righe.push('Indirizzo: ' + d.indirizzo + ', ' + d.cap + ' ' + d.citta + ' (' + d.provincia + ')');
    if (d.note) righe.push('Note: ' + d.note);

    return righe.join('\n');
  }

  function inviaOrdine(e) {
    e.preventDefault();
    puliciErrori();

    var d = {
      nome: form.elements.nome.value.trim(),
      cognome: form.elements.cognome.value.trim(),
      telefono: form.elements.telefono.value.trim(),
      indirizzo: form.elements.indirizzo.value.trim(),
      citta: form.elements.citta.value.trim(),
      cap: form.elements.cap.value.trim(),
      provincia: form.elements.provincia.value.trim().toUpperCase(),
      note: form.elements.note.value.trim()
    };

    if (Object.keys(carrello).length === 0) {
      avvisa('Il carrello è vuoto: aggiungi almeno un piatto.');
      return;
    }

    var errori = valida(d);
    if (errori.length) {
      errori.forEach(function (x) { mostraErrore(x[0], x[1]); });
      form.elements[errori[0][0]].focus();
      return;
    }

    // Zona servita da una sede gestita separatamente: li l'ordine si fa
    // al telefono, non da qui
    var z = zonaSeparata();
    if (z) {
      avvisa('Gli ordini per ' + z.nome + ' non passano dal sito: chiama il ' + z.telefono + '.');
      return;
    }

    if (!ORDINI_A) {
      avvisa('Il servizio di ordinazione non è ancora attivo. Chiama il ristorante per ordinare.');
      return;
    }

    salvaDati(d);
    var url = 'https://wa.me/' + ORDINI_A + '?text=' + encodeURIComponent(componiMessaggio(d));
    window.open(url, '_blank');
  }

  function avvisa(testo) {
    var a = form.querySelector('.cart-form__avviso');
    a.textContent = testo;
    a.hidden = false;
  }

  /* =========================================================
     AVVIO
     ========================================================= */

  function aggiornaTutto() {
    controlli.forEach(function (c) { c.aggiorna(); });
    aggiornaFab();
    if (pannello && pannello.classList.contains('is-open')) disegnaElenco();
  }

  carica();
  montaSulleCard();
  montaSulleBevande();
  montaSulPopup();
  creaFab();
  creaPannello();
  aggiornaTutto();

  window.MaiThaiCarrello = {
    stato: function () { return carrello; },
    totale: totale,
    formatta: formatta,
    componiMessaggio: componiMessaggio,
    svuota: function () { carrello = {}; salva(); aggiornaTutto(); }
  };
})();
