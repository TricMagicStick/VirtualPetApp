// evolution.js - stages, evolve rules, names, mood
const EVOLUTION_RULES = [
    { minAge: 5, minAvg: 60 },   // baby -> child (first evo in a short session)
    { minAge: 25, minAvg: 65 },  // child -> teen
    { minAge: 90, minAvg: 70 }   // teen -> adult (earned endpoint, not a 30-min rush)
];

const STAGE_NAMES = {
    flick: ['Flick', 'Charling', 'DrakEmber', 'Infernyx'],
    puff: ['Puff', 'Whisp', 'Whisk', 'Nimbrix'],
    bud: ['Bud', 'Sprout', 'Sprig', 'Verdant'],
    bolt: ['Zap', 'Spark', 'Bolt', 'Storm'],
    ceph: ['Cephling', 'Cephy', 'Cephalon', 'Abyssal Ceph']
};

function getAverageCare() {
    return (pet.hunger + pet.happiness + pet.cleanliness + pet.energy) / 4;
}

function canEvolve() {
    if (currentStage >= 3) return false;
    const rule = EVOLUTION_RULES[currentStage];
    if (!rule) return false;
    return Math.floor(pet.age) >= rule.minAge && getAverageCare() >= rule.minAvg;
}

function getStageName() {
    const type = (typeof getHatchedPetType === 'function') ? getHatchedPetType() : 'flick';
    const names = STAGE_NAMES[type] || STAGE_NAMES.flick;
    return names[currentStage] || 'Unknown';
}

function getPetMood() {
    const avg = getAverageCare();
    const worst = Math.min(pet.hunger, pet.happiness, pet.cleanliness, pet.energy);
    if (worst <= 12 || avg < 28) {
        return { id: 'sick', label: 'SICK', color: '#ef4444', draw: 'sad' };
    }
    if (avg < 50 || worst <= 28) {
        return { id: 'sad', label: 'SAD', color: '#f59e0b', draw: 'sad' };
    }
    if (avg < 78) {
        return { id: 'ok', label: 'OK', color: '#38bdf8', draw: 'happy' };
    }
    return { id: 'veryhappy', label: 'VERY HAPPY', color: '#22c55e', draw: 'happy' };
}

function applyAdultBonus() {
    pet.hunger = clampStat(pet.hunger + 8);
    pet.happiness = clampStat(pet.happiness + 8);
    pet.cleanliness = clampStat(pet.cleanliness + 8);
    pet.energy = clampStat(pet.energy + 8);
}

function evolvePet() {
    if (currentStage >= 3) return;

    currentStage++;
    lastEvolutionAge = Math.floor(pet.age);

    if (currentStage >= 3) applyAdultBonus();

    if (typeof drawPet === 'function') {
        drawPet(getPetMood().draw, 0, 0);
    }
    if (typeof updateUI === 'function') updateUI();
    if (typeof saveGame === 'function') saveGame();
    if (typeof flashStatus === 'function') flashStatus('EVOLVED!', '#a78bfa');
}

function forceEvolution() {
    if (currentStage >= 3) {
        if (typeof flashStatus === 'function') flashStatus('Already adult', '#94a3b8');
        return;
    }
    evolvePet();
}

function setStage(stage) {
    currentStage = Math.max(0, Math.min(3, stage | 0));
    if (typeof drawPet === 'function') drawPet(getPetMood().draw, 0, 0);
    if (typeof updateUI === 'function') updateUI();
}
