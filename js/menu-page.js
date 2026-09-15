// Sticky category nav — active state on scroll
(function () {
  const sections = document.querySelectorAll('.mp-section[id]');
  const navLinks = document.querySelectorAll('.mp-nav__link');
  const nav = document.querySelector('.mp-nav');

  if (!sections.length || !navLinks.length || !nav) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-25% 0px -65% 0px' }
  );

  sections.forEach((section) => observer.observe(section));

  // Smooth scroll nav links — scroll active link into view in the nav bar
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      link.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });
  });

  // Inietta le icone nei link dalla nav (visibili sempre)
  navLinks.forEach((link) => {
    const iconSrc = link.getAttribute('data-icon');
    if (!iconSrc) return;
    const img = document.createElement('img');
    img.src = iconSrc;
    img.alt = '';
    img.className = 'mp-nav__icon';
    link.insertBefore(img, link.firstChild);
  });

  // Sidebar: slide in da sinistra dopo scroll
  let navNaturalTop = 0;
  let isSidebar = false;
  let isAnimating = false;
  const HEADER_H = 100;   // altezza header desktop
  const EXTRA_SCROLL = 0;
  const HYSTERESIS = 80;

  function initNavTop() {
    navNaturalTop = nav.getBoundingClientRect().top + window.scrollY;
  }

  function enterSidebar() {
    if (isSidebar || isAnimating) return;
    isAnimating = true;
    // Fade out barra orizzontale
    nav.style.opacity = '0';
    setTimeout(() => {
      // Switch a sidebar (già invisibile + fuori schermo)
      nav.classList.add('is-sidebar');
      nav.style.opacity = '';
      nav.offsetHeight; // force reflow
      // Slide in + fade in sovrapposti
      requestAnimationFrame(() => {
        nav.classList.add('is-visible');
      });
      isSidebar = true;
      setTimeout(() => { isAnimating = false; }, 750);
    }, 300);
  }

  function exitSidebar() {
    if (!isSidebar || isAnimating) return;
    isAnimating = true;
    // Slide out + fade out sidebar
    nav.classList.remove('is-visible');
    setTimeout(() => {
      // Ripristina barra orizzontale partendo invisibile
      nav.classList.remove('is-sidebar');
      nav.style.opacity = '0';
      nav.offsetHeight;
      // Fade in barra
      requestAnimationFrame(() => {
        nav.style.opacity = '';
      });
      isSidebar = false;
      setTimeout(() => { isAnimating = false; }, 450);
    }, 500);
  }

  function updateNavPosition() {
    const scrollY = window.scrollY;
    const trigger = navNaturalTop - HEADER_H + EXTRA_SCROLL;
    if (scrollY > trigger) {
      enterSidebar();
    } else if (scrollY < trigger - HYSTERESIS) {
      exitSidebar();
    }
  }

  window.addEventListener('load', initNavTop);
  window.addEventListener('scroll', updateNavPosition, { passive: true });
  window.addEventListener('resize', initNavTop, { passive: true });
  initNavTop();
})();
