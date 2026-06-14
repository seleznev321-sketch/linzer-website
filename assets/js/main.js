/* ░░░░░ ЛИНЗЕР — скрипты ░░░░░ */
(function () {
  'use strict';

  // ── шапка при скролле ──
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── мобильное меню ──
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  burger.addEventListener('click', function () {
    nav.classList.toggle('open');
    burger.classList.toggle('active');
  });
  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      nav.classList.remove('open');
      burger.classList.remove('active');
    });
  });

  // ── появление секций ──
  // режим без анимации (для скриншотов / prefers-reduced-motion)
  var shotMode = /[?&]nofx=1/.test(location.search); // режим скриншота
  var noFx = shotMode ||
             window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (shotMode) {
    var heroEl = document.querySelector('.hero');
    if (heroEl) heroEl.style.minHeight = '760px'; // фикс высоты для полностраничного скрина
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.section .container > *, .gate').forEach(function (el) {
    el.classList.add('reveal');
    if (noFx) el.classList.add('in');
    else io.observe(el);
  });

  // ── формы ──
  var modal = document.getElementById('modal');
  var modalClose = document.getElementById('modalClose');

  document.querySelectorAll('form.form').forEach(function (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();

      // TODO: подключить обработчик отправки (Formspree / Яндекс.Формы / PHP на рег.ру).
      // Сейчас данные собираются и показывается подтверждение.
      var data = {};
      new FormData(form).forEach(function (v, k) { data[k] = v; });
      data._form = form.getAttribute('data-form') || form.name;
      console.log('Заявка:', data);

      form.reset();
      modal.classList.add('open');
    });
  });

  function closeModal() { modal.classList.remove('open'); }
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

  // ── год в подвале (если потребуется динамика) ──
})();
