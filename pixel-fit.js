/* pixel-fit.js - pixel-perfect canvas sizing for play-pico-sprites (v1).
 * Base resolution: 56x56 backing (48px sprite + 4px margin each side).
 * play-pets blit() picks k = floor(56*0.92/48) = 1, so 1 backing px = 1 sprite px.
 * CSS size = 56*s/dpr where s = whole device px per sprite px, chosen from the
 * well width and devicePixelRatio. The canvas is then nudged so its top-left
 * lands on a whole device pixel. Does not touch play-pets.js or hatch logic. */
(function () {
  'use strict';
  var BASE = 56, MAXCSS = 232;
  window.PIXEL_BASE = BASE;

  function setBacking(c) {
    if (c && (c.width !== BASE || c.height !== BASE)) {
      c.width = BASE; c.height = BASE;
      var x = c.getContext('2d');
      if (x) { x.imageSmoothingEnabled = false; }
    }
  }

  function fit(c) {
    if (!c || !c.offsetParent) return;
    var well = c.parentElement;
    var cs = getComputedStyle(well);
    var avail = well.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    if (!(avail > 0)) avail = 200;
    avail = Math.min(avail, MAXCSS, Math.floor((window.innerHeight || 800) * 0.3));
    var dpr = window.devicePixelRatio || 1;
    var s = Math.max(1, Math.floor(avail * dpr / BASE));
    var css = (BASE * s / dpr) + 'px';
    if (c.style.width !== css) {
      c.style.setProperty('width', css, 'important');
      c.style.setProperty('height', css, 'important');
      c.style.setProperty('min-height', css, 'important');
    }
    c.dataset.pxScale = String(s);
    // snap: remove the current nudge, measure, then re-nudge to whole device px
    c.style.transform = 'none';
    var r = c.getBoundingClientRect();
    var dx = (Math.round(r.left * dpr) - r.left * dpr) / dpr;
    var dy = (Math.round(r.top * dpr) - r.top * dpr) / dpr;
    if (Math.abs(dx) > 1e-4 || Math.abs(dy) > 1e-4) {
      c.style.transform = 'translate(' + dx.toFixed(4) + 'px,' + dy.toFixed(4) + 'px)';
    }
  }

  function fitAll() {
    fit(document.getElementById('petCanvas'));
    fit(document.getElementById('eggCanvas'));
  }

  // backing must be set before main.js init() grabs contexts and draws
  setBacking(document.getElementById('petCanvas'));
  setBacking(document.getElementById('eggCanvas'));

  var pending = false;
  function schedule() {
    if (pending) return; pending = true;
    requestAnimationFrame(function () { pending = false; fitAll(); });
  }
  window.pixelFitAll = schedule;
  window.addEventListener('resize', schedule);
  window.addEventListener('load', function () { schedule(); setTimeout(schedule, 300); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(schedule);
  if (window.ResizeObserver) {
    var ro = new ResizeObserver(schedule);
    ro.observe(document.body);
  }
  ['egg-screen', 'pet-screen'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el && window.MutationObserver) new MutationObserver(schedule).observe(el, { attributes: true, attributeFilter: ['style', 'class'] });
  });
  // matchMedia for DPR changes (zoom / moving windows)
  try {
    var mq = matchMedia('(resolution: ' + (window.devicePixelRatio || 1) + 'dppx)');
    mq.addEventListener('change', schedule);
  } catch (e) {}
  schedule();
})();

