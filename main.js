// ============================================
// VIRTUAL PET v4.29 - Ceph (Blue Water Octopus) Added
// Exponential wumbo on tentacles + fins
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
// CEPH LINE (Blue Water Octopus) - Exponential Wumbo
// ============================================

// Helper: Draw a single tentacle segment
function drawTentacleSegment(ctx, x, y, length, angle, thickness, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = color;
    ctx.fillRect(-thickness / 2, 0, thickness, length);
    ctx.restore();
}

// Baby - Cephling (Maximum cuteness)
function drawCephling(mood, breathOffset, flameFlicker) {
    const cx = 110;
    const cy = 128 + breathOffset;

    // Shadow
    petCtx.fillStyle = 'rgba(0,0,0,0.2)';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 52, 38, 10, 0, 0, Math.PI * 2);
    petCtx.fill();

    // Body (small and round)
    petCtx.fillStyle = '#0e7490';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 30, 22, 20, 0, 0, Math.PI * 2);
    petCtx.fill();

    // Head (very large for baby cuteness)
    petCtx.fillStyle = '#0e7490';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy - 2, 42, 38, 0, 0, Math.PI * 2);
    petCtx.fill();

    // Lighter head highlight
    petCtx.fillStyle = '#155e75';
    petCtx.beginPath();
    petCtx.ellipse(cx - 8, cy - 8, 22, 20, 0, 0, Math.PI * 2);
    petCtx.fill();

    // Eyes - huge and cute
    petCtx.fillStyle = '#e0f2fe';
    petCtx.fillRect(cx - 20, cy - 14, 14, 14);
    petCtx.fillRect(cx + 6, cy - 14, 14, 14);

    petCtx.fillStyle = '#0f172a';
    petCtx.fillRect(cx - 16, cy - 10, 6, 6);
    petCtx.fillRect(cx + 10, cy - 10, 6, 6);

    // Tiny stubby tentacles (4 visible)
    petCtx.fillStyle = '#164e63';
    petCtx.fillRect(cx - 18, cy + 42, 6, 14);
    petCtx.fillRect(cx - 6, cy + 46, 5, 12);
    petCtx.fillRect(cx + 4, cy + 46, 5, 12);
    petCtx.fillRect(cx + 14, cy + 42, 6, 14);

    // Tiny side fins
    petCtx.fillStyle = '#164e63';
    petCtx.fillRect(cx - 38, cy + 2, 10, 8);
    petCtx.fillRect(cx + 28, cy + 2, 10, 8);

    // Expression
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

// Child - Cephy
function drawCephy(mood, breathOffset, flameFlicker) {
    const cx = 110;
    const cy = 122 + breathOffset;

    // Shadow
    petCtx.fillStyle = 'rgba(0,0,0,0.25)';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 58, 42, 11, 0, 0, Math.PI * 2);
    petCtx.fill();

    // Body
    petCtx.fillStyle = '#0e7490';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 28, 26, 24, 0, 0, Math.PI * 2);
    petCtx.fill();

    // Head
    petCtx.fillStyle = '#0e7490';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy - 4, 38, 34, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#155e75';
    petCtx.beginPath();
    petCtx.ellipse(cx - 6, cy - 10, 20, 18, 0, 0, Math.PI * 2);
    petCtx.fill();

    // Eyes
    petCtx.fillStyle = '#e0f2fe';
    petCtx.fillRect(cx - 17, cy - 14, 12, 12);
    petCtx.fillRect(cx + 5, cy - 14, 12, 12);

    petCtx.fillStyle = '#0f172a';
    petCtx.fillRect(cx - 13, cy - 10, 5, 5);
    petCtx.fillRect(cx + 9, cy - 10, 5, 5);

    // Developing tentacles (longer than baby)
    petCtx.fillStyle = '#164e63';
    // Left side
    petCtx.fillRect(cx - 22, cy + 40, 7, 22);
    petCtx.fillRect(cx - 12, cy + 46, 6, 18);
    // Right side
    petCtx.fillRect(cx + 8, cy + 46, 6, 18);
    petCtx.fillRect(cx + 16, cy + 40, 7, 22);

    // Small fins
    petCtx.fillStyle = '#164e63';
    petCtx.fillRect(cx - 36, cy - 2, 12, 10);
    petCtx.fillRect(cx + 24, cy - 2, 12, 10);

    // Expression
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

// Adult - Cephalon
function drawCephalon(mood, breathOffset, flameFlicker) {
    const cx = 110;
    const cy = 114 + breathOffset;

    // Shadow
    petCtx.fillStyle = 'rgba(0,0,0,0.3)';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 66, 48, 12, 0, 0, Math.PI * 2);
    petCtx.fill();

    // Mantle / Body
    petCtx.fillStyle = '#0e7490';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 22, 30, 28, 0, 0, Math.PI * 2);
    petCtx.fill();

    // Head
    petCtx.fillStyle = '#0e7490';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy - 6, 36, 32, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#155e75';
    petCtx.beginPath();
    petCtx.ellipse(cx - 5, cy - 12, 18, 16, 0, 0, Math.PI * 2);
    petCtx.fill();

    // Eyes
    petCtx.fillStyle = '#e0f2fe';
    petCtx.fillRect(cx - 15, cy - 14, 11, 11);
    petCtx.fillRect(cx + 4, cy - 14, 11, 11);

    petCtx.fillStyle = '#0f172a';
    petCtx.fillRect(cx - 11, cy - 10, 5, 5);
    petCtx.fillRect(cx + 8, cy - 10, 5, 5);

    // Full tentacles with suckers
    petCtx.fillStyle = '#164e63';
    // Left tentacles
    petCtx.fillRect(cx - 26, cy + 38, 8, 32);
    petCtx.fillRect(cx - 14, cy + 44, 7, 28);
    // Right tentacles
    petCtx.fillRect(cx + 8, cy + 44, 7, 28);
    petCtx.fillRect(cx + 20, cy + 38, 8, 32);

    // Suckers (small dots)
    petCtx.fillStyle = '#0e7490';
    for (let i = 0; i < 3; i++) {
        petCtx.fillRect(cx - 24, cy + 42 + i * 8, 4, 3);
        petCtx.fillRect(cx - 12, cy + 48 + i * 7, 3, 3);
        petCtx.fillRect(cx + 10, cy + 48 + i * 7, 3, 3);
        petCtx.fillRect(cx + 22, cy + 42 + i * 8, 4, 3);
    }

    // Side fins (larger)
    petCtx.fillStyle = '#164e63';
    petCtx.fillRect(cx - 40, cy - 8, 14, 12);
    petCtx.fillRect(cx + 26, cy - 8, 14, 12);

    // Expression
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

// Ultimate - Abyssal Ceph (Exponential Wumbo)
function drawAbyssalCeph(mood, breathOffset, flameFlicker) {
    const cx = 110;
    const cy = 102 + breathOffset;

    // Large shadow
    petCtx.fillStyle = 'rgba(0,0,0,0.35)';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 78, 58, 14, 0, 0, Math.PI * 2);
    petCtx.fill();

    // Mantle
    petCtx.fillStyle = '#0e7490';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy + 14, 34, 32, 0, 0, Math.PI * 2);
    petCtx.fill();

    // Head
    petCtx.fillStyle = '#0e7490';
    petCtx.beginPath();
    petCtx.ellipse(cx, cy - 10, 34, 30, 0, 0, Math.PI * 2);
    petCtx.fill();

    petCtx.fillStyle = '#155e75';
    petCtx.beginPath();
    petCtx.ellipse(cx - 4, cy - 16, 17, 15, 0, 0, Math.PI * 2);
    petCtx.fill();

    // Eyes
    petCtx.fillStyle = '#e0f2fe';
    petCtx.fillRect(cx - 14, cy - 16, 11, 11);
    petCtx.fillRect(cx + 3, cy - 16, 11, 11);

    petCtx.fillStyle = '#0f172a';
    petCtx.fillRect(cx - 10, cy - 12, 5, 5);
    petCtx.fillRect(cx + 7, cy - 12, 5, 5);

    // === EXPONENTIAL WUMBO TENTACLES ===
    petCtx.fillStyle = '#164e63';

    // Long flowing left tentacles
    petCtx.fillRect(cx - 30, cy + 32, 9, 48);   // outer
    petCtx.fillRect(cx - 18, cy + 38, 8, 44);   // mid
    petCtx.fillRect(cx - 6, cy + 44, 7, 40);    // inner

    // Long flowing right tentacles
    petCtx.fillRect(cx + 22, cy + 32, 9, 48);
    petCtx.fillRect(cx + 10, cy + 38, 8, 44);
    petCtx.fillRect(cx - 2, cy + 44, 7, 40);

    // Extra long lower tentacles (exponential drama)
    petCtx.fillRect(cx - 22, cy + 50, 8, 38);
    petCtx.fillRect(cx + 14, cy + 50, 8, 38);

    // Suckers on long tentacles
    petCtx.fillStyle = '#0e7490';
    for (let i = 0; i < 5; i++) {
        petCtx.fillRect(cx - 28, cy + 36 + i * 9, 5, 4);
        petCtx.fillRect(cx - 16, cy + 42 + i * 8, 4, 3);
        petCtx.fillRect(cx + 24, cy + 36 + i * 9, 5, 4);
        petCtx.fillRect(cx + 12, cy + 42 + i * 8, 4, 3);
    }

    // === DRAMATIC FINS (Wumbo) ===
    petCtx.fillStyle = '#164e63';
    // Large wing-like side fins
    petCtx.fillRect(cx - 48, cy - 18, 18, 16);
    petCtx.fillRect(cx + 30, cy - 18, 18, 16);

    // Upper fin accents
    petCtx.fillRect(cx - 36, cy - 28, 12, 10);
    petCtx.fillRect(cx + 24, cy - 28, 12, 10);

    // Bioluminescent glow accents on fins and tentacles
    petCtx.fillStyle = '#67e8f9';
    petCtx.fillRect(cx - 46, cy - 14, 6, 4);
    petCtx.fillRect(cx + 40, cy - 14, 6, 4);
    petCtx.fillRect(cx - 20, cy + 58, 4, 6);
    petCtx.fillRect(cx + 16, cy + 58, 4, 6);

    // Expression (slightly more intense on ultimate)
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