(function () {
  var r = document.documentElement;
  var T = ['pagi', 'malam'];
  var q = /[?&]tema=(pagi|malam)/
    .exec(location.search);
  var man = !!q;

  function auto() {
    var h = new Date()
      .getHours();
    return h >= 5 && h < 18 ? 'pagi' : 'malam';
  }

  r.dataset.tema = q ? q[1] : auto();

  setInterval(function () {
    if (!man) r.dataset.tema = auto();
  }, 6e4);

  addEventListener('DOMContentLoaded', function () {
    var a = document
      .querySelector('.aperture');
    if (!a) return;

    function nx() {
      man = true;
      var idx = T
        .indexOf(r.dataset.tema);
      r.dataset.tema = T[(idx + 1) % 2];
    }

    a
      .addEventListener('click', nx);
    a
      .addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          nx();
        }
      });
  });
})();
