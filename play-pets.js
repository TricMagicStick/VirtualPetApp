// play-pets.js — thin restore shim until flood-fill lands
(function () {
  var s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/gh/TricMagicStick/VirtualPetApp@d9d1aa554938e6d91e496613d2c04455fe214af2/play-pets.js';
  s.onload = function () { console.log('[pets.js] restored from d9d1aa55 via shim'); };
  s.onerror = function () { console.error('[pets.js] shim failed to load d9 play-pets'); };
  document.head.appendChild(s);
})();
