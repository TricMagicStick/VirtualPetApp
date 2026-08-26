// storage.js - save / load / reset (localStorage only)
const SAVE_KEY = 'virtualPetSave';
const LEGACY_PET_KEY = 'virtualPet';
const HATCH_TYPE_KEY = 'hatchedPetType';

const DEFAULT_PET = {
    name: 'Pixel',
    hunger: 80,
    happiness: 75,
    cleanliness: 85,
    energy: 90,
    age: 0
};

function clampStat(n) {
    const v = Number(n);
    if (!Number.isFinite(v)) return 0;
    return Math.max(0, Math.min(100, v));
}

function normalizePet(raw) {
    const next = { ...DEFAULT_PET, ...(raw || {}) };
    next.name = (typeof next.name === 'string' && next.name.trim()) ? next.name.trim() : DEFAULT_PET.name;
    next.hunger = clampStat(next.hunger);
    next.happiness = clampStat(next.happiness);
    next.cleanliness = clampStat(next.cleanliness);
    next.energy = clampStat(next.energy);
    const age = Number(next.age);
    next.age = Number.isFinite(age) && age > 0 ? age : 0;
    return next;
}

function getHatchedPetType() {
    return localStorage.getItem(HATCH_TYPE_KEY) || 'flick';
}

function setHatchedPetType(type) {
    const allowed = ['flick', 'puff', 'bud', 'bolt', 'ceph'];
    localStorage.setItem(HATCH_TYPE_KEY, allowed.includes(type) ? type : 'flick');
}

function captureGameState() {
    return {
        pet: { ...pet },
        hasHatched: !!hasHatched,
        currentStage: currentStage | 0,
        lastEvolutionAge: Number(lastEvolutionAge) || 0,
        lastTick: Number(lastTick) || Date.now(),
        hatchedPetType: getHatchedPetType()
    };
}

function applyGameState(state) {
    pet = normalizePet(state && state.pet);
    hasHatched = !!(state && state.hasHatched);
    currentStage = Math.max(0, Math.min(3, parseInt(state && state.currentStage, 10) || 0));
    lastEvolutionAge = Number(state && state.lastEvolutionAge) || 0;
    lastTick = Number(state && state.lastTick) || Date.now();
    if (state && state.hatchedPetType) setHatchedPetType(state.hatchedPetType);
}

function saveGame() {
    try {
        const state = captureGameState();
        localStorage.setItem(SAVE_KEY, JSON.stringify(state));
        // Keep legacy keys so drawPet() (still reads hatchedPetType) and old builds keep working
        localStorage.setItem(LEGACY_PET_KEY, JSON.stringify(state.pet));
        localStorage.setItem('hasHatched', state.hasHatched ? 'true' : 'false');
        localStorage.setItem('currentStage', String(state.currentStage));
        if (state.hatchedPetType) setHatchedPetType(state.hatchedPetType);
    } catch (err) {
        console.warn('[storage] save failed', err);
    }
}

function savePet() {
    saveGame();
}

function loadGame() {
    try {
        const blob = localStorage.getItem(SAVE_KEY);
        if (blob) {
            applyGameState(JSON.parse(blob));
            return true;
        }

        const legacyPet = localStorage.getItem(LEGACY_PET_KEY);
        const hatched = localStorage.getItem('hasHatched');
        const stage = localStorage.getItem('currentStage');
        if (legacyPet || hatched === 'true') {
            applyGameState({
                pet: legacyPet ? JSON.parse(legacyPet) : { ...DEFAULT_PET },
                hasHatched: hatched === 'true',
                currentStage: stage ? parseInt(stage, 10) : 0,
                lastEvolutionAge: 0,
                lastTick: Date.now(),
                hatchedPetType: getHatchedPetType()
            });
            saveGame();
            return true;
        }
    } catch (err) {
        console.warn('[storage] load failed', err);
    }
    return false;
}

function loadPet() {
    return loadGame();
}

function clearGame() {
    localStorage.removeItem(SAVE_KEY);
    localStorage.removeItem(LEGACY_PET_KEY);
    localStorage.removeItem('hasHatched');
    localStorage.removeItem('currentStage');
    localStorage.removeItem(HATCH_TYPE_KEY);
    localStorage.removeItem('lastTick');
}

function resetPet() {
    if (!confirm('Reset and hatch a new egg?')) return;
    clearGame();
    location.reload();
}
