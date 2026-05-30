// ============================================
// VIRTUAL PET v4.19 - Fixed Sprig vines + leaves
// Restored and enhanced organic plant features
// ============================================

let pet = { name: "Pixel", hunger: 80, happiness: 75, cleanliness: 85, energy: 90, age: 0 };
let decayInterval = null;
let animFrame = 0;
let currentStage = 0;
let hasHatched = false;
let eggAnimating = false;

let eggCanvas, eggCtx, petCanvas, petCtx;

function initCanvases() {
    eggCanvas = document.getElementById('eggCanvas');
    eggCtx = eggCanvas.getContext('2d', { alpha: true });

    petCanvas = document.getElementById('petCanvas');
    petCtx = petCanvas.getContext('2d', { alpha: true });
}

// ============================================
// EGG SYSTEM
// ============================================

function drawEgg(crackLevel = 0) {
    eggCtx.clearRect(0, 0, eggCanvas.width, eggCanvas.height);
    eggCtx.imageSmoothingEnabled = false;

    const cx = 100;
    const cy = 100;

    eggCtx.fillStyle = 'rgba(0,0,0,0.3)';
    eggCtx.beginPath();
    eggCtx.ellipse(cx, cy + 55, 55, 18, 0, 0, Math.PI * 2);
    eggCtx.fill();

    eggCtx.fillStyle = '#fefce8';
    eggCtx.beginPath();
    eggCtx.ellipse(cx, cy, 48, 62, 0, 0, Math.PI * 2);
    eggCtx.fill();

    eggCtx.fillStyle = '#e7e5d9';
    eggCtx.beginPath();
    eggCtx.ellipse(cx + 12, cy, 36, 58, 0, 0, Math.PI * 2);
    eggCtx.fill();

    eggCtx.fillStyle = '#fefce8';
    eggCtx.beginPath();
    eggCtx.ellipse(cx - 18, cy - 20, 18, 24, 0, 0, Math.PI * 2);
    eggCtx.fill();

    eggCtx.strokeStyle = '#854d0e';
    eggCtx.lineWidth = 2;

    if (crackLevel >= 1) {
        eggCtx.beginPath();
        eggCtx.moveTo(cx - 10, cy - 30);
        eggCtx.lineTo(cx + 5, cy - 10);
        eggCtx.stroke();
    }
    if (crackLevel >= 2) {
        eggCtx.beginPath();
        eggCtx.moveTo(cx + 5, cy - 10);
        eggCtx.lineTo(cx - 8, cy + 15);
        eggCtx.stroke();
    }
    if (crackLevel >= 3) {
        eggCtx.beginPath();
        eggCtx.moveTo(cx - 8, cy + 15);
        eggCtx.lineTo(cx + 12, cy + 35);
        eggCtx.stroke();
    }
    if (crackLevel >= 4) {
        eggCtx.beginPath();
        eggCtx.moveTo(cx + 5, cy - 10);
        eggCtx.lineTo(cx + 25, cy - 5);
        eggCtx.stroke();
    }
}

function hatchAnimation() {
    if (eggAnimating) return;
    eggAnimating = true;

    let crack = 0;
    const interval = setInterval(() => {
        crack++;
        drawEgg(crack);

        if (crack >= 5) {
            clearInterval(interval);

            setTimeout(() => {
                hasHatched = true;
                currentStage = 0;

                const rand = Math.random();
                let randomPet;
                if (rand < 0.33) randomPet = 'flick';
                else if (rand < 0.66) randomPet = 'puff';
                else randomPet = 'bud';

                localStorage.setItem('hatchedPetType', randomPet);

                document.getElementById('egg-screen').style.display = 'none';
                document.getElementById('pet-screen').style.display = 'block';

                drawPet('happy', 0, 0);
                updateUI();
                startDecay();
                requestAnimationFrame(animate);

                eggAnimating = false;
            }, 400);
        }
    }, 180);
}

// ============================================
// EMBER LINE (Fire/Dragon)
// ============================================

function drawFlick(mood, breathOffset, flameFlicker) {
    const cx = 110;
    const cy = 132 + breathOffset;

    petCtx.fillStyle = 'rgba(0,0,0,0.2)';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 56, 32, 9, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#e85d04';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 34, 20, 18, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#e85d04';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy - 8, 38, 34, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#faa307';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 10, 14, 11, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#ffffff';
    petCtx.fillRect(cx - 16, cy - 16, 11, 11);
    petCtx.fillRect(cx + 5, cy - 16, 11, 11);

    petCtx.fillStyle = '#111111';
    petCtx.fillRect(cx - 12, cy - 12, 5, 5);
    petCtx.fillRect(cx + 9, cy - 12, 5, 5);

    petCtx.fillStyle = '#ffffff';
    petCtx.fillRect(cx - 10, cy - 14, 2, 2);
    petCtx.fillRect(cx + 11, cy - 14, 2, 2);

    petCtx.strokeStyle = '#111111';
    petCtx.lineWidth = 2;
    if (mood === 'happy') {
        petCtx.beginPath();
        petCtx.arc(cx - 11, cy - 24, 4, Math.PI, 0);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.arc(cx + 11, cy - 24, 4, Math.PI, 0);
        petCtx.stroke();
    } else {
        petCtx.beginPath();
        petCtx.moveTo(cx - 16, cy - 22);
        petCtx.lineTo(cx - 6, cy - 19);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.moveTo(cx + 6, cy - 19);
        petCtx.lineTo(cx + 16, cy - 22);
        petCtx.stroke();
    }

    const flameH = 8 + flameFlicker * 0.3;
    petCtx.fillStyle = '#ffba08';
    petCtx.fillRect(cx - 3, cy - 42, 6, flameH);
    petCtx.fillStyle = '#e85d04';
    petCtx.fillRect(cx - 1, cy - 38, 3, flameH - 2);

    petCtx.fillStyle = '#9d0208';
    petCtx.fillRect(cx - 22, cy + 30, 6, 7);
    petCtx.fillRect(cx + 16, cy + 30, 6, 7);
}

function drawCharling(mood, breathOffset, flameFlicker) {
    const cx = 110;
    const cy = 118 + breathOffset;

    petCtx.fillStyle = 'rgba(0,0,0,0.25)';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 68, 38, 10, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#e85d04';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 24, 26, 28, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#e85d04';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy - 6, 32, 28, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#faa307';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 8, 15, 11, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#ffffff';
    petCtx.fillRect(cx - 13, cy - 14, 10, 10);
    petCtx.fillRect(cx + 3, cy - 14, 10, 10);

    petCtx.fillStyle = '#111111';
    petCtx.fillRect(cx - 9, cy - 10, 4, 4);
    petCtx.fillRect(cx + 7, cy - 10, 4, 4);

    petCtx.strokeStyle = '#111111';
    petCtx.lineWidth = 2;
    if (mood === 'happy') {
        petCtx.beginPath();
        petCtx.arc(cx - 8, cy - 22, 4, Math.PI, 0);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.arc(cx + 8, cy - 22, 4, Math.PI, 0);
        petCtx.stroke();
    } else {
        petCtx.beginPath();
        petCtx.moveTo(cx - 13, cy - 20);
        petCtx.lineTo(cx - 3, cy - 17);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.moveTo(cx + 3, cy - 17);
        petCtx.lineTo(cx + 13, cy - 20);
        petCtx.stroke();
    }

    petCtx.fillStyle = '#9d0208';
    petCtx.fillRect(cx - 26, cy + 4, 10, 12);
    petCtx.fillRect(cx + 16, cy + 4, 10, 12);

    const flameH = 10 + flameFlicker * 0.4;
    petCtx.fillStyle = '#ffba08';
    petCtx.fillRect(cx - 3, cy - 38, 6, flameH);
    petCtx.fillStyle = '#e85d04';
    petCtx.fillRect(cx - 1, cy - 34, 3, flameH - 2);
}

function drawDrakEmber(mood, breathOffset, flameFlicker) {
    const cx = 110;
    const cy = 108 + breathOffset;

    petCtx.fillStyle = 'rgba(0,0,0,0.3)';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 76, 46, 11, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#e85d04';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 14, 32, 34, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#e85d04';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy - 10, 30, 26, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#faa307';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 6, 16, 12, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#ffffff';
    petCtx.fillRect(cx - 12, cy - 14, 10, 10);
    petCtx.fillRect(cx + 2, cy - 14, 10, 10);

    petCtx.fillStyle = '#111111';
    petCtx.fillRect(cx - 8, cy - 10, 4, 4);
    petCtx.fillRect(cx + 6, cy - 10, 4, 4);

    petCtx.strokeStyle = '#111111';
    petCtx.lineWidth = 2;
    if (mood === 'happy') {
        petCtx.beginPath();
        petCtx.arc(cx - 7, cy - 20, 4, Math.PI, 0);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.arc(cx + 7, cy - 20, 4, Math.PI, 0);
        petCtx.stroke();
    } else {
        petCtx.beginPath();
        petCtx.moveTo(cx - 12, cy - 18);
        petCtx.lineTo(cx - 2, cy - 15);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.moveTo(cx + 2, cy - 15);
        petCtx.lineTo(cx + 12, cy - 18);
        petCtx.stroke();
    }

    petCtx.fillStyle = '#9d0208';
    petCtx.fillRect(cx - 32, cy - 4, 14, 22);
    petCtx.fillRect(cx + 18, cy - 4, 14, 22);

    const flameH = 13 + flameFlicker * 0.5;
    petCtx.fillStyle = '#ffba08';
    petCtx.fillRect(cx - 4, cy - 40, 8, flameH);
    petCtx.fillStyle = '#e85d04';
    petCtx.fillRect(cx - 2, cy - 36, 4, flameH - 3);

    petCtx.fillStyle = '#9d0208';
    petCtx.fillRect(cx - 14, cy + 46, 8, 9);
    petCtx.fillRect(cx + 6, cy + 46, 8, 9);
}

function drawInfernyx(mood, breathOffset, flameFlicker) {
    const cx = 110;
    const cy = 98 + breathOffset;

    petCtx.fillStyle = 'rgba(0,0,0,0.35)';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 84, 52, 12, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#e85d04';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 8, 36, 40, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#e85d04';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy - 14, 30, 26, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#faa307';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 4, 17, 13, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#ffffff';
    petCtx.fillRect(cx - 11, cy - 14, 10, 10);
    petCtx.fillRect(cx + 1, cy - 14, 10, 10);

    petCtx.fillStyle = '#111111';
    petCtx.fillRect(cx - 7, cy - 10, 4, 4);
    petCtx.fillRect(cx + 5, cy - 10, 4, 4);

    petCtx.strokeStyle = '#111111';
    petCtx.lineWidth = 2;
    if (mood === 'happy') {
        petCtx.beginPath();
        petCtx.arc(cx - 6, cy - 20, 4, Math.PI, 0);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.arc(cx + 6, cy - 20, 4, Math.PI, 0);
        petCtx.stroke();
    } else {
        petCtx.beginPath();
        petCtx.moveTo(cx - 11, cy - 18);
        petCtx.lineTo(cx - 1, cy - 15);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.moveTo(cx + 1, cy - 15);
        petCtx.lineTo(cx + 11, cy - 18);
        petCtx.stroke();
    }

    petCtx.fillStyle = '#9d0208';
    petCtx.fillRect(cx - 38, cy - 12, 18, 30);
    petCtx.fillRect(cx + 20, cy - 12, 18, 30);

    const flameH = 16 + flameFlicker * 0.7;
    petCtx.fillStyle = '#ffba08';
    petCtx.fillRect(cx - 5, cy - 44, 10, flameH);
    petCtx.fillStyle = '#e85d04';
    petCtx.fillRect(cx - 3, cy - 40, 6, flameH - 4);

    petCtx.fillStyle = '#9d0208';
    petCtx.fillRect(cx - 16, cy + 48, 9, 11);
    petCtx.fillRect(cx + 7, cy + 48, 9, 11);
}

// ============================================
// WHISK LINE
// ============================================

function drawTailSegment(cx, cy, length, width, angle, color) {
    petCtx.save();
    petCtx.translate(cx, cy);
    petCtx.rotate(angle);

    petCtx.fillStyle = color;
    petCtx.beginPath();
    petCtx.moveTo(0, -width / 2);
    petCtx.lineTo(length, -width * 0.3);
    petCtx.lineTo(length, width * 0.3);
    petCtx.lineTo(0, width / 2);
    petCtx.closePath();
    petCtx.fill();

    petCtx.restore();
}

// STAGE 0: PUFF (Baby)
function drawPuff(mood, breathOffset, flameFlicker) {
    const cx = 110;
    const cy = 130 + breathOffset;

    petCtx.fillStyle = 'rgba(0,0,0,0.2)';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 56, 38, 10, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#e0f2fe';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 48, 32, 12, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#bae6fd';
    petCtx.beginPath();
    petCtx.ellipse(cx - 8, cy + 44, 12, 6, 0, 0, Math.PI * 2);
    petCtx.fill();
    petCtx.beginPath();
    petCtx.ellipse(cx + 10, cy + 46, 10, 5, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#64748b';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy - 6, 32, 28, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#94a3b8';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 8, 12, 9, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#ffffff';
    petCtx.fillRect(cx - 15, cy - 14, 11, 11);
    petCtx.fillRect(cx + 4, cy - 14, 11, 11);

    petCtx.fillStyle = '#0f172a';
    petCtx.fillRect(cx - 11, cy - 10, 5, 5);
    petCtx.fillRect(cx + 8, cy - 10, 5, 5);

    petCtx.fillStyle = '#ffffff';
    petCtx.fillRect(cx - 9, cy - 12, 2, 2);
    petCtx.fillRect(cx + 10, cy - 12, 2, 2);

    petCtx.strokeStyle = '#0f172a';
    petCtx.lineWidth = 1.5;
    if (mood === 'happy') {
        petCtx.beginPath();
        petCtx.arc(cx - 10, cy - 22, 3, Math.PI, 0);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.arc(cx + 10, cy - 22, 3, Math.PI, 0);
        petCtx.stroke();
    } else {
        petCtx.beginPath();
        petCtx.moveTo(cx - 15, cy - 20);
        petCtx.lineTo(cx - 5, cy - 17);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.moveTo(cx + 5, cy - 17);
        petCtx.lineTo(cx + 15, cy - 20);
        petCtx.stroke();
    }

    petCtx.fillStyle = '#475569';
    petCtx.beginPath();
    petCtx.moveTo(cx - 20, cy - 28);
    petCtx.lineTo(cx - 32, cy - 48);
    petCtx.lineTo(cx - 10, cy - 34);
    petCtx.fill();

    petCtx.beginPath();
    petCtx.moveTo(cx + 20, cy - 28);
    petCtx.lineTo(cx + 32, cy - 48);
    petCtx.lineTo(cx + 10, cy - 34);
    petCtx.fill();

    drawTailSegment(cx + 16, cy + 34, 16, 7, -0.7, '#64748b');
    drawTailSegment(cx + 30, cy + 36, 12, 5, -0.4, '#64748b');
    drawTailSegment(cx + 40, cy + 38, 8, 3.5, -0.1, '#64748b');

    petCtx.fillStyle = '#bae6fd';
    petCtx.beginPath();
    petCtx.ellipse(cx - 10, cy + 54, 8, 4, 0, 0, Math.PI * 2);
    petCtx.fill();
    petCtx.beginPath();
    petCtx.ellipse(cx + 12, cy + 55, 7, 3, 0, 0, Math.PI * 2);
    petCtx.fill();
}

// STAGE 1: WHISP (Child)
function drawWhisp(mood, breathOffset, flameFlicker) {
    const cx = 110;
    const cy = 118 + breathOffset;

    petCtx.fillStyle = 'rgba(0,0,0,0.25)';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 66, 44, 11, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#e0f2fe';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 56, 38, 14, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#bae6fd';
    petCtx.beginPath();
    petCtx.ellipse(cx - 10, cy + 52, 14, 6, 0, 0, Math.PI * 2);
    petCtx.fill();
    petCtx.beginPath();
    petCtx.ellipse(cx + 12, cy + 54, 12, 5, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#64748b';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy - 4, 30, 26, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#94a3b8';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 8, 13, 10, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#ffffff';
    petCtx.fillRect(cx - 12, cy - 12, 10, 10);
    petCtx.fillRect(cx + 2, cy - 12, 10, 10);

    petCtx.fillStyle = '#0f172a';
    petCtx.fillRect(cx - 8, cy - 8, 4, 4);
    petCtx.fillRect(cx + 6, cy - 8, 4, 4);

    petCtx.strokeStyle = '#0f172a';
    petCtx.lineWidth = 1.5;
    if (mood === 'happy') {
        petCtx.beginPath();
        petCtx.arc(cx - 7, cy - 18, 3, Math.PI, 0);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.arc(cx + 7, cy - 18, 3, Math.PI, 0);
        petCtx.stroke();
    } else {
        petCtx.beginPath();
        petCtx.moveTo(cx - 12, cy - 16);
        petCtx.lineTo(cx - 2, cy - 13);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.moveTo(cx + 2, cy - 13);
        petCtx.lineTo(cx + 12, cy - 16);
        petCtx.stroke();
    }

    petCtx.fillStyle = '#475569';
    petCtx.beginPath();
    petCtx.moveTo(cx - 15, cy - 22);
    petCtx.lineTo(cx - 20, cy - 32);
    petCtx.lineTo(cx - 8, cy - 26);
    petCtx.fill();

    petCtx.beginPath();
    petCtx.moveTo(cx + 15, cy - 22);
    petCtx.lineTo(cx + 20, cy - 32);
    petCtx.lineTo(cx + 8, cy - 26);
    petCtx.fill();

    drawTailSegment(cx + 20, cy + 38, 18, 8, -0.6, '#64748b');
    drawTailSegment(cx + 36, cy + 40, 14, 6, -0.3, '#64748b');
    drawTailSegment(cx + 48, cy + 42, 10, 4, -0.05, '#64748b');

    petCtx.fillStyle = '#bae6fd';
    petCtx.beginPath();
    petCtx.ellipse(cx - 14, cy + 62, 14, 6, 0, 0, Math.PI * 2);
    petCtx.fill();
    petCtx.beginPath();
    petCtx.ellipse(cx + 16, cy + 64, 12, 5, 0, 0, Math.PI * 2);
    petCtx.fill();
}

// STAGE 2: WHISK (Adult)
function drawWhisk(mood, breathOffset, flameFlicker) {
    const cx = 110;
    const cy = 108 + breathOffset;

    petCtx.fillStyle = 'rgba(0,0,0,0.3)';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 72, 50, 12, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#e0f2fe';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 60, 44, 16, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#bae6fd';
    petCtx.beginPath();
    petCtx.ellipse(cx - 12, cy + 56, 16, 7, 0, 0, Math.PI * 2);
    petCtx.fill();
    petCtx.beginPath();
    petCtx.ellipse(cx + 14, cy + 58, 14, 6, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#64748b';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy - 6, 28, 24, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#94a3b8';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 6, 14, 11, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#ffffff';
    petCtx.fillRect(cx - 11, cy - 12, 10, 10);
    petCtx.fillRect(cx + 1, cy - 12, 10, 10);

    petCtx.fillStyle = '#0f172a';
    petCtx.fillRect(cx - 7, cy - 8, 4, 4);
    petCtx.fillRect(cx + 5, cy - 8, 4, 4);

    petCtx.strokeStyle = '#0f172a';
    petCtx.lineWidth = 1.5;
    if (mood === 'happy') {
        petCtx.beginPath();
        petCtx.arc(cx - 6, cy - 16, 3, Math.PI, 0);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.arc(cx + 6, cy - 16, 3, Math.PI, 0);
        petCtx.stroke();
    } else {
        petCtx.beginPath();
        petCtx.moveTo(cx - 11, cy - 14);
        petCtx.lineTo(cx - 1, cy - 11);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.moveTo(cx + 1, cy - 11);
        petCtx.lineTo(cx + 11, cy - 14);
        petCtx.stroke();
    }

    petCtx.fillStyle = '#475569';
    petCtx.beginPath();
    petCtx.moveTo(cx - 13, cy - 20);
    petCtx.lineTo(cx - 18, cy - 28);
    petCtx.lineTo(cx - 6, cy - 24);
    petCtx.fill();

    petCtx.beginPath();
    petCtx.moveTo(cx + 13, cy - 20);
    petCtx.lineTo(cx + 18, cy - 28);
    petCtx.lineTo(cx + 6, cy - 24);
    petCtx.fill();

    drawTailSegment(cx + 22, cy + 42, 20, 9, -0.5, '#64748b');
    drawTailSegment(cx + 40, cy + 44, 16, 7, -0.2, '#64748b');
    drawTailSegment(cx + 54, cy + 46, 12, 5, 0.05, '#64748b');

    petCtx.fillStyle = '#bae6fd';
    petCtx.beginPath();
    petCtx.ellipse(cx - 18, cy + 66, 16, 7, 0, 0, Math.PI * 2);
    petCtx.fill();
    petCtx.beginPath();
    petCtx.ellipse(cx + 20, cy + 68, 14, 6, 0, 0, Math.PI * 2);
    petCtx.fill();
}

// STAGE 3: NIMBRIX (Ultimate)
function drawNimbrix(mood, breathOffset, flameFlicker) {
    const cx = 110;
    const cy = 96 + breathOffset;

    petCtx.fillStyle = 'rgba(0,0,0,0.45)';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 86, 68, 15, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#e0f2fe';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 58, 58, 28, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#bae6fd';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 52, 48, 20, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#475569';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy - 6, 28, 24, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#94a3b8';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 8, 15, 12, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#ffffff';
    petCtx.fillRect(cx - 11, cy - 12, 10, 10);
    petCtx.fillRect(cx + 1, cy - 12, 10, 10);

    petCtx.fillStyle = '#0f172a';
    petCtx.fillRect(cx - 7, cy - 8, 4, 4);
    petCtx.fillRect(cx + 5, cy - 8, 4, 4);

    petCtx.fillStyle = '#ffffff';
    petCtx.fillRect(cx - 5, cy - 10, 2, 2);
    petCtx.fillRect(cx + 7, cy - 10, 2, 2);

    petCtx.strokeStyle = '#0f172a';
    petCtx.lineWidth = 2;
    petCtx.beginPath();
    petCtx.moveTo(cx - 12, cy - 16);
    petCtx.lineTo(cx - 2, cy - 20);
    petCtx.stroke();

    petCtx.beginPath();
    petCtx.moveTo(cx + 2, cy - 20);
    petCtx.lineTo(cx + 12, cy - 16);
    petCtx.stroke();

    petCtx.fillStyle = '#334155';
    petCtx.beginPath();
    petCtx.moveTo(cx - 13, cy - 22);
    petCtx.lineTo(cx - 20, cy - 32);
    petCtx.lineTo(cx - 4, cy - 26);
    petCtx.fill();

    petCtx.beginPath();
    petCtx.moveTo(cx + 13, cy - 22);
    petCtx.lineTo(cx + 20, cy - 32);
    petCtx.lineTo(cx + 4, cy - 26);
    petCtx.fill();

    drawTailSegment(cx + 24, cy + 48, 22, 10, -0.45, '#64748b');
    drawTailSegment(cx + 44, cy + 50, 18, 8, -0.15, '#64748b');
    drawTailSegment(cx + 60, cy + 52, 14, 6, 0.1, '#64748b');

    petCtx.fillStyle = '#e0f2fe';
    petCtx.beginPath();
    petCtx.ellipse(cx - 32, cy + 60, 22, 10, 0, 0, Math.PI * 2);
    petCtx.fill();
    petCtx.beginPath();
    petCtx.ellipse(cx + 34, cy + 62, 20, 9, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#bae6fd';
    petCtx.beginPath();
    petCtx.ellipse(cx - 40, cy + 50, 14, 7, 0, 0, Math.PI * 2);
    petCtx.fill();
    petCtx.beginPath();
    petCtx.ellipse(cx + 42, cy + 52, 12, 6, 0, 0, Math.PI * 2);
    petCtx.fill();
}

// ============================================
// SPRIG LINE - v4.19 Vines and leaves restored + enhanced
// ============================================

function drawBud(mood, breathOffset, flameFlicker) {
    const cx = 110;
    const cy = 132 + breathOffset;

    petCtx.fillStyle = 'rgba(0,0,0,0.2)';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 56, 34, 9, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#4ade80';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 34, 18, 16, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#4ade80';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy - 8, 40, 36, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#86efac';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 10, 13, 10, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#ffffff';
    petCtx.fillRect(cx - 17, cy - 16, 12, 11);
    petCtx.fillRect(cx + 5, cy - 16, 12, 11);

    petCtx.fillStyle = '#166534';
    petCtx.fillRect(cx - 13, cy - 12, 5, 5);
    petCtx.fillRect(cx + 9, cy - 12, 5, 5);

    petCtx.fillStyle = '#ffffff';
    petCtx.fillRect(cx - 11, cy - 14, 2, 2);
    petCtx.fillRect(cx + 11, cy - 14, 2, 2);

    petCtx.strokeStyle = '#166534';
    petCtx.lineWidth = 2;
    if (mood === 'happy') {
        petCtx.beginPath();
        petCtx.arc(cx - 11, cy - 24, 4, Math.PI, 0);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.arc(cx + 11, cy - 24, 4, Math.PI, 0);
        petCtx.stroke();
    } else {
        petCtx.beginPath();
        petCtx.moveTo(cx - 17, cy - 22);
        petCtx.lineTo(cx - 6, cy - 19);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.moveTo(cx + 6, cy - 19);
        petCtx.lineTo(cx + 17, cy - 22);
        petCtx.stroke();
    }

    petCtx.fillStyle = '#166534';
    petCtx.fillRect(cx - 3, cy - 42, 6, 9);
    petCtx.fillStyle = '#4ade80';
    petCtx.fillRect(cx - 5, cy - 36, 3, 4);
    petCtx.fillRect(cx + 2, cy - 36, 3, 4);

    petCtx.fillStyle = '#166534';
    petCtx.fillRect(cx - 10, cy + 48, 5, 4);
    petCtx.fillRect(cx + 5, cy + 48, 5, 4);
}

function drawSprout(mood, breathOffset, flameFlicker) {
    const cx = 110;
    const cy = 118 + breathOffset;

    petCtx.fillStyle = 'rgba(0,0,0,0.25)';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 68, 40, 10, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#4ade80';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 26, 24, 28, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#4ade80';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy - 6, 34, 30, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#86efac';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 8, 14, 11, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#ffffff';
    petCtx.fillRect(cx - 13, cy - 14, 10, 10);
    petCtx.fillRect(cx + 3, cy - 14, 10, 10);

    petCtx.fillStyle = '#166534';
    petCtx.fillRect(cx - 9, cy - 10, 4, 4);
    petCtx.fillRect(cx + 7, cy - 10, 4, 4);

    petCtx.strokeStyle = '#166534';
    petCtx.lineWidth = 2;
    if (mood === 'happy') {
        petCtx.beginPath();
        petCtx.arc(cx - 8, cy - 20, 4, Math.PI, 0);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.arc(cx + 8, cy - 20, 4, Math.PI, 0);
        petCtx.stroke();
    } else {
        petCtx.beginPath();
        petCtx.moveTo(cx - 13, cy - 18);
        petCtx.lineTo(cx - 3, cy - 15);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.moveTo(cx + 3, cy - 15);
        petCtx.lineTo(cx + 13, cy - 18);
        petCtx.stroke();
    }

    // Restored + enhanced curving vine with leaf
    petCtx.strokeStyle = '#166534';
    petCtx.lineWidth = 3;
    petCtx.beginPath();
    petCtx.moveTo(cx - 22, cy + 12);
    petCtx.quadraticCurveTo(cx - 34, cy + 2, cx - 30, cy - 6);
    petCtx.stroke();

    petCtx.fillStyle = '#4ade80';
    petCtx.beginPath();
    petCtx.ellipse(cx - 36, cy + 0, 8, 5, -0.7, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#166534';
    petCtx.fillRect(cx - 3, cy - 36, 6, 10);
}

function drawSprig(mood, breathOffset, flameFlicker) {
    const cx = 110;
    const cy = 110 + breathOffset;

    petCtx.fillStyle = 'rgba(0,0,0,0.3)';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 74, 46, 11, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#4ade80';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 16, 32, 34, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#4ade80';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy - 8, 32, 28, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#86efac';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 6, 16, 12, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#ffffff';
    petCtx.fillRect(cx - 12, cy - 12, 10, 10);
    petCtx.fillRect(cx + 2, cy - 12, 10, 10);

    petCtx.fillStyle = '#166534';
    petCtx.fillRect(cx - 8, cy - 8, 4, 4);
    petCtx.fillRect(cx + 6, cy - 8, 4, 4);

    petCtx.strokeStyle = '#166534';
    petCtx.lineWidth = 2;
    if (mood === 'happy') {
        petCtx.beginPath();
        petCtx.arc(cx - 7, cy - 16, 4, Math.PI, 0);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.arc(cx + 7, cy - 16, 4, Math.PI, 0);
        petCtx.stroke();
    } else {
        petCtx.beginPath();
        petCtx.moveTo(cx - 12, cy - 14);
        petCtx.lineTo(cx - 2, cy - 11);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.moveTo(cx + 2, cy - 11);
        petCtx.lineTo(cx + 12, cy - 14);
        petCtx.stroke();
    }

    // Restored + enhanced curving vines with big leaves
    petCtx.strokeStyle = '#166534';
    petCtx.lineWidth = 3.5;
    petCtx.beginPath();
    petCtx.moveTo(cx - 26, cy + 16);
    petCtx.quadraticCurveTo(cx - 38, cy + 4, cx - 32, cy - 6);
    petCtx.stroke();

    petCtx.beginPath();
    petCtx.moveTo(cx + 26, cy + 16);
    petCtx.quadraticCurveTo(cx + 38, cy + 4, cx + 32, cy - 6);
    petCtx.stroke();

    petCtx.fillStyle = '#4ade80';
    petCtx.beginPath();
    petCtx.ellipse(cx - 40, cy + 2, 10, 6, -0.8, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.beginPath();
    petCtx.ellipse(cx + 40, cy + 2, 10, 6, 0.8, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#166534';
    petCtx.fillRect(cx - 4, cy - 38, 8, 12);
}

function drawVerdant(mood, breathOffset, flameFlicker) {
    const cx = 110;
    const cy = 100 + breathOffset;

    petCtx.fillStyle = 'rgba(0,0,0,0.35)';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 82, 52, 12, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#4ade80';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 10, 36, 40, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#4ade80';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy - 12, 34, 30, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#86efac';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 4, 18, 13, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#ffffff';
    petCtx.fillRect(cx - 12, cy - 12, 11, 11);
    petCtx.fillRect(cx + 1, cy - 12, 11, 11);

    petCtx.fillStyle = '#166534';
    petCtx.fillRect(cx - 8, cy - 8, 5, 5);
    petCtx.fillRect(cx + 5, cy - 8, 5, 5);

    petCtx.strokeStyle = '#166534';
    petCtx.lineWidth = 2;
    if (mood === 'happy') {
        petCtx.beginPath();
        petCtx.arc(cx - 7, cy - 16, 4, Math.PI, 0);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.arc(cx + 7, cy - 16, 4, Math.PI, 0);
        petCtx.stroke();
    } else {
        petCtx.beginPath();
        petCtx.moveTo(cx - 12, cy - 14);
        petCtx.lineTo(cx - 2, cy - 11);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.moveTo(cx + 2, cy - 11);
        petCtx.lineTo(cx + 12, cy - 14);
        petCtx.stroke();
    }

    petCtx.fillStyle = '#166534';
    petCtx.fillRect(cx - 34, cy + 0, 17, 26);
    petCtx.fillRect(cx + 17, cy + 0, 17, 26);

    const flowerX = cx;
    const flowerY = cy - 48;

    petCtx.fillStyle = '#f472b6';
    for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI * 2) / 8;
        const px = flowerX + Math.cos(angle) * 14;
        const py = flowerY + Math.sin(angle) * 10;

        petCtx.beginPath();
        petCtx.ellipse(px, py, 10, 7, angle, 0, Math.PI * 2);
        petCtx.fill();
    }

    petCtx.fillStyle = '#f9a8d4';
    for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI * 2) / 8 + 0.4;
        const px = flowerX + Math.cos(angle) * 8;
        const py = flowerY + Math.sin(angle) * 6;

        petCtx.beginPath();
        petCtx.ellipse(px, py, 6, 4, angle, 0, Math.PI * 2);
        petCtx.fill();
    }

    petCtx.fillStyle = '#ec4899';
    petCtx.beginPath();
    petCtx.arc(flowerX, flowerY, 6, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#166534';
    petCtx.fillRect(cx - 16, cy + 28, 8, 11);
    petCtx.fillRect(cx + 8, cy + 28, 8, 11);

    petCtx.fillStyle = '#4ade80';
    petCtx.fillRect(cx - 32, cy + 6, 11, 7);
    petCtx.fillRect(cx + 21, cy + 6, 11, 7);
}

// ============================================
// CORE GAME LOGIC
// ============================================

function drawPet(mood, breathOffset, flameFlicker) {
    petCtx.clearRect(0, 0, petCanvas.width, petCanvas.height);

    const hatchedType = localStorage.getItem('hatchedPetType') || 'flick';

    if (hatchedType === 'puff') {
        if (currentStage === 0) drawPuff(mood, breathOffset, flameFlicker);
        else if (currentStage === 1) drawWhisp(mood, breathOffset, flameFlicker);
        else if (currentStage === 2) drawWhisk(mood, breathOffset, flameFlicker);
        else if (currentStage === 3) drawNimbrix(mood, breathOffset, flameFlicker);
    } else if (hatchedType === 'bud') {
        if (currentStage === 0) drawBud(mood, breathOffset, flameFlicker);
        else if (currentStage === 1) drawSprout(mood, breathOffset, flameFlicker);
        else if (currentStage === 2) drawSprig(mood, breathOffset, flameFlicker);
        else if (currentStage === 3) drawVerdant(mood, breathOffset, flameFlicker);
    } else {
        if (currentStage === 0) drawFlick(mood, breathOffset, flameFlicker);
        else if (currentStage === 1) drawCharling(mood, breathOffset, flameFlicker);
        else if (currentStage === 2) drawDrakEmber(mood, breathOffset, flameFlicker);
        else if (currentStage === 3) drawInfernyx(mood, breathOffset, flameFlicker);
    }
}

function setStage(stage) {
    currentStage = stage;
    const avg = (pet.hunger + pet.happiness + pet.cleanliness + pet.energy) / 4;
    let mood = (avg >= 50) ? 'happy' : 'sad';
    drawPet(mood, 0, 0);
}

function animate() {
    animFrame += 0.12;
    const breath = Math.sin(animFrame * 1.0) * 2.0;
    const flameFlicker = Math.sin(animFrame * 3.8) * 2.8 + (Math.random() - 0.5) * 1.0;

    const avg = (pet.hunger + pet.happiness + pet.cleanliness + pet.energy) / 4;
    let mood = (avg >= 50) ? 'happy' : 'sad';

    drawPet(mood, breath, flameFlicker);
    requestAnimationFrame(animate);
}

function updatePetVisual() {
    const avg = (pet.hunger + pet.happiness + pet.cleanliness + pet.energy) / 4;
    let moodText = 'VERY HAPPY';
    let moodColor = '#22c55e';

    if (avg >= 80) {
        moodText = 'VERY HAPPY';
        moodColor = '#22c55e';
    } else if (avg >= 60) {
        moodText = 'HAPPY';
        moodColor = '#22c55e';
    } else if (avg >= 40) {
        moodText = 'NEEDS CARE';
        moodColor = '#f59e0b';
    } else {
        moodText = 'STRUGGLING';
        moodColor = '#ef4444';
    }

    const moodEl = document.getElementById('petMood');
    moodEl.textContent = moodText;
    moodEl.style.color = moodColor;
}

function savePet() {
    localStorage.setItem('virtualPet', JSON.stringify(pet));
    localStorage.setItem('hasHatched', hasHatched);
}

function loadPet() {
    const saved = localStorage.getItem('virtualPet');
    if (saved) pet = { ...pet, ...JSON.parse(saved) };

    const hatched = localStorage.getItem('hasHatched');
    if (hatched === 'true') hasHatched = true;
}

function updateUI() {
    document.getElementById('hungerValue').textContent = Math.round(pet.hunger);
    document.getElementById('happinessValue').textContent = Math.round(pet.happiness);
    document.getElementById('cleanValue').textContent = Math.round(pet.cleanliness);
    document.getElementById('energyValue').textContent = Math.round(pet.energy);
    document.getElementById('ageValue').textContent = Math.floor(pet.age);
    document.getElementById('petNameDisplay').textContent = pet.name;

    updatePetVisual();
}

function feedPet() {
    if (pet.hunger >= 95) return;
    pet.hunger = Math.min(100, pet.hunger + 22);
    pet.happiness = Math.min(100, pet.happiness + 5);
    pet.energy = Math.max(0, pet.energy - 3);
    updateUI();
    savePet();
}

function playWithPet() {
    if (pet.energy < 15) return;
    pet.happiness = Math.min(100, pet.happiness + 25);
    pet.hunger = Math.max(0, pet.hunger - 8);
    pet.energy = Math.max(0, pet.energy - 18);
    pet.cleanliness = Math.max(0, pet.cleanliness - 5);
    updateUI();
    savePet();
}

function cleanPet() {
    if (pet.cleanliness >= 95) return;
    pet.cleanliness = Math.min(100, pet.cleanliness + 28);
    pet.happiness = Math.min(100, pet.happiness + 8);
    pet.energy = Math.max(0, pet.energy - 5);
    updateUI();
    savePet();
}

function restPet() {
    if (pet.energy >= 95) return;
    pet.energy = Math.min(100, pet.energy + 32);
    pet.hunger = Math.max(0, pet.hunger - 5);
    pet.happiness = Math.min(100, pet.happiness + 4);
    updateUI();
    savePet();
}

function decayStats() {
    const r = 1.05;
    pet.hunger = Math.max(0, pet.hunger - r * 0.85);
    pet.happiness = Math.max(0, pet.happiness - r * 0.75);
    pet.cleanliness = Math.max(0, pet.cleanliness - r * 0.55);
    pet.energy = Math.max(0, pet.energy - r * 0.65);
    if (Math.random() < 0.05) pet.happiness = Math.max(0, pet.happiness - 3);
    if (Math.random() < 0.08) pet.age += 0.08;
    updateUI();
    savePet();
}

function startDecay() {
    if (decayInterval) clearInterval(decayInterval);
    decayInterval = setInterval(decayStats, 6500);
}

function resetPet() {
    if (!confirm('Reset and hatch a new egg?')) return;
    localStorage.removeItem('virtualPet');
    localStorage.removeItem('hasHatched');
    localStorage.removeItem('hatchedPetType');
    location.reload();
}

function init() {
    initCanvases();
    loadPet();

    if (!hasHatched) {
        document.getElementById('egg-screen').style.display = 'block';
        document.getElementById('pet-screen').style.display = 'none';

        drawEgg(0);

        eggCanvas.onclick = () => {
            if (!eggAnimating) hatchAnimation();
        };
    } else {
        document.getElementById('egg-screen').style.display = 'none';
        document.getElementById('pet-screen').style.display = 'block';

        document.getElementById('petNameDisplay').textContent = pet.name;
        updateUI();
        startDecay();
        drawPet('happy', 0, 0);
        requestAnimationFrame(animate);
    }
}

window.onload = init;