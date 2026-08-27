// pets.js — draws generated PNG sprites (data URLs in sprites-*.js).
var SPRITE_STAGES = {
    flick: ['flick', 'charling', 'drakember', 'infernyx'],
    puff: ['puff', 'whisp', 'whisk', 'nimbrix'],
    bud: ['bud', 'sprout', 'sprig', 'verdant'],
    bolt: ['zap', 'spark', 'bolt', 'storm'],
    ceph: ['cephling', 'cephy', 'cephalon', 'abyssal-ceph']
};

var spriteCache = {};

function preloadSprites() {
    var urls = (typeof SPRITE_URLS !== 'undefined') ? SPRITE_URLS : {};
    Object.keys(urls).forEach(function (name) {
        var img = new Image();
        img.src = urls[name];
        spriteCache[name] = img;
    });
}

function getSpriteId() {
    var type = localStorage.getItem('hatchedPetType') || 'flick';
    var names = SPRITE_STAGES[type] || SPRITE_STAGES.flick;
    var stage = (typeof currentStage === 'number' && !isNaN(currentStage)) ? currentStage : 0;
    var i = Math.max(0, Math.min(3, stage));
    return names[i];
}

function drawSadOverlay(ctx, x, y, size) {
    ctx.save();
    ctx.strokeStyle = 'rgba(20, 10, 10, 0.95)';
    ctx.lineWidth = Math.max(2, size * 0.018);
    ctx.lineCap = 'round';
    var cx = x + size * 0.52;
    var cy = y + size * 0.40;
    ctx.beginPath();
    ctx.moveTo(cx - size * 0.10, cy - size * 0.05);
    ctx.lineTo(cx - size * 0.03, cy - size * 0.01);
    ctx.moveTo(cx + size * 0.10, cy - size * 0.05);
    ctx.lineTo(cx + size * 0.03, cy - size * 0.01);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy + size * 0.10, size * 0.05, Math.PI * 0.15, Math.PI * 0.85, true);
    ctx.stroke();
    ctx.restore();
}

function drawPetSprite(mood, breathOffset, flameFlicker) {
    if (!petCtx || !petCanvas) return;
    petCtx.clearRect(0, 0, petCanvas.width, petCanvas.height);
    petCtx.imageSmoothingEnabled = false;
    if (petCtx.webkitImageSmoothingEnabled !== undefined) petCtx.webkitImageSmoothingEnabled = false;
    if (petCtx.mozImageSmoothingEnabled !== undefined) petCtx.mozImageSmoothingEnabled = false;

    petCtx.fillStyle = 'rgba(0,0,0,0.28)';
    petCtx.beginPath();
    petCtx.ellipse(110, 202, 46, 10, 0, 0, Math.PI * 2);
    petCtx.fill();

    var id = getSpriteId();
    var img = spriteCache[id];
    var size = 188;
    var x = (220 - size) / 2;
    var y = (220 - size) / 2 + (breathOffset || 0) - 12;
    if (img && img.complete && img.naturalWidth > 0) {
        petCtx.drawImage(img, x, y, size, size);
        if (mood === 'sad') drawSadOverlay(petCtx, x, y, size);
    }
}

function drawPet(mood, breathOffset, flameFlicker) {
    drawPetSprite(mood, breathOffset, flameFlicker);
}

preloadSprites();
console.log('[pets.js] generated PNG sprites ready');
