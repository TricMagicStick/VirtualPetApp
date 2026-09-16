// play-pets.js -- eval assembled parts (P0 restore)
(function () {
  var src = (window.__PLAY_PETS_P0 || '') + (window.__PLAY_PETS_P1 || '') + (window.__PLAY_PETS_P2 || '');
  if (!src) { console.error('[pets.js] missing parts'); return; }
  (0, eval)(src);
})();
