/* Contact Form Submission Handler */
document
  .getElementById('ct-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();
    var f = e.target.elements;
    location.href =
      'mailto:halo@kafka.dev?subject=' +
      encodeURIComponent('Pesan dari ' + f.nama.value) +
      '&body=' +
      encodeURIComponent(
        f.pesan.value + '\n\n' + f.nama.value + ' (' + f.email.value + ')'
      );
  });

/* ===== PEMBATAS KECEPATAN SCROLL (mouse / trackpad) =====
   Batas utama: MAX_SPEED dalam piksel per detik.
   Tidak mengambil alih touch scroll, keyboard, anchor, zoom,
   atau elemen yang memiliki scroll sendiri. */
(function () {
  'use strict';
  if (
    !window.matchMedia ||
    !window.requestAnimationFrame ||
    !matchMedia('(hover: hover) and (pointer: fine)')
      .matches
  ) return;

  var reduced = matchMedia('(prefers-reduced-motion: reduce)');
  var MAX_SPEED = 820;         // maksimum perpindahan vertikal (px/detik)
  var MAX_PENDING = 480;       // batasi jarak scroll yang diantrikan
  var MAX_WHEEL_EVENT = 160;   // batasi satu lonjakan roda/trackpad
  var EASING_MS = 115;         // perlambatan lembut saat mendekati target
  var target = window.scrollY;
  var frame = 0;
  var lastTime = 0;

  function clamp(x, a, b) {
    return Math
      .max(a, Math.min(b, x));
  }

  function endPage() {
    return Math
      .max(0, document.documentElement.scrollHeight - window.innerHeight);
  }

  function cancel() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    lastTime = 0;
    target = window.scrollY;
  }

  function animate(now) {
    var deltaTime = lastTime ? clamp(now - lastTime, 1, 40) : 16.67;
    lastTime = now;
    var current = window.scrollY;
    target = clamp(target, 0, endPage());
    var distance = target - current;

    if (Math.abs(distance) < .8) {
      if (Math.abs(distance) > .01) {
        window
          .scrollTo({ top: target, behavior: 'instant' });
      }
      frame = 0;
      lastTime = 0;
      return;
    }

    // Batasi kecepatan aktual PER FRAME, bukan hanya jarak wheel sekali putar.
    var eased = distance * (1 - Math.exp(-deltaTime / EASING_MS));
    var change = clamp(eased, -MAX_SPEED * deltaTime / 1000, MAX_SPEED * deltaTime / 1000);
    window
      .scrollTo({
        top: clamp(current + change, 0, endPage()),
        behavior: 'instant'
      });
    frame = requestAnimationFrame(animate);
  }

  function hasOwnVerticalScroll(element, direction) {
    for (
      var el = element;
      el && el !== document.body && el !== document.documentElement;
      el = el.parentElement
    ) {
      if (el.nodeType !== 1) continue;
      if (
        el
          .matches('textarea,select,input,[contenteditable="true"]')
      ) return true;
      if (el.scrollHeight <= el.clientHeight + 2) continue;
      var style = getComputedStyle(el);
      if (
        !/auto|scroll|overlay/
          .test(style.overflowY)
      ) continue;
      if (direction > 0 && el.scrollTop < el.scrollHeight - el.clientHeight - 2) return true;
      if (direction < 0 && el.scrollTop > 2) return true;
    }
    return false;
  }

  window
    .addEventListener('wheel', function (e) {
      if (
        reduced.matches ||
        e.defaultPrevented ||
        !e.cancelable ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey ||
        !e.deltaY ||
        Math.abs(e.deltaX) > Math.abs(e.deltaY)
      ) return;
      if (hasOwnVerticalScroll(e.target, e.deltaY)) return;

      var current = window.scrollY;
      var limit = endPage();
      if ((e.deltaY < 0 && current <= 0) || (e.deltaY > 0 && current >= limit)) {
        cancel();
        return;
      }

      var multiplier = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1;
      var amount = clamp(e.deltaY * multiplier, -MAX_WHEEL_EVENT, MAX_WHEEL_EVENT);

      // Tidak menumpuk momentum tanpa batas saat roda diputar cepat.
      target = clamp(target + amount, current - MAX_PENDING, current + MAX_PENDING);
      target = clamp(target, 0, limit);
      e.preventDefault();
      if (!frame) frame = requestAnimationFrame(animate);
    }, { passive: false });

  // Navigasi & kontrol asli browser tidak dipaksa melewati animasi di atas.
  document
    .addEventListener('click', function (e) {
      if (
        e.target.closest &&
        e.target
          .closest('a[href^="#"], a[href^="/"], button')
      ) cancel();
    }, true);

  document
    .addEventListener('keydown', function (e) {
      if (
        ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' ']
          .includes(e.key)
      ) cancel();
    }, true);

  document
    .addEventListener('touchstart', cancel, { passive: true });
  window
    .addEventListener('hashchange', cancel, { passive: true });
  window
    .addEventListener('popstate', cancel, { passive: true });
  window
    .addEventListener('resize', cancel, { passive: true });
  document
    .addEventListener('visibilitychange', function () {
      if (document.hidden) cancel();
    });

  if (reduced.addEventListener) {
    reduced
      .addEventListener('change', cancel);
  }
})();

/* Aksen klik ringan untuk mouse desktop; cursor asli tetap berfungsi. */
(function () {
  if (
    !window.matchMedia ||
    !matchMedia('(hover:hover) and (pointer:fine)')
      .matches ||
    matchMedia('(prefers-reduced-motion:reduce)')
      .matches
  ) return;

  document
    .addEventListener('pointerdown', function (ev) {
      if (ev.pointerType !== 'mouse' || ev.button !== 0) return;
      var ring = document
        .createElement('span');
      ring.className = 'cursor-tap';
      ring
        .setAttribute('aria-hidden', 'true');
      ring.style.left = ev.clientX + 'px';
      ring.style.top = ev.clientY + 'px';
      document.body
        .appendChild(ring);
      ring
        .addEventListener('animationend', function () {
          ring
            .remove();
        }, { once: true });
    }, { passive: true });
})();
