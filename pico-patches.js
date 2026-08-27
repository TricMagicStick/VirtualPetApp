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
    var PATCHES = {"flick-sad":[[9534,1,"Z"]],"charling-happy":[[4822,1,"1"],[5826,1,"C"]],"charling-sad":[[3870,1,"Q"],[3902,1,"Z"]],"infernyx-happy":[[3034,0,"j"],[3216,1,"9"],[5352,1,"7"]],"puff-happy":[[1767,0,"8eLJ0nNsAfGB1Ewq3CWn5FZw"]],"puff-sad":[[5129,1,"6"],[8089,1,"T"]],"whisp-happy":[[2024,1,"b"],[2026,3,"5T"],[2043,1,"g"],[4115,1,"7"]],"whisp-sad":[[3361,1,"0"]],"whisk-sad":[[3516,1,"y"],[7612,1,"3"],[7614,1,"G"],[7616,1,"V"]],"nimbrix-happy":[[1930,1,"4"],[2210,0,"J"],[5956,1,"6"]],"nimbrix-sad":[[5098,1,"y"]],"bud-happy":[[2262,1,"/"],[3349,1,"q"]],"sprout-happy":[[2926,1,"z"]],"sprig-happy":[[54,7,"XL4luXxjZ6pEF"],[62,2,"aTUfKBY"],[65,11,""],[78,1,"0"],[1079,5,"Db1qB"]],"sprig-sad":[[2329,1,"M"]],"verdant-happy":[[6513,2,"5u"],[6516,1,"j"]],"verdant-sad":[[1482,1,"6"],[3025,1,"6"]],"zap-happy":[[1578,1,"E"],[5705,1,"7"],[6174,1,""],[6176,2,"6"]],"zap-sad":[[1825,2,"0W"],[4386,1,"c"]],"bolt-happy":[[1910,1,"q"]],"bolt-sad":[[5554,1,"/"]],"storm-happy":[[5162,1,"T"],[7357,1,"5"]]};
    Object.keys(PATCHES).forEach(function (k) { apply(k, PATCHES[k]); });
    console.log('[pico-patches] applied', Object.keys(PATCHES).length, 'keys');
})();
