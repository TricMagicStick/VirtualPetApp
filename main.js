// ============================================
// VIRTUAL PET v4.30 - Full Serpentine Dragon Redesign
// High wumbo + proper head structure (no big circle head)
// ============================================

let pet = { name: "Pixel", hunger: 80, happiness: 75, cleanliness: 85, energy: 90, age: 0 };
let decayInterval = null;
let animFrame = 0;
let currentStage = 0;
let hasHatched = false;
let eggAnimating = false;
let lastEvolutionAge = 0;

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
                lastEvolutionAge = 0;

                const rand = Math.random();
                let randomPet;
                if (rand < 0.2) randomPet = 'flick';
                else if (rand < 0.4) randomPet = 'puff';
                else if (rand < 0.6) randomPet = 'bud';
                else if (rand < 0.8) randomPet = 'bolt';
                else randomPet = 'ceph';

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
// EVOLUTION SYSTEM
// ============================================

function getAverageCare() {
    return (pet.hunger + pet.happiness + pet.cleanliness + pet.energy) / 4;
}

function canEvolve() {
    const avg = getAverageCare();
    const age = Math.floor(pet.age);

    if (currentStage === 0) {
        return age >= 4 && avg >= 60;
    } else if (currentStage === 1) {
        return age >= 12 && avg >= 65;
    } else if (currentStage === 2) {
        return age >= 24 && avg >= 70;
    }
    return false;
}

function evolvePet() {
    if (currentStage >= 3) return;

    currentStage++;
    lastEvolutionAge = Math.floor(pet.age);

    const avg = getAverageCare();
    let mood = (avg >= 50) ? 'happy' : 'sad';

    drawPet(mood, 0, 0);
    updateUI();
    savePet();

    const moodEl = document.getElementById('petMood');
    const originalText = moodEl.textContent;
    const originalColor = moodEl.style.color;

    moodEl.textContent = 'EVOLVED!';
    moodEl.style.color = '#a78bfa';

    setTimeout(() => {
        moodEl.textContent = originalText;
        moodEl.style.color = originalColor;
    }, 1800);
}

function forceEvolution() {
    if (currentStage >= 3) {
        alert('Already at Ultimate stage!');
        return;
    }
    evolvePet();
}

// ============================================
// NEW SERPENTINE DRAGON LINE (High Wumbo)
// Baby & Ultimate = Red. Proper head structure.
// ============================================

// Baby - Flick (Red, cute, short body)
function drawFlick(mood, breathOffset, flameFlicker) {
    const cx = 110;
    const cy = 130 + breathOffset;

    // Shadow
    petCtx.fillStyle = 'rgba(0,0,0,0.2)';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 52, 36, 9, 0, 0, Math.PI * 2);
    petCtx.fill();

    // Short serpentine body (2 segments)
    petCtx.fillStyle = '#b91c1c';
    petCtx.fillRect(cx - 10, cy + 28, 20, 22); // body segment 1
    petCtx.fillRect(cx - 6, cy + 46, 12, 14);  // body segment 2

    // Head - NOT a big circle. More structured dragon head
    petCtx.fillStyle = '#b91c1c';
    petCtx.beginPath();
    petCtx.moveTo(cx - 18, cy + 2);
    petCtx.lineTo(cx + 18, cy + 2);
    petCtx.lineTo(cx + 14, cy - 22);
    petCtx.lineTo(cx - 14, cy - 22);
    petCtx.fill();

    // Snout
    petCtx.fillStyle = '#991b1b';
    petCtx.fillRect(cx - 8, cy - 18, 16, 10);

    // Eyes
    petCtx.fillStyle = '#fefce8';
    petCtx.fillRect(cx - 12, cy - 14, 6, 6);
    petCtx.fillRect(cx + 6, cy - 14, 6, 6);

    petCtx.fillStyle = '#111111';
    petCtx.fillRect(cx - 9, cy - 11, 3, 3);
    petCtx.fillRect(cx + 9, cy - 11, 3, 3);

    // Tiny horns
    petCtx.fillStyle = '#7f1d1d';
    petCtx.fillRect(cx - 10, cy - 24, 3, 6);
    petCtx.fillRect(cx + 7, cy - 24, 3, 6);

    // Tiny wing nubs
    petCtx.fillStyle = '#7f1d1d';
    petCtx.fillRect(cx - 20, cy + 8, 8, 6);
    petCtx.fillRect(cx + 12, cy + 8, 8, 6);

    // Short tail
    petCtx.fillStyle = '#b91c1c';
    petCtx.fillRect(cx + 4, cy + 56, 8, 10);

    // Expression
    petCtx.strokeStyle = '#111111';
    petCtx.lineWidth = 2;
    if (mood === 'happy') {
        petCtx.beginPath();
        petCtx.arc(cx - 9, cy - 20, 3, Math.PI, 0);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.arc(cx + 9, cy - 20, 3, Math.PI, 0);
        petCtx.stroke();
    } else {
        petCtx.beginPath();
        petCtx.moveTo(cx - 13, cy - 18);
        petCtx.lineTo(cx - 5, cy - 15);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.moveTo(cx + 5, cy - 15);
        petCtx.lineTo(cx + 13, cy - 18);
        petCtx.stroke();
    }
}

// Child - Charling
function drawCharling(mood, breathOffset, flameFlicker) {
    const cx = 110;
    const cy = 124 + breathOffset;

    // Shadow
    petCtx.fillStyle = 'rgba(0,0,0,0.25)';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 58, 40, 10, 0, 0, Math.PI * 2);
    petCtx.fill();

    // Longer body (3 segments)
    petCtx.fillStyle = '#b91c1c';
    petCtx.fillRect(cx - 12, cy + 22, 24, 18);
    petCtx.fillRect(cx - 10, cy + 38, 20, 16);
    petCtx.fillRect(cx - 6, cy + 52, 12, 12);

    // Head - more structured
    petCtx.fillStyle = '#b91c1c';
    petCtx.beginPath();
    petCtx.moveTo(cx - 16, cy);
    petCtx.lineTo(cx + 16, cy);
    petCtx.lineTo(cx + 12, cy - 24);
    petCtx.lineTo(cx - 12, cy - 24);
    petCtx.fill();

    petCtx.fillStyle = '#991b1b';
    petCtx.fillRect(cx - 7, cy - 20, 14, 10);

    // Eyes
    petCtx.fillStyle = '#fefce8';
    petCtx.fillRect(cx - 10, cy - 14, 5, 5);
    petCtx.fillRect(cx + 5, cy - 14, 5, 5);

    petCtx.fillStyle = '#111111';
    petCtx.fillRect(cx - 8, cy - 11, 2, 2);
    petCtx.fillRect(cx + 7, cy - 11, 2, 2);

    // Small horns
    petCtx.fillStyle = '#7f1d1d';
    petCtx.fillRect(cx - 10, cy - 26, 4, 8);
    petCtx.fillRect(cx + 6, cy - 26, 4, 8);

    // Small wings
    petCtx.fillStyle = '#7f1d1d';
    petCtx.fillRect(cx - 22, cy + 6, 10, 8);
    petCtx.fillRect(cx + 12, cy + 6, 10, 8);

    // Tail
    petCtx.fillStyle = '#b91c1c';
    petCtx.fillRect(cx + 2, cy + 60, 10, 14);

    // Expression
    petCtx.strokeStyle = '#111111';
    petCtx.lineWidth = 2;
    if (mood === 'happy') {
        petCtx.beginPath();
        petCtx.arc(cx - 7, cy - 22, 3, Math.PI, 0);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.arc(cx + 7, cy - 22, 3, Math.PI, 0);
        petCtx.stroke();
    } else {
        petCtx.beginPath();
        petCtx.moveTo(cx - 11, cy - 20);
        petCtx.lineTo(cx - 3, cy - 17);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.moveTo(cx + 3, cy - 17);
        petCtx.lineTo(cx + 11, cy - 20);
        petCtx.stroke();
    }
}

// Adult - DrakEmber
function drawDrakEmber(mood, breathOffset, flameFlicker) {
    const cx = 110;
    const cy = 116 + breathOffset;

    // Shadow
    petCtx.fillStyle = 'rgba(0,0,0,0.3)';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 66, 46, 11, 0, 0, Math.PI * 2);
    petCtx.fill();

    // Long serpentine body (4+ segments)
    petCtx.fillStyle = '#b91c1c';
    petCtx.fillRect(cx - 14, cy + 18, 28, 16);
    petCtx.fillRect(cx - 12, cy + 32, 24, 14);
    petCtx.fillRect(cx - 10, cy + 44, 20, 14);
    petCtx.fillRect(cx - 6, cy + 56, 12, 12);

    // Head - strong structure
    petCtx.fillStyle = '#b91c1c';
    petCtx.beginPath();
    petCtx.moveTo(cx - 18, cy - 2);
    petCtx.lineTo(cx + 18, cy - 2);
    petCtx.lineTo(cx + 14, cy - 26);
    petCtx.lineTo(cx - 14, cy - 26);
    petCtx.fill();

    petCtx.fillStyle = '#991b1b';
    petCtx.fillRect(cx - 8, cy - 22, 16, 12);

    // Eyes
    petCtx.fillStyle = '#fefce8';
    petCtx.fillRect(cx - 11, cy - 14, 5, 5);
    petCtx.fillRect(cx + 6, cy - 14, 5, 5);

    petCtx.fillStyle = '#111111';
    petCtx.fillRect(cx - 9, cy - 11, 2, 2);
    petCtx.fillRect(cx + 8, cy - 11, 2, 2);

    // Horns
    petCtx.fillStyle = '#7f1d1d';
    petCtx.fillRect(cx - 12, cy - 30, 5, 10);
    petCtx.fillRect(cx + 7, cy - 30, 5, 10);

    // Wings (developing)
    petCtx.fillStyle = '#7f1d1d';
    petCtx.fillRect(cx - 28, cy + 2, 14, 12);
    petCtx.fillRect(cx + 14, cy + 2, 14, 12);

    // Claws
    petCtx.fillStyle = '#7f1d1d';
    petCtx.fillRect(cx - 16, cy + 52, 5, 6);
    petCtx.fillRect(cx + 11, cy + 52, 5, 6);

    // Tail
    petCtx.fillStyle = '#b91c1c';
    petCtx.fillRect(cx + 2, cy + 64, 12, 18);

    // Expression
    petCtx.strokeStyle = '#111111';
    petCtx.lineWidth = 2;
    if (mood === 'happy') {
        petCtx.beginPath();
        petCtx.arc(cx - 8, cy - 24, 3, Math.PI, 0);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.arc(cx + 8, cy - 24, 3, Math.PI, 0);
        petCtx.stroke();
    } else {
        petCtx.beginPath();
        petCtx.moveTo(cx - 12, cy - 22);
        petCtx.lineTo(cx - 4, cy - 19);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.moveTo(cx + 4, cy - 19);
        petCtx.lineTo(cx + 12, cy - 22);
        petCtx.stroke();
    }
}

// Ultimate - Infernyx (Deep Red, Exponential Wumbo)
function drawInfernyx(mood, breathOffset, flameFlicker) {
    const cx = 110;
    const cy = 104 + breathOffset;

    // Large shadow
    petCtx.fillStyle = 'rgba(0,0,0,0.35)';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 78, 52, 13, 0, 0, Math.PI * 2);
    petCtx.fill();

    // Very long serpentine body (many segments)
    petCtx.fillStyle = '#991b1b';
    petCtx.fillRect(cx - 16, cy + 12, 32, 14);
    petCtx.fillRect(cx - 14, cy + 24, 28, 12);
    petCtx.fillRect(cx - 12, cy + 34, 24, 12);
    petCtx.fillRect(cx - 10, cy + 44, 20, 12);
    petCtx.fillRect(cx - 8, cy + 54, 16, 12);
    petCtx.fillRect(cx - 6, cy + 64, 12, 10);

    // Head - strong, angular dragon head
    petCtx.fillStyle = '#991b1b';
    petCtx.beginPath();
    petCtx.moveTo(cx - 20, cy - 4);
    petCtx.lineTo(cx + 20, cy - 4);
    petCtx.lineTo(cx + 16, cy - 30);
    petCtx.lineTo(cx - 16, cy - 30);
    petCtx.fill();

    petCtx.fillStyle = '#7f1d1d';
    petCtx.fillRect(cx - 9, cy - 26, 18, 14);

    // Eyes
    petCtx.fillStyle = '#fefce8';
    petCtx.fillRect(cx - 12, cy - 16, 5, 5);
    petCtx.fillRect(cx + 7, cy - 16, 5, 5);

    petCtx.fillStyle = '#111111';
    petCtx.fillRect(cx - 10, cy - 13, 2, 2);
    petCtx.fillRect(cx + 9, cy - 13, 2, 2);

    // Large prominent horns
    petCtx.fillStyle = '#450a0a';
    petCtx.fillRect(cx - 14, cy - 36, 6, 14);
    petCtx.fillRect(cx + 8, cy - 36, 6, 14);

    // Large dramatic wings
    petCtx.fillStyle = '#7f1d1d';
    petCtx.fillRect(cx - 36, cy - 8, 18, 16);
    petCtx.fillRect(cx + 18, cy - 8, 18, 16);

    // Claws
    petCtx.fillStyle = '#450a0a';
    petCtx.fillRect(cx - 18, cy + 60, 6, 8);
    petCtx.fillRect(cx + 12, cy + 60, 6, 8);

    // Long powerful tail
    petCtx.fillStyle = '#991b1b';
    petCtx.fillRect(cx + 2, cy + 72, 14, 22);

    // Flame detail on tail tip
    petCtx.fillStyle = '#f59e0b';
    petCtx.fillRect(cx + 6, cy + 90, 6, 8);

    // Expression
    petCtx.strokeStyle = '#111111';
    petCtx.lineWidth = 2.5;
    if (mood === 'happy') {
        petCtx.beginPath();
        petCtx.arc(cx - 9, cy - 28, 3.5, Math.PI, 0);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.arc(cx + 9, cy - 28, 3.5, Math.PI, 0);
        petCtx.stroke();
    } else {
        petCtx.beginPath();
        petCtx.moveTo(cx - 14, cy - 26);
        petCtx.lineTo(cx - 4, cy - 23);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.moveTo(cx + 4, cy - 23);
        petCtx.lineTo(cx + 14, cy - 26);
        petCtx.stroke();
    }
}

// ============================================
// WHISK LINE (Floating Cat on Nimbus)
// ============================================

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
// SPRIG LINE (Plant/Nature)
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

    petCtx.fillStyle = '#166534';
    petCtx.fillRect(cx - 24, cy + 8, 11, 7);
    petCtx.fillRect(cx + 13, cy + 8, 11, 7);

    petCtx.fillStyle = '#4ade80';
    petCtx.fillRect(cx - 22, cy + 10, 7, 4);
    petCtx.fillRect(cx + 15, cy + 10, 7, 4);

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

    petCtx.fillStyle = '#166534';
    petCtx.fillRect(cx - 28, cy + 10, 13, 20);
    petCtx.fillRect(cx + 15, cy + 10, 13, 20);

    petCtx.fillStyle = '#4ade80';
    petCtx.fillRect(cx - 26, cy + 12, 9, 6);
    petCtx.fillRect(cx + 17, cy + 12, 9, 6);

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
// BOLT LINE (Lightning Bird)
// ============================================

function drawZap(mood, breathOffset, flameFlicker) {
    const cx = 110;
    const cy = 132 + breathOffset;

    petCtx.fillStyle = 'rgba(0,0,0,0.2)';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 56, 34, 9, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#eab308';
    petCtx.beginPath();
    petCtx.rect(cx - 14, cy + 28, 28, 24);
    petCtx.fill();

    petCtx.fillStyle = '#eab308';
    petCtx.beginPath();
    petCtx.rect(cx - 16, cy - 4, 32, 28);
    petCtx.fill();

    petCtx.fillStyle = '#854d0e';
    petCtx.beginPath();
    petCtx.moveTo(cx + 16, cy + 6);
    petCtx.lineTo(cx + 26, cy + 10);
    petCtx.lineTo(cx + 16, cy + 14);
    petCtx.fill();

    petCtx.fillStyle = '#ffffff';
    petCtx.fillRect(cx - 10, cy + 2, 8, 8);
    petCtx.fillRect(cx + 2, cy + 2, 8, 8);

    petCtx.fillStyle = '#111111';
    petCtx.fillRect(cx - 7, cy + 4, 4, 4);
    petCtx.fillRect(cx + 5, cy + 4, 4, 4);

    petCtx.fillStyle = '#ca8a04';
    petCtx.beginPath();
    petCtx.rect(cx - 20, cy + 20, 8, 14);
    petCtx.fill();
    petCtx.beginPath();
    petCtx.rect(cx + 12, cy + 20, 8, 14);
    petCtx.fill();

    petCtx.fillStyle = '#854d0e';
    petCtx.beginPath();
    petCtx.rect(cx - 8, cy - 8, 3, 6);
    petCtx.fill();
    petCtx.beginPath();
    petCtx.rect(cx + 5, cy - 8, 3, 6);
    petCtx.fill();

    drawLightningBolt(cx + 14, cy + 52, 16, 4, 0.3, '#eab308');
}

function drawSpark(mood, breathOffset, flameFlicker) {
    const cx = 110;
    const cy = 120 + breathOffset;

    petCtx.fillStyle = 'rgba(0,0,0,0.25)';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 66, 38, 10, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#eab308';
    petCtx.beginPath();
    petCtx.rect(cx - 16, cy + 22, 32, 32);
    petCtx.fill();

    petCtx.fillStyle = '#eab308';
    petCtx.beginPath();
    petCtx.rect(cx - 14, cy - 6, 28, 26);
    petCtx.fill();

    petCtx.fillStyle = '#854d0e';
    petCtx.beginPath();
    petCtx.moveTo(cx + 14, cy + 4);
    petCtx.lineTo(cx + 24, cy + 8);
    petCtx.lineTo(cx + 14, cy + 12);
    petCtx.fill();

    petCtx.fillStyle = '#ffffff';
    petCtx.fillRect(cx - 9, cy + 0, 7, 7);
    petCtx.fillRect(cx + 2, cy + 0, 7, 7);

    petCtx.fillStyle = '#111111';
    petCtx.fillRect(cx - 6, cy + 2, 3, 3);
    petCtx.fillRect(cx + 5, cy + 2, 3, 3);

    petCtx.fillStyle = '#ca8a04';
    petCtx.beginPath();
    petCtx.rect(cx - 24, cy + 18, 10, 18);
    petCtx.fill();
    petCtx.beginPath();
    petCtx.rect(cx + 14, cy + 18, 10, 18);
    petCtx.fill();

    petCtx.fillStyle = '#854d0e';
    petCtx.beginPath();
    petCtx.rect(cx - 8, cy - 10, 3, 6);
    petCtx.fill();
    petCtx.beginPath();
    petCtx.rect(cx + 5, cy - 10, 3, 6);
    petCtx.fill();

    drawLightningBolt(cx + 16, cy + 54, 20, 5, 0.25, '#eab308');
}

function drawBolt(mood, breathOffset, flameFlicker) {
    const cx = 110;
    const cy = 112 + breathOffset;

    petCtx.fillStyle = 'rgba(0,0,0,0.3)';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 72, 42, 11, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#eab308';
    petCtx.beginPath();
    petCtx.rect(cx - 18, cy + 16, 36, 38);
    petCtx.fill();

    petCtx.fillStyle = '#eab308';
    petCtx.beginPath();
    petCtx.rect(cx - 13, cy - 8, 26, 24);
    petCtx.fill();

    petCtx.fillStyle = '#854d0e';
    petCtx.beginPath();
    petCtx.moveTo(cx + 13, cy + 2);
    petCtx.lineTo(cx + 26, cy + 6);
    petCtx.lineTo(cx + 13, cy + 10);
    petCtx.fill();

    petCtx.fillStyle = '#ffffff';
    petCtx.fillRect(cx - 8, cy - 2, 7, 7);
    petCtx.fillRect(cx + 1, cy - 2, 7, 7);

    petCtx.fillStyle = '#111111';
    petCtx.fillRect(cx - 5, cy + 0, 3, 3);
    petCtx.fillRect(cx + 4, cy + 0, 3, 3);

    petCtx.fillStyle = '#ca8a04';
    petCtx.beginPath();
    petCtx.rect(cx - 28, cy + 14, 12, 22);
    petCtx.fill();
    petCtx.beginPath();
    petCtx.rect(cx + 16, cy + 14, 12, 22);
    petCtx.fill();

    petCtx.fillStyle = '#854d0e';
    petCtx.beginPath();
    petCtx.rect(cx - 26, cy + 16, 4, 10);
    petCtx.fill();
    petCtx.beginPath();
    petCtx.rect(cx + 22, cy + 16, 4, 10);
    petCtx.fill();

    petCtx.fillStyle = '#854d0e';
    petCtx.beginPath();
    petCtx.rect(cx - 9, cy - 12, 4, 8);
    petCtx.fill();
    petCtx.beginPath();
    petCtx.rect(cx + 5, cy - 12, 4, 8);
    petCtx.fill();

    drawLightningBolt(cx + 18, cy + 54, 26, 6, 0.2, '#eab308');
}

function drawStorm(mood, breathOffset, flameFlicker) {
    const cx = 110;
    const cy = 100 + breathOffset;

    petCtx.fillStyle = 'rgba(0,0,0,0.35)';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 82, 48, 12, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#eab308';
    petCtx.beginPath();
    petCtx.moveTo(cx, cy - 8);
    petCtx.lineTo(cx - 22, cy + 52);
    petCtx.lineTo(cx + 22, cy + 52);
    petCtx.fill();

    petCtx.fillStyle = '#eab308';
    petCtx.beginPath();
    petCtx.rect(cx - 14, cy - 14, 28, 22);
    petCtx.fill();

    petCtx.fillStyle = '#854d0e';
    petCtx.beginPath();
    petCtx.moveTo(cx + 14, cy - 4);
    petCtx.lineTo(cx + 26, cy);
    petCtx.lineTo(cx + 14, cy + 4);
    petCtx.fill();

    petCtx.fillStyle = '#ffffff';
    petCtx.fillRect(cx - 8, cy - 10, 6, 6);
    petCtx.fillRect(cx + 2, cy - 10, 6, 6);

    petCtx.fillStyle = '#111111';
    petCtx.fillRect(cx - 5, cy - 8, 3, 3);
    petCtx.fillRect(cx + 5, cy - 8, 3, 3);

    petCtx.fillStyle = '#ca8a04';

    petCtx.beginPath();
    petCtx.moveTo(cx - 20, cy + 6);
    petCtx.lineTo(cx - 48, cy - 10);
    petCtx.lineTo(cx - 14, cy + 24);
    petCtx.fill();

    petCtx.beginPath();
    petCtx.moveTo(cx + 20, cy + 6);
    petCtx.lineTo(cx + 48, cy - 10);
    petCtx.lineTo(cx + 14, cy + 24);
    petCtx.fill();

    petCtx.fillStyle = '#854d0e';

    petCtx.beginPath();
    petCtx.moveTo(cx - 42, cy - 8);
    petCtx.lineTo(cx - 56, cy - 28);
    petCtx.lineTo(cx - 30, cy + 4);
    petCtx.fill();

    petCtx.beginPath();
    petCtx.moveTo(cx + 42, cy - 8);
    petCtx.lineTo(cx + 56, cy - 28);
    petCtx.lineTo(cx + 30, cy + 4);
    petCtx.fill();

    petCtx.beginPath();
    petCtx.moveTo(cx - 36, cy - 2);
    petCtx.lineTo(cx - 50, cy - 20);
    petCtx.lineTo(cx - 24, cy + 10);
    petCtx.fill();

    petCtx.beginPath();
    petCtx.moveTo(cx + 36, cy - 2);
    petCtx.lineTo(cx + 50, cy - 20);
    petCtx.lineTo(cx + 24, cy + 10);
    petCtx.fill();

    petCtx.beginPath();
    petCtx.moveTo(cx - 30, cy + 4);
    petCtx.lineTo(cx - 44, cy - 14);
    petCtx.lineTo(cx - 18, cy + 16);
    petCtx.fill();

    petCtx.beginPath();
    petCtx.moveTo(cx + 30, cy + 4);
    petCtx.lineTo(cx + 44, cy - 14);
    petCtx.lineTo(cx + 18, cy + 16);
    petCtx.fill();

    petCtx.beginPath();
    petCtx.moveTo(cx - 24, cy + 10);
    petCtx.lineTo(cx - 36, cy - 6);
    petCtx.lineTo(cx - 14, cy + 20);
    petCtx.fill();

    petCtx.beginPath();
    petCtx.moveTo(cx + 24, cy + 10);
    petCtx.lineTo(cx + 36, cy - 6);
    petCtx.lineTo(cx + 14, cy + 20);
    petCtx.fill();

    petCtx.fillStyle = '#854d0e';
    petCtx.beginPath();
    petCtx.rect(cx - 8, cy - 16, 4, 10);
    petCtx.fill();
    petCtx.beginPath();
    petCtx.rect(cx + 4, cy - 16, 4, 10);
    petCtx.fill();

    drawLightningBolt(cx + 20, cy + 54, 32, 7, 0.15, '#eab308');

    petCtx.fillStyle = '#fef08c';
    petCtx.beginPath();
    petCtx.rect(cx - 28, cy + 14, 4, 8);
    petCtx.fill();
    petCtx.beginPath();
    petCtx.rect(cx + 24, cy + 14, 4, 8);
    petCtx.fill();
}

// ============================================
// CEPH LINE (Blue Water Octopus)
// ============================================

function drawCephling(mood, breathOffset, flameFlicker) {
    const cx = 110;
    const cy = 128 + breathOffset;

    petCtx.fillStyle = 'rgba(0,0,0,0.2)';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 52, 38, 10, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#0e7490';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 30, 22, 20, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#0e7490';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy - 2, 42, 38, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#155e75';
    petCtx.beginPath();
    petCtx.ellipse(cx - 8, cy - 8, 22, 20, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#e0f2fe';
    petCtx.fillRect(cx - 20, cy - 14, 14, 14);
    petCtx.fillRect(cx + 6, cy - 14, 14, 14);

    petCtx.fillStyle = '#0f172a';
    petCtx.fillRect(cx - 16, cy - 10, 6, 6);
    petCtx.fillRect(cx + 10, cy - 10, 6, 6);

    petCtx.fillStyle = '#164e63';
    petCtx.fillRect(cx - 18, cy + 42, 6, 14);
    petCtx.fillRect(cx - 6, cy + 46, 5, 12);
    petCtx.fillRect(cx + 4, cy + 46, 5, 12);
    petCtx.fillRect(cx + 14, cy + 42, 6, 14);

    petCtx.fillStyle = '#164e63';
    petCtx.fillRect(cx - 38, cy + 2, 10, 8);
    petCtx.fillRect(cx + 28, cy + 2, 10, 8);

    petCtx.strokeStyle = '#0f172a';
    petCtx.lineWidth = 2;
    if (mood === 'happy') {
        petCtx.beginPath();
        petCtx.arc(cx - 13, cy - 22, 4, Math.PI, 0);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.arc(cx + 13, cy - 22, 4, Math.PI, 0);
        petCtx.stroke();
    } else {
        petCtx.beginPath();
        petCtx.moveTo(cx - 18, cy - 20);
        petCtx.lineTo(cx - 8, cy - 17);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.moveTo(cx + 8, cy - 17);
        petCtx.lineTo(cx + 18, cy - 20);
        petCtx.stroke();
    }
}

function drawCephy(mood, breathOffset, flameFlicker) {
    const cx = 110;
    const cy = 122 + breathOffset;

    petCtx.fillStyle = 'rgba(0,0,0,0.25)';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 58, 42, 11, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#0e7490';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 28, 26, 24, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#0e7490';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy - 4, 38, 34, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#155e75';
    petCtx.beginPath();
    petCtx.ellipse(cx - 6, cy - 10, 20, 18, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#e0f2fe';
    petCtx.fillRect(cx - 17, cy - 14, 12, 12);
    petCtx.fillRect(cx + 5, cy - 14, 12, 12);

    petCtx.fillStyle = '#0f172a';
    petCtx.fillRect(cx - 13, cy - 10, 5, 5);
    petCtx.fillRect(cx + 9, cy - 10, 5, 5);

    petCtx.fillStyle = '#164e63';
    petCtx.fillRect(cx - 22, cy + 40, 7, 22);
    petCtx.fillRect(cx - 12, cy + 46, 6, 18);
    petCtx.fillRect(cx + 8, cy + 46, 6, 18);
    petCtx.fillRect(cx + 16, cy + 40, 7, 22);

    petCtx.fillStyle = '#164e63';
    petCtx.fillRect(cx - 36, cy - 2, 12, 10);
    petCtx.fillRect(cx + 24, cy - 2, 12, 10);

    petCtx.strokeStyle = '#0f172a';
    petCtx.lineWidth = 2;
    if (mood === 'happy') {
        petCtx.beginPath();
        petCtx.arc(cx - 10, cy - 22, 3.5, Math.PI, 0);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.arc(cx + 10, cy - 22, 3.5, Math.PI, 0);
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
}

function drawCephalon(mood, breathOffset, flameFlicker) {
    const cx = 110;
    const cy = 114 + breathOffset;

    petCtx.fillStyle = 'rgba(0,0,0,0.3)';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 66, 48, 12, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#0e7490';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 22, 30, 28, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#0e7490';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy - 6, 36, 32, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#155e75';
    petCtx.beginPath();
    petCtx.ellipse(cx - 5, cy - 12, 18, 16, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#e0f2fe';
    petCtx.fillRect(cx - 15, cy - 14, 11, 11);
    petCtx.fillRect(cx + 4, cy - 14, 11, 11);

    petCtx.fillStyle = '#0f172a';
    petCtx.fillRect(cx - 11, cy - 10, 5, 5);
    petCtx.fillRect(cx + 8, cy - 10, 5, 5);

    petCtx.fillStyle = '#164e63';
    petCtx.fillRect(cx - 26, cy + 38, 8, 32);
    petCtx.fillRect(cx - 14, cy + 44, 7, 28);
    petCtx.fillRect(cx + 8, cy + 44, 7, 28);
    petCtx.fillRect(cx + 20, cy + 38, 8, 32);

    petCtx.fillStyle = '#0e7490';
    for (let i = 0; i < 3; i++) {
        petCtx.fillRect(cx - 24, cy + 42 + i * 8, 4, 3);
        petCtx.fillRect(cx - 12, cy + 48 + i * 7, 3, 3);
        petCtx.fillRect(cx + 10, cy + 48 + i * 7, 3, 3);
        petCtx.fillRect(cx + 22, cy + 42 + i * 8, 4, 3);
    }

    petCtx.fillStyle = '#164e63';
    petCtx.fillRect(cx - 40, cy - 8, 14, 12);
    petCtx.fillRect(cx + 26, cy - 8, 14, 12);

    petCtx.strokeStyle = '#0f172a';
    petCtx.lineWidth = 2;
    if (mood === 'happy') {
        petCtx.beginPath();
        petCtx.arc(cx - 9, cy - 22, 3, Math.PI, 0);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.arc(cx + 9, cy - 22, 3, Math.PI, 0);
        petCtx.stroke();
    } else {
        petCtx.beginPath();
        petCtx.moveTo(cx - 14, cy - 20);
        petCtx.lineTo(cx - 4, cy - 17);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.moveTo(cx + 4, cy - 17);
        petCtx.lineTo(cx + 14, cy - 20);
        petCtx.stroke();
    }
}

function drawAbyssalCeph(mood, breathOffset, flameFlicker) {
    const cx = 110;
    const cy = 102 + breathOffset;

    petCtx.fillStyle = 'rgba(0,0,0,0.35)';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 78, 58, 14, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#0e7490';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 14, 34, 32, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#0e7490';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy - 10, 34, 30, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#155e75';
    petCtx.beginPath();
    petCtx.ellipse(cx - 4, cy - 16, 17, 15, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#e0f2fe';
    petCtx.fillRect(cx - 14, cy - 16, 11, 11);
    petCtx.fillRect(cx + 3, cy - 16, 11, 11);

    petCtx.fillStyle = '#0f172a';
    petCtx.fillRect(cx - 10, cy - 12, 5, 5);
    petCtx.fillRect(cx + 7, cy - 12, 5, 5);

    petCtx.fillStyle = '#164e63';
    petCtx.fillRect(cx - 30, cy + 32, 9, 48);
    petCtx.fillRect(cx - 18, cy + 38, 8, 44);
    petCtx.fillRect(cx - 6, cy + 44, 7, 40);
    petCtx.fillRect(cx + 22, cy + 32, 9, 48);
    petCtx.fillRect(cx + 10, cy + 38, 8, 44);
    petCtx.fillRect(cx - 2, cy + 44, 7, 40);
    petCtx.fillRect(cx - 22, cy + 50, 8, 38);
    petCtx.fillRect(cx + 14, cy + 50, 8, 38);

    petCtx.fillStyle = '#0e7490';
    for (let i = 0; i < 5; i++) {
        petCtx.fillRect(cx - 28, cy + 36 + i * 9, 5, 4);
        petCtx.fillRect(cx - 16, cy + 42 + i * 8, 4, 3);
        petCtx.fillRect(cx + 24, cy + 36 + i * 9, 5, 4);
        petCtx.fillRect(cx + 12, cy + 42 + i * 8, 4, 3);
    }

    petCtx.fillStyle = '#164e63';
    petCtx.fillRect(cx - 48, cy - 18, 18, 16);
    petCtx.fillRect(cx + 30, cy - 18, 18, 16);
    petCtx.fillRect(cx - 36, cy - 28, 12, 10);
    petCtx.fillRect(cx + 24, cy - 28, 12, 10);

    petCtx.fillStyle = '#67e8f9';
    petCtx.fillRect(cx - 46, cy - 14, 6, 4);
    petCtx.fillRect(cx + 40, cy - 14, 6, 4);
    petCtx.fillRect(cx - 20, cy + 58, 4, 6);
    petCtx.fillRect(cx + 16, cy + 58, 4, 6);

    petCtx.strokeStyle = '#0f172a';
    petCtx.lineWidth = 2.5;
    if (mood === 'happy') {
        petCtx.beginPath();
        petCtx.arc(cx - 8, cy - 24, 3.5, Math.PI, 0);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.arc(cx + 8, cy - 24, 3.5, Math.PI, 0);
        petCtx.stroke();
    } else {
        petCtx.beginPath();
        petCtx.moveTo(cx - 13, cy - 22);
        petCtx.lineTo(cx - 3, cy - 19);
        petCtx.stroke();
        petCtx.beginPath();
        petCtx.moveTo(cx + 3, cy - 19);
        petCtx.lineTo(cx + 13, cy - 22);
        petCtx.stroke();
    }
}

// Helper for tail segments
function drawTailSegment(x, y, length, thickness, angle, color) {
    petCtx.save();
    petCtx.translate(x, y);
    petCtx.rotate(angle);
    petCtx.fillStyle = color;
    petCtx.fillRect(-thickness / 2, 0, thickness, length);
    petCtx.restore();
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
    } else if (hatchedType === 'bolt') {
        if (currentStage === 0) drawZap(mood, breathOffset, flameFlicker);
        else if (currentStage === 1) drawSpark(mood, breathOffset, flameFlicker);
        else if (currentStage === 2) drawBolt(mood, breathOffset, flameFlicker);
        else if (currentStage === 3) drawStorm(mood, breathOffset, flameFlicker);
    } else if (hatchedType === 'ceph') {
        if (currentStage === 0) drawCephling(mood, breathOffset, flameFlicker);
        else if (currentStage === 1) drawCephy(mood, breathOffset, flameFlicker);
        else if (currentStage === 2) drawCephalon(mood, breathOffset, flameFlicker);
        else if (currentStage === 3) drawAbyssalCeph(mood, breathOffset, flameFlicker);
    } else {
        if (currentStage === 0) drawFlick(mood, breathOffset, flameFlicker);
        else if (currentStage === 1) drawCharling(mood, breathOffset, flameFlicker);
        else if (currentStage === 2) drawDrakEmber(mood, breathOffset, flameFlicker);
        else if (currentStage === 3) drawInfernyx(mood, breathOffset, flameFlicker);
    }
}

function setStage(stage) {
    currentStage = stage;
    const avg = getAverageCare();
    let mood = (avg >= 50) ? 'happy' : 'sad';
    drawPet(mood, 0, 0);
}

function animate() {
    animFrame += 0.12;
    const breath = Math.sin(animFrame * 1.0) * 2.0;
    const flameFlicker = Math.sin(animFrame * 3.8) * 2.8 + (Math.random() - 0.5) * 1.0;

    const avg = getAverageCare();
    let mood = (avg >= 50) ? 'happy' : 'sad';

    drawPet(mood, breath, flameFlicker);

    if (currentStage < 3 && canEvolve()) {
        const age = Math.floor(pet.age);
        if (age > lastEvolutionAge) {
            evolvePet();
        }
    }

    requestAnimationFrame(animate);
}

function updatePetVisual() {
    const avg = getAverageCare();
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
    localStorage.setItem('currentStage', currentStage);
}

function loadPet() {
    const saved = localStorage.getItem('virtualPet');
    if (saved) pet = { ...pet, ...JSON.parse(saved) };

    const hatched = localStorage.getItem('hasHatched');
    if (hatched === 'true') hasHatched = true;

    const savedStage = localStorage.getItem('currentStage');
    if (savedStage) currentStage = parseInt(savedStage);
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
    pet.hunger = Math.max(0, pet.hunger - 1.2);
    pet.happiness = Math.max(0, pet.happiness - 0.9);
    pet.cleanliness = Math.max(0, pet.cleanliness - 0.65);
    pet.energy = Math.max(0, pet.energy - 0.85);

    if (Math.random() < 0.04) pet.happiness = Math.max(0, pet.happiness - 2);

    if (Math.random() < 0.18) pet.age += 0.12;

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
    localStorage.removeItem('currentStage');
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