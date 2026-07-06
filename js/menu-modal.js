// ===== DATI PIATTI (placeholder — sostituire con dati reali) =====
const DISH_DATA = {

  // ANTIPASTI
  'Fried Mix': {
    ingredients: 'Gamberi, calamari, verdure miste pastellate, farina di riso, olio di semi, salsa agrodolce',
    removable: ['Gamberi', 'Calamari', 'Salsa agrodolce'],
    spice: 0
  },
  'Crispy Koong': {
    ingredients: 'Gamberi, pastella croccante di riso, olio di semi, sesamo, salsa thai',
    removable: ['Sesamo', 'Salsa thai'],
    spice: 0
  },
  'Koong Roll': {
    ingredients: 'Gamberi, pasta di riso, vermicelli, verdure, salsa di soia',
    removable: ['Salsa di soia'],
    spice: 0
  },
  'Spring Roll': {
    ingredients: 'Verdure miste, vermicelli di riso, pasta di riso, salsa agrodolce',
    removable: ['Salsa agrodolce'],
    spice: 0
  },
  'Chang Roll': {
    ingredients: 'Maiale, pasta di riso, vermicelli, cipolla, salsa hoisin',
    removable: ['Cipolla', 'Salsa hoisin'],
    spice: 0
  },
  'Green Sum': {
    ingredients: 'Gamberi, bambù, pasta di frumento, salsa di soia, zenzero',
    removable: ['Zenzero'],
    spice: 0
  },
  'Squid Yang': {
    ingredients: 'Calamari indopacifici, lime, curcuma, salsa di pesce, coriandolo, aglio',
    removable: ['Coriandolo', 'Aglio'],
    spice: 1
  },
  'Golden Squid': {
    ingredients: 'Calamari, farina di riso, curcuma, aglio, pepe bianco, olio di semi',
    removable: ['Aglio'],
    spice: 0
  },
  'Gamberi Satay': {
    ingredients: 'Gamberi, salsa satay, arachidi, lemongrass, curcuma, latte di cocco',
    removable: ['Arachidi', 'Lemongrass'],
    spice: 0
  },
  'Tamarind Koong': {
    ingredients: 'Gamberi, salsa di tamarindo, aglio, cipolla, zucchero di palma',
    removable: ['Cipolla', 'Aglio'],
    spice: 0
  },
  'Pollo Satay': {
    ingredients: 'Pollo, salsa satay, arachidi, lemongrass, curcuma, latte di cocco',
    removable: ['Arachidi', 'Lemongrass'],
    spice: 0
  },
  'Riso Thai': {
    ingredients: 'Riso thai gelsomino, aglio, olio di sesamo',
    removable: ['Aglio'],
    spice: 0
  },

  // NOODLES
  'Pad Thai': {
    ingredients: 'Noodles di riso, uovo, germogli di soia, cipollotto, arachidi, salsa di pesce, tamarindo',
    removable: ['Arachidi', 'Uovo', 'Cipollotto'],
    spice: 0
  },
  'Chiang Mai Noodles': {
    ingredients: 'Noodles all\'uovo, pollo, curry rosso, latte di cocco, cipolla rossa, lime',
    removable: ['Cipolla', 'Lime'],
    spice: 2
  },
  'Yellow Submarine': {
    ingredients: 'Noodles di riso, curry giallo, pollo, latte di cocco, curcuma, cipolla',
    removable: ['Cipolla'],
    spice: 2
  },
  'Pad See Ew': {
    ingredients: 'Noodles larghi di riso, pollo, uovo, broccoli cinesi, salsa di soia scura',
    removable: ['Uovo', 'Broccoli'],
    spice: 0
  },
  'Pad Talay': {
    ingredients: 'Noodles di riso, gamberi, calamari, cozze, salsa di ostriche, aglio',
    removable: ['Cozze', 'Aglio'],
    spice: 2
  },
  'Saimon Sut Khieo': {
    ingredients: 'Noodles di soia, salmone, verdure, salsa di soia, zenzero, sesamo',
    removable: ['Zenzero', 'Sesamo'],
    spice: 1
  },
  'Pad Ginger': {
    ingredients: 'Noodles, pollo, zenzero fresco, cipolla, peperoni, salsa di soia, peperoncino',
    removable: ['Peperoncino', 'Cipolla', 'Zenzero'],
    spice: 0
  },
  'Pad Thai Omelette': {
    ingredients: 'Uova, noodles di riso, gamberi, germogli di soia, cipollotto, arachidi, salsa di pesce',
    removable: ['Arachidi', 'Cipollotto'],
    spice: 0
  },

  // RISO
  'Sea World': {
    ingredients: 'Riso thai, gamberi, calamari, cozze, aglio, salsa di ostriche, cipollotto',
    removable: ['Cozze', 'Cipollotto', 'Aglio'],
    spice: 0
  },
  'Besar': {
    ingredients: 'Riso thai, pollo, uovo, curry giallo, curcuma, cipolla, aglio',
    removable: ['Uovo', 'Cipolla'],
    spice: 1
  },
  'Basil Rice': {
    ingredients: 'Riso thai, pollo, basilico thai, aglio, peperoncino, salsa di soia',
    removable: ['Peperoncino', 'Aglio'],
    spice: 2
  },
  'Erawan Rice': {
    ingredients: 'Riso thai, verdure miste, uovo, salsa speciale della casa, cipollotto',
    removable: ['Uovo', 'Cipollotto'],
    spice: 1
  },
  'Bangkok Rice': {
    ingredients: 'Riso thai, maiale, aglio, salsa di soia, olio di sesamo, sesamo',
    removable: ['Sesamo', 'Aglio'],
    spice: 0
  },
  'Green Thai': {
    ingredients: 'Riso thai, curry verde, latte di cocco, verdure, basilico thai',
    removable: ['Basilico'],
    spice: 1
  },
  'Pineapple Rice': {
    ingredients: 'Riso thai, ananas, anacardi, uvetta, curry, cipolla, uovo',
    removable: ['Anacardi', 'Uvetta', 'Cipolla'],
    spice: 1
  },
  'Tom Tom': {
    ingredients: 'Riso thai, manzo, salsa piccante, erbe aromatiche, cipollotto',
    removable: ['Cipollotto'],
    spice: 1
  },

  // CURRY
  'Chicken Massaman': {
    ingredients: 'Pollo, patate, arachidi, latte di cocco, curry massaman, cipolla, cardamomo',
    removable: ['Arachidi', 'Patate', 'Cipolla'],
    spice: 1
  },
  'Green Chicken': {
    ingredients: 'Pollo, curry verde, latte di cocco, melanzane, basilico thai, peperoncino',
    removable: ['Melanzane', 'Basilico', 'Peperoncino'],
    spice: 3
  },
  'Mai Thai Curry': {
    ingredients: 'Pollo, curry della casa, latte di cocco, verdure di stagione, basilico',
    removable: ['Basilico'],
    spice: 2
  },
  'Yellow Chicken': {
    ingredients: 'Pollo, curry giallo, patate, latte di cocco, cipolla, curcuma',
    removable: ['Patate', 'Cipolla'],
    spice: 1
  },
  'Red Pork': {
    ingredients: 'Maiale, curry rosso, latte di cocco, peperoni, basilico thai',
    removable: ['Peperoni', 'Basilico'],
    spice: 3
  },
  'Beef Panang': {
    ingredients: 'Manzo, curry panang, latte di cocco, foglie di lime kaffir, arachidi',
    removable: ['Arachidi', 'Foglie di lime'],
    spice: 1
  },
  'Vegetarian Curry': {
    ingredients: 'Tofu, verdure miste, curry verde, latte di cocco, basilico thai, peperoncino',
    removable: ['Tofu', 'Peperoncino', 'Basilico'],
    spice: 2
  },

  // SEAFOOD
  'Chef\'s Seafood': {
    ingredients: 'Gamberi, calamari, cozze, capesante, salsa dello chef, aglio, basilico',
    removable: ['Cozze', 'Capesante', 'Aglio'],
    spice: 2
  },
  'Prawn Panang': {
    ingredients: 'Gamberi, curry panang, latte di cocco, foglie di lime kaffir, arachidi',
    removable: ['Arachidi', 'Foglie di lime'],
    spice: 2
  },
  'Prawn Mike Style': {
    ingredients: 'Gamberi, salsa speciale, aglio, peperoncino, cipollotto, lime',
    removable: ['Peperoncino', 'Cipollotto', 'Aglio'],
    spice: 1
  },
  'Prawn Garee': {
    ingredients: 'Gamberi, curry giallo, latte di cocco, cipolla, curcuma, aglio',
    removable: ['Cipolla', 'Aglio'],
    spice: 1
  },
  'Plaa Dook': {
    ingredients: 'Pesce gatto, aglio, peperoncino, salsa di pesce, basilico thai',
    removable: ['Peperoncino', 'Aglio'],
    spice: 2
  },
  'Khing Plaa': {
    ingredients: 'Orata, zenzero, cipolla, cipollotto, peperoni, salsa di soia, salsa d\'ostriche',
    removable: ['Zenzero', 'Cipollotto', 'Cipolla'],
    spice: 1
  },
  'Gwen Fish': {
    ingredients: 'Pesce, curry rosso, latte di cocco, erbe aromatiche, basilico thai',
    removable: ['Basilico'],
    spice: 1
  },
  'Kalanoi': {
    ingredients: 'Frutti di mare misti, salsa nera, aglio, pepe nero, cipollotto',
    removable: ['Cipollotto', 'Aglio'],
    spice: 1
  },
  'Fish Curry': {
    ingredients: 'Pesce, curry rosso, latte di cocco, melanzane, basilico thai, peperoncino',
    removable: ['Melanzane', 'Peperoncino', 'Basilico'],
    spice: 1
  },

  // CARNI
  'Black Beef': {
    ingredients: 'Manzo, salsa nera, aglio, pepe nero, cipolla, olio di sesamo',
    removable: ['Cipolla', 'Aglio'],
    spice: 0
  },
  'Beef Chilli': {
    ingredients: 'Manzo, peperoncino, aglio, salsa di soia, cipollotto, pepe',
    removable: ['Peperoncino', 'Cipollotto', 'Aglio'],
    spice: 3
  },
  'Beef Garlic Chilli Pepper': {
    ingredients: 'Manzo, aglio, peperoncino, pepe nero, farina 00, salsa di soia',
    removable: ['Peperoncino', 'Aglio'],
    spice: 2
  },
  'Chicken Thai Style': {
    ingredients: 'Pollo, aglio, salsa thai della casa, verdure di stagione, cipollotto',
    removable: ['Cipollotto', 'Aglio'],
    spice: 1
  },
  'Ginger Beef': {
    ingredients: 'Manzo, zenzero fresco, cipolla, peperoni rossi, salsa di soia, salsa di ostriche',
    removable: ['Zenzero', 'Cipolla', 'Peperoni'],
    spice: 0
  },
  'Mushbeef': {
    ingredients: 'Manzo, funghi misti, salsa di ostriche, aglio, cipollotto, pepe nero',
    removable: ['Cipollotto', 'Aglio'],
    spice: 0
  },
  'Chicken Cashews': {
    ingredients: 'Pollo, anacardi tostati, peperoni, cipolla, salsa dolce di peperoncino',
    removable: ['Anacardi', 'Cipolla', 'Peperoni'],
    spice: 1
  },

  // ZUPPE
  'Tom Yam Koong': {
    ingredients: 'Brodo speziato, gamberi, funghi, lemongrass, foglie di lime, galanga, coriandolo',
    removable: ['Coriandolo', 'Funghi'],
    spice: 3
  },
  'Tom Yam Plaa': {
    ingredients: 'Brodo speziato, pesce, funghi, lemongrass, foglie di lime, galanga, coriandolo',
    removable: ['Coriandolo', 'Funghi'],
    spice: 2
  },
  'Tom Kha Kai': {
    ingredients: 'Brodo di cocco, pollo, funghi, galanga, lemongrass, foglie di lime, coriandolo',
    removable: ['Coriandolo', 'Funghi'],
    spice: 1
  },
  'Noodle Soup': {
    ingredients: 'Brodo di pollo, noodles di riso, verdure, carne a scelta, cipollotto, coriandolo',
    removable: ['Coriandolo', 'Cipollotto'],
    spice: 0
  },

  // BOWLS & VERDURE
  'Siam Bowl': {
    ingredients: 'Riso thai, maiale marinato, uovo all\'occhio di bue, papaya fermentata, carote, cipollotto, coriandolo, sesamo',
    removable: ['Uovo', 'Coriandolo', 'Sesamo'],
    spice: 0
  },
  'Koh Tao': {
    ingredients: 'Riso thai, gamberi, mango, verdure di stagione, salsa agrodolce, lime',
    removable: ['Mango', 'Lime'],
    spice: 0
  },
  'Papaya Salad': {
    ingredients: 'Papaya verde, pomodorini, fagiolini, arachidi, aglio, peperoncino, lime, salsa di pesce',
    removable: ['Arachidi', 'Peperoncino', 'Aglio'],
    spice: 3
  },
  'Yellow Spinach': {
    ingredients: 'Spinaci, aglio, salsa di ostriche, olio di sesamo',
    removable: ['Aglio'],
    spice: 1
  },
  'Oyster Veggie': {
    ingredients: 'Funghi ostrica, verdure di stagione, aglio, salsa di soia, olio di sesamo',
    removable: ['Aglio'],
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
  const ingredientsEl = modal.querySelector('.dish-modal__ingredients');
  const removableEl   = modal.querySelector('.dish-modal__removable');

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
      img.src = 'images/elefante-rosso.svg';
      img.alt = i <= spiceLevel ? 'piccante' : '';
      if (i > spiceLevel) img.classList.add('inactive');
      spiceIconsEl.appendChild(img);
    }

    // Ingredienti
    ingredientsEl.textContent = data.ingredients || 'Informazioni in aggiornamento.';

    // Eliminabili
    removableEl.innerHTML = '';
    const removable = data.removable || [];
    if (removable.length > 0) {
      removable.forEach(item => {
        const chip = document.createElement('span');
        chip.className = 'dish-modal__chip';
        chip.textContent = item;
        removableEl.appendChild(chip);
      });
    } else {
      const none = document.createElement('span');
      none.className = 'dish-modal__no-removable';
      none.textContent = 'Nessun ingrediente eliminabile';
      removableEl.appendChild(none);
    }

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
})();
