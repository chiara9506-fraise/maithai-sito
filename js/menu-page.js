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

  // Inietta le icone nei link dalla nav
  navLinks.forEach((link) => {
    const iconSrc = link.getAttribute('data-icon');
    if (!iconSrc) return;
    const img = document.createElement('img');
    img.src = iconSrc;
    img.alt = '';
    img.className = 'mp-nav__icon';
    img.hidden = true; // nascosta finché non entra in sidebar
    link.appendChild(img);
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
    nav.classList.add('is-sidebar');
    navLinks.forEach((link) => {
      const icon = link.querySelector('.mp-nav__icon');
      if (icon) icon.hidden = false;
    });
    nav.offsetHeight; // force reflow
    nav.classList.add('is-visible');
    isSidebar = true;
    setTimeout(() => { isAnimating = false; }, 460);
  }

  function exitSidebar() {
    if (!isSidebar || isAnimating) return;
    isAnimating = true;
    nav.classList.remove('is-visible');
    setTimeout(() => {
      nav.classList.remove('is-sidebar');
      navLinks.forEach((link) => {
        const icon = link.querySelector('.mp-nav__icon');
        if (icon) icon.hidden = true;
      });
      isSidebar = false;
      isAnimating = false;
    }, 460);
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
