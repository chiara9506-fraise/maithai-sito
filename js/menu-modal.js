// ===== DATI PIATTI =====
// Ingredienti reali forniti dal cliente. L'asterisco indica prodotto
// congelato all'origine ed e una dicitura obbligatoria: non va rimossa.
// Il campo 'removable' e stato tolto: quello precedente era inventato e
// citava ingredienti inesistenti nei piatti. Va ricompilato sui dati veri.
const DISH_DATA = {

  // ANTIPASTI
  'Fried Mix': {
    ingredients: 'Composto da: 1 Spring Roll, 1 Koong Roll, 1 Chang Roll, 2 Crispy Koong, 1 Green Sum',
    spice: 0
  },
  'Riso Thai': {
    ingredients: 'Riso bollito',
    spice: 0
  },
  'Crispy Koong': {
    ingredients: 'Mazzancolle tropicali*, briciole di pane',
    spice: 0
  },
  'Koong Roll': {
    ingredients: 'Mazzancolle tropicali*, spaghetti di soia, carote, cipolla, cavolo verza, pepe nero, salsa d\'ostriche, salsa di soia',
    spice: 0
  },
  'Spring Roll': {
    ingredients: 'Verdure, carote, cipolla, cipollotto, patate, cavolo verza, salsa vegetariana',
    spice: 0
  },
  'Chang Roll': {
    ingredients: 'Maiale, spaghetti di soia, carote, funghi, cipollotto, pepe nero, salsa d\'ostriche, salsa di soia',
    spice: 0
  },
  'Squid Yang': {
    ingredients: 'Calamari indopacifici*, lime, curcuma, salsa di pesce, salsa di soia, salsa di zenzero, cipolla, chilli, aglio, coriandolo',
    spice: 1
  },
  'Gamberi Satay': {
    ingredients: 'Mazzancolle tropicali*, latte di cocco, salsa satay',
    spice: 0
  },
  'Golden Squid': {
    ingredients: 'Calamari indopacifici*, uova, farina 00, pepe, vinaigrette thailandese piccante',
    spice: 0
  },
  'Green Sum': {
    ingredients: 'Samosa vegetariani*, farina di frumento, carote, cavolo bianco, cipollotto, jicama, pepe, salsa di soia',
    spice: 0
  },
  'Tamarind Koong': {
    ingredients: 'Mazzancolle tropicali*, salsa al tamarindo, semi di sesamo',
    spice: 0
  },
  'Pollo Satay': {
    ingredients: 'Pollo, latte di cocco, salsa satay',
    spice: 0
  },

  // NOODLES
  'Pad Thai': {
    ingredients: 'Tagliatelle di riso, uova, tofu, carote, germogli di soia, cipollotto, lime, tamarindo, granella di arachidi, salsa d\'ostriche, salsa di soia, salsa di pesce',
    spice: 0,
    scelta: ['Mazzancolle*', 'Pollo', 'Calamari*', 'Vegetariano']
  },
  'Chiang Mai Noodles': {
    ingredients: 'Noodles gialli, pollo, carote, cipolla, cipollotto, curry rosso, salsa di pesce',
    spice: 2
  },
  'Yellow Submarine': {
    ingredients: 'Noodles gialli, mazzancolle tropicali*, calamari indopacifici*, cipolla, carote, fagiolini, basilico thai, chilli, salsa basil, pepe',
    spice: 2
  },
  'Pad See Ew': {
    ingredients: 'Tagliatelle di riso, pollo, uova, broccoli, pepe nero, salsa di soia dolce, salsa di pesce',
    spice: 0
  },
  'Pad Talay': {
    ingredients: 'Tagliatelle di riso, mazzancolle tropicali*, calamari indopacifici*, foglie di kaffir lime, carote, funghi, basilico thai, katchai, pepe, salsa d\'ostriche, salsa di pesce, chilli',
    spice: 2
  },
  'Saimon Sut Khieo': {
    ingredients: 'Noodles gialli, calamari*, pesto di zucchine, coriandolo, fagiolini, anacardi',
    spice: 1
  },
  'Pad Ginger': {
    ingredients: 'Tagliatelle di riso, maiale, zenzero, germogli di soia, cavolo verza, fagiolini lunghi, carote, cipolla, cipollotto, salsa vegetariana, salsa di soia',
    spice: 0
  },
  'Pad Thai Omelette': {
    ingredients: 'Tagliatelle di riso, omelette, tofu, carote, germogli di soia, cipollotto, lime, tamarindo, granella di arachidi, salsa d\'ostriche, salsa di soia, salsa di pesce',
    spice: 0,
    scelta: ['Mazzancolle*', 'Pollo', 'Calamari*', 'Vegetariano']
  },

  // RISO
  'Sea World': {
    ingredients: 'Riso saltato, mazzancolle tropicali*, calamari indopacifici*, uova, pomodori, cipolla, cipollotto, salsa di pesce, salsa d\'ostriche',
    spice: 0
  },
  'Besar': {
    ingredients: 'Riso saltato, mazzancolle tropicali*, uova, cipolla, cipollotto, foglie di kaffir lime, curry rosso, latte di cocco, salsa di pesce, salsa d\'ostriche, chilli',
    spice: 1
  },
  'Basil Rice': {
    ingredients: 'Riso, pollo tritato, uovo all\'occhio di bue, cipolla, fagiolini lunghi, basilico thai, peperoni, carote, chilli, salsa basil',
    spice: 2
  },
  'Erawan Rice': {
    ingredients: 'Riso saltato, maiale, uova, germogli di soia, cipolla, foglie di kaffir lime, cavolo verza, basilico thai, salsa tomyum, salsa d\'ostriche, salsa di pesce, chilli',
    spice: 1
  },
  'Bangkok Rice': {
    ingredients: 'Riso saltato, pollo, carote, fagiolini lunghi, uova, basilico thai, cipolla, salsa di soia, salsa d\'ostriche',
    spice: 0
  },
  'Green Thai': {
    ingredients: 'Riso saltato, pollo, uova, fagiolini lunghi, peperoni, basilico thai, foglie di kaffir lime, curry verde, latte di cocco, salsa d\'ostriche, salsa di pesce',
    spice: 1
  },
  'Pineapple Rice': {
    ingredients: 'Riso saltato, ananas, peperoni, cipollotto, anacardi, curcuma, latte di cocco, salsa vegetariana, salsa piccante',
    spice: 1
  },
  'Tom Tom': {
    ingredients: 'Riso saltato, mazzancolle tropicali*, calamari indopacifici*, uova, germogli di soia, cipolla, foglie di kaffir lime, cavolo verza, basilico thai, salsa tomyum, salsa d\'ostriche, salsa di pesce, chilli',
    spice: 1
  },

  // CURRY
  'Chicken Massaman': {
    ingredients: 'Pollo, curry massaman, patate, arachidi, cannella, latte di cocco, salsa di pesce',
    spice: 1
  },
  'Green Chicken': {
    ingredients: 'Pollo, curry verde, melanzane, fagiolini lunghi, basilico thai, foglie di kaffir lime, latte di cocco, salsa di pesce, chilli',
    spice: 3
  },
  'Mai Thai Curry': {
    ingredients: 'Vitello, curry verde, fagiolini lunghi, carote, melanzane, basilico thai, foglie di kaffir lime, latte di cocco, salsa di pesce, salsa d\'ostriche',
    spice: 2
  },
  'Yellow Chicken': {
    ingredients: 'Pollo, curry giallo, patate, latte di cocco, salsa di pesce',
    spice: 1
  },
  'Red Pork': {
    ingredients: 'Maiale, curry rosso, patate, foglie di kaffir lime, latte di cocco, salsa di pesce, chilli',
    spice: 3
  },
  'Beef Panang': {
    ingredients: 'Vitello, curry panang, melanzane, foglie di kaffir lime, latte di cocco, salsa di pesce, chilli',
    spice: 1
  },
  'Vegetarian Curry': {
    ingredients: 'Carote, baby corn, patate, fagiolini lunghi, peperoni, zucchine, foglie di kaffir lime, basilico thai, curry rosso, latte di cocco, salsa vegetariana',
    spice: 2
  },

  // SEAFOOD
  'Chef\'s Seafood': {
    ingredients: 'Mazzancolle tropicali*, calamari indopacifici*, orata, foglie di kaffir lime, basilico thai, salsa tomyum, chilli, salsa d\'ostriche, salsa di soia dolce',
    spice: 2
  },
  'Prawn Panang': {
    ingredients: 'Mazzancolle tropicali*, curry panang, fagiolini lunghi, peperoni, cavolo verza, cipolla, cipollotto, basilico thai, pepe, latte di cocco, salsa d\'ostriche, salsa di pesce, chilli',
    spice: 2
  },
  'Prawn Mike Style': {
    ingredients: 'Mazzancolle tropicali*, curry verde, fagiolini, basilico thai, foglie di kaffir lime, latte di cocco, salsa tomyum, salsa di pesce, salsa d\'ostriche',
    spice: 1
  },
  'Prawn Garee': {
    ingredients: 'Mazzancolle tropicali*, curry giallo, fagiolini lunghi, cipolla, cipollotto, basilico thai, latte di cocco, salsa d\'ostriche, salsa di pesce, chilli',
    spice: 1
  },
  'Plaa Dook': {
    ingredients: 'Branzino*, curry rosso, peperoni, cipolle, foglie di kaffir lime, basilico thai, pepe, farina 00, salsa di soia, salsa d\'ostriche, chilli',
    spice: 2
  },
  'Khing Plaa': {
    ingredients: 'Orata*, zenzero, cipolla, cipollotto, peperoni, pepe nero, farina 00, salsa di soia, salsa d\'ostriche',
    spice: 1
  },
  'Gwen Fish': {
    ingredients: 'Orata*, peperoni, cipollotto, foglie di kaffir lime, farina 00, salsa d\'ostriche, salsa di soia, salsa di chilli dolce',
    spice: 1
  },
  'Kalanoi': {
    ingredients: 'Calamari indopacifici*, basilico thai, curry verde, latte di cocco',
    spice: 1
  },
  'Fish Curry': {
    ingredients: 'Orata*, curry massaman, latte di cocco, patate, galanga, basilico thai, foglie di kaffir lime, citronella, farina 00, salsa di pesce, salsa d\'ostriche',
    spice: 1
  },

  // CARNI
  'Black Beef': {
    ingredients: 'Vitello, fagiolini lunghi, cipollotto, cipolla, citronella, pepe nero, farina 00, salsa d\'ostriche, salsa di soia',
    spice: 0
  },
  'Beef Chilli': {
    ingredients: 'Vitello macinato, peperoni, fagiolini lunghi, cipolla, basilico thai, pepe nero, chilli, salsa basil',
    spice: 3
  },
  'Beef Garlic Chilli Pepper': {
    ingredients: 'Vitello, aglio, cipollotto, pepe, farina 00, salsa d\'ostriche, salsa di soia dolce, chilli',
    spice: 2
  },
  'Chicken Thai Style': {
    ingredients: 'Pollo, curry rosso, fagiolini lunghi, basilico thai, citronella, foglie di kaffir lime, pepe, panna, salsa di pesce, chilli',
    spice: 1
  },
  'Ginger Beef': {
    ingredients: 'Vitello, zenzero, cipolla, cipollotto, peperoni, pepe nero, farina 00, salsa di soia, salsa d\'ostriche',
    spice: 0
  },
  'Mushbeef': {
    ingredients: 'Vitello, funghi shiitake, carote, cipolle, germogli di soia, pepe, farina 00, olio di sesamo, salsa di soia, salsa teriyaki',
    spice: 0
  },
  'Chicken Cashews': {
    ingredients: 'Pollo, fagiolini lunghi, carote, anacardi, farina 00, latte di cocco, salsa di soia, salsa d\'ostriche, chilli',
    spice: 1
  },

  // ZUPPE
  'Tom Yam Koong': {
    ingredients: 'Mazzancolle tropicali*, funghi, pomodori, cipolla, citronella, lime, latte, salsa d\'ostriche, salsa tomyum, salsa di pesce, chilli',
    spice: 3
  },
  'Noodle Soup': {
    ingredients: 'Tagliatelle di riso, brodo, maiale, carote, cipollotto, cavolo verza, germogli di soia, pepe, olio di sesamo, salsa d\'ostriche, salsa di pesce',
    spice: 0
  },
  'Tom Yam Plaa': {
    ingredients: 'Mazzancolle tropicali*, calamari indopacifici, filetti di orata*, funghi, cipolla, foglie di kaffir lime, pomodori, zenzero, citronella, latte, salsa di pesce, salsa d\'ostriche, salsa tomyum, chilli',
    spice: 2
  },
  'Tom Kha Kai': {
    ingredients: 'Pollo, funghi, pomodori, cipollotto, galanga, citronella, latte di cocco, salsa d\'ostriche, salsa di pesce',
    spice: 1
  },

  // BOWLS & VERDURE
  'Siam Bowl': {
    ingredients: 'Riso, maiale marinato, uovo all\'occhio di bue, papaya fermentata, carote, cipolle caramellate, cipollotto, coriandolo, semi di sesamo',
    spice: 0
  },
  'Koh Tao': {
    ingredients: 'Riso, branzino*, uovo all\'occhio di bue, carote, peperoni, papaya fermentata, cipolla caramellata, cipollotto, coriandolo, farina 00, salsa sweet chilli',
    spice: 0
  },
  'Papaya Salad': {
    ingredients: 'Mazzancolle tropicali*, papaya verde, tamarindo, carote, pomodorini, arachidi, lime, salsa di pesce, chilli',
    spice: 3
  },
  'Yellow Spinach': {
    ingredients: 'Spinaci*, curry giallo, cipolla, latte di cocco, salsa d\'ostriche, salsa di pesce',
    spice: 1
  },
  'Oyster Veggie': {
    ingredients: 'Carote, peperoni, zucchine, fagiolini lunghi, cipolla, germogli di soia, pepe, salsa d\'ostriche, salsa di soia, salsa vegetariana',
    spice: 0
  }
};

// ===== LOGICA MODAL =====
(function () {
  const modal    = document.getElementById('dish-modal');
  if (!modal) return;

  const overlay       = modal.querySelector('.dish-modal__overlay');
  const closeBtn      = modal.querySelector('.dish-modal__close');
  const imgEl         = modal.querySelector('.dish-modal__img img');
  const badgeEl       = modal.querySelector('.dish-modal__badge');
  const nameEl        = modal.querySelector('.dish-modal__name');
  const priceEl       = modal.querySelector('.dish-modal__price');
  const spiceIconsEl  = modal.querySelector('.dish-modal__spice-icons');
  const vegEl         = modal.querySelector('.dish-modal__veg');
  const ingredientsEl = modal.querySelector('.dish-modal__ingredients');
  const removableEl   = modal.querySelector('.dish-modal__removable');
  const choiceEl      = modal.querySelector('.dish-modal__choice');
  const choiceSection = modal.querySelector('.dish-modal__choice-section');
  const removableSection = modal.querySelector('.dish-modal__removable-section');
  const noteEl        = modal.querySelector('.dish-modal__note');

  function openModal(card) {
    // Nome (ignora lo span qty se presente)
    const nameNode = card.querySelector('.dish-card-sm__name');
    const name = nameNode.firstChild.textContent.trim();

    const price   = card.querySelector('.dish-card-sm__price').textContent.trim();
    const imgSrc  = card.querySelector('.dish-card-sm__img img')?.src || '';
    const badge   = card.querySelector('.dish-card-sm__badge')?.textContent.trim() || '';
    const data    = DISH_DATA[name] || {};

    // Foto
    imgEl.src = imgSrc;
    imgEl.alt = name;

    // Badge
    if (badge) {
      badgeEl.textContent = badge;
      badgeEl.hidden = false;
    } else {
      badgeEl.hidden = true;
    }

    // Nome e prezzo
    nameEl.textContent = name;
    const amount = price.replace('€', '').trim();
    priceEl.innerHTML = '<span class="dish-modal__currency">€</span>' + amount;

    // Piccantezza (3 elefanti)
    spiceIconsEl.innerHTML = '';
    const spiceLevel = data.spice ?? 0;
    for (let i = 1; i <= 3; i++) {
      const img = document.createElement('img');
      img.src = 'images/loghi/elefante-rosso.svg';
      img.alt = i <= spiceLevel ? 'piccante' : '';
      if (i > spiceLevel) img.classList.add('inactive');
      spiceIconsEl.appendChild(img);
    }

    // Vegetariano
    const isVeg = !!card.querySelector('.dish-tags img[src*="elefante-verde"]');
    vegEl.hidden = !isVeg;

    // Ingredienti
    const ingr = data.ingredients || 'Informazioni in aggiornamento.';
    ingredientsEl.textContent = ingr;

    // Proteina a scelta — sezione presente solo per i piatti che la prevedono
    const scelta = data.scelta || [];
    choiceEl.innerHTML = '';
    choiceSection.hidden = scelta.length === 0;
    scelta.forEach(opt => {
      const span = document.createElement('span');
      span.className = 'dish-modal__choice-item';
      span.textContent = opt;
      choiceEl.appendChild(span);
    });

    // Eliminabili. Senza dato la sezione sparisce: dichiarare "nessun
    // ingrediente eliminabile" sarebbe un'affermazione non verificata.
    const removable = data.removable || [];
    removableEl.innerHTML = '';
    removableSection.hidden = removable.length === 0;
    removable.forEach(item => {
      const chip = document.createElement('span');
      chip.className = 'dish-modal__chip';
      chip.textContent = item;
      removableEl.appendChild(chip);
    });

    // Legenda asterisco (congelato all'origine): serve se il simbolo compare
    // negli ingredienti OPPURE fra le proteine a scelta. Sta in fondo cosi
    // vale per entrambe le sezioni.
    noteEl.hidden = !(ingr + scelta.join(' ')).includes('*');

    // Apri
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Click sulle card
  document.querySelectorAll('.dish-card-sm').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => openModal(card));
  });

  // Chiusura
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  // Swipe verso il basso per chiudere (mobile)
  const modalBox = modal.querySelector('.dish-modal__box');
  let touchY0 = 0;
  modalBox.addEventListener('touchstart', e => { touchY0 = e.touches[0].clientY; }, { passive: true });
  modalBox.addEventListener('touchend', e => {
    if (e.changedTouches[0].clientY - touchY0 > 60) closeModal();
  }, { passive: true });
})();
