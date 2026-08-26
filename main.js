// ============================================
// VIRTUAL PET v4.60 - thin orchestrator
// Save/load: storage.js | stages: evolution.js | hatch: egg.js
// draw* bodies live in sprites-*.js (byte-identical to v4.51).
// pets.js loads last so the sprite redesign PR can override art.
// ============================================

let pet = { ...DEFAULT_PET };
let decayInterval = null;
let animFrame = 0;
let currentStage = 0;
let hasHatched = false;
let eggAnimating = false;
let lastEvolutionAge = 0;
let lastTick = Date.now();
let visibilityBound = false;
let statusFlashUntil = 0;

let eggCanvas, eggCtx, petCanvas, petCtx;

function initCanvases() {
    eggCanvas = document.getElementById('eggCanvas');
    eggCtx = eggCanvas.getContext('2d', { alpha: true });

    petCanvas = document.getElementById('petCanvas');
    petCtx = petCanvas.getContext('2d', { alpha: true });
}

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

// Missing helper already called by the bolt-line sprites (not a sprite rewrite)
function drawLightningBolt(x, y, length, thickness, angle, color) {
    petCtx.save();
    petCtx.translate(x, y);
    petCtx.rotate(angle);
    petCtx.strokeStyle = color;
    petCtx.lineWidth = Math.max(1.5, thickness);
    petCtx.lineCap = 'round';
    petCtx.lineJoin = 'round';
    petCtx.beginPath();
    petCtx.moveTo(0, 0);
    petCtx.lineTo(length * 0.28, length * 0.22);
    petCtx.lineTo(length * 0.12, length * 0.22);
    petCtx.lineTo(length * 0.55, length * 0.7);
    petCtx.lineTo(length * 0.32, length * 0.7);
    petCtx.lineTo(length * 0.85, length);
    petCtx.stroke();
    petCtx.restore();
}

const CARE = {
    feed:  { hunger: 24, happiness: 4, cleanliness: -5, energy: 0 },
    play:  { hunger: -10, happiness: 22, cleanliness: -7, energy: -18 },
    clean: { hunger: 0, happiness: 6, cleanliness: 28, energy: -8 },
    rest:  { hunger: -8, happiness: -5, cleanliness: 0, energy: 30 }
};

const DECAY_PER_MIN = {
    hunger: 1.5,
    happiness: 1.1,
    cleanliness: 0.9,
    energy: 0.7
};

const TICK_MS = 5000;
const MAX_OFFLINE_STAT_MINUTES = 12 * 60;

function applyCare(deltas) {
    pet.hunger = clampStat(pet.hunger + (deltas.hunger || 0));
    pet.happiness = clampStat(pet.happiness + (deltas.happiness || 0));
    pet.cleanliness = clampStat(pet.cleanliness + (deltas.cleanliness || 0));
    pet.energy = clampStat(pet.energy + (deltas.energy || 0));
}

function afterAction() {
    updateUI();
    saveGame();
}

function feedPet() {
    if (pet.hunger >= 95) { flashStatus('Already full', '#94a3b8'); return; }
    applyCare(CARE.feed);
    afterAction();
}

function playWithPet() {
    if (pet.energy < 18) { flashStatus('Too tired', '#f59e0b'); return; }
    applyCare(CARE.play);
    afterAction();
}

function cleanPet() {
    if (pet.cleanliness >= 95) { flashStatus('Already clean', '#94a3b8'); return; }
    applyCare(CARE.clean);
    afterAction();
}

function restPet() {
    if (pet.energy >= 95) { flashStatus('Already rested', '#94a3b8'); return; }
    applyCare(CARE.rest);
    afterAction();
}

function applyDecay(statMinutes, ageMinutes) {
    if (statMinutes < 0) statMinutes = 0;
    const ageMins = (ageMinutes == null) ? statMinutes : Math.max(0, ageMinutes);
    if (statMinutes <= 0 && ageMins <= 0) return;

    const rate = currentStage >= 3 ? 0.75 : 1;
    pet.hunger = clampStat(pet.hunger - DECAY_PER_MIN.hunger * statMinutes * rate);
    pet.happiness = clampStat(pet.happiness - DECAY_PER_MIN.happiness * statMinutes * rate);
    pet.cleanliness = clampStat(pet.cleanliness - DECAY_PER_MIN.cleanliness * statMinutes * rate);
    pet.energy = clampStat(pet.energy - DECAY_PER_MIN.energy * statMinutes * rate);
    pet.age += ageMins;
}

function applyOfflineCatchup() {
    const now = Date.now();
    const elapsed = Math.max(0, (now - (lastTick || now)) / 60000);
    applyDecay(Math.min(elapsed, MAX_OFFLINE_STAT_MINUTES), elapsed);
    lastTick = now;
}

function maybeEvolve() {
    if (canEvolve()) evolvePet();
}

function gameTick() {
    const now = Date.now();
    const minutes = Math.max(0, (now - lastTick) / 60000);
    applyDecay(minutes);
    lastTick = now;
    maybeEvolve();
    updateUI();
    saveGame();
}

function startDecay() {
    if (decayInterval) clearInterval(decayInterval);
    lastTick = Date.now();
    decayInterval = setInterval(gameTick, TICK_MS);
    if (!visibilityBound) {
        visibilityBound = true;
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && hasHatched) {
                applyOfflineCatchup();
                maybeEvolve();
                updateUI();
                saveGame();
            }
        });
    }
}

function flashStatus(text, color) {
    const moodEl = document.getElementById('petMood');
    if (!moodEl) return;
    moodEl.textContent = text;
    if (color) moodEl.style.color = color;
    statusFlashUntil = Date.now() + 1600;
}

function updatePetVisual() {
    const moodEl = document.getElementById('petMood');
    if (moodEl && Date.now() >= statusFlashUntil) {
        const mood = getPetMood();
        moodEl.textContent = mood.label;
        moodEl.style.color = mood.color;
    }

    const stageEl = document.getElementById('stageName');
    if (stageEl) {
        stageEl.textContent = currentStage >= 3 ? getStageName() + ' · Adult' : getStageName();
    }

    const petScreen = document.querySelector('.pet-screen');
    if (petScreen) {
        petScreen.classList.toggle('is-adult', currentStage >= 3);
    }
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

function animate() {
    animFrame += 0.12;
    const breath = Math.sin(animFrame * 1.0) * 2.0;
    const flameFlicker = Math.sin(animFrame * 3.8) * 2.8 + (Math.random() - 0.5) * 1.0;
    drawPet(getPetMood().draw, breath, flameFlicker);
    requestAnimationFrame(animate);
}

function init() {
    initCanvases();
    loadGame();

    if (!hasHatched) {
        document.getElementById('egg-screen').style.display = 'block';
        document.getElementById('pet-screen').style.display = 'none';
        initEgg();
    } else {
        document.getElementById('egg-screen').style.display = 'none';
        document.getElementById('pet-screen').style.display = 'block';
        applyOfflineCatchup();
        maybeEvolve();
        updateUI();
        saveGame();
        startDecay();
        drawPet(getPetMood().draw, 0, 0);
        requestAnimationFrame(animate);
    }
}

window.onload = init;
