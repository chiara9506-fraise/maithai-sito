/* ===== HOME V3 — Slider sedi ===== */

document.addEventListener('DOMContentLoaded', function () {
  const slides = document.querySelectorAll('.v3-sedi__slide');
  const photos = document.querySelectorAll('.v3-sedi__photo');
  const prevBtn = document.querySelector('.v3-sedi__btn--prev');
  const nextBtn = document.querySelector('.v3-sedi__btn--next');
  const counterEl = document.querySelector('.v3-sedi__counter');
  const controls = document.querySelector('.v3-sedi__controls');
  const sediSection = document.querySelector('.v3-sedi');
  const total = slides.length;
  let current = 0;
  let autoplayTimer;

  /* ---- Crea pallini ---- */
  const dotsWrap = document.createElement('div');
  dotsWrap.className = 'v3-sedi__dots';
  slides.forEach(function (_, i) {
    const dot = document.createElement('button');
    dot.className = 'v3-sedi__dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Vai alla sede ' + (i + 1));
    dot.addEventListener('click', function () {
      stopAutoplay();
      showSlide(i);
      startAutoplay();
    });
    dotsWrap.appendChild(dot);
  });
  const arrowsEl = document.querySelector('.v3-sedi__arrows');
  controls.insertBefore(dotsWrap, arrowsEl);

  /* ---- Mostra slide ---- */
  function showSlide(idx) {
    slides[current].classList.remove('active');
    if (photos[current]) photos[current].classList.remove('active');
    dotsWrap.children[current].classList.remove('active');
    current = (idx + total) % total;
    slides[current].classList.add('active');
    if (photos[current]) photos[current].classList.add('active');
    dotsWrap.children[current].classList.add('active');
    counterEl.innerHTML = '<strong>' + (current + 1) + '</strong> / ' + total;
  }

  /* ---- Autoplay ---- */
  function startAutoplay() {
    autoplayTimer = setInterval(function () { showSlide(current + 1); }, 4500);
  }

  function stopAutoplay() {
    clearInterval(autoplayTimer);
  }

  /* ---- Controlli ---- */
  if (prevBtn) prevBtn.addEventListener('click', function () { stopAutoplay(); showSlide(current - 1); startAutoplay(); });
  if (nextBtn) nextBtn.addEventListener('click', function () { stopAutoplay(); showSlide(current + 1); startAutoplay(); });

  sediSection.addEventListener('mouseenter', stopAutoplay);
  sediSection.addEventListener('mouseleave', startAutoplay);

  /* ---- Touch swipe mobile ---- */
  var touchStartX = 0;
  sediSection.addEventListener('touchstart', function (e) {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  sediSection.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) < 40) return;
    stopAutoplay();
    showSlide(dx < 0 ? current + 1 : current - 1);
    startAutoplay();
  }, { passive: true });

  document.addEventListener('keydown', function (e) {
    const rect = sediSection.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (!inView) return;
    if (e.key === 'ArrowLeft') { stopAutoplay(); showSlide(current - 1); startAutoplay(); }
    if (e.key === 'ArrowRight') { stopAutoplay(); showSlide(current + 1); startAutoplay(); }
  });

  startAutoplay();
});
