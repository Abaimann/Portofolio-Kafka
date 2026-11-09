(function () {
  var s = document
    .getElementById('klien');
  if (!s) return;

  var rm = matchMedia('(prefers-reduced-motion:reduce)')
    .matches;

  /* gradien bola 3D + blur dipakai bersama oleh semua kartu */
  var COL = {
    o: ['#ffb04d', '#c24a00'],
    b: ['#46c2ff', '#0a3fb0'],
    y: ['#ffe85c', '#e09a00'],
    p: ['#ff7ccc', '#b81d86'],
    g: ['#8ae66a', '#1f8a3a'],
    v: ['#a77bff', '#4524b8'],
    t: ['#35e6cf', '#0b7c8a'],
    r: ['#ff6a58', '#9c1414'],
    w: ['#ffffff', '#aab6cc']
  };
  var d = '';

  for (var k in COL) {
    d +=
      '<radialGradient id="kl-' + k + '" cx=".34" cy=".3" r=".8">' +
      '<stop offset="0" stop-color="#fff" stop-opacity=".95"/>' +
      '<stop offset=".16" stop-color="' + COL[k][0] + '"/>' +
      '<stop offset="1" stop-color="' + COL[k][1] + '"/>' +
      '</radialGradient>';
  }

  [
    ['1', 2],
    ['2', 4],
    ['3', 26]
  ]
    .forEach(function (f) {
      d +=
        '<filter id="kl-f' + f[0] + '" x="-40%" y="-40%" width="180%" height="180%">' +
        '<feGaussianBlur stdDeviation="' + f[1] + '"/>' +
        '</filter>';
    });

  s
    .insertAdjacentHTML(
      'afterbegin',
      '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>' + d + '</defs></svg>'
    );

  /* adegan abstrak (pengganti foto). Ganti isi kartu dengan <img> bila sudah ada gambar asli */
  var SC = [
    ['#ffd9a0', '#ff8a3d', 'oyrw'],
    ['#bfe8ff', '#4a8dff', 'btwv'],
    ['#ffe98a', '#ffb02e', 'yopg'],
    ['#ffc2e4', '#c96bff', 'pvbw'],
    ['#b8f5a0', '#2bb673', 'gytb'],
    ['#ffb199', '#ff4f6d', 'rpoy'],
    ['#9fe9ff', '#2d6cdf', 'btgw'],
    ['#ffe3b8', '#ff9a5a', 'oypw']
  ];

  function rnd(a) {
    return function () {
      a |= 0;
      a = a + 0x6D2B79F5 | 0;
      var t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  function mk(n) {
    var r = rnd(n * 7919 + 13);
    var sc = SC[n % SC.length];
    var a = sc[2];
    var b = [];
    var i;
    var o =
      '<svg viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
      '<rect width="300" height="200" fill="' + sc[0] + '"/>' +
      '<circle cx="' + (60 + r() * 180 | 0) + '" cy="' + (40 + r() * 120 | 0) + '" r="120" fill="' + sc[1] + '" filter="url(#kl-f3)"/>';

    for (i = 0; i < 8; i++) {
      b.push({
        x: r() * 300,
        y: r() * 200,
        r: 16 + Math.pow(r(), 1.6) * 58,
        c: a[r() * a.length | 0],
        f: r()
      });
    }

    b
      .sort(function (p, q) {
        return q.r - p.r;
      })
      .forEach(function (p) {
        o +=
          '<circle cx="' + p.x.toFixed(0) + '" cy="' + p.y.toFixed(0) + '" r="' + p.r.toFixed(0) + '" fill="url(#kl-' + p.c + ')"' +
          (p.r > 56 ? ' filter="url(#kl-f2)"' : p.f < .3 ? ' filter="url(#kl-f1)"' : '') +
          '/>';
      });

    return o + '</svg>';
  }

  var AR = [
    [1.55, 1.7, 1.6, 1.5, 1.75, 1.45, 1.65, 1.55],
    [1.4, 1.65, 1.5, 1.8, 1.45, 1.6, 1.5, 1.7]
  ];
  var IMGS = [
    [
      'assets/images/gallery/gal-1.webp',
      'assets/images/gallery/gal-2.webp',
      'assets/images/gallery/gal-3.webp',
      'assets/images/gallery/gal-4.webp',
      'assets/images/gallery/gal-5.webp',
      'assets/images/gallery/gal-6.webp',
      'assets/images/gallery/gal-7.webp',
      'assets/images/gallery/gal-8.webp'
    ],
    [
      'assets/images/gallery/gal-9.webp',
      'assets/images/gallery/gal-10.webp',
      'assets/images/gallery/gal-11.webp',
      'assets/images/gallery/gal-12.webp',
      'assets/images/gallery/gal-13.webp',
      'assets/images/gallery/gal-14.webp',
      'assets/images/gallery/gal-15.webp',
      'assets/images/gallery/gal-16.webp'
    ]
  ];

  s
    .querySelectorAll('.kl-gal .kl-track')
    .forEach(function (t, j) {
      var h = '';
      AR[j]
        .forEach(function (a, i) {
          var imgPath = IMGS[j][i];
          h +=
            '<li class="kl-card" style="--ar:' +
            a +
            '"><img src="' +
            imgPath +
            '" alt="Preview Karya ' +
            (i + j * 8 + 1) +
            '" loading="lazy" decoding="async"></li>';
        });
      t.innerHTML = h;
    });

  s
    .querySelectorAll('.kl-logo')
    .forEach(function (l, i) {
      l.style
        .setProperty('--i', i);
    });

  /* gandakan isi tiap lajur jadi 3 salinan agar loop dan gerak scroll selalu mulus */
  var tr = [].slice
    .call(
      s.querySelectorAll('.kl-track')
    );

  tr
    .forEach(function (t) {
      var n = t.children.length;
      var c, x, k;
      for (k = 0; k < 2; k++) {
        for (c = 0; c < n; c++) {
          x = t.children[c]
            .cloneNode(true);
          x
            .setAttribute('aria-hidden', 'true');
          x.classList
            .add('kl-dup');
          t
            .appendChild(x);
        }
      }
    });

  if (rm) return;

  /* tidak ada loop otomatis: lajur hanya bergerak saat di-scroll atau di-swipe.
     Scroll ke bawah: logo dan baris atas ke kiri, baris bawah ke kanan. Scroll ke atas: sebaliknya.
     K = seberapa jauh bergeser per px scroll (logo, baris atas, baris bawah).
     Swipe/seret (sentuh, mouse, atau trackpad) menggeser lajur itu saja, lalu meluncur pelan. */
  var K = [.35, .8, .8];
  var D = [-1, -1, 1];
  var aim = scrollY;
  var cur = aim;
  var run = 0;
  var last = 0;
  var dr = [0, 0, 0];
  var vl = [0, 0, 0];
  var hd = [0, 0, 0];
  var ini = 0;
  var inView = true;

  function paint(now) {
    var dt = Math.min(now - (last || now), 48);
    var busy;
    last = now;
    cur += (aim - cur) * .12;
    busy = Math.abs(aim - cur) > .2;

    tr
      .forEach(function (t, i) {
        if (!hd[i] && vl[i]) {
          if (Math.abs(vl[i]) > .02) {
            dr[i] += vl[i] * dt;
            vl[i] *= Math.pow(.94, dt / 16);
            busy = true;
          } else {
            vl[i] = 0;
          }
        }
        var m = ((D[i] * cur * K[i] + dr[i]) % t._w + t._w) % t._w;
        t.style.transform = 'translate3d(' + (m - t._w).toFixed(2) + 'px,0,0)';
      });

    if (busy) {
      requestAnimationFrame(paint);
    } else {
      run = 0;
      last = 0;
    }
  }

  function kick() {
    if (!run && inView) {
      run = 1;
      last = 0;
      requestAnimationFrame(paint);
    }
  }

  function fit() {
    tr
      .forEach(function (t) {
        t._w = t.offsetWidth / 3;
      });
    if (!ini) {
      ini = 1;
      dr[2] = tr[2]._w * .4;
    }
    cur = aim;
    paint(performance.now());
  }

  fit();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready
      .then(fit);
  }

  /* swipe: sentuh, mouse (klik tahan lalu seret), dan geser dua jari di trackpad */
  tr
    .forEach(function (t, i) {
      var v = t.parentNode;
      var id = null, x0 = 0, px = 0, pt = 0, pv = 0, mv = 0;

      v
        .addEventListener('pointerdown', function (e) {
          if (e.pointerType === 'mouse' && e.button) return;
          id = e.pointerId;
          px = x0 = e.clientX;
          pt = e.timeStamp;
          pv = 0;
          mv = 0;
          vl[i] = 0;
          hd[i] = 1;
        });

      v
        .addEventListener('pointermove', function (e) {
          if (e.pointerId !== id) return;
          if (!mv) {
            if (Math.abs(e.clientX - x0) < 4) return;
            mv = 1;
            try {
              v
                .setPointerCapture(id);
            } catch (_) {}
            v.classList
              .add('drag');
          }
          var dx = e.clientX - px;
          var dtm = Math.max(e.timeStamp - pt, 1);
          dr[i] += dx;
          pv = pv * .6 + Math.max(-3, Math.min(3, dx / dtm)) * .4;
          px = e.clientX;
          pt = e.timeStamp;
          kick();
        });

      function end(e) {
        if (e.pointerId !== id) return;
        id = null;
        hd[i] = 0;
        v.classList
          .remove('drag');
        if (mv) {
          vl[i] = e.timeStamp - pt > 90 ? 0 : pv;
          kick();
        }
      }

      v
        .addEventListener('pointerup', end);
      v
        .addEventListener('pointercancel', end);
      v
        .addEventListener('wheel', function (e) {
          if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            e.preventDefault();
            dr[i] -= e.deltaX;
            kick();
          }
        }, { passive: false });
    });

  addEventListener('scroll', function () {
    aim = scrollY;
    if (inView) kick();
  }, { passive: true });

  var rt;
  addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(fit, 200);
  });

  /* animasi masuk sekali saat section terlihat */
  s.classList
    .add('pre');

  function go() {
    s.classList
      .remove('pre');
    s.classList
      .add('in');
  }

  if (!('IntersectionObserver' in window)) return go();

  new IntersectionObserver(function (es, o) {
    es
      .forEach(function (e) {
        if (e.isIntersecting) {
          go();
          o
            .disconnect();
        }
      });
  }, { threshold: .25 })
    .observe(s);

  new IntersectionObserver(function (es) {
    inView = es[0].isIntersecting;
    if (inView) {
      cur = aim = scrollY;
      kick();
    }
  }, { rootMargin: '300px 0px' })
    .observe(s);
})();
