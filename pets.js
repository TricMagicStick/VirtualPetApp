// pets.js — 16-bit GBA-style pixel pets. All drawing lives here.

function Pix(w, h) {
    this.w = w || 64;
    this.h = h || 64;
    this.p = new Array(this.h);
    for (var y = 0; y < this.h; y++) {
        this.p[y] = new Array(this.w);
    }
}
Pix.prototype.put = function (x, y, c) {
    if (!c) return;
    x = x | 0; y = y | 0;
    if (x >= 0 && y >= 0 && x < this.w && y < this.h) this.p[y][x] = c;
};
Pix.prototype.get = function (x, y) {
    if (x >= 0 && y >= 0 && x < this.w && y < this.h) return this.p[y][x];
    return null;
};
Pix.prototype.rect = function (x, y, w, h, c) {
    x = x | 0; y = y | 0; w = w | 0; h = h | 0;
    for (var j = 0; j < h; j++) for (var i = 0; i < w; i++) this.put(x + i, y + j, c);
};
Pix.prototype.disc = function (cx, cy, r, c) {
    cx = cx | 0; cy = cy | 0; r = r | 0;
    var rr = r * r;
    for (var y = cy - r; y <= cy + r; y++) {
        for (var x = cx - r; x <= cx + r; x++) {
            if ((x - cx) * (x - cx) + (y - cy) * (y - cy) <= rr) this.put(x, y, c);
        }
    }
};
Pix.prototype.ellipse = function (cx, cy, rx, ry, c) {
    cx = cx | 0; cy = cy | 0;
    rx = Math.max(1, rx | 0); ry = Math.max(1, ry | 0);
    for (var y = cy - ry; y <= cy + ry; y++) {
        for (var x = cx - rx; x <= cx + rx; x++) {
            var dx = (x - cx) / rx, dy = (y - cy) / ry;
            if (dx * dx + dy * dy <= 1.02) this.put(x, y, c);
        }
    }
};
Pix.prototype.tri = function (x1, y1, x2, y2, x3, y3, c) {
    var pts = [[x1 | 0, y1 | 0], [x2 | 0, y2 | 0], [x3 | 0, y3 | 0]];
    var minx = Math.max(0, Math.min(pts[0][0], pts[1][0], pts[2][0]));
    var maxx = Math.min(this.w - 1, Math.max(pts[0][0], pts[1][0], pts[2][0]));
    var miny = Math.max(0, Math.min(pts[0][1], pts[1][1], pts[2][1]));
    var maxy = Math.min(this.h - 1, Math.max(pts[0][1], pts[1][1], pts[2][1]));
    var den = (pts[1][1] - pts[2][1]) * (pts[0][0] - pts[2][0]) + (pts[2][0] - pts[1][0]) * (pts[0][1] - pts[2][1]);
    if (den === 0) return;
    for (var y = miny; y <= maxy; y++) {
        for (var x = minx; x <= maxx; x++) {
            var a = ((pts[1][1] - pts[2][1]) * (x - pts[2][0]) + (pts[2][0] - pts[1][0]) * (y - pts[2][1])) / den;
            var b = ((pts[2][1] - pts[0][1]) * (x - pts[2][0]) + (pts[0][0] - pts[2][0]) * (y - pts[2][1])) / den;
            var d = 1 - a - b;
            if (a >= -0.02 && b >= -0.02 && d >= -0.02) this.put(x, y, c);
        }
    }
};
Pix.prototype.line = function (x0, y0, x1, y1, c, t) {
    x0 = x0 | 0; y0 = y0 | 0; x1 = x1 | 0; y1 = y1 | 0;
    t = t || 1;
    var dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0);
    var sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
    var err = dx - dy;
    while (true) {
        if (t > 1) this.disc(x0, y0, t - 1, c); else this.put(x0, y0, c);
        if (x0 === x1 && y0 === y1) break;
        var e2 = 2 * err;
        if (e2 > -dy) { err -= dy; x0 += sx; }
        if (e2 < dx) { err += dx; y0 += sy; }
    }
};
Pix.prototype.outline = function (color) {
    var mark = [];
    for (var y = 0; y < this.h; y++) {
        for (var x = 0; x < this.w; x++) {
            if (this.p[y][x]) continue;
            var hit = false;
            var nbs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
            for (var i = 0; i < 4; i++) {
                var g = this.get(x + nbs[i][0], y + nbs[i][1]);
                if (g && g !== color) { hit = true; break; }
            }
            if (hit) mark.push([x, y]);
        }
    }
    for (var k = 0; k < mark.length; k++) this.put(mark[k][0], mark[k][1], color);
};
Pix.prototype.toCanvas = function () {
    var c = document.createElement('canvas');
    c.width = this.w; c.height = this.h;
    var ctx = c.getContext('2d');
    var im = ctx.createImageData(this.w, this.h);
    var d = im.data;
    for (var y = 0; y < this.h; y++) {
        for (var x = 0; x < this.w; x++) {
            var col = this.p[y][x];
            if (!col) continue;
            var i = (y * this.w + x) * 4;
            d[i] = col[0]; d[i + 1] = col[1]; d[i + 2] = col[2]; d[i + 3] = 255;
        }
    }
    ctx.putImageData(im, 0, 0);
    return c;
};

var FLICK = {o:[58,12,12],d:[127,29,29],m:[185,28,28],b:[220,50,40],l:[239,100,80],h:[252,180,165],belly:[254,210,190],eye:[254,252,232],pupil:[28,10,10],flame:[245,158,11],flame2:[251,191,36],flame3:[254,240,140],horn:[120,45,18]};
var PUFF = {o:[30,41,59],d:[51,65,85],m:[71,85,105],b:[100,116,139],l:[148,163,184],h:[226,232,240],belly:[224,242,254],eye:[254,252,232],pupil:[15,23,42],cloud:[248,250,252],ear:[203,213,225],nose:[71,85,105]};
var BUD = {o:[20,83,45],d:[22,101,52],m:[22,163,74],b:[74,222,128],l:[134,239,172],h:[187,247,208],belly:[220,252,231],eye:[255,255,255],pupil:[22,101,52],leaf:[21,128,61],stem:[22,101,52],pink:[244,114,182],pink2:[236,72,153],pink3:[252,231,243],gold:[253,224,71]};
var BOLT = {o:[113,63,18],d:[133,77,14],m:[202,138,4],b:[234,179,8],l:[253,224,71],h:[254,240,138],belly:[254,249,195],eye:[255,255,255],pupil:[17,17,17],brown:[133,77,14],spark:[255,255,255]};
var CEPH = {o:[8,51,68],d:[21,94,117],m:[14,116,144],b:[6,182,212],l:[103,232,249],h:[165,243,252],belly:[207,250,254],eye:[224,242,254],pupil:[15,23,42],sucker:[22,78,99],glow:[34,211,238]};

function face(px, lx, ly, rx, ry, ew, eh, mood, pal, mouth_x, mouth_y) {
    px.ellipse(lx, ly, ew, eh, pal.eye);
    px.ellipse(rx, ry, ew, eh, pal.eye);
    if (mood === 'sad') {
        px.rect(lx - 1, ly, Math.max(1, ew - 1), Math.max(1, eh), pal.pupil);
        px.rect(rx - 1, ry, Math.max(1, ew - 1), Math.max(1, eh), pal.pupil);
        px.line(lx - ew - 1, ly - eh - 1, lx + ew - 1, ly - eh + 1, pal.o, 1);
        px.line(rx - ew + 1, ly - eh + 1, rx + ew + 1, ly - eh - 1, pal.o, 1);
        px.put(mouth_x - 1, mouth_y, pal.o);
        px.put(mouth_x, mouth_y - 1, pal.o);
        px.put(mouth_x + 1, mouth_y, pal.o);
    } else {
        px.rect(lx, ly, Math.max(1, ew - 1), Math.max(1, eh), pal.pupil);
        px.rect(rx, ry, Math.max(1, ew - 1), Math.max(1, eh), pal.pupil);
        px.put(lx - 1, ly - 1, [255, 255, 255]);
        px.put(rx - 1, ry - 1, [255, 255, 255]);
        px.put(mouth_x - 1, mouth_y, pal.o);
        px.put(mouth_x, mouth_y + 1, pal.o);
        px.put(mouth_x + 1, mouth_y, pal.o);
    }
}

function runOps(ops, pal, mood, faceA) {
    var p = new Pix();
    for (var i = 0; i < ops.length; i++) {
        var s = ops[i];
        if (s === 'O') { p.outline(pal.o); if (faceA) { face(p, faceA[0], faceA[1], faceA[2], faceA[3], faceA[4], faceA[5], mood, pal, faceA[6], faceA[7]); faceA = null; } continue; }
        var k = s.charAt(0);
        var a = s.slice(1).split(',');
        var col = a[a.length - 1];
        var c = pal[col];
        var n = [];
        for (var j = 0; j < a.length - 1; j++) n[j] = +a[j];
        if (k === 'E') p.ellipse(n[0], n[1], n[2], n[3], c);
        else if (k === 'R') p.rect(n[0], n[1], n[2], n[3], c);
        else if (k === 'D') p.disc(n[0], n[1], n[2], c);
        else if (k === 'T') p.tri(n[0], n[1], n[2], n[3], n[4], n[5], c);
        else if (k === 'L') p.line(n[0], n[1], n[2], n[3], c, n[4] || 1);
        else if (k === 'P') p.put(n[0], n[1], c);
    }
    if (faceA) face(p, faceA[0], faceA[1], faceA[2], faceA[3], faceA[4], faceA[5], mood, pal, faceA[6], faceA[7]);
    return p;
}
function draw_flick(mood) { return runOps(SPRITE_OPS.draw_flick.split('|'), FLICK, mood, SPRITE_FACE.draw_flick); }
function draw_charling(mood) { return runOps(SPRITE_OPS.draw_charling.split('|'), FLICK, mood, SPRITE_FACE.draw_charling); }
function draw_drakember(mood) { return runOps(SPRITE_OPS.draw_drakember.split('|'), FLICK, mood, SPRITE_FACE.draw_drakember); }
function draw_infernyx(mood) { return runOps(SPRITE_OPS.draw_infernyx.split('|'), FLICK, mood, SPRITE_FACE.draw_infernyx); }
function draw_puff(mood) { return runOps(SPRITE_OPS.draw_puff.split('|'), PUFF, mood, SPRITE_FACE.draw_puff); }
function draw_whisp(mood) { return runOps(SPRITE_OPS.draw_whisp.split('|'), PUFF, mood, SPRITE_FACE.draw_whisp); }
function draw_whisk(mood) { return runOps(SPRITE_OPS.draw_whisk.split('|'), PUFF, mood, SPRITE_FACE.draw_whisk); }
function draw_nimbrix(mood) { return runOps(SPRITE_OPS.draw_nimbrix.split('|'), PUFF, mood, SPRITE_FACE.draw_nimbrix); }
function draw_bud(mood) { return runOps(SPRITE_OPS.draw_bud.split('|'), BUD, mood, SPRITE_FACE.draw_bud); }
function draw_sprout(mood) { return runOps(SPRITE_OPS.draw_sprout.split('|'), BUD, mood, SPRITE_FACE.draw_sprout); }
function draw_sprig(mood) { return runOps(SPRITE_OPS.draw_sprig.split('|'), BUD, mood, SPRITE_FACE.draw_sprig); }
function draw_verdant(mood) { return runOps(SPRITE_OPS.draw_verdant.split('|'), BUD, mood, SPRITE_FACE.draw_verdant); }
function draw_zap(mood) { return runOps(SPRITE_OPS.draw_zap.split('|'), BOLT, mood, SPRITE_FACE.draw_zap); }
function draw_spark(mood) { return runOps(SPRITE_OPS.draw_spark.split('|'), BOLT, mood, SPRITE_FACE.draw_spark); }
function draw_bolt(mood) { return runOps(SPRITE_OPS.draw_bolt.split('|'), BOLT, mood, SPRITE_FACE.draw_bolt); }
function draw_storm(mood) { return runOps(SPRITE_OPS.draw_storm.split('|'), BOLT, mood, SPRITE_FACE.draw_storm); }
function draw_cephling(mood) { return runOps(SPRITE_OPS.draw_cephling.split('|'), CEPH, mood, SPRITE_FACE.draw_cephling); }
function draw_cephy(mood) { return runOps(SPRITE_OPS.draw_cephy.split('|'), CEPH, mood, SPRITE_FACE.draw_cephy); }
function draw_cephalon(mood) { return runOps(SPRITE_OPS.draw_cephalon.split('|'), CEPH, mood, SPRITE_FACE.draw_cephalon); }
function draw_abyssal_ceph(mood) { return runOps(SPRITE_OPS.draw_abyssal_ceph.split('|'), CEPH, mood, SPRITE_FACE.draw_abyssal_ceph); }
var SPRITE_STAGES = {
    flick: ['flick', 'charling', 'drakember', 'infernyx'],
    puff: ['puff', 'whisp', 'whisk', 'nimbrix'],
    bud: ['bud', 'sprout', 'sprig', 'verdant'],
    bolt: ['zap', 'spark', 'bolt', 'storm'],
    ceph: ['cephling', 'cephy', 'cephalon', 'abyssal-ceph']
};
var SPRITE_DRAW = {
    'flick': draw_flick,
    'charling': draw_charling,
    'drakember': draw_drakember,
    'infernyx': draw_infernyx,
    'puff': draw_puff,
    'whisp': draw_whisp,
    'whisk': draw_whisk,
    'nimbrix': draw_nimbrix,
    'bud': draw_bud,
    'sprout': draw_sprout,
    'sprig': draw_sprig,
    'verdant': draw_verdant,
    'zap': draw_zap,
    'spark': draw_spark,
    'bolt': draw_bolt,
    'storm': draw_storm,
    'cephling': draw_cephling,
    'cephy': draw_cephy,
    'cephalon': draw_cephalon,
    'abyssal-ceph': draw_abyssal_ceph
};
var spriteCache = {};

function makeSheet(drawFn) {
    var happy = drawFn('happy').toCanvas();
    var sad = drawFn('sad').toCanvas();
    var c = document.createElement('canvas');
    c.width = 64; c.height = 128;
    var ctx = c.getContext('2d');
    ctx.drawImage(happy, 0, 0);
    ctx.drawImage(sad, 0, 64);
    var img = new Image();
    img.src = c.toDataURL('image/png');
    return img;
}

function preloadSprites() {
    Object.keys(SPRITE_DRAW).forEach(function (name) {
        spriteCache[name] = makeSheet(SPRITE_DRAW[name]);
    });
}

function getSpriteId() {
    var type = localStorage.getItem('hatchedPetType') || 'flick';
    var names = SPRITE_STAGES[type] || SPRITE_STAGES.flick;
    var stage = (typeof currentStage === 'number' && !isNaN(currentStage)) ? currentStage : 0;
    var i = Math.max(0, Math.min(3, stage));
    return names[i];
}

function drawPetSprite(mood, breathOffset, flameFlicker) {
    if (!petCtx || !petCanvas) return;
    petCtx.clearRect(0, 0, petCanvas.width, petCanvas.height);
    petCtx.imageSmoothingEnabled = false;
    petCtx.fillStyle = 'rgba(0,0,0,0.28)';
    petCtx.beginPath();
    petCtx.ellipse(110, 202, 46, 10, 0, 0, Math.PI * 2);
    petCtx.fill();
    var id = getSpriteId();
    var img = spriteCache[id];
    var size = 196;
    var x = (220 - size) / 2;
    var y = (220 - size) / 2 + (breathOffset || 0) - 10;
    if (img && img.complete && img.naturalWidth > 0) {
        var srcY = (mood === 'sad') ? 64 : 0;
        petCtx.drawImage(img, 0, srcY, 64, 64, x, y, size, size);
    }
}

function drawPet(mood, breathOffset, flameFlicker) {
    drawPetSprite(mood, breathOffset, flameFlicker);
}

preloadSprites();
console.log('[pets.js] runtime pixel sprites ready');
