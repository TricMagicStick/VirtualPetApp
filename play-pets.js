// play-pets.js — Pico PNG sprite overrides. Loads last so draw* replace canvas blobs.
// drawPet() already clears the canvas. Ignore flameFlicker.
(function () {
    var SPRITE_MAP = {
        drawFlick: 'flick',
        drawCharling: 'charling',
        drawDrakEmber: 'drakember',
        drawInfernyx: 'infernyx',
        drawPuff: 'puff',
        drawWhisp: 'whisp',
        drawWhisk: 'whisk',
        drawNimbrix: 'nimbrix',
        drawBud: 'bud',
        drawSprout: 'sprout',
        drawSprig: 'sprig',
        drawVerdant: 'verdant',
        drawZap: 'zap',
        drawSpark: 'spark',
        drawBolt: 'bolt',
        drawStorm: 'storm',
        drawCephling: 'cephling',
        drawCephy: 'cephy',
        drawCephalon: 'cephalon',
        drawAbyssalCeph: 'abyssal-ceph',
        drawRime: 'rime',
        drawKryz: 'kryz',
        drawGlacorn: 'glacorn'
    };

    var ICE_HAPPY_ONLY = { rime: true, kryz: true, glacorn: true };
    var PLANT_HAPPY_ONLY = { sprout: true, sprig: true, verdant: true, bud: true };

    var DRAW_LINES = {
        flick: ['drawFlick', 'drawDrakEmber', 'drawInfernyx'],
        puff: ['drawWhisp', 'drawWhisk', 'drawNimbrix'],
        bud: ['drawSprout', 'drawSprig', 'drawVerdant'],
        sprout: ['drawSprout', 'drawSprig', 'drawVerdant'],
        bolt: ['drawZap', 'drawSpark', 'drawStorm'],
        ceph: ['drawCephy', 'drawCephling', 'drawAbyssalCeph'],
        rime: ['drawRime', 'drawKryz', 'drawGlacorn'],
        ice: ['drawRime', 'drawKryz', 'drawGlacorn']
    };
    var TYPE_ALIASES = { ice: 'rime', sprout: 'bud', plant: 'bud', zap: 'bolt', spark: 'bolt', storm: 'bolt' };
    var ALLOWED_TYPES = ['flick', 'puff', 'bud', 'bolt', 'ceph', 'rime'];

    var cache = {};
    var punched = {};
    var warned = {};
    var pack = window.__PICO_SPRITES || {};

    function disableImageSmoothing(ctx) {
        if (!ctx) return;
        ctx.imageSmoothingEnabled = false;
        if (ctx.webkitImageSmoothingEnabled !== undefined) ctx.webkitImageSmoothingEnabled = false;
        if (ctx.msImageSmoothingEnabled !== undefined) ctx.msImageSmoothingEnabled = false;
        if (ctx.mozImageSmoothingEnabled !== undefined) ctx.mozImageSmoothingEnabled = false;
    }

    function applyPetPixelCss() {
        if (!document.getElementById('pico-pixelated-css')) {
            var style = document.createElement('style');
            style.id = 'pico-pixelated-css';
            style.textContent = '#petCanvas,.pet-screen canvas,.pet-screen img{image-rendering:-webkit-crisp-edges;image-rendering:pixelated}';
            (document.head || document.documentElement).appendChild(style);
        }
    }
    applyPetPixelCss();

    Object.keys(SPRITE_MAP).forEach(function (fnName) {
        var name = SPRITE_MAP[fnName];
        ['happy', 'sad'].forEach(function (mood) {
            var key = name + '-' + mood;
            if (cache[key]) return;
            var url = pack[key];
            if (!url && (ICE_HAPPY_ONLY[name] || PLANT_HAPPY_ONLY[name])) url = pack[name + '-happy'];
            if (!url && name === 'bud') url = pack['sprout-happy'];
            if (!url) {
                if (!warned[key]) {
                    warned[key] = true;
                    console.warn('[pets.js] missing sprite ' + key);
                }
                return;
            }
            var img = new Image();
            img.onerror = function () {
                if (!warned[key]) {
                    warned[key] = true;
                    console.warn('[pets.js] missing sprite ' + key);
                }
            };
            img.src = url;
            cache[key] = img;
        });
    });

    // Pure RGB(0,0,0) in house packs is the opaque black box background.
    // Punch it to alpha=0 once per sprite so pets float on the phosphor LCD.
    function punchedSprite(img, key) {
        if (punched[key]) return punched[key];
        if (!img.complete || img.naturalWidth === 0) return null;
        var sw = img.naturalWidth;
        var sh = img.naturalHeight;
        var off = document.createElement('canvas');
        off.width = sw;
        off.height = sh;
        var octx = off.getContext('2d');
        if (!octx) return img;
        octx.drawImage(img, 0, 0);
        var id = octx.getImageData(0, 0, sw, sh);
        var d = id.data;
        for (var i = 0; i < d.length; i += 4) {
            if (d[i] === 0 && d[i + 1] === 0 && d[i + 2] === 0) d[i + 3] = 0;
        }
        octx.putImageData(id, 0, 0);
        punched[key] = off;
        return off;
    }

    function blit(name, mood, breathOffset) {
        if (typeof petCtx === 'undefined' || !petCtx || typeof petCanvas === 'undefined' || !petCanvas) return;
        var wantSad = mood === 'sad';
        var happyOnly = ICE_HAPPY_ONLY[name] || PLANT_HAPPY_ONLY[name];
        var key = name + '-' + ((wantSad && !happyOnly) ? 'sad' : 'happy');
        var img = cache[key] || (happyOnly ? cache[name + '-happy'] : null) || (name === 'bud' ? cache['sprout-happy'] : null);
        if (!img) {
            if (!warned[key]) {
                warned[key] = true;
                console.warn('[pets.js] missing sprite ' + key);
            }
            return;
        }
        if (!img.complete || img.naturalWidth === 0) {
            if (img.complete && !warned[key]) {
                warned[key] = true;
                console.warn('[pets.js] missing sprite ' + key);
            }
            return;
        }
        applyPetPixelCss();
        disableImageSmoothing(petCtx);
        var src = punchedSprite(img, key) || img;
        var sw = src.width || img.naturalWidth;
        var sh = src.height || img.naturalHeight;
        var target = Math.min(petCanvas.width, petCanvas.height) * 0.92;
        var k = Math.floor(target / Math.max(sw, sh));
        if (!isFinite(k) || k < 1) k = 1;
        var dw = sw * k;
        var dh = sh * k;
        var x = Math.round((petCanvas.width - dw) / 2);
        var y = Math.round((petCanvas.height - dh) / 2 + (breathOffset || 0));
        petCtx.drawImage(src, 0, 0, sw, sh, x, y, dw, dh);
    }

    window.drawFlick = function (mood, breathOffset, flameFlicker) { blit('flick', mood, breathOffset); };
    window.drawCharling = function (mood, breathOffset, flameFlicker) { blit('charling', mood, breathOffset); };
    window.drawDrakEmber = function (mood, breathOffset, flameFlicker) { blit('drakember', mood, breathOffset); };
    window.drawInfernyx = function (mood, breathOffset, flameFlicker) { blit('infernyx', mood, breathOffset); };
    window.drawPuff = function (mood, breathOffset, flameFlicker) { blit('puff', mood, breathOffset); };
    window.drawWhisp = function (mood, breathOffset, flameFlicker) { blit('whisp', mood, breathOffset); };
    window.drawWhisk = function (mood, breathOffset, flameFlicker) { blit('whisk', mood, breathOffset); };
    window.drawNimbrix = function (mood, breathOffset, flameFlicker) { blit('nimbrix', mood, breathOffset); };
    window.drawBud = function (mood, breathOffset, flameFlicker) { blit('sprout', mood, breathOffset); };
    window.drawSprout = function (mood, breathOffset, flameFlicker) { blit('sprout', mood, breathOffset); };
    window.drawSprig = function (mood, breathOffset, flameFlicker) { blit('sprig', mood, breathOffset); };
    window.drawVerdant = function (mood, breathOffset, flameFlicker) { blit('verdant', mood, breathOffset); };
    window.drawZap = function (mood, breathOffset, flameFlicker) { blit('zap', mood, breathOffset); };
    window.drawSpark = function (mood, breathOffset, flameFlicker) { blit('spark', mood, breathOffset); };
    window.drawBolt = function (mood, breathOffset, flameFlicker) { blit('bolt', mood, breathOffset); };
    window.drawStorm = function (mood, breathOffset, flameFlicker) { blit('storm', mood, breathOffset); };
    window.drawCephling = function (mood, breathOffset, flameFlicker) { blit('cephling', mood, breathOffset); };
    window.drawCephy = function (mood, breathOffset, flameFlicker) { blit('cephy', mood, breathOffset); };
    window.drawCephalon = function (mood, breathOffset, flameFlicker) { blit('cephalon', mood, breathOffset); };
    window.drawAbyssalCeph = function (mood, breathOffset, flameFlicker) { blit('abyssal-ceph', mood, breathOffset); };
    window.drawRime = function (mood, breathOffset, flameFlicker) { blit('rime', mood, breathOffset); };
    window.drawKryz = function (mood, breathOffset, flameFlicker) { blit('kryz', mood, breathOffset); };
    window.drawGlacorn = function (mood, breathOffset, flameFlicker) { blit('glacorn', mood, breathOffset); };

    function resolveHatchedType() {
        var t = (typeof getHatchedPetType === 'function') ? getHatchedPetType() : localStorage.getItem('hatchedPetType');
        t = t || 'flick';
        if (TYPE_ALIASES[t]) t = TYPE_ALIASES[t];
        if (ALLOWED_TYPES.indexOf(t) < 0) t = 'flick';
        return t;
    }

    function drawLineStage(mood, breathOffset, flameFlicker) {
        applyPetPixelCss();
        if (typeof petCtx !== 'undefined') disableImageSmoothing(petCtx);
        if (typeof petCtx === 'undefined' || !petCtx || typeof petCanvas === 'undefined' || !petCanvas) return;
        var hatchedType = resolveHatchedType();
        var line = DRAW_LINES[hatchedType] || DRAW_LINES.flick;
        var stage = (typeof currentStage === 'number' && isFinite(currentStage)) ? currentStage : 0;
        if (stage < 0) stage = 0;
        if (stage >= line.length) stage = line.length - 1;
        petCtx.clearRect(0, 0, petCanvas.width, petCanvas.height);
        var fn = window[line[stage]];
        if (typeof fn === 'function') fn(mood, breathOffset, flameFlicker);
    }

    window.drawPet = function (mood, breathOffset, flameFlicker) {
        drawLineStage(mood, breathOffset, flameFlicker);
    };

    var origSetHatched = window.setHatchedPetType;
    window.setHatchedPetType = function (t) {
        if (TYPE_ALIASES[t]) t = TYPE_ALIASES[t];
        if (ALLOWED_TYPES.indexOf(t) < 0) t = 'flick';
        if (origSetHatched) origSetHatched(t);
        localStorage.setItem('hatchedPetType', t);
    };

    var origHatchAnimation = window.hatchAnimation;
    if (typeof origHatchAnimation === 'function') {
        window.hatchAnimation = function () {
            var innerSet = window.setHatchedPetType;
            var locked = null;
            window.setHatchedPetType = function (t) {
                if (locked == null) {
                    if (TYPE_ALIASES[t]) t = TYPE_ALIASES[t];
                    if (ALLOWED_TYPES.indexOf(t) < 0) t = 'flick';
                    locked = t;
                    if (Math.random() < 1 / 6) locked = 'rime';
                }
                innerSet(locked);
            };
            try {
                return origHatchAnimation.apply(this, arguments);
            } finally {
                window.setHatchedPetType = innerSet;
            }
        };
    }

    var origUpdatePetVisual = window.updatePetVisual;
    window.updatePetVisual = function () {
        if (origUpdatePetVisual) origUpdatePetVisual();
        var adult = (typeof isAdultStage === 'function') ? isAdultStage() : (typeof getMaxStage === 'function' ? currentStage >= getMaxStage() : currentStage >= 3);
        var stageEl = document.getElementById('stageName');
        if (stageEl && typeof getStageName === 'function') {
            stageEl.textContent = adult ? getStageName() + ' \u00b7 Adult' : getStageName();
        }
        var petScreen = document.querySelector('.pet-screen');
        if (petScreen) petScreen.classList.toggle('is-adult', adult);
    };

    var origApplyDecay = window.applyDecay;
    if (origApplyDecay) {
        window.applyDecay = function (statMinutes, ageMinutes) {
            var saved = currentStage;
            if (typeof isAdultStage === 'function' && isAdultStage() && typeof getMaxStage === 'function' && currentStage < getMaxStage()) {
                currentStage = getMaxStage();
            }
            origApplyDecay(statMinutes, ageMinutes);
            currentStage = saved;
        };
    }

    var origEvolve = window.evolvePet;
    window.evolvePet = function () {
        var max = (typeof getMaxStage === 'function') ? getMaxStage() : 3;
        if (typeof currentStage !== 'undefined' && currentStage >= max) return;
        if (origEvolve) origEvolve();
        if (typeof currentStage !== 'undefined' && currentStage > max) currentStage = max;
        drawLineStage((typeof getPetMood === 'function') ? getPetMood().draw : 'happy', 0, 0);
    };

    var origForce = window.forceEvolution;
    window.forceEvolution = function () {
        var max = (typeof getMaxStage === 'function') ? getMaxStage() : 3;
        if (typeof currentStage !== 'undefined' && currentStage >= max) {
            if (typeof flashStatus === 'function') flashStatus('Already adult', '#94a3b8');
            return;
        }
        if (origForce) origForce();
        if (typeof currentStage !== 'undefined' && currentStage > max) currentStage = max;
        drawLineStage((typeof getPetMood === 'function') ? getPetMood().draw : 'happy', 0, 0);
    };

    console.log('[pets.js] Pico PNG overrides ready; black-box chroma punch; 3 stages; NN upscale; hatch one line');
})();
