/**
 * KAFKA PORTFOLIO - Master Application Initializer
 * Coordinates section activations and stack marquee.
 */
(function () {
  'use strict';

  // Mark JS active
  document.documentElement.classList
    .add('js');

  // Tech stack marquee data definition
  var T = [
    ['HTML', 'Bahasa'],
    ['CSS', 'Bahasa'],
    ['JavaScript', 'Bahasa'],
    ['TypeScript', 'Bahasa'],
    ['React', 'Framework'],
    ['Next.js', 'Framework'],
    ['Vue', 'Framework'],
    ['Tailwind CSS', 'Styling'],
    ['GSAP', 'Animasi'],
    ['Vite', 'Tooling'],
    ['Git', 'Tooling'],
    ['Figma', 'Desain'],
    ['Vitest', 'Pengujian'],
    ['Lighthouse', 'Performa']
  ];
  var h = '';

  for (var k = 0; k < 2; k++) {
    T
      .forEach(function (t) {
        h += '<li' + (k ? ' aria-hidden="true"' : '') + '><b>' + t[0] + '</b><span>' + t[1] + '</span></li>';
      });
  }

  var tk = document
    .getElementById('track');
  if (tk) tk.innerHTML = h;

  // Card Intersection Observer for reveal animation
  var io = new IntersectionObserver(function (es) {
    es
      .forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList
            .add('in');
          io
            .unobserve(e.target);
        }
      });
  }, { threshold: .2 });

  document
    .querySelectorAll('.card')
    .forEach(function (c, i) {
      c.style
        .setProperty('--d', (i % 2) * 120 + 'ms');
      io
        .observe(c);
    });
})();
