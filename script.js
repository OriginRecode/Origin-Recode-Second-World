(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.navigation');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open menu');
    }));
  }
  // GitHub Pages is case-sensitive. If an image was uploaded as JPG/JPEG/WebP,
  // try common extensions before leaving a broken-image icon on the page.
  document.querySelectorAll('img[src$=".PNG"]').forEach(img => {
    const original = img.getAttribute('src');
    const extensions = ['.jpg', '.jpeg', '.webp'];
    let attempt = 0;
    img.addEventListener('error', function retryImage() {
      if (attempt >= extensions.length) return;
      const next = extensions[attempt++];
      img.src = original.slice(0, -4) + next;
    });
  });
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
  const revealTargets = document.querySelectorAll('.section-label, .story-layout, .story-banner, .section-heading, .feature-card, .video-panel, .gallery-card, .character-card, .character-note, .creator-layout');
  revealTargets.forEach(el => el.classList.add('reveal'));
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    revealTargets.forEach(el => observer.observe(el));
  } else revealTargets.forEach(el => el.classList.add('visible'));
})();
