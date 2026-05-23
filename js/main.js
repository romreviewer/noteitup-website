/* NoteItUP — Material 3 interactions (vanilla JS) */
(() => {
  'use strict';

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  document.body.classList.add('js');

  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const topBar = $('#topBar');
  const fab    = $('#scrollTopFab');

  const onScroll = () => {
    const y = window.scrollY;
    if (topBar) topBar.classList.toggle('scrolled', y > 8);
    if (fab)    fab.classList.toggle('visible', y > 320);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const menuBtn = $('#menuBtn');
  const nav     = $('#primaryNav');
  if (menuBtn && nav) {
    const closeMenu = () => {
      nav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.querySelector('.material-symbols-rounded').textContent = 'menu';
    };
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuBtn.querySelector('.material-symbols-rounded').textContent = open ? 'close' : 'menu';
    });
    nav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') closeMenu();
    });
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !menuBtn.contains(e.target) && nav.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 56;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  if (fab) {
    fab.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const revealEls = $$('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  $$('.m3-btn').forEach((btn) => {
    btn.addEventListener('pointermove', (e) => {
      const r = btn.getBoundingClientRect();
      btn.style.setProperty('--rx', `${((e.clientX - r.left) / r.width) * 100}%`);
      btn.style.setProperty('--ry', `${((e.clientY - r.top) / r.height) * 100}%`);
    });
  });

})();
