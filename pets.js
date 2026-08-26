// pets.js - Pixel-art sprite loading and drawing
// sprites/*.png are 64x128 sheets: top 64 = happy, bottom 64 = sad.

const SPRITE_STAGES = {
    flick: ['flick', 'charling', 'drakember', 'infernyx'],
    puff: ['puff', 'whisp', 'whisk', 'nimbrix'],
    bud: ['bud', 'sprout', 'sprig', 'verdant'],
    bolt: ['zap', 'spark', 'bolt', 'storm'],
    ceph: ['cephling', 'cephy', 'cephalon', 'abyssal-ceph']
};

const spriteCache = {};

function getSpriteId() {
    const type = localStorage.getItem('hatchedPetType') || 'flick';
    const names = SPRITE_STAGES[type] || SPRITE_STAGES.flick;
    const stage = (typeof currentStage === 'number' && !isNaN(currentStage)) ? currentStage : 0;
    const i = Math.max(0, Math.min(3, stage));
    return names[i];
}

function spriteSrc(name) {
    if (typeof SPRITE_DATA !== 'undefined' && SPRITE_DATA[name]) {
        return SPRITE_DATA[name];
    }
    return 'sprites/' + name + '.png';
}

function preloadSprites() {
    const names = [];
    Object.keys(SPRITE_STAGES).forEach(function (k) {
        SPRITE_STAGES[k].forEach(function (n) { names.push(n); });
    });
    names.forEach(function (name) {
        const img = new Image();
        img.src = spriteSrc(name);
        spriteCache[name] = img;
    });
}

function drawPetSprite(mood, breathOffset, flameFlicker) {
    if (!petCtx || !petCanvas) return;

    petCtx.clearRect(0, 0, petCanvas.width, petCanvas.height);
    petCtx.imageSmoothingEnabled = false;

    // Grounded shadow — does not bounce with breath
    petCtx.fillStyle = 'rgba(0,0,0,0.28)';
    petCtx.beginPath();
    petCtx.ellipse(110, 202, 46, 10, 0, 0, Math.PI * 2);
    petCtx.fill();

    const id = getSpriteId();
    const img = spriteCache[id];
    const size = 196;
    const x = (220 - size) / 2;
    const y = (220 - size) / 2 + (breathOffset || 0) - 10;

    if (img && img.complete && img.naturalWidth > 0) {
        const srcY = (mood === 'sad') ? 64 : 0;
        petCtx.drawImage(img, 0, srcY, 64, 64, x, y, size, size);
    }
}

function drawPet(mood, breathOffset, flameFlicker) {
    drawPetSprite(mood, breathOffset, flameFlicker);
}

preloadSprites();
console.log('[pets.js] sprite drawing ready');
