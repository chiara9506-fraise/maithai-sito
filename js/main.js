// Main JS — Mai Thai

// Burger menu mobile
const header = document.getElementById('header');
const burger = header.querySelector('.header__burger');

burger.addEventListener('click', () => {
  const isOpen = header.classList.toggle('is-open');
  burger.setAttribute('aria-expanded', isOpen);
});

// Chiudi menu cliccando un link
header.querySelectorAll('.header__nav a').forEach(link => {
  link.addEventListener('click', () => {
    header.classList.remove('is-open');
    burger.setAttribute('aria-expanded', false);
  });
});

// Gallery — clona le foto per loop seamless
const galleryStrip = document.querySelector('.gallery__strip');
if (galleryStrip) {
  const items = [...galleryStrip.children];
  while (galleryStrip.scrollWidth < window.innerWidth * 2) {
    items.forEach(item => {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      galleryStrip.appendChild(clone);
    });
  }
  if ((galleryStrip.children.length / items.length) % 2 !== 0) {
    items.forEach(item => {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      galleryStrip.appendChild(clone);
    });
  }
}

// Ticker Sedi — clona i nomi per loop seamless (entrambe le righe)
document.querySelectorAll('.sedi-ticker__track').forEach(track => {
  const seed = [...track.children];
  while (track.scrollWidth < window.innerWidth * 2) {
    seed.forEach(el => {
      const clone = el.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });
  }
  if ((track.children.length / seed.length) % 2 !== 0) {
    seed.forEach(el => {
      const clone = el.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });
  }
});

// Ticker — clona il contenuto finché non copre lo schermo senza vuoti
const tickerTrack = document.querySelector('.ticker__track');
if (tickerTrack) {
  const seed = [...tickerTrack.children];
  // Aggiunge copie finché il track supera 3× la larghezza dello schermo
  while (tickerTrack.scrollWidth < window.innerWidth * 3) {
    seed.forEach(span => {
      const clone = span.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      tickerTrack.appendChild(clone);
    });
  }
  // Assicura un numero pari di set per il loop -50% senza salti
  if ((tickerTrack.children.length / seed.length) % 2 !== 0) {
    seed.forEach(span => {
      const clone = span.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      tickerTrack.appendChild(clone);
    });
  }
}
