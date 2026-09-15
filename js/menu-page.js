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

  // Move nav to bottom when scrolling past threshold, back to top when near top
  let navNaturalTop = 0;
  let isAtBottom = false;
  let isAnimating = false;
  const EXTRA_SCROLL = 350; // px scrolled past nav before it moves to bottom
  const HYSTERESIS = 100;   // px gap to avoid flickering when going back up

  function initNavTop() {
    navNaturalTop = nav.getBoundingClientRect().top + window.scrollY;
  }

  function moveToBottom() {
    if (isAtBottom || isAnimating) return;
    isAnimating = true;
    const currentTop = nav.getBoundingClientRect().top;
    nav.classList.add('is-fixed');
    nav.style.top = currentTop + 'px';
    nav.offsetHeight; // force reflow so transition fires
    nav.style.top = (window.innerHeight - nav.offsetHeight) + 'px';
    isAtBottom = true;
    setTimeout(() => { isAnimating = false; }, 460);
  }

  function moveToTop() {
    if (!isAtBottom || isAnimating) return;
    isAnimating = true;
    nav.style.top = '100px';
    setTimeout(() => {
      nav.classList.remove('is-fixed');
      nav.style.top = '';
      isAtBottom = false;
      isAnimating = false;
    }, 460);
  }

  function updateNavPosition() {
    const scrollY = window.scrollY;
    if (scrollY > navNaturalTop + EXTRA_SCROLL) {
      moveToBottom();
    } else if (scrollY < navNaturalTop + EXTRA_SCROLL - HYSTERESIS) {
      moveToTop();
    }
  }

  window.addEventListener('load', initNavTop);
  window.addEventListener('scroll', updateNavPosition, { passive: true });
  window.addEventListener('resize', () => { initNavTop(); }, { passive: true });
  initNavTop();
})();
