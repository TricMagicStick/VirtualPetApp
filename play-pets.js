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
        drawAbyssalCeph: 'abyssal-ceph'
    };

    var cache = {};
    var warned = {};
    var pack = window.__PICO_SPRITES || {};

    Object.keys(SPRITE_MAP).forEach(function (fnName) {
        var name = SPRITE_MAP[fnName];
        ['happy', 'sad'].forEach(function (mood) {
            var key = name + '-' + mood;
            if (cache[key]) return;
            var url = pack[key];
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

    function blit(name, mood, breathOffset) {
        if (typeof petCtx === 'undefined' || !petCtx || typeof petCanvas === 'undefined' || !petCanvas) return;
        var key = name + '-' + (mood === 'sad' ? 'sad' : 'happy');
        var img = cache[key];
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
        petCtx.imageSmoothingEnabled = false;
        if (petCtx.webkitImageSmoothingEnabled !== undefined) petCtx.webkitImageSmoothingEnabled = false;
        if (petCtx.mozImageSmoothingEnabled !== undefined) petCtx.mozImageSmoothingEnabled = false;
        var x = Math.round((petCanvas.width - img.naturalWidth) / 2);
        var y = Math.round((petCanvas.height - img.naturalHeight) / 2 + (breathOffset || 0));
        petCtx.drawImage(img, x, y);
    }

    window.drawFlick = function (mood, breathOffset, flameFlicker) { blit('flick', mood, breathOffset); };
    window.drawCharling = function (mood, breathOffset, flameFlicker) { blit('charling', mood, breathOffset); };
    window.drawDrakEmber = function (mood, breathOffset, flameFlicker) { blit('drakember', mood, breathOffset); };
    window.drawInfernyx = function (mood, breathOffset, flameFlicker) { blit('infernyx', mood, breathOffset); };
    window.drawPuff = function (mood, breathOffset, flameFlicker) { blit('puff', mood, breathOffset); };
    window.drawWhisp = function (mood, breathOffset, flameFlicker) { blit('whisp', mood, breathOffset); };
    window.drawWhisk = function (mood, breathOffset, flameFlicker) { blit('whisk', mood, breathOffset); };
    window.drawNimbrix = function (mood, breathOffset, flameFlicker) { blit('nimbrix', mood, breathOffset); };
    window.drawBud = function (mood, breathOffset, flameFlicker) { blit('bud', mood, breathOffset); };
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

    var origDrawPet = window.drawPet;
    window.drawPet = function (mood, breathOffset, flameFlicker) {
        var hatchedType = localStorage.getItem('hatchedPetType') || 'flick';
        if (hatchedType === 'bolt') {
            petCtx.clearRect(0, 0, petCanvas.width, petCanvas.height);
            if (currentStage <= 0) drawZap(mood, breathOffset, flameFlicker);
            else if (currentStage === 1) drawSpark(mood, breathOffset, flameFlicker);
            else drawStorm(mood, breathOffset, flameFlicker);
            return;
        }
        if (origDrawPet) origDrawPet(mood, breathOffset, flameFlicker);
    };

    var origUpdatePetVisual = window.updatePetVisual;
    window.updatePetVisual = function () {
        if (origUpdatePetVisual) origUpdatePetVisual();
        var adult = (typeof isAdultStage === 'function') ? isAdultStage() : currentStage >= 3;
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
            if (typeof isAdultStage === 'function' && isAdultStage() && currentStage < 3) {
                currentStage = 3;
            }
            origApplyDecay(statMinutes, ageMinutes);
            currentStage = saved;
        };
    }

    console.log('[pets.js] Pico PNG overrides ready; electric line Zap → Spark → Storm');
})();
