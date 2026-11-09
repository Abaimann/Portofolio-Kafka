/* Section: About Me (.ab) */
(function () {
  var s = document
    .querySelector('.ab');
  if (!s) return;

  var h = s
    .querySelector('.ab-h');
  var p = s
    .querySelector('.ab-p');
  var n = 0;

  h
    .setAttribute(
      'aria-label',
      h.textContent
        .trim()
    );

  h.innerHTML = h.textContent
    .trim()
    .split(' ')
    .map(function (w) {
      return (
        '<span class="ab-wd" aria-hidden="true">' +
        w
          .split('')
          .map(function (x) {
            return '<i class="ab-l" style="--i:' + (n++) + '">' + x + '</i>';
          })
          .join('') +
        '</span>'
      );
    })
    .join(' ');

  p.innerHTML = p.textContent
    .trim()
    .split(/\s+/)
    .map(function (w, i) {
      return '<span class="ab-w" style="--i:' + i + '">' + w + '</span>';
    })
    .join(' ');

  if (
    matchMedia('(prefers-reduced-motion:reduce)')
      .matches
  ) return;

  s.classList
    .add('js');

  /* ikon ikut kecepatan scroll: selisih posisi scroll dengan versi yang dihaluskan (vA-vC) = kecepatan. Makin cepat scroll, makin jauh dan miring ikon bergeser; scroll ke atas arahnya terbalik; berhenti = kembali ke posisi semula */
  var PX = [].slice
    .call(
      s.querySelectorAll('.ab-px')
    );
  var KY = [.45, .28, .6, .35];
  var KR = [-.05, .05, .04, -.04];
  var vA = scrollY, vC = vA, vT = 0, vR = 0;
  var inView = true;
  var pDocTop = 0, hDocTop = 0;
  var lastH = -1, lastQ = -1;

  function measure() {
    var sy = scrollY;
    pDocTop = p
      .getBoundingClientRect()
      .top + sy;
    hDocTop = h
      .getBoundingClientRect()
      .top + sy;
  }

  function vs(now) {
    var dt = Math.min(now - (vT || now), 48);
    var d, b;
    vT = now;
    vC += (vA - vC) * (1 - Math.pow(.9, dt / 16.7));
    d = vA - vC;
    b = Math.abs(d) > .3;

    if (inView) {
      PX
        .forEach(function (e, i) {
          var y = b ? -120 * Math.tanh(d * KY[i] / 120) : 0;
          var r = b ? Math.max(-14, Math.min(14, d * KR[i])) : 0;
          e.style.translate = '0 ' + y.toFixed(1) + 'px';
          e.style.rotate = r.toFixed(2) + 'deg';
        });
    }

    if (b) {
      requestAnimationFrame(vs);
    } else {
      vR = 0;
      vT = 0;
    }
  }

  addEventListener('scroll', function () {
    vA = scrollY;
    if (!vR && inView) {
      vR = 1;
      vT = 0;
      requestAnimationFrame(vs);
    }
  }, { passive: true });

  var W = [].slice
    .call(p.children);
  var tk = 0;

  function c(x) {
    return Math
      .min(1, Math.max(0, x));
  }

  function up() {
    tk = 0;
    if (!inView) return;

    var sy = scrollY;
    var vh = innerHeight;
    var ms = document.documentElement.scrollHeight - vh;
    var ae = sy >= ms - 4;
    var rTop = pDocTop - sy;
    var hrTop = hDocTop - sy;
    var n = W.length;
    var z = Math.max(vh * .25, rTop + sy - ms);
    var q = ae ? 1 : c((vh - rTop) / (vh - z));
    var hVal = ae ? 1 : c((vh * .75 - hrTop) / (vh * .6));

    if (Math.abs(hVal - lastH) > .002) {
      lastH = hVal;
      s.style
        .setProperty('--h', hVal.toFixed(3));
    }

    if (Math.abs(q - lastQ) > .002) {
      lastQ = q;
      W
        .forEach(function (e, i) {
          e.style
            .setProperty('--e', c((q * (n + 14) - i) / 14));
        });
    }

    if (q >= .98) {
      s.classList
        .add('lk', 'btn-shown');
    } else if (q < .9) {
      s.classList
        .remove('lk');
    }
  }

  function rq() {
    if (!tk) tk = requestAnimationFrame(up);
  }

  addEventListener('scroll', rq, { passive: true });
  addEventListener('resize', function () {
    measure();
    rq();
  });

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready
      .then(measure);
  }

  measure();
  up();

  new IntersectionObserver(function (e, io) {
    if (e[0].isIntersecting) {
      s.classList
        .add('in');
      io
        .disconnect();
    }
  }, { threshold: .3 })
    .observe(s);

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (e) {
      s.classList
        .toggle('ic', e[0].isIntersecting);
    }, { threshold: .25 })
      .observe(s);

    new IntersectionObserver(function (entries) {
      inView = entries[0].isIntersecting;
      if (inView) {
        measure();
        rq();
      }
    }, { rootMargin: '300px 0px' })
      .observe(s);
  } else {
    s.classList
      .add('ic');
  }

  s
    .addEventListener('pointermove', function (e) {
      var t = s.style;
      var r = s
        .getBoundingClientRect();
      t
        .setProperty('--mx', (e.clientX / innerWidth * 2 - 1).toFixed(3));
      t
        .setProperty('--my', ((e.clientY - r.top) / r.height * 2 - 1).toFixed(3));
    });
})();

/* Section: Pengalaman (.ex) */
(function () {
  var s = document
    .querySelector('.ex');
  if (!s) return;

  var h = s
    .querySelector('.ex-h');
  var t = h.textContent
    .trim();
  var R = [].slice
    .call(
      s.querySelectorAll('.ex-row')
    );
  var tk = 0;
  var inView = true;
  var sDocTop = 0, hDocTop = 0;
  var lastH = -1;

  h
    .setAttribute('aria-label', t);

  h.innerHTML = t
    .split(' ')
    .map(function (w) {
      return (
        '<span class="ex-wd" aria-hidden="true">' +
        w
          .split('')
          .map(function (x, i) {
            return '<i class="ex-l" style="--i:' + i + '">' + x + '</i>';
          })
          .join('') +
        '</span>'
      );
    })
    .join(' ');

  if (
    matchMedia('(prefers-reduced-motion:reduce)')
      .matches
  ) return;

  s.style
    .setProperty('--h', '0');
  s.classList
    .add('xs');

  /* Sama seperti ABOUT ME: huruf muncul bertahap saat judul terlihat,
     lalu warna memenuhi huruf seiring progres scroll. */
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries, observer) {
      if (entries[0].isIntersecting) {
        s.classList
          .add('in');
        observer
          .disconnect();
      }
    }, { threshold: .3 })
      .observe(h);

    new IntersectionObserver(function (entries) {
      inView = entries[0].isIntersecting;
      if (inView) {
        measure();
        rq();
      }
    }, { rootMargin: '300px 0px' })
      .observe(s);
  } else {
    s.classList
      .add('in');
  }

  function measure() {
    var sy = scrollY;
    sDocTop = s
      .getBoundingClientRect()
      .top + sy;
    hDocTop = h
      .getBoundingClientRect()
      .top + sy;

    R
      .forEach(function (r) {
        r._top = r.offsetTop;
      });
  }

  /* progres tiap baris: 0 saat baris baru masuk dari bawah layar, 1 saat sudah naik ke sekitar 62% tinggi layar. Baris paling bawah dijamin mencapai 1 di akhir halaman */
  function c(x) {
    return x < 0 ? 0 : x > 1 ? 1 : x;
  }

  function e(x) {
    return 1 - Math.pow(1 - c(x), 3);
  }

  function up() {
    tk = 0;
    if (!inView) return;

    var vh = innerHeight;
    var sy = scrollY;
    var ms = document.documentElement.scrollHeight - vh;
    var st = sDocTop - sy;
    var ht = hDocTop - sy;
    var hVal = c((vh * .75 - ht) / (vh * .6));

    if (Math.abs(hVal - lastH) > .002) {
      lastH = hVal;
      s.style
        .setProperty(
          '--h',
          hVal
            .toFixed(3)
        );
    }

    R
      .forEach(function (r) {
        var top = st + (r._top || 0);
        var end = Math.max(vh * .62, top + sy - ms);
        var pVal = e((end + vh * .3 - top) / (vh * .3));
        if (Math.abs(pVal - (r._lastP || 0)) > .002) {
          r._lastP = pVal;
          r.style
            .setProperty(
              '--p',
              pVal
                .toFixed(3)
            );
        }
      });
  }

  function rq() {
    if (!tk) tk = requestAnimationFrame(up);
  }

  addEventListener('scroll', rq, { passive: true });
  addEventListener('resize', function () {
    measure();
    rq();
  });

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready
      .then(measure);
  }

  measure();
  up();
})();

/* Section: Projects (.pj) */
(function () {
  var s = document
    .querySelector('.pj');
  if (!s) return;

  var h = s
    .querySelector('.pj-title');
  var n = 0;
  var tk = 0;
  var inView = true;
  var hDocTop = 0;
  var lastH = -1;

  h
    .setAttribute(
      'aria-label',
      h.textContent
        .trim()
    );

  h.innerHTML = h.textContent
    .trim()
    .split(' ')
    .map(function (w) {
      return (
        '<span class="pj-wd" aria-hidden="true">' +
        w
          .split('')
          .map(function (x) {
            return '<i class="pj-l" style="--i:' + (n++) + '">' + x + '</i>';
          })
          .join('') +
        '</span>'
      );
    })
    .join(' ');

  if (
    matchMedia('(prefers-reduced-motion:reduce)')
      .matches
  ) {
    s.style
      .setProperty('--h', '1');
    return;
  }

  s.classList
    .add('pj-js');

  function measure() {
    hDocTop = h
      .getBoundingClientRect()
      .top + scrollY;
  }

  function c(x) {
    return Math
      .min(1, Math.max(0, x));
  }

  function up() {
    tk = 0;
    if (!inView) return;

    var vh = innerHeight;
    var top = hDocTop - scrollY;
    var hVal = c((vh * .75 - top) / (vh * .6));

    if (Math.abs(hVal - lastH) > .002) {
      lastH = hVal;
      s.style
        .setProperty(
          '--h',
          hVal
            .toFixed(3)
        );
    }
  }

  function rq() {
    if (!tk) tk = requestAnimationFrame(up);
  }

  addEventListener('scroll', rq, { passive: true });
  addEventListener('resize', function () {
    measure();
    rq();
  });

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready
      .then(measure);
  }

  measure();
  up();

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (e, io) {
      if (e[0].isIntersecting) {
        s.classList
          .add('in');
        io
          .disconnect();
      }
    }, { threshold: .3 })
      .observe(h);

    new IntersectionObserver(function (entries) {
      inView = entries[0].isIntersecting;
      if (inView) {
        measure();
        rq();
      }
    }, { rootMargin: '300px 0px' })
      .observe(s);
  } else {
    s.classList
      .add('in');
  }
})();

/* Section: 3D Decorations (.dc) */
(function () {
  var D = [].slice
    .call(
      document.querySelectorAll('.dc')
    );
  if (!D.length) return;
  if (
    matchMedia('(prefers-reduced-motion:reduce)')
      .matches
  ) return;

  document.documentElement.classList
    .add('dc-js');

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es
        .forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList
              .add('dc-on');
            io
              .unobserve(e.target);
          }
        });
    }, { threshold: .2 });

    D
      .forEach(function (d) {
        io
          .observe(d);
      });
  } else {
    D
      .forEach(function (d) {
        d.classList
          .add('dc-on');
      });
  }

  var tk = 0;

  function measure() {
    var sy = scrollY;
    D
      .forEach(function (d) {
        d._k = +d.style
          .getPropertyValue('--k') || 0;
        d._mid = d.offsetTop + d.offsetHeight / 2;
        d._parentDocTop = d.parentElement
          .getBoundingClientRect()
          .top + sy;
      });
  }

  function up() {
    tk = 0;
    var vh = innerHeight;
    var sy = scrollY;

    D
      .forEach(function (d) {
        var parentTop = (d._parentDocTop || 0) - sy;
        var y = parentTop + (d._mid || 0) - vh / 2;
        var s = Math
          .max(-140, Math.min(140, y * d._k));

        if (Math.abs(s - (d._lastS || 0)) >= .2) {
          d._lastS = s;
          d.style.translate = '0 ' + s.toFixed(1) + 'px';
        }
      });
  }

  function rq() {
    if (!tk) tk = requestAnimationFrame(up);
  }

  addEventListener('scroll', rq, { passive: true });
  addEventListener('resize', function () {
    measure();
    rq();
  });

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready
      .then(measure);
  }

  measure();
  up();
})();
