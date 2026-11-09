(function () {
  var st = document
    .querySelector('.stars');
  var f = document
    .createDocumentFragment();
  var R = Math.random;

  for (var i = 0; i < 90; i++) {
    var e = document
      .createElement('i');
    e.style.cssText = [
      'left:' + (R() * 100).toFixed(1) + '%',
      'top:' + (R() * 78).toFixed(1) + '%',
      '--s:' + (1 + R() * 2).toFixed(1) + 'px',
      '--d:' + (2 + R() * 4).toFixed(1) + 's',
      'animation-delay:-' + (R() * 6).toFixed(1) + 's'
    ]
      .join(';');
    f
      .appendChild(e);
  }

  st
    .appendChild(f);
})();

/* parallax hero: pointer + scroll + ayunan pelan saat tidak ada pointer (HP / mouse belum digerakkan) */
(function () {
  var h = document
    .querySelector('.hero');
  if (
    !h ||
    matchMedia('(prefers-reduced-motion:reduce)')
      .matches
  ) return;

  var q = function (c) {
    return h
      .querySelector(c);
  };
  var fr = q('.frame');
  var cl = q('.clouds');
  var st = q('.stage');
  var ti = q('.tilt');
  var sn = q('.sun');
  var fg = q('.fg');

  var tx = 0, ty = 0, px = 0, py = 0, ss = 0;
  var mouse = 0, live = 1, run = 0, hh = h.offsetHeight;

  function lim(v) {
    return v < -1 ? -1 : v > 1 ? 1 : v;
  }

  function f(t) {
    var gx = mouse ? tx : Math.sin(t / 2700) * .3;
    var gy = mouse ? ty : Math.cos(t / 3400) * .18;
    var y = Math.min(scrollY, hh * 1.2);

    px += (gx - px) * .07;
    py += (gy - py) * .07;
    ss += (y - ss) * .12;

    fr.style.transform =
      'translate3d(' +
      (-px * 18).toFixed(2) + 'px,' +
      (-py * 10 - ss * .1).toFixed(2) + 'px,0)';
    fr.style.opacity = Math
      .max(0, 1 - ss * .0009)
      .toFixed(3);
    cl.style.transform =
      'translate3d(' +
      (px * 30).toFixed(2) + 'px,' +
      (py * 14 - ss * .18).toFixed(2) + 'px,0)';
    st.style.transform =
      'translate3d(' +
      (px * 16).toFixed(2) + 'px,' +
      (py * 8 - ss * .32).toFixed(2) + 'px,0) scale(' +
      (1 + ss * .00016).toFixed(4) + ')';
    ti.style.transform =
      'perspective(1100px) rotateY(' +
      (px * 7).toFixed(2) + 'deg) rotateX(' +
      (-py * 4).toFixed(2) + 'deg)';
    sn.style.translate =
      (-px * 12).toFixed(2) + 'px ' +
      (-py * 6 - ss * .08).toFixed(2) + 'px';
    fg.style.transform =
      'translate3d(' +
      (px * 58).toFixed(2) + 'px,' +
      (py * 22 - ss * .5).toFixed(2) + 'px,0)';

    if (live) requestAnimationFrame(f);
    else run = 0;
  }

  function go() {
    if (!run && live) {
      run = 1;
      requestAnimationFrame(f);
    }
  }

  h
    .addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch') return;
      var r = h
        .getBoundingClientRect();
      tx = lim((e.clientX - r.left) / r.width * 2 - 1);
      ty = lim((e.clientY - r.top) / r.height * 2 - 1);
      mouse = 1;
    });

  h
    .addEventListener('pointerleave', function () {
      mouse = 0;
    });

  addEventListener('resize', function () {
    hh = h.offsetHeight;
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      live = es[0].isIntersecting ? 1 : 0;
      if (live) go();
      else run = 0;
    })
      .observe(h);
  }

  document
    .addEventListener('visibilitychange', function () {
      if (document.hidden) {
        live = 0;
        run = 0;
      } else {
        live = 1;
        go();
      }
    });

  go();
})();
