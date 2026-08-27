(function () {
    var S = window.__PICO_SPRITES;
    if (!S) {
        console.warn('[pico-patches] no __PICO_SPRITES yet');
        return;
    }
    function b64(key) {
        var u = S[key] || '';
        var i = u.indexOf(',');
        return i >= 0 ? u.slice(i + 1) : u;
    }
    function set(key, rawB64) {
        S[key] = 'data:image/png;base64,' + rawB64;
    }
    function apply(key, ops) {
        var s = b64(key);
        if (!s) {
            console.warn('[pico-patches] missing ' + key);
            return;
        }
        ops = ops.slice().sort(function (a, b) { return b[0] - a[0]; });
        for (var i = 0; i < ops.length; i++) {
            var op = ops[i];
            s = s.slice(0, op[0]) + op[2] + s.slice(op[0] + op[1]);
        }
        set(key, s);
    }
    var PATCHES = {
        'flick-sad': [[9534, 1, 'Z']],
        'sprout-happy': [[5549, 1, 'b']],
        'sprout-sad': [[1993, 0, 'xfXXt6R2gcgnJ/ac/61AGfQFdL5V0iOu'], [1994, 11, 'h7X'], [2006, 1, 't'], [2013, 1, '9']],
        'charling-happy': [[4822, 1, '1'], [5826, 1, 'C']],
        'charling-sad': [[3870, 1, 'Q'], [3902, 1, 'Z']]
    };
    Object.keys(PATCHES).forEach(function (k) { apply(k, PATCHES[k]); });
    console.log('[pico-patches] applied', Object.keys(PATCHES).length, 'keys');
})();
