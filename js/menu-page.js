// Sticky category nav — active state on scroll
(function () {
  const sections = document.querySelectorAll('.mp-section[id]');
  const navLinks = document.querySelectorAll('.mp-nav__link');

  if (!sections.length || !navLinks.length) return;

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
})();
