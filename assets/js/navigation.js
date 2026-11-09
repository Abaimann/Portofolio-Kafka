(function () {
  var h = document
    .querySelector('.hero');
  var d = document
    .getElementById('dock');
  var rm = matchMedia('(prefers-reduced-motion:reduce)')
    .matches;
  var last = window.scrollY;
  var tick = false;
  var H = 0;
  var lastCur = -1;

  var links = [].slice
    .call(
      d.querySelectorAll('a[data-s]')
    )
    .filter(function (a) {
      return document
        .getElementById(a.dataset.s);
    });

  var secs = links
    .map(function (a) {
      return document
        .getElementById(a.dataset.s);
    });

  function measure() {
    H = h.offsetHeight;
    var sy = window.scrollY;
    secs
      .forEach(function (s) {
        s._docTop = s
          .getBoundingClientRect()
          .top + sy;
      });
  }

  function upd() {
    tick = false;
    var y = window.scrollY;

    if (!rm && y <= H * 1.1) {
      h.style
        .setProperty(
          '--sy',
          Math
            .min(y, H)
            .toFixed(1)
        );
    }

    var up = y < last - 4;
    var down = y > last + 4;

    if (y < 120) {
      d.classList
        .remove('show');
    } else if (up) {
      d.classList
        .add('show');
    } else if (down) {
      d.classList
        .remove('show');
    }

    if (up || down) last = y;

    var cur = 0;
    var mid = innerHeight * .5;
    secs
      .forEach(function (s, i) {
        if (s._docTop - y < mid) cur = i;
      });

    if (cur !== lastCur) {
      lastCur = cur;
      links
        .forEach(function (a, i) {
          a.classList
            .toggle('on', i === cur);
        });
    }
  }

  addEventListener('scroll', function () {
    if (!tick) {
      tick = true;
      requestAnimationFrame(upd);
    }
  }, { passive: true });

  addEventListener('resize', measure);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready
      .then(measure);
  }

  measure();
  upd();
})();
