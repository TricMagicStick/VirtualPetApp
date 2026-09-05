
(function () {
  function hexToDataUri(hex) {
    if (!hex) return null;
    var bytes = new Uint8Array(hex.length / 2);
    for (var i = 0; i < bytes.length; i++) bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
    var bin = '';
    for (var j = 0; j < bytes.length; j++) bin += String.fromCharCode(bytes[j]);
    return 'data:image/png;base64,' + btoa(bin);
  }
  var names = ['whisp', 'whisk', 'nimbrix', 'rime', 'kryz', 'glacorn', 'sprout', 'sprig', 'verdant', 'flick', 'drakember', 'infernyx', 'cephy', 'cephling', 'abyssal', 'zap', 'spark', 'storm'];
  window.__PICO_SPRITES = window.__PICO_SPRITES || {};
  names.forEach(function (n) {
    var hex = window['__PICO_HEX_' + n + '_happy'];
    var uri = hexToDataUri(hex);
    if (!uri) return;
    window.__PICO_SPRITES[n + '-happy'] = uri;
    window.__PICO_SPRITES[n + '-sad'] = uri; // happy-only for house locks
  });
  // octopus adult key used by play-pets
  if (window.__PICO_SPRITES['abyssal-happy']) {
    window.__PICO_SPRITES['abyssal-ceph-happy'] = window.__PICO_SPRITES['abyssal-happy'];
    window.__PICO_SPRITES['abyssal-ceph-sad'] = window.__PICO_SPRITES['abyssal-happy'];
  }
  console.log('[house48] hex overlays ready for', names.join(','));
})();
